#include "re_thread.h"
#include<stdlib.h>
#include<pthread.h>
#include<sys/socket.h>
#include<sys/types.h>       //pthread_t , pthread_attr_t and so on.
#include<stdio.h>
#include<netinet/in.h>      //structure sockaddr_in
#include<arpa/inet.h>       //Func : htonl; htons; ntohl; ntohs
#include<assert.h>          //Func :assert
#include<string.h>          //Func :memset
#include<unistd.h>          //Func :close,write,read
#include "util.h"
#include "ddp.h"
#define SOCK_PORT 9988
//random char
void random_chars(char *buf, uint32_t len) {
    if (!buf || len == 0) {
        return;
    }   
    struct timeval tv; 
    gettimeofday(&tv, NULL);
    srand(tv.tv_sec + tv.tv_usec);
    char src[] = "0123456789abcdefghijklmnopqrstuvwxyz";
    uint32_t cnt = 36; 
    int32_t i = 0;
    for (; i < len; ++i) {
        buf[i] = src[rand() % 36];
    }   
}

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
        BYTE data_send[BUFFER_LENGTH];
        if(data_recv[0]==0x7B){
             VerifyDDPFrame(data_recv,i_recvBytes,0);
             data_send[0]=0x81;
        }
        else{
          printf("101\n");
          VerifyIED101Frame(data_recv,i_recvBytes,0);
          data_send[0]=0x0B;
        }
        //send(fd,data_send,1,0);
        //if(write(fd,data_send,1) == -1)
         //{
         //   break;
         //}
        BYTE data_cmd[BUFFER_LENGTH];
        int next=0;
        memset(data_cmd,0,BUFFER_LENGTH);
        data_cmd[0]='#';
        data_cmd[1]='M';
        data_cmd[2]='G';
        data_cmd[3]='$';
        data_cmd[4]='a';

        data_cmd[9]=':';
        next=10;
        char cmd_A[256];
        memset(cmd_A,'\0',256);
        strcat(cmd_A,"A,Buqoyelbrwflu7ky");
        char id[15];
        memset(id,'\0',15);
        random_chars(id,15);
        id[15]='\0';
        //strcat(cmd_A,id);
        printf("cmd_A %s\n",cmd_A);
        int a_i=0;
        for(;a_i<strlen(cmd_A);a_i++){
             data_cmd[next]=cmd_A[a_i];
             next++;
        }
        printf("\n");
        data_cmd[next]=';';
        next++;
                
        data_cmd[next]='E';
        next++;
        data_cmd[next]=',';
        next++;

        char cmd_E[256];
        memset(cmd_E,'\0',256);
        time_t rawtime;
        struct tm * timeinfo;
        time(&rawtime);
        timeinfo = localtime (&rawtime);
        
        data_cmd[next]=timeinfo->tm_year-100;
        printf("year %d\n",timeinfo->tm_year-100);
        next++;
       
        data_cmd[next]=timeinfo->tm_mon+1;
        printf("mon %d\n",timeinfo->tm_mon+1);
        next++;

        data_cmd[next]=timeinfo->tm_mday;
        printf("mday %d\n",timeinfo->tm_mday);
        next++;

        data_cmd[next]=timeinfo->tm_hour;
        printf("hour %d\n",timeinfo->tm_hour);
        next++;

        data_cmd[next]=timeinfo->tm_min;
        printf("min %d\n",timeinfo->tm_min);
        next++;

        data_cmd[next]=timeinfo->tm_sec;
        printf(" sec %d\n",timeinfo->tm_sec);
        next++;

        data_cmd[next]=';';
        printf("char; %02x\n",data_cmd[next]);
        next++;

        char cmd_P[256];
        memset(cmd_P,'\0',256);
        strcat(cmd_P,"P,42.123.91.176,9988;");
        int p_i=0;
        for(;p_i<strlen(cmd_P);p_i++){
             data_cmd[next]=(int)cmd_P[p_i];
             next++;
        }

        
        data_cmd[next]='O';
        next++;
        data_cmd[next]=',';
        next++;
        data_cmd[next]='1';
        next++;
        data_cmd[next]=',';
        next++;
        data_cmd[next]='1';
        next++;
        data_cmd[next]=',';
        next++;
        data_cmd[next]=0x00;
        next++;
        data_cmd[next]=0x01;
        next++;
        data_cmd[next]=',';
        next++;
        data_cmd[next]=0x00;
        next++;
        data_cmd[next]=0x05;
        next++;
        data_cmd[next]=';';
        next++;

        data_cmd[next]='*';
        next++;
        int len_t=next-9;

        BYTE blen[2];
        blen[0]=len_t%256;
        blen[1]=len_t/256;
        BYTE  alen[5];
        HexToStr(alen,blen,2);

        data_cmd[5]=alen[0];
        data_cmd[6]=alen[1];
        data_cmd[7]=alen[2];
        data_cmd[8]=alen[3];
          
        int iXOR=data_cmd[9];
        int i_x=10;
        for(;i_x<next;i_x++){
            iXOR^=data_cmd[i_x];
        }


        BYTE xb[1];
        xb[0]=iXOR;
        BYTE a_bx[3];
        HexToStr(a_bx,xb,1);
        data_cmd[next]=a_bx[0];
        next++;
        data_cmd[next]=a_bx[1];
        next++;


        data_cmd[next]=0x0d;
        next++;

        
        data_cmd[next]=0x0a;
        next++;
        printf("length %d\n",next);
        int i=0;
        for(;i<next;i++){
           printf("%02x",data_cmd[i]);
        }
        printf("\n len %d",next);
       
        send(fd,data_cmd,next,0);

     }
 
   //Clear
     printf("terminating current client_connection...\n");
     close(fd);            //close a file descriptor.
     pthread_exit(NULL);   //terminate calling thread!
}


void
thread_re(void *arg)
{
    int sockfd_server;
    int sockfd;
    int fd_temp;
    struct sockaddr_in s_addr_in;
    struct sockaddr_in s_addr_client;
    int client_length;

    sockfd_server = socket(AF_INET,SOCK_STREAM,0);  //ipv4,TCP
    assert(sockfd_server != -1);

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
