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


    char sendbuf[BUFFER_SIZE];
    char recvbuf[BUFFER_SIZE];
    memset(recvbuf, 0, sizeof(recvbuf));
    //char *str="68A3A368870100F000EF0000000000E6008008000110031E0E110C4576B1E306004E2029E80000003F010010271027102710271800070009001200140008000C000E00140006000C000B0017DC00DC00233737370000000043544E45540000000000000031333931323334353637382C010A00DA5E5715803E0101B0A10000000000000000000000000000000000000000000000000000000000000000000000000000B416";
    char *str="09010001010010271027102710271800070009001200140008000c000e00140006000c000b0017160016000000000000000000000000000000000000000000000000000000000000000000000000000000000000233737370000000043544e45540000000000000031333931323334353637382c010a00da5e5715803e0101";
    BYTE *dsrc=(BYTE *)malloc(sizeof(BYTE)*strlen(str)/2);
    memset(dsrc,0,sizeof(BYTE)*strlen(str)/2);
    StrToHex(dsrc,str,sizeof(BYTE)*strlen(str)/2);
    int cs=0;
    int k=0;
    for(;k<strlen(str)/2;k++){
        cs+=dsrc[k];
        printf("%02x",dsrc[k]);
 
    }
    
    printf("\n%02x,%d",cs%256,cs);
    free(dsrc);
    return 0;
}
