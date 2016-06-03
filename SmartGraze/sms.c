#define _GNU_SOURCE

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <string.h>
#include <stdarg.h>
#include <sys/types.h>
#include <sys/socket.h>
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

static void sendsms_ihuyi(char *msg);

int sockfd;  

static void sendsms_ihuyi(char *msg){
    ssize_t			numbytes;
    size_t	        	totalbytes;
    char			request[2048];
    fd_set			readfds;
    struct timeval		timeout;
    int len;
    struct sockaddr_in address;
    int result;
    int sockfd_s, nfds, done;
    sockfd_s = socket(AF_INET, SOCK_STREAM, 0);
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = inet_addr("120.55.247.92");
    address.sin_port = htons(80);
    len = sizeof(address);
    result = connect(sockfd_s,  (struct sockaddr *)&address, len);
    if(result == -1){
    }
    snprintf(request, sizeof(request) - 1,
			"GET %s%smethod=%s&account=%s&password=%s&mobile=%s&content=%s  HTTP/1.1\r\n"
			"Host: %s\r\n"
			"\r\n",
			"/webservice/sms.php",
			"?",
			"Submit",
			"cf_zst",
			"cdc123456",
			"13810139056",
			msg,
			"106.ihuyi.cn");
    send(sockfd_s, request, strlen(request), 0);
    printf("%s \n",request);
    printf("msg %s\n",msg);
    totalbytes=recv(sockfd_s,request,1024,0); 
    /*numbytes = totalbytes = 0;
    done = 0;
    do {
		FD_ZERO(&readfds);
		FD_SET(sockfd_s, &readfds);
		timeout.tv_sec = 30; 
		timeout.tv_usec = 0;
		nfds = sockfd + 1;

		nfds = select(nfds, &readfds, NULL, NULL, &timeout);

		if (nfds > 0) {
			numbytes = read(sockfd_s, request + totalbytes, 2048 - (totalbytes + 1));
			if (numbytes < 0) {
				close(sockfd_s);
				return;
			}
			else if (numbytes == 0) {
				done = 1;
			}
			else {
				totalbytes += numbytes;
			}
		}
		else if (nfds == 0) {
			close(sockfd_s);
			return;
		}
		else if (nfds < 0) {
			close(sockfd_s);
			return;
		}
    } while (!done);
    request[totalbytes] = '\0';*/
    printf("http response %s",request);
    close(sockfd_s);
}

int main()
{
  char *s = "故障报警：电压过低，位置是北京，请及时处理！";
  char msg[2048];
  memset(msg,0,2048);
  snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s数值高于%d，位置是%s，请及时处理！",
			"test",
			3,
			"北京");
  sendsms_ihuyi(msg);
  printf("finished \n");
}
