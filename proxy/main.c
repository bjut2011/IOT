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
#include <mongoc.h>
#include "util.h"
#include "re_thread.h"
static pthread_t tid_ping = 0; 
mongoc_client_t *mgclient;
int main(){
  //start(); 
  /* Start heartbeat thread */
  mongoc_init();
  mgclient = mongoc_client_new ("mongodb://172.16.0.7:27017/");
  int result;
  result = pthread_create(&tid_ping, NULL, (void *)thread_re, NULL);
  if (result != 0) {
	    //debug(LOG_ERR, "FATAL: Failed to create a new thread (ping) - exiting");
		//termination_handler(0);
     printf("error");
  }
  pthread_join(tid_ping, NULL);  
	//pthread_detach(tid_ping);
  mongoc_client_destroy (mgclient);
  mongoc_cleanup ();
  return 0;
}

