#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/shm.h>
#include "util.h"
#define MYPORT  9988
#define BUFFER_SIZE 1024

int main()
{
    ///定义sockfd
    int sock_cli = socket(AF_INET,SOCK_STREAM, 0);

    ///定义sockaddr_in
    struct sockaddr_in servaddr;
    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(MYPORT);  ///服务器端口
    servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");  ///服务器ip

    ///连接服务器，成功返回0，错误返回-1
    if (connect(sock_cli, (struct sockaddr *)&servaddr, sizeof(servaddr)) < 0)
    {
        perror("connect");
        exit(1);
    }
    BYTE cmds[1024];
    memset(cmds,0,1024);
    char *str1_1="#MG$a00E1:A,BH20160200001;C,+8613800138000;D,+8613800138000,+8610086,+8610001;";
    int icur=0;
    int i=0;
    for(;i<strlen(str1_1);i++){
        cmds[icur]=str1_1[i];
        icur++;
    }
    
    cmds[icur]='E';
    icur++;

    cmds[icur]=',';
    icur++;


    char sendbuf[BUFFER_SIZE];
    char recvbuf[BUFFER_SIZE];
    memset(recvbuf, 0, sizeof(recvbuf));
    char *str="#MG$a00E1:A,BH20160200001;C,+8613800138000;D,+8613800138000,+8610086,+8610001;F,0D4C230A,N,43AE5A68,E;G,460,00,2493,13cf,47,2493,1268,42,2493,14d5,36;H,50,1F4,2,Y;I,2A3C,CD07,32,1F,10,3;J,Y,N,N,N;K,200;*1D";
    int len=strlen(str);
    BYTE *dsrc=(BYTE *)malloc(sizeof(BYTE)*strlen(str));
    memset(dsrc,0,sizeof(BYTE)*strlen(str));
    i=0;
    for(;i<len;i++){
     int c=str[i];
     dsrc[i]=c;
    }
    send(sock_cli, dsrc, sizeof(BYTE)*strlen(str),0); ///发送
    len=recv(sock_cli, recvbuf, sizeof(recvbuf),0); ///接收
    i=0;
    printf("\n");
    printf("len %d\n",len);
    if (len>0){
      for(;i<len;i++){
           printf("%02x",recvbuf[i]);
          
      }
      printf("\n");
      int i =0;
      for(;i<len;i++){
           if(recvbuf[i]=='E'){
             printf("%c",recvbuf[i]);
             i++;
             printf("%c",recvbuf[i]);
             i++;
             while(recvbuf[i]!=';'){
                printf("%02x",recvbuf[i]);
                i++;
             }
             printf("%c",recvbuf[i]);
               
           }else if(recvbuf[i]=='O'){
             printf("%c",recvbuf[i]);
             i++;
             printf("%c",recvbuf[i]);
             i++;
             printf("%c",recvbuf[i]);
             i++;
             printf("%c",recvbuf[i]);
             i++;
             printf("%c",recvbuf[i]);
             i++;
             printf("%c",recvbuf[i]);
             i++;
             
             printf("%d",recvbuf[i+1]);
             i++;
             i++;
             
             printf("%c",recvbuf[i]);
             i++;

             printf("%d",recvbuf[i+1]);
             i++;
             i++;
             printf("%c",recvbuf[i]);
             
           }else{
             printf("%c",recvbuf[i]);
           }          
      }
          
    }
    printf("\n");
     
    //fputs(recvbuf, stdout);
    free(dsrc);
    /*BYTE bddp[1024];
    bddp[0]=0x7B;
    bddp[1]=0x81;
    bddp[2]=0x10;
    bddp[3]=0x00;
    char *num="13810139056";
    int i=0;
    for(;i<11;i++){
      bddp[i+4]=num[i];
    }
    bddp[15]=0x7B;
    memset(recvbuf, 0, sizeof(recvbuf));
    send(sock_cli, bddp, 16,0); ///发送
    int len=recv(sock_cli, recvbuf, sizeof(recvbuf),0); ///接收
    i=0;
    printf("\n");
    if (len>0){
      for(;i<len;i++){
         printf("%02x",recvbuf[i]);
      }
    }*/
    printf("\n");
    close(sock_cli);
    return 0;
}
