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
#include <mongoc.h>
#include <bson.h>
#include "frame.h"
#include "query_thread.h"


static void connect_init(void);
static void query_send(char *tel);
int sockfd;  

extern  mongoc_client_t *mgclient;
void
thread_query(void *arg)
{
	pthread_cond_t		cond = PTHREAD_COND_INITIALIZER;
	pthread_mutex_t		cond_mutex = PTHREAD_MUTEX_INITIALIZER;
	struct	timespec	timeout;
        mongoc_collection_t *collection;
        collection = mongoc_client_get_collection (mgclient, "smart_trash_development", "devices");
        printf("query\n");
	while (1) {
		/* Make sure we check the servers at the very begining */
                printf("query\n");
	        //connect_init();
                if(true/*sockfd != -1*/){
                    mongoc_cursor_t *cursor;
                    bson_t *doc;
                    bson_t *query;
                    query = bson_new ();
                    cursor = mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
                    while (mongoc_cursor_next (cursor, &doc)) {
                        bson_iter_t iter;
                        bson_iter_t sub_iter;
                        
                        if (bson_iter_init (&iter, doc)) {
                            while (bson_iter_next (&iter)) {
               
                                bson_value_t *value;

                                value = bson_iter_value (&iter);
             
                                if (value->value_type == BSON_TYPE_UTF8) {
                                     if(strcmp(bson_iter_key (&iter),"device_sn")==0){
                                       if (value->value.v_utf8.len==11){
                                         printf("se_oid %s\n",value->value.v_utf8);  
                                         connect_init();  
                                         if(sockfd!=-1){
                                          query_send(value->value.v_utf8.str);
                                          close(sockfd);
                                         }
                                       }     
                                     }
                                 }
                             }
                         }
                     }
                     //query_send("");
                     //close(sockfd);
                     bson_destroy (query);
                }
		
		/* Sleep for config.checkinterval seconds... */
		timeout.tv_sec = time(NULL) + 10;
		timeout.tv_nsec = 0;

		/* Mutex must be locked for pthread_cond_timedwait... */
		pthread_mutex_lock(&cond_mutex);
		
                printf("query1\n");
		/* Thread safe "sleep" */
		pthread_cond_timedwait(&cond, &cond_mutex, &timeout);
                printf("query2\n");
		/* No longer needs to be locked */
		pthread_mutex_unlock(&cond_mutex);
	}
        mongoc_collection_destroy (collection);
}

static void connect_init(void){
    int len;  
    struct sockaddr_in address;  
    int result;  
    sockfd = socket(AF_INET, SOCK_STREAM, 0);  
    address.sin_family = AF_INET;  
    address.sin_addr.s_addr = inet_addr("0.0.0.0");  
    address.sin_port = htons(5139);  
    len = sizeof(address);  
    result = connect(sockfd,  (struct sockaddr *)&address, len);  
    if(result < 0){  
       sockfd=-1;
    }  
}

static void query_send(char * tel){
       ssize_t			numbytes;
       size_t	        	totalbytes;
       int			nfds, done;
       BYTE			request[1024];
       fd_set			readfds;
       struct timeval		timeout;
       t_frame_q fr;
       fr.type=0x8B;
       int k=0;
       for(;k<11;k++){
         fr.tel[k]=tel[k];
       }
       fr.start=0x68;
       fr.length=0x03;
       fr.length_c=0x03;
       fr.start_c=0x68;
       fr.command=0x07;
       fr.addr[0]=0x01;
       fr.addr[1]=0x00;
       fr.cs=0x08;
       fr.end=0x16;
       BYTE buf[1024];
       memset(buf,0,1024);
       memcpy(buf,&fr,sizeof(t_frame_q));
       int j=0;
       int len=sizeof(t_frame_q);
       for(;j<sizeof(t_frame_q);j++)
       {
          printf("%02x",buf[j]);
       }
       printf("\n");
       printf("dd%d\n",len);
       printf("sockfd %d\n",sockfd);
       char str[1024];
       memset(str,0,1024);
       HexToStr(str,buf,sizeof(t_frame_q));
       send(sockfd,buf,sizeof(t_frame_q),0);
       //send(sockfd,str,strlen(str),0);
       BYTE revbuf[1024];
       memset(revbuf,0,1024);
       numbytes = totalbytes = 0;
	done = 0;
	/*do {
		FD_ZERO(&readfds);
		FD_SET(sockfd, &readfds);
		timeout.tv_sec = 30; 
		timeout.tv_usec = 0;
		nfds = FD_SETSIZE;
                printf("%d\n",FD_SETSIZE);

		nfds = select(nfds, &readfds, NULL, NULL, &timeout);

		if (nfds > 0) {
			numbytes = read(sockfd, request + totalbytes, 1024 - (totalbytes + 1));
			if (numbytes < 0) {
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
			return;
		}
		else if (nfds < 0) {
			return;
		}
	} while (!done);*/
       totalbytes=recv(sockfd,request,1024,0);
       int i=0;
       for(;i<totalbytes;i++)
       {
          printf("%02x",request[i]);
       }
       printf("\n");
       
}

