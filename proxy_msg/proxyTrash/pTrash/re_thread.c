#include "re_thread.h"
#include<stdlib.h>
#include<pthread.h>
#include<sys/socket.h>
#include<sys/types.h>       //pthread_t , pthread_attr_t and so on.
#include<stdio.h>
#include<netinet/in.h>      //structure sockaddr_in
#include<arpa/inet.h>       //Func : htonl; htons; ntohl; ntohs
#include <sys/resource.h> /*setrlimit */
#include <sys/epoll.h> /* epoll function */
#include <fcntl.h>     /* nonblocking */
#include<assert.h>          //Func :assert
#include<string.h>          //Func :memset
#include<unistd.h>          //Func :close,write,read
#include <errno.h>
#include "util.h"
#include "ddp.h"
#define SOCK_PORT 24912
#define MAXEPOLLSIZE 10000
#define MAXLINE 10240

int setnonblocking(int sockfd)
{
    if (fcntl(sockfd, F_SETFL, fcntl(sockfd, F_GETFD, 0)|O_NONBLOCK) == -1) {
        return -1;
    }
    return 0;
}

int handle(int connfd);
static void Data_handle(void * sock_fd){
   int fd = *((int *)sock_fd);
   int i_recvBytes;
    BYTE data_recv[BUFFER_LENGTH];
 
    while(1)
      {
         printf("waiting for request...\n");
         //Reset data.
        memset(data_recv,0,BUFFER_LENGTH);
 
        i_recvBytes = read(fd,data_recv,BUFFER_LENGTH);
         if(i_recvBytes == 0)
         {
             printf("Maybe the client has closed\n");
            break;
         }
        if(i_recvBytes == -1)
        {
             fprintf(stderr,"read error!\n");
           break;
        }
        int j=0;
        for(;j<i_recvBytes;j++){
          printf("%02x",data_recv[j]);
        }
        printf("\n");
        BYTE data_send[BUFFER_LENGTH];
        memset(data_send,0,BUFFER_LENGTH);
        if(data_recv[0]==0x7B){
            int len = VerifyDDPFrame(data_recv,i_recvBytes,0,data_send);
             int k=4;
             for(;k<15;k++){
               data_send[k]=data_recv[k];
             }
             send(fd,data_send,len,0);
             k=0;
             printf("reg send:");
             for(;k<len;k++){
               printf("%02x",data_send[k]);
             }
             printf("\n");
        }
        else{
          printf("101\n");
          VerifyIED101Frame(data_recv,i_recvBytes,0);
          data_send[0]=0x0B;
          send(fd,data_send,1,0);
        }
        //send(fd,data_send,1,0);
        //if(write(fd,data_send,1) == -1)
         //{
         //   break;
         //}
     }
 
   //Clear
     printf("terminating current client_connection...\n");
     close(fd);            //close a file descriptor.
     //pthread_exit(NULL);   //terminate calling thread!
}


void
thread_re_1(void *arg)
{
    int sockfd_server;
    int sockfd;
    int fd_temp;
    struct sockaddr_in s_addr_in;
    struct sockaddr_in s_addr_client;
    int client_length;

    sockfd_server = socket(AF_INET,SOCK_STREAM,0);  //ipv4,TCP
    assert(sockfd_server != -1);

    int one = 1;
    if (setsockopt(sockfd_server, SOL_SOCKET, SO_REUSEADDR, (char *) &one, sizeof(int)) < 0){
       exit(0);
    }
//before bind(), set the attr of structure sockaddr.
    memset(&s_addr_in,0,sizeof(s_addr_in));
    s_addr_in.sin_family = AF_INET;
    s_addr_in.sin_addr.s_addr = htonl(INADDR_ANY);  //trans addr from uint32_t host byte order to network byte order.
    s_addr_in.sin_port = htons(SOCK_PORT);          //trans port from uint16_t host byte order to network byte order.
    fd_temp = bind(sockfd_server,(struct scokaddr *)(&s_addr_in),sizeof(s_addr_in));
    if(fd_temp == -1)
    {
      fprintf(stderr,"bind error!\n");
      exit(1);
    }
    
    fd_temp = listen(sockfd_server,MAX_CONN_LIMIT);
    if(fd_temp == -1)
    {
      fprintf(stderr,"listen error!\n");
       exit(1);
    }

    while(1)
    {
      printf("waiting for new connection...\n");
      pthread_t thread_id;
      client_length = sizeof(s_addr_client);
 
      //Block here. Until server accpets a new connection.
      sockfd = accept(sockfd_server,(struct sockaddr_*)(&s_addr_client),(socklen_t *)(&client_length));
      if(sockfd == -1)
      {
        fprintf(stderr,"Accept error!\n");
        continue;                               //ignore current socket ,continue while loop.
      }
      printf("A new connection occurs!\n");
      if(pthread_create(&thread_id,NULL,(void *)(&Data_handle),(void *)(&sockfd)) == -1)
      {
        fprintf(stderr,"pthread_create error!\n");
        break;                                  //break while loop
      }
    }
 
    //Clear
    int ret = shutdown(sockfd_server,SHUT_WR); //shut down the all or part of a full-duplex connection.
    assert(ret != -1);
 
    printf("Server shuts down\n");



 
}



void thread_re(void *arg)
{
    int  servPort = 24912;
    int listenq = 1024;

    int listenfd, connfd, kdpfd, nfds, n, nread, curfds,acceptCount = 0;
    struct sockaddr_in servaddr, cliaddr;
    socklen_t socklen = sizeof(struct sockaddr_in);
    struct epoll_event ev;
    struct epoll_event events[MAXEPOLLSIZE];
    struct rlimit rt;
    char buf[MAXLINE];

    /* 设置每个进程允许打开的最大文件数 */
    rt.rlim_max = rt.rlim_cur = MAXEPOLLSIZE;
    if (setrlimit(RLIMIT_NOFILE, &rt) == -1) 
    {
        printf("setrlimit error");
        return -1;
    }


    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET; 
    servaddr.sin_addr.s_addr = htonl (INADDR_ANY);
    servaddr.sin_port = htons (servPort);

    listenfd = socket(AF_INET, SOCK_STREAM, 0); 
    if (listenfd == -1) {
        printf("can't create socket file");
        return -1;
    }

    int opt = 1;
    setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    if (setnonblocking(listenfd) < 0) {
        printf("setnonblock error");
    }

    if (bind(listenfd, (struct sockaddr *) &servaddr, sizeof(struct sockaddr)) == -1) 
    {
        printf("bind error");
        return -1;
    } 
    if (listen(listenfd, listenq) == -1) 
    {
        printf("listen error");
        return -1;
    }
    /* 创建 epoll 句柄，把监听 socket 加入到 epoll 集合里 */
    kdpfd = epoll_create(MAXEPOLLSIZE);
    ev.events = EPOLLIN | EPOLLET;
    ev.data.fd = listenfd;
    if (epoll_ctl(kdpfd, EPOLL_CTL_ADD, listenfd, &ev) < 0) 
    {
        fprintf(stderr, "epoll set insertion error: fd=%d\n", listenfd);
        printf( "epoll set insertion error: fd=%d\n", listenfd);
        return -1;
    }
    curfds = 1;

    printf("epollserver startup,port %d, max connection is %d, backlog is %d\n", servPort, MAXEPOLLSIZE, listenq);

    for (;;) {
        /* 等待有事件发生 */
        nfds = epoll_wait(kdpfd, events, curfds, -1);
        if (nfds == -1)
        {
            printf("epoll_wait");
            continue;
        }
        /* 处理所有事件 */
        for (n = 0; n < nfds; ++n)
        {
            if (events[n].data.fd == listenfd) 
            {
                connfd = accept(listenfd, (struct sockaddr *)&cliaddr,&socklen);
                if (connfd < 0) 
                {
                    perror("accept error");
                    continue;
                }

                sprintf(buf, "accept form %s:%d\n", inet_ntoa(cliaddr.sin_addr), cliaddr.sin_port);
                printf("%d:%s", ++acceptCount, buf);

                if (curfds >= MAXEPOLLSIZE) {
                    fprintf(stderr, "too many connection, more than %d\n", MAXEPOLLSIZE);
                    close(connfd);
                    continue;
                } 
                if (setnonblocking(connfd) < 0) {
                    perror("setnonblocking error");
                }
                ev.events = EPOLLIN | EPOLLET;
                ev.data.fd = connfd;
                if (epoll_ctl(kdpfd, EPOLL_CTL_ADD, connfd, &ev) < 0)
                {
                    fprintf(stderr, "add socket '%d' to epoll failed: %s\n", connfd, strerror(errno));
                    return -1;
                }
                curfds++;
                continue;
            } 
            // 处理客户端请求
            if (handle(events[n].data.fd) < 0) {
                epoll_ctl(kdpfd, EPOLL_CTL_DEL, events[n].data.fd,&ev);
                curfds--;


            }
        }
    }
    close(listenfd);
    return 0;
}
int handle(int connfd) {
   int fd = connfd;
   int i_recvBytes;
    BYTE data_recv[BUFFER_LENGTH];
 
    while(1)
      {
         printf("waiting for request...\n");
         //Reset data.
        memset(data_recv,0,BUFFER_LENGTH);
 
        i_recvBytes = read(fd,data_recv,BUFFER_LENGTH);
         if(i_recvBytes == 0)
         {
             printf("Maybe the client has closed\n");
           close(fd);            //close a file descriptor.
            
            break;
         }
        if(i_recvBytes == -1)
        {
           printf("read error!\n");
           close(fd);            //close a file descriptor.
           break;
        }
        int j=0;
        for(;j<i_recvBytes;j++){
          printf("%02x",data_recv[j]);
        }
        printf("\n");
        BYTE data_send[BUFFER_LENGTH];
        memset(data_send,0,BUFFER_LENGTH);
        if(data_recv[0]==0x7B){
            int len = VerifyDDPFrame(data_recv,i_recvBytes,0,data_send);
             int k=4;
             printf("phone:");
             for(;k<15;k++){
               data_send[k]=data_recv[k];
               printf("%c",data_send[k]);
             }
             printf("\n");
             
             send(fd,data_send,len,0);
             k=0;
             printf("reg send:");
             for(;k<len;k++){
               printf("%02x",data_send[k]);
             }
             printf("\n");
        }
        else{
          printf("101\n");
          VerifyIED101Frame(data_recv,i_recvBytes,0);
          data_send[0]=0x0B;
          send(fd,data_send,1,0);
        }
        break;
     }
 
   //Clear
     //printf("terminating current client_connection...\n");
     //close(fd);            //close a file descriptor.
}


