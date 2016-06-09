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
#define MYPORT  24912
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

    char sendbuf[BUFFER_SIZE];
    char recvbuf[BUFFER_SIZE];
    memset(recvbuf, 0, sizeof(recvbuf));
    //char *str="68A3A368870100F000EF0000000000E6008008000110031E0E110C4576B1E306004E2029E80000003F010010271027102710271800070009001200140008000C000E00140006000C000B0017DC00DC00233737370000000043544E45540000000000000031333931323334353637382C010A00DA5E5715803E0101B0A10000000000000000000000000000000000000000000000000000000000000000000000000000B416";
    char *str="68ACAC6887010014011101000000002D021719840010060603173745785FB707004E1DCDB2040018FF01001027102710271027230000301132113B170000331135113B170000021203120917E1EBE1EB36343931333132383331352C0128002A7B5BB050610101C0ACBBF8B7D6C0E0C7EBC4E3D0D0B6AFA3ACD5E3BDADBBB7BEB0BFC6BCBCBBB6D3ADC4FAA3A1000000000000000000000000000000000000000000001A000000000000C0010C001C00DB16";
    BYTE *dsrc=(BYTE *)malloc(sizeof(BYTE)*strlen(str)/2);
    memset(dsrc,0,sizeof(BYTE)*strlen(str)/2);
    StrToHex(dsrc,str,sizeof(BYTE)*strlen(str)/2);
    send(sock_cli, dsrc, sizeof(BYTE)*strlen(str)/2,0); ///发送
    recv(sock_cli, recvbuf, sizeof(recvbuf),0); ///接收
    fputs(recvbuf, stdout);
    free(dsrc);
    BYTE bddp[1024];
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
    }
    printf("\n");
    close(sock_cli);
    return 0;
}
