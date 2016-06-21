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
#include "gps.h"
#include <time.h>  
static void alarm_send(void);
static void connect_init(void);
static void sendsms(char *msg);
static int sendsms_c(char *msg,char* contactId);
static void sendsms_ihuyi(char *msg);
static void sendsms_pl(char *msg);
static void getaddress(char *msg);
static void getaddressbyID(char *msg,mongoc_collection_t *coll,char * deviceId);
static void getPhone(mongoc_collection_t *coll,char * contactId,char *str);

static void do_geofence(mongoc_collection_t *geocoll,bson_oid_t g_oid,mongoc_collection_t *fence2devicecoll,mongoc_collection_t *devicecoll,mongoc_collection_t *logcoll);

void updateAlarm(mongoc_collection_t *coll,bson_oid_t se_oid,int type);
static void saveAlarmLog(mongoc_collection_t *coll,char* se_id,int code,char * tel,char * msg,char * userId);
static void do_alarm(mongoc_collection_t *devicecoll,bson_oid_t de_oid,mongoc_collection_t *alarmlogcoll,POINT * pts,int NN);
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

void updateAlarm(mongoc_collection_t *coll,bson_oid_t se_oid,int type){
    time_t timep;
    bson_t *query;
    time(&timep);
    bson_error_t error;
    bson_t reply;
    query = bson_new ();
    BSON_APPEND_OID (query, "_id",&se_oid);
    bson_t *update = BCON_NEW ("$set", "{", "alarmtime",BCON_DOUBLE(timep), "type",BCON_INT32(type),"}");

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
        mongoc_collection_t *geofencecoll;
        mongoc_collection_t *contactcoll;
        mongoc_collection_t *geopolycoll;
        mongoc_collection_t *logcoll;
        mongoc_collection_t *fence2devicecoll;
        collection = mongoc_client_get_collection (curclient, "smart_graze_development", "devices");
        sensorcoll = mongoc_client_get_collection (curclient, "smart_graze_development", "sensors");
        geofencecoll = mongoc_client_get_collection (curclient, "smart_graze_development", "geofences");
        geopolycoll = mongoc_client_get_collection (curclient, "smart_graze_development", "polygodetails");
        contactcoll = mongoc_client_get_collection (curclient, "smart_graze_development", "contacts");
        fence2devicecoll = mongoc_client_get_collection (curclient, "smart_graze_development", "fence_todevices");
        logcoll = mongoc_client_get_collection (curclient, "smart_graze_development", "alarmlogs");

   	mongoc_cursor_t *cursor;
   	bson_t *doc;
   	bson_t *query;
   	char *str;
   	query = bson_new ();
   	cursor = mongoc_collection_find (geofencecoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
        char se_id[1024];
        memset(se_id,0,1024);
        char de_id[1024];
        memset(de_id,'\0',1024);
        char userId[1024];
        memset(userId,0,1024);
   	while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
   	  bson_oid_t se_oid;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               
               bson_value_t *value;

               value = bson_iter_value (&iter);
             
               if (value->value_type == BSON_TYPE_OID) {
                 if(strcmp(bson_iter_key (&iter),"_id")==0){
                    bson_oid_copy(&value->value.v_oid,&se_oid);
                 }
               }
            }
          }
          do_geofence(geopolycoll,se_oid,fence2devicecoll,collection,logcoll);
          char mobile[256];
          char addr[1024];
          memset(mobile,'\0',256);
          memset(addr,'\0',1024);
          //getPhone(contactcoll,contactId,mobile);
          //printf("\ndev_id:%s,lowerBoundC:%s,upperBoundC:%s\n",de_id,lowerBoundC,upperBoundC);
          //getaddressbyID(addr,collection,de_id);
          //do_alarm(devicecoll,se_id,alarmlogcoll);
   	}
    	bson_destroy (query);
        mongoc_collection_destroy (collection);
        mongoc_collection_destroy (sensorcoll);
        mongoc_collection_destroy (geofencecoll);
        mongoc_collection_destroy (geopolycoll);
        mongoc_collection_destroy (contactcoll);
        mongoc_collection_destroy (fence2devicecoll);
        mongoc_client_destroy (curclient);
}

static void do_geofence(mongoc_collection_t *geocoll,bson_oid_t g_oid,mongoc_collection_t *fence2devicecoll,mongoc_collection_t *devicecoll,mongoc_collection_t *logcoll){
   mongoc_cursor_t *cursor;
   bson_t *doc;
   bson_t *query;
   char *str;
   query = bson_new ();
   BSON_APPEND_OID (query, "geofence_id",&g_oid);
   cursor = mongoc_collection_find (geocoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   double ivalue=0;
   int buse=0;
   char name[1024];
   memset(name,0,1024);
   POINT *poly = (POINT *) malloc( (1024*1024+1) * sizeof(POINT));
   int NN=0;
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          double lat=0.0;
          double lng=0.0;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               
               bson_value_t *value;
               value = bson_iter_value (&iter);
               if (value->value_type == BSON_TYPE_UTF8) {
                 if(strcmp(bson_iter_key (&iter),"lat")==0){
                    lat=atof(value->value.v_utf8.str);
                 }
                 if(strcmp(bson_iter_key (&iter),"lng")==0){
                    lng=atof(value->value.v_utf8.str);
                 }
               }
            }
          }
          poly[NN].lat=lat;
          poly[NN].lng=lng;
          NN++;
          printf("lat:%f,lng:%f\n",lat,lng);
   }

   bson_destroy (query);
   
   char stroid[25];
   bson_oid_to_string (&g_oid, stroid);
   printf("fence_id:%s\n",stroid);
   query = bson_new ();
   BSON_APPEND_OID (query, "fence_id",&g_oid);
   cursor = mongoc_collection_find (fence2devicecoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          bson_oid_t de_oid;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               
               bson_value_t *value;
               value = bson_iter_value (&iter);
               if (value->value_type == BSON_TYPE_OID) {
                 if(strcmp(bson_iter_key (&iter),"device_id")==0){
                    bson_oid_copy(&value->value.v_oid,&de_oid);
                 }
               }
            }
          }
          do_alarm(devicecoll,de_oid,logcoll,poly,NN);
   }

   

   bson_destroy (query);
   free(poly);


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


static void do_alarm(mongoc_collection_t *devicecoll,bson_oid_t de_oid,mongoc_collection_t *alarmlogcoll,POINT * pts,int NN){
   mongoc_cursor_t *cursor;
   bson_t *doc;
   bson_t *query;
   char *str;
   query = bson_new ();
   BSON_APPEND_OID (query, "_id",&de_oid);
   cursor = mongoc_collection_find (devicecoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   double ivalue=0;
   int buse=0;
   char name[1024];
   memset(name,'\0',1024);
   char mobile[1024];
   memset(mobile,'\0',1024);
   double lat=0.0;
   double lng=0.0;
   int type=-1;
   double gtime=-1;
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
               if (value->value_type == BSON_TYPE_INT32) {
                 if(strcmp(bson_iter_key (&iter),"type")==0){
                    //printf("value %d\n", (int)value->value.v_double);        
                    //buse =1;
                    type=value->value.v_int32; 
                 }
               }
               if (value->value_type == BSON_TYPE_DOUBLE) {
                 if(strcmp(bson_iter_key (&iter),"alarmtime")==0){
                    gtime=value->value.v_double; 
                 }
               }
               if (value->value_type == BSON_TYPE_UTF8) {
                 if(strcmp(bson_iter_key (&iter),"baiduLat")==0){
                    //strcpy(name,value->value.v_utf8.str); 
                    lat=atof(value->value.v_utf8.str);
                    buse =1;
                 }
                 if(strcmp(bson_iter_key (&iter),"baiduLng")==0){
                    lng=atof(value->value.v_utf8.str); 
                    buse =1;
                 }
                 if(strcmp(bson_iter_key (&iter),"name")==0){
                    strcpy(name,value->value.v_utf8.str); 
                    buse =1;
                 }
                 if(strcmp(bson_iter_key (&iter),"mobile")==0){
                    strcpy(mobile,value->value.v_utf8.str); 
                    buse =1;
                 }
               }
            }
          }
   }
   bson_destroy (query);
   if(buse ==1){
         printf("lat:%f,lng:%f\n",lat,lng);
         POINT pt;
         pt.lat=lat;
         pt.lng=lng;
         if(is_inside(pts,NN,pt)==0){
           char msg[2048];
           memset(msg,0,2048);
           snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s出栅栏，位置是%s，请及时处理！",
			name,
			"");
           char buf[1024];  
           URLEncodeGBK(msg, strlen(msg), buf,sizeof(buf));  
           printf("%s\n",buf);
           printf("alarm info: %s\n",msg);
           int bsend=1;
           if(type==1){
              if(gtime>0){
                 time_t timep;
                 time(&timep);
                 int ii = time(&timep);
                 if((ii-gtime)<60*1){
                    bsend=0;
                 }               
              }
           }
            
           if(bsend){
             int code=sendsms_c(buf,mobile);
             updateAlarm(devicecoll,de_oid,1);
           }
           //saveAlarmLog(alarmlogcoll,"",code,contactId,msg,userId);
        }else{
           char msg[2048];
           memset(msg,0,2048);
           snprintf(msg, sizeof(msg) - 1,
			"故障报警：%s进栅栏，位置是%s，请及时处理！",
			name,
			"");
           char buf[1024];  
           URLEncodeGBK(msg, strlen(msg), buf,sizeof(buf));  
           printf("%s\n",buf);
           printf("alarm info: %s\n",msg);
           if (type!=2){
              int code=sendsms_c(buf,mobile);
              updateAlarm(devicecoll,de_oid,2);
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
