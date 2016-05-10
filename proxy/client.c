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

    char sendbuf[BUFFER_SIZE];
    char recvbuf[BUFFER_SIZE];
    memset(recvbuf, 0, sizeof(recvbuf));
    char *str="68A3A368870100F000EF0000000000E6008008000110031E0E110C4576B1E306004E2029E80000003F010010271027102710271800070009001200140008000C000E00140006000C000B0017DC00DC00233737370000000043544E45540000000000000031333931323334353637382C010A00DA5E5715803E010100000000000000000000000000000000000000000000000000000000000000000000000000000000B416";
    send(sock_cli, str, strlen(str),0); ///发送
    recv(sock_cli, recvbuf, sizeof(recvbuf),0); ///接收
    fputs(recvbuf, stdout);

    close(sock_cli);
    return 0;
}
