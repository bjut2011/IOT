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
#include <curl/curl.h>  
#include "alarm_thread.h"

static void alarm_send(void);
static void connect_init(void);
static void sendsms(char *msg);
static void sendsms_ihuyi(char *msg);
static void sendsms_pl(char *msg);
static void getaddress(char *msg);

static void do_alarm(mongoc_collection_t *sensorcoll,char * se_id,char * alarmType,char * upperBoundC,char *lowerBoundC, char *duration,char *target,char * contactId);
int sockfd;  

void
thread_alarm(void *arg){
	pthread_cond_t		cond = PTHREAD_COND_INITIALIZER;
	pthread_mutex_t		cond_mutex = PTHREAD_MUTEX_INITIALIZER;
	struct	timespec	timeout;
	while (1) {
		/* Make sure we check the servers at the very begining */
	        connect_init();
                if(sockfd!=-1){
		  alarm_send();
                  close(sockfd);
                }
		
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
        mongoc_client_t *curclient = mongoc_client_new ("mongodb://172.16.0.7:27017/");
        mongoc_collection_t *collection;
        mongoc_collection_t *sensorcoll;
        mongoc_collection_t *alarmcoll;
        collection = mongoc_client_get_collection (curclient, "smart_trash_development", "devices");
        sensorcoll = mongoc_client_get_collection (curclient, "smart_trash_development", "sensors");
        alarmcoll = mongoc_client_get_collection (curclient, "smart_trash_development", "alarms");

   	mongoc_cursor_t *cursor;
   	bson_t *doc;
   	bson_t *query;
   	char *str;
   	query = bson_new ();
   	cursor = mongoc_collection_find (alarmcoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   	bson_oid_t se_oid;
        char se_id[1024];
        memset(se_id,0,1024);
        char alarmType[1024];
        memset(alarmType,0,1024);
        char lowerBoundC[1024];
        memset(lowerBoundC,0,1024);
        char upperBoundC[1024];
        memset(upperBoundC,0,1024);
        char duration[1024];
        memset(duration,0,1024);
        char target[1024];
        memset(target,0,1024);
        char contactId[1024];
        memset(contactId,0,1024);
   	while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               
               bson_value_t *value;

               value = bson_iter_value (&iter);
             
               if (value->value_type == BSON_TYPE_UTF8) {
                 if(strcmp(bson_iter_key (&iter),"sensorId")==0){
                    strcpy(se_id,value->value.v_utf8.str);   
                 }else if (strcmp(bson_iter_key (&iter),"alarmType")==0){
                    strcpy(alarmType,value->value.v_utf8.str);   
                 }else if (strcmp(bson_iter_key (&iter),"lowerBoundC")==0){
                    strcpy(lowerBoundC,value->value.v_utf8.str);
                 }else if (strcmp(bson_iter_key (&iter),"upperBoundC")==0){
                    strcpy(upperBoundC,value->value.v_utf8.str);
                 }else if (strcmp(bson_iter_key (&iter),"duration")==0){
                    strcpy(duration,value->value.v_utf8.str);
                 }else if (strcmp(bson_iter_key (&iter),"target")==0){
                    strcpy(target,value->value.v_utf8.str);
                 }else if (strcmp(bson_iter_key (&iter),"contactId")==0){
                    strcpy(contactId,value->value.v_utf8.str);
                 }
               }
            }
          }
          do_alarm(sensorcoll,se_id,alarmType,upperBoundC,lowerBoundC,duration,target,contactId);
   	}
    	bson_destroy (query);
        mongoc_collection_destroy (collection);
        mongoc_collection_destroy (sensorcoll);
        mongoc_collection_destroy (alarmcoll);
        mongoc_client_destroy (curclient);
}

static void do_alarm(mongoc_collection_t *sensorcoll,char * se_id,char * alarmType,char * upperBoundC,char *lowerBoundC, char *duration,char *target,char * contactId){
   mongoc_cursor_t *cursor;
   bson_t *doc;
   bson_t *query;
   char *str;
   query = bson_new ();
   bson_oid_t se_oid;
   bson_oid_init_from_string(&se_oid, se_id);
   BSON_APPEND_OID (query, "_id",&se_oid);
   cursor = mongoc_collection_find (sensorcoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   int ivalue=0;
   int buse=0;
   char name[1024];
   memset(name,0,1024);
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          //printf ("%s\n", str);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               //printf ("Found a field named: %s\n", bson_iter_key (&iter));
               
               bson_value_t *value;
               value = bson_iter_value (&iter);
               //printf("type %d\n",value->value_type);
               if (value->value_type == BSON_TYPE_INT32) {
                 if(strcmp(bson_iter_key (&iter),"value")==0){
                    //printf("value %d\n", value->value.v_int32);         
                    ivalue=(int)value->value.v_double; 
                    buse =1;
                 }
               }
               if (value->value_type == BSON_TYPE_DOUBLE) {
                 if(strcmp(bson_iter_key (&iter),"value")==0){
                    //printf("value %d\n", (int)value->value.v_double);        
                    buse =1;
                    ivalue=(int)value->value.v_double; 
                 }
               }
               if (value->value_type == BSON_TYPE_UTF8) {
                 if(strcmp(bson_iter_key (&iter),"name")==0){
                    //printf("value %d\n", (int)value->value.v_double);        
                    strcpy(name,value->value.v_utf8.str); 
                 }
               }
            }
          }
   }
   bson_destroy (query);

   if(buse ==1){
     if(strcmp(alarmType,"val_above")==0){
        int iupper=atoi(upperBoundC);
        if(iupper<ivalue){
         printf("val_above %d value\n",iupper,ivalue);
         //char *s = "你好";
         char *s = "故障报警：电压过低，位置是北京，请及时处理！";
         char msg[2048];
         memset(msg,0,2048);
         snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s数值高于%d，位置是%s，请及时处理！",
			name,
			iupper,
			"北京");
         char buf[1024];  
         URLEncodeGBK(s, strlen(s), buf,sizeof(buf));  
         printf("%s\n",buf);
         sendsms_ihuyi(msg);
         char adr[2048];
         getaddress(adr);
        }
     }else if(strcmp(alarmType,"val_below")==0){
        int iupper=atoi(lowerBoundC);
        if(iupper>ivalue){
         printf("val_below %d  value %d\n",iupper,ivalue);
         char *s = "故障报警：电压过低，位置是北京，请及时处理！";
         char msg[2048];
         memset(msg,0,2048);
         snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s数值低于%d，位置是%s，请及时处理！",
			name,
			iupper,
			"北京");
         char buf[1024];  
         URLEncodeGBK(s, strlen(s), buf,sizeof(buf));  
         printf("%s\n",buf);
         sendsms_ihuyi(msg);
         char adr[2048];
         getaddress(adr);
        }
     }
   }
}


static void sendsms(char *msg){
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
    address.sin_addr.s_addr = inet_addr("211.147.239.62");
    address.sin_port = htons(9050);
    len = sizeof(address);
    result = connect(sockfd_s,  (struct sockaddr *)&address, len);
    if(result == -1){
    }
    snprintf(request, sizeof(request) - 1,
			"POST %s%susername=%s&password=%s&to=%s&text=%s&msgtype=%s HTTP/1.0\r\n"
			"User-Agent: WiFiDog %s\r\n"
			"Host: %s\r\n"
			"\r\n",
			"cgi-bin/sendsms",
			"?",
			"bjyjy@gzzrkj",
			"Yws5C0hc",
			"13810139056",
			msg,
			"4",
			"1.0",
			"211.147.239.62");
    send(sockfd_s, request, strlen(request), 0);
    printf("%s \n",request);
    printf("msg %s\n",msg);
    numbytes = totalbytes = 0;
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
    close(sockfd_s);
    request[totalbytes] = '\0';
    printf("http response %s",request);
}



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

size_t write_data(void *ptr, size_t size, size_t nmemb, void *stream)
{
    if (strlen((char *)stream) + strlen((char *)ptr) > 999999) return 0;
    strcat(stream, (char *)ptr);
    return size*nmemb;
}

static void getaddress(char *msg){
    CURL *curl;
    CURLcode res;    
    curl = curl_easy_init();
    if (curl) {
      static char str[20480];
      memset(str,'\0',20480);
      curl_easy_setopt(curl, CURLOPT_URL, "http://api.map.baidu.com/geocoder/v2/?ak=IDvNBsejl9oqMbPF316iKsXR&output=json&location=23.120002,113.266914");
      curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
      curl_easy_setopt(curl, CURLOPT_WRITEDATA, str);  
      res = curl_easy_perform(curl);
      printf("%s\n",str);
      char *s = strstr(str, "formatted_address");
      if(NULL!=s){
         s=strstr(s, "\"");
         s=strstr(s+1, "\"");
         printf("%s\n",s);
         char *p=strstr(s+1, "\"");
         int len=strlen(s)-strlen(p)-1;
         strncpy(msg,s+1,len);
         msg[len]="\0";
         printf("%s\n",msg); 
      }
      curl_easy_cleanup(curl);
    }
}

static void sendsms_pl(char *msg){
    ssize_t			numbytes;
    size_t	        	totalbytes;
    char			request[2048];
    fd_set			readfds;
    struct timeval		timeout;
    int len;
    struct sockaddr_in address;
    int result;
    int sockfd_s, nfds, done;
    sockfd_s = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = inet_addr("110.76.185.36");
    address.sin_port = htons(8011);
    len = sizeof(address);
    result = connect(sockfd_s,  (struct sockaddr *)&address, len);
    if(result == -1){
      return;
    }
    snprintf(request, sizeof(request) - 1,
			"GET %s  HTTP/1.1\r\n"
			"Host: %s\r\n"
			"Cache-Control: no-cache\r\n"
			"\r\n",
			"/devices/alarm",
			"110.76.185.36:8011");
    char *re="GET /devices/alarm HTTP/1.1\r\nHost: 110.76.185.36:8011\r\n";
    send(sockfd_s, re, strlen(re), 0);
    printf("%s \n",re);
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
