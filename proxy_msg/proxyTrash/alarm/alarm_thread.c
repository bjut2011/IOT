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
static int sendsms_c(char *msg,char* contactId);
static void sendsms_ihuyi(char *msg);
static void sendsms_pl(char *msg);
static void getaddress(char *msg);
static void getaddressbyID(char *msg,mongoc_collection_t *coll,char * deviceId);
static void getPhone(mongoc_collection_t *coll,char * contactId,char *str);

void updateAlarm(mongoc_collection_t *coll,char* se_id,int interval,int ialarm);
static void saveAlarmLog(mongoc_collection_t *coll,char* se_id,int code,char * tel,char * msg,char * userId);

static void do_alarm(mongoc_collection_t *sensorcoll,char * se_id,char * alarmType,char * upperBoundC,char *lowerBoundC, char *duration,char *target,char * contactId,char * addr,mongoc_collection_t * alarmlogcoll,char* userId);
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
                printf("sendsms\n");
		timeout.tv_sec = time(NULL) + 30;
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


static void saveAlarmLog(mongoc_collection_t *coll,char* se_id,int code,char * tel,char * msg,char* userId){
     bson_t *sdoc = bson_new ();
     bson_oid_t a_oid;
     bson_oid_init (&a_oid, NULL);
     BSON_APPEND_OID (sdoc, "_id", &a_oid);
     //BSON_APPEND_OID (sdoc, "device_id", de_oid);
     //BSON_APPEND_UTF8 (sdoc, "name", name);
     //BSON_APPEND_INT32 (sdoc, "sensorType", sensorType);
     BSON_APPEND_INT32 (sdoc, "code", code);
     BSON_APPEND_UTF8 (sdoc, "mobile", tel);
     BSON_APPEND_UTF8 (sdoc, "sendmsg", msg);
     BSON_APPEND_UTF8 (sdoc, "user_id", userId);
     time_t timep;
     time(&timep);
     BSON_APPEND_DOUBLE (sdoc, "time", timep);
     bson_error_t serror;
     if (!mongoc_collection_insert (coll, MONGOC_INSERT_NONE, sdoc, NULL, &serror)) {
        fprintf (stderr, "%s\n", serror.message);
     }
     bson_destroy (sdoc);
}

void updateAlarm(mongoc_collection_t *coll,char* se_id,int interval,int ialarm){
    time_t timep;
    bson_t *query;
    bson_oid_t se_oid;
    bson_oid_init_from_string(&se_oid, se_id);
    time(&timep);
    bson_error_t error;
    bson_t reply;
    query = bson_new ();
    BSON_APPEND_OID (query, "_id",&se_oid);
    bson_t *update = BCON_NEW ("$set", "{", "alarmtime",BCON_DOUBLE(timep),"interval",BCON_INT32(interval),"balarm",BCON_INT32(ialarm),"}");

    if (!mongoc_collection_find_and_modify (coll, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      //fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
    }
    bson_destroy (query);
    bson_destroy (update);
}
static void
alarm_send(void)
{
        mongoc_client_t *curclient = mongoc_client_new ("mongodb://172.16.0.7:27017/");
        mongoc_collection_t *collection;
        mongoc_collection_t *sensorcoll;
        mongoc_collection_t *alarmcoll;
        mongoc_collection_t *contactcoll;
        mongoc_collection_t *alarmlogcoll;
        collection = mongoc_client_get_collection (curclient, "smart_trash_development", "devices");
        sensorcoll = mongoc_client_get_collection (curclient, "smart_trash_development", "sensors");
        alarmcoll = mongoc_client_get_collection (curclient, "smart_trash_development", "alarms");
        alarmlogcoll = mongoc_client_get_collection (curclient, "smart_trash_development", "alarmlogs");
        contactcoll = mongoc_client_get_collection (curclient, "smart_trash_development", "contacts");

   	mongoc_cursor_t *cursor;
   	bson_t *doc;
   	bson_t *query;
   	char *str;
   	query = bson_new ();
   	cursor = mongoc_collection_find (alarmcoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   	bson_oid_t se_oid;
        char se_id[1024];
        memset(se_id,0,1024);
        char de_id[1024];
        memset(de_id,'\0',1024);
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
        char userId[1024];
        memset(userId,0,1024);
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
                 }else if (strcmp(bson_iter_key (&iter),"userId")==0){
                    strcpy(userId,value->value.v_utf8.str);
                 }else if (strcmp(bson_iter_key (&iter),"deviceId")==0){
                    strcpy(de_id,value->value.v_utf8.str);
                 } 
               }
            }
          }
          char mobile[256];
          char addr[1024];
          memset(mobile,'\0',256);
          memset(addr,'\0',1024);
          getPhone(contactcoll,contactId,mobile);
          printf("\ndev_id:%s,lowerBoundC:%s,upperBoundC:%s\n",de_id,lowerBoundC,upperBoundC);
          getaddressbyID(addr,collection,de_id);
          do_alarm(sensorcoll,se_id,alarmType,upperBoundC,lowerBoundC,duration,target,mobile,addr,alarmlogcoll,userId);
   	}
    	bson_destroy (query);
        mongoc_collection_destroy (collection);
        mongoc_collection_destroy (sensorcoll);
        mongoc_collection_destroy (alarmcoll);
        mongoc_collection_destroy (alarmlogcoll);
        mongoc_client_destroy (curclient);
}

void getPhone(mongoc_collection_t *coll,char * contactId,char *mobile){
   mongoc_cursor_t *cursor;
   bson_t *doc;
   bson_t *query;
   char *str;
   query = bson_new ();
   bson_oid_t se_oid;
   bson_oid_init_from_string(&se_oid, contactId);
   BSON_APPEND_OID (query, "_id",&se_oid);
   cursor = mongoc_collection_find (coll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   double ivalue=0;
   int buse=0;
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
               if (value->value_type == BSON_TYPE_UTF8) {
                 if(strcmp(bson_iter_key (&iter),"mobile")==0){
                    //printf("value %d\n", (int)value->value.v_double);        
                    strcpy(mobile,value->value.v_utf8.str); 
                 }
               }
            }
          }
   }
   bson_destroy (query);


   
}


static void do_alarm(mongoc_collection_t *sensorcoll,char * se_id,char * alarmType,char * upperBoundC,char *lowerBoundC, char *duration,char *target,char * contactId,char* addr,mongoc_collection_t *alarmlogcoll,char* userId){
   mongoc_cursor_t *cursor;
   bson_t *doc;
   bson_t *query;
   char *str;
   query = bson_new ();
   bson_oid_t se_oid;
   bson_oid_init_from_string(&se_oid, se_id);
   BSON_APPEND_OID (query, "_id",&se_oid);
   cursor = mongoc_collection_find (sensorcoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   double ivalue=0;
   double dalarmtime=0;
   int interval=0;
   int balarm=0;
   int buse=0;
   char name[1024];
   memset(name,0,1024);
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          printf ("%s\n", str);
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
                    printf("value %d\n", value->value.v_int32);         
                    ivalue=value->value.v_double; 
                    buse =1;
                 }else if(strcmp(bson_iter_key (&iter),"interval")==0){
                    interval=value->value.v_int32; 
                 }else if(strcmp(bson_iter_key (&iter),"balarm")==0){
                    balarm=value->value.v_int32; 
                 }
               }
               if(strcmp(bson_iter_key (&iter),"value")==0){
                      printf("value type %d,%d\n",value->value_type,BSON_TYPE_INT32);
               }
               if (value->value_type == BSON_TYPE_DOUBLE) {
                 if(strcmp(bson_iter_key (&iter),"value")==0){
                    //printf("value %d\n", (int)value->value.v_double);        
                    buse =1;
                    ivalue=value->value.v_double; 
                 }
                 if(strcmp(bson_iter_key (&iter),"alarmtime")==0){
                    dalarmtime=value->value.v_double; 
                 }
               }
               if (value->value_type == BSON_TYPE_UTF8) {
                 if(strcmp(bson_iter_key (&iter),"name")==0){
                    //printf("value %d\n", (int)value->value.v_double);        
                    strcpy(name,value->value.v_utf8.str); 
                 }
                 if(strcmp(bson_iter_key (&iter),"value")==0){
                    //printf("value %d\n", (int)value->value.v_double);        
                    ivalue=atof(value->value.v_utf8.str); 
                    buse =1;
                 }
               }
            }
          }
   }
   bson_destroy (query);
   printf("se_id:%s,buse:%d\n",se_id,buse);
   printf("alarmType:%s,%f : %s,%s",alarmType,ivalue,upperBoundC,lowerBoundC);
   time_t t;  
   t = time(NULL);  
   struct tm *lt;  
   int ii = time(&t); 
   int bdoalarm=1;
   if(balarm==1){
      bdoalarm=1;
      if(dalarmtime>0 &&interval>0){
          if((ii-dalarmtime)<300){
             bdoalarm=0;
          }
        
      }
   }
   if(buse ==1){
     if(strcmp(alarmType,"val_above")==0){
        int iupper=atoi(upperBoundC);
        if(iupper<ivalue){
         printf("val_above %d value\n",iupper,ivalue);
         char msg[2048];
         memset(msg,0,2048);
         snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s数值高于%d，位置是%s，请及时处理！",
			name,
			iupper,
			addr);
         char buf[1024];  
         URLEncodeGBK(msg, strlen(msg), buf,sizeof(buf));  
         printf("%s\n",buf);
         printf("alarm info: %s\n",msg);
         if(bdoalarm>0){
           int code=sendsms_c(buf,contactId);
           saveAlarmLog(alarmlogcoll,"",code,contactId,msg,userId);
           updateAlarm(sensorcoll,se_id,interval+1,1);
           printf("send sms \n");
         }
        }else {
          updateAlarm(sensorcoll,se_id,0,0);
        }
     }else if(strcmp(alarmType,"val_below")==0){
        int iupper=atoi(lowerBoundC);
        if(iupper>ivalue){
         printf("val_below %d  value %d\n",iupper,ivalue);
         char msg[2048];
         memset(msg,0,2048);
         snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s数值低于%d，位置是%s，请及时处理！",
			name,
			iupper,
			addr);
         char buf[1024];  
         URLEncodeGBK(msg, strlen(msg), buf,sizeof(buf));  
         printf("%s\n",buf);
         printf("alarm info: %s\n",msg);
         if(bdoalarm>0){
           int code=sendsms_c(buf,contactId);
           saveAlarmLog(alarmlogcoll,"",code,contactId,msg,userId);
           updateAlarm(sensorcoll,se_id,interval+1,1);
           printf("send sms \n");
         }
        }else {
          updateAlarm(sensorcoll,se_id,0,0);
        }
     }else if(strcmp(alarmType,"switch_on")==0){
        if(ivalue==1){
         char msg[2048];
         memset(msg,0,2048);
         snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s，位置是%s，请及时处理！",
			name,
			addr);
         char buf[1024];  
         URLEncodeGBK(msg, strlen(msg), buf,sizeof(buf));  
         printf("%s\n",buf);
         printf("alarm info: %s\n",msg);
         if(bdoalarm>0){
           int code=sendsms_c(buf,contactId);
           saveAlarmLog(alarmlogcoll,"",code,contactId,msg,userId);
           updateAlarm(sensorcoll,se_id,interval+1,1);
           printf("send sms \n");
         }
        }else {
          updateAlarm(sensorcoll,se_id,0,0);
        }
     }else if(strcmp(alarmType,"offline")==0){
        if(ivalue==1){
         char msg[2048];
         memset(msg,0,2048);
         snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s，位置是%s，请及时处理！",
			name,
			addr);
         char buf[1024];  
         URLEncodeGBK(msg, strlen(msg), buf,sizeof(buf));  
         printf("%s\n",buf);
         printf("alarm info: %s\n",msg);
         if(bdoalarm>0){
           int code=sendsms_c(buf,contactId);
           saveAlarmLog(alarmlogcoll,"",code,contactId,msg,userId);
           updateAlarm(sensorcoll,se_id,interval+1,1);
           printf("send sms \n");
         }
        }else {
          updateAlarm(sensorcoll,se_id,0,0);
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
			"GET %s%susername=%s&password=%s&to=%s&text=%s&msgtype=%s HTTP/1.0\r\n"
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


static void getaddressbyID(char *msg,mongoc_collection_t *coll,char * deviceId){

   mongoc_cursor_t *cursor;
   bson_t *doc;
   bson_t *query;
   char *str;
   query = bson_new ();
   bson_oid_t de_oid;
   bson_oid_init_from_string(&de_oid, deviceId);
   BSON_APPEND_OID (query, "_id",&de_oid);
   cursor = mongoc_collection_find (coll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   double ivalue=0;
   int buse=0;
   double lat;
   double lon;
   //char lat[256];
   //char lon[256];
   //memset(lat,'\0',256);
   //memset(lon,'\0',256);
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
               if (value->value_type == BSON_TYPE_DOUBLE) {
                 if(strcmp(bson_iter_key (&iter),"lat")==0){
                    (lat=value->value.v_double); 
                 }
                 if(strcmp(bson_iter_key (&iter),"lon")==0){
                    (lon=value->value.v_double); 
                 }
               }
            }
          }
   }
   bson_destroy (query);


   




    CURL *curl;
    CURLcode res;    
    curl = curl_easy_init();
    if (curl) {
      static char str[20480];
      memset(str,'\0',20480);
      char url[1028];
      memset(url,'\0',1028);
      sprintf(url,"http://api.map.baidu.com/geocoder/v2/?ak=IDvNBsejl9oqMbPF316iKsXR&output=json&location=%.8f,%.8f",lat,lon);
      printf("%s\n",url);
      curl_easy_setopt(curl, CURLOPT_URL, url);
      curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
      curl_easy_setopt(curl, CURLOPT_WRITEDATA, str);  
      res = curl_easy_perform(curl);
      printf("%s\n",str);
      char *s = strstr(str, "formatted_address");
      if(NULL!=s){
         s=strstr(s, "\"");
         s=strstr(s+1, "\"");
         printf("\n%s\n",s);
         char *p=strstr(s+1, "\"");
         int len=strlen(s)-strlen(p)-1;
         strncpy(msg,s+1,len);
         msg[len]='\0';
         printf("msg:%s\n",msg); 
         printf("\n\n"); 
      }
      curl_easy_cleanup(curl);
    }
}


 static int sendsms_c(char *msg,char *contactId){
    CURL *curl;
    CURLcode res;
    curl = curl_easy_init();
    if (curl) {
      static char str[20480];
      memset(str,'\0',20480);
      char* url[2056];
      memset(url,'\0',2056);
      sprintf(url,"http://211.147.239.62:9050/cgi-bin/sendsms?username=bjyjy@gzzrkj&password=Yws5C0hc&to=%s&text=%s",contactId,msg);
      printf("url:%s\n",url);
      curl_easy_setopt(curl, CURLOPT_URL, url);
      curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
      curl_easy_setopt(curl, CURLOPT_WRITEDATA, str);
      res = curl_easy_perform(curl);
      printf("sendsms respose:%s\n",str);
      curl_easy_cleanup(curl);
      if(strlen(str)>0){
         return atoi(str);
      }

      
    }
    return -1;
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
