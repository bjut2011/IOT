#define _GNU_SOURCE

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <string.h>
#include <stdarg.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <unistd.h>
#include <syslog.h>
#include <signal.h>
#include <errno.h>
#include "alarm_thread.h"

static void alarm_send(void);
static void connect_init(void);

int sockfd;  

void
thread_alarm(void *arg)
{
	pthread_cond_t		cond = PTHREAD_COND_INITIALIZER;
	pthread_mutex_t		cond_mutex = PTHREAD_MUTEX_INITIALIZER;
	struct	timespec	timeout;
	connect_init();
	while (1) {
		/* Make sure we check the servers at the very begining */
		alarm_send();
		
		/* Sleep for config.checkinterval seconds... */
		timeout.tv_sec = time(NULL) + 6000;
		timeout.tv_nsec = 0;

		/* Mutex must be locked for pthread_cond_timedwait... */
		pthread_mutex_lock(&cond_mutex);
		
		/* Thread safe "sleep" */
		pthread_cond_timedwait(&cond, &cond_mutex, &timeout);

		/* No longer needs to be locked */
		pthread_mutex_unlock(&cond_mutex);
	}
        close(sockfd);
}

static void connect_init(void){
    int len;  
    struct sockaddr_in address;  
    int result;  
    sockfd = socket(AF_INET, SOCK_STREAM, 0);  
    address.sin_family = AF_INET;  
    address.sin_addr.s_addr = inet_addr("110.76.185.36");  
    address.sin_port = htons(8011);  
    len = sizeof(address);  
    result = connect(sockfd,  (struct sockaddr *)&address, len);  
    if(result == -1){  
    }  
}

static void
alarm_send(void)
{
}
