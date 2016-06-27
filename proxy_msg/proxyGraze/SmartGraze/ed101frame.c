#include "ed101frame.h"
#include "queue.h"
#include "gps.h"
extern queue_t g_qalarm;
extern int bupdate;
extern  mongoc_client_t *mgclient;
void commond_parse(unsigned char code,unsigned char * pTemp_Buf,int start,int end,char * pout);

int setcmd(unsigned char * pTemp_Buf){
   
   pTemp_Buf[0]=0x68;
   pTemp_Buf[3]=0x68;
   pTemp_Buf[4]=0x09;

   pTemp_Buf[5]=0x10;
   pTemp_Buf[6]=0x00;
   //参数数据标识
   pTemp_Buf[7]=0x01;
   //装置地址
   pTemp_Buf[8]=0x01;
   pTemp_Buf[9]=0x00;

   //YC矫正系数
   
   pTemp_Buf[10]=0x10;
   pTemp_Buf[11]=0x27;
   pTemp_Buf[12]=0x10;
   pTemp_Buf[13]=0x27;

  //电机返回电流
   pTemp_Buf[14]=0x10;

   //灯箱开灯起始时间1
   
   pTemp_Buf[15]=0x27;
   pTemp_Buf[16]=0x09;
   
   
   return 0;
}
unsigned char VerifyIED101Frame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port){
    int i=0;
    for(;i<usTemp_Length;i++){
       printf("%02x",pTemp_Buf[i]);
    }

    printf("\n");
    char *str=(char *)malloc(sizeof(char)*(usTemp_Length+1));
    i=10;
    char *pid=(char *)malloc(sizeof(char)*(20));
    memset(pid,'\0',20);
    char *platlon=(char *)malloc(sizeof(char)*(128));
    memset(platlon,'\0',128);
    for(;i<usTemp_Length;i++){
       unsigned char code=pTemp_Buf[i];
       if(code=='*'){
          break;
       }
       int start=i+1;
       int end=start;
       for(;i<usTemp_Length;i++){
          if(pTemp_Buf[i]==';')
          {
            break;
          }
       }
       end=i;
       printf("code %c\n",code);
       char *pout;
       if(code=='A' || code == 'a'){
         pout=pid;
       }else if (code =='F' || code=='F'){
         pout=platlon;
       }      
       commond_parse(code,pTemp_Buf,start,end,pout);
       
    } 
    printf("import db:%s,%s\n",pid,platlon);
    if (strlen(platlon)){
      upperquery(pid,platlon);
    }
    free(str);
    free(pid);
    free(platlon);
    i=0;
    


    //free(dsrc);
    return 0x01;
}
void commond_parse(unsigned char code,unsigned char * pTemp_Buf,int start,int end, char * pout){
      if(code=='A'){
        printf("A");
        int i=start+1;
        int j=0;
        for(;i<end;i++)
        {
            printf("%c",pTemp_Buf[i]);
            pout[j++]=pTemp_Buf[i];
        }
        pout[j]='\0';
        printf("\n");
      }

      
      if(code=='B'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%02x",pTemp_Buf[i]);
        }
        
        printf("\n");
        printf("%c%d\n",pTemp_Buf[start],pTemp_Buf[start+1]);
      }

      if(code=='C'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%c",pTemp_Buf[i]);
        }
        printf("\n");
      }

      if(code=='D'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%c",pTemp_Buf[i]);
        }
        printf("\n");
      }


      if(code=='E'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%02x",pTemp_Buf[i]);
        }
        int iyear=pTemp_Buf[start+1];
        int imonth=pTemp_Buf[start+2];
        int iday=pTemp_Buf[start+3];
        int ihour=pTemp_Buf[start+4];
        int imin=pTemp_Buf[start+5];
        int isec=pTemp_Buf[start+6];
        bupdate=imin;
        printf("\n");
        printf("%d,%d,%d,%d,%d,%d\n",iyear,imonth,iday,ihour,imin,isec);
      }

      if(code=='F'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%02x",pTemp_Buf[i]);
        }
        printf("\n");
        
        int lat;    
        lat = (int) ( ((pTemp_Buf[start+1] & 0xFF)<<24)  
            |((pTemp_Buf[start+2] & 0xFF)<<16)  
            |((pTemp_Buf[start+3] & 0xFF)<<8)  
            |(pTemp_Buf[start+4] & 0xFF)); 
       
        int lon;    
        lon = (int) ( ((pTemp_Buf[start+8] & 0xFF)<<24)  
            |((pTemp_Buf[start+9] & 0xFF)<<16)  
            |((pTemp_Buf[start+10] & 0xFF)<<8)  
            |(pTemp_Buf[start+11] & 0xFF)); 
        printf("%f,%f\n",convertGPS(lat/100000.0),convertGPS(lon/100000.0));
        double glon=convertGPS(lon/100000.0);
        double glat=convertGPS(lat/100000.0);
        double glatlon[2];
        glatlon[0]=lat;
        glatlon[1]=lon;
        gtransform(glat,glon,glatlon);
        double blatlon[2];
        bd_encrypt(glatlon[0],glatlon[1],blatlon);
        printf("%f,%f\n",blatlon[0],blatlon[1]);
        sprintf(pout,"%f,%f",blatlon[0],blatlon[1]);
               
      }

      if(code=='G'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%02x",pTemp_Buf[i]);
        }
        printf("\n");
        
        printf("%c",pTemp_Buf[start]);
        printf("%02x",pTemp_Buf[start+1]);
        printf("%02x",pTemp_Buf[start+2]);
        printf("%c",pTemp_Buf[start+3]);
        printf("%02x",pTemp_Buf[start+4]);
        int j=start+5;
        for(;j<end;){
             printf("%c",pTemp_Buf[j++]);
             if(pTemp_Buf[j]==','){
               printf("%c",pTemp_Buf[j++]);
               continue;
             }
             if(i>end){
               break;
             }
             printf("%02x",pTemp_Buf[j++]);
             printf("%02x",pTemp_Buf[j++]);
             printf("%c",pTemp_Buf[j++]);
             printf("%02x",pTemp_Buf[j++]);
             printf("%02x",pTemp_Buf[j++]);
             printf("%c",pTemp_Buf[j++]);
             printf("%02x",pTemp_Buf[j++]);
        }
        printf("\n");
           
        
      }

      if(code=='H'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%02x",pTemp_Buf[i]);
        }
        printf("\n");
      }

      if(code=='I'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%02x",pTemp_Buf[i]);
        }
        printf("\n");
      }

      if(code=='J'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%02x",pTemp_Buf[i]);
        }
        printf("\n");
      }

      if(code=='K'){
        printf("%c",code);
        int i=start;
        for(;i<end;i++)
        {
            printf("%02x",pTemp_Buf[i]);
        }
        printf("\n");
      }


}

void insertSensorRecord( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value,char *name,int sensorType,char * lat,char* lng,char *tag){
     
   mongoc_cursor_t *cursor;
   bson_t *doc;
   bson_t *query;
   char *str;
   query = bson_new ();
   BSON_APPEND_UTF8 (query, "name", name);
   BSON_APPEND_OID (query, "device_id",de_oid);
   printf("%s\n",name);
   char stroid[25];
   bson_oid_to_string (de_oid, stroid);
   printf("%s\n",stroid);
   cursor = mongoc_collection_find (sensorcoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   bson_oid_t se_oid;
   bool bsensor=false;
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          bsensor=true;
          printf ("%s\n", str);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               printf ("Found a field named: %s\n", bson_iter_key (&iter));
               
               bson_value_t *value;

               value = bson_iter_value (&iter);
             
               if (value->value_type == BSON_TYPE_OID) {
                 if(strcmp(bson_iter_key (&iter),"_id")==0){
                    bson_oid_copy(&value->value.v_oid,&se_oid);
                    printf("se_oid\n");         
                 }
                 char str[25];
                 bson_oid_to_string (&value->value.v_oid, str);
                 printf ("%s\n", str);
               }
            }
          }
   }
   if(!bsensor){
     bson_t *sdoc = bson_new ();
     bson_oid_init (&se_oid, NULL);
     BSON_APPEND_OID (sdoc, "_id", &se_oid);
     BSON_APPEND_OID (sdoc, "device_id", de_oid);
     BSON_APPEND_UTF8 (sdoc, "name", name);
     BSON_APPEND_INT32 (sdoc, "sensorType", sensorType);
     BSON_APPEND_INT32 (sdoc, "sensorSign", 0);
     BSON_APPEND_UTF8 (sdoc, "lat", lat);
     BSON_APPEND_UTF8 (sdoc, "lng", lng);
     time_t timep;
     time(&timep);
     BSON_APPEND_TIME_T (sdoc, "time", timep);
     bson_error_t serror;
     if (!mongoc_collection_insert (sensorcoll, MONGOC_INSERT_NONE, sdoc, NULL, &serror)) {
        fprintf (stderr, "%s\n", serror.message);
     }
     bson_destroy (sdoc);
   }
    bson_destroy (query);
    bson_error_t error;
    bson_oid_t oid;
    doc = bson_new ();
    bson_oid_init (&oid, NULL);
    char locoid[128];
    memset(locoid,'\0',128);
    bson_oid_to_string (&oid, locoid);
    BSON_APPEND_OID (doc, "_id", &oid);
    BSON_APPEND_OID (doc, "sensor_id", &se_oid);
    BSON_APPEND_OID (doc, "device_id", &de_oid);
    BSON_APPEND_INT32 (doc, "value", value);
    BSON_APPEND_UTF8 (doc, "tag", tag);
    BSON_APPEND_UTF8 (doc, "lat", lat);
    BSON_APPEND_UTF8 (doc, "lng", lng);
    BSON_APPEND_UTF8 (doc, "locationID", locoid);
    BSON_APPEND_UTF8 (doc, "baiduLat", lat);
    BSON_APPEND_UTF8 (doc, "baiduLng", lng);
    char sdatetime[128];
    memset(sdatetime,'\0',128);
    time_t timep;  
    struct tm *p;   
     
    time(&timep);   
    p = localtime(&timep);  
    sprintf(sdatetime,"%4d-%02d-%02d %02d:%02d:%02d", (1900+p->tm_year), (1+p->tm_mon), p->tm_mday, p->tm_hour, p->tm_min, p->tm_sec);  
    BSON_APPEND_UTF8 (doc, "deviceUtcDate", sdatetime);
    BSON_APPEND_UTF8 (doc, "speed", "2");
    BSON_APPEND_UTF8 (doc, "course", "2");
    BSON_APPEND_UTF8 (doc, "dataType", "2");
    BSON_APPEND_UTF8 (doc, "ct", "2");
    BSON_APPEND_UTF8 (doc, "distance", "200");
    BSON_APPEND_TIME_T (doc, "time", timep);
    BSON_APPEND_DOUBLE (doc, "createtime", timep);

    if (!mongoc_collection_insert (sensorlogcoll, MONGOC_INSERT_NONE, doc, NULL, &error)) {
        fprintf (stderr, "%s\n", error.message);
    }
    char *pstr=(char*)malloc(sizeof(char)*25);
    memset(pstr,0,sizeof(char)*25);
    bson_oid_to_string (&se_oid, pstr);
    //enQueue(&g_qalarm,str);
 
    bson_destroy (doc);
   //
    time(&timep);
    bson_t *updatedoc = bson_new();

    bson_t child;
    //BSON_APPEND_INT32(updatedoc, "value", (value));
    //BSON_APPEND_TIME_T (updatedoc, "time", timep);
    bson_append_document_begin(updatedoc, "value", value, &child);
    BSON_APPEND_TIME_T (&child, "update_time", timep);
    bson_append_document_end(updatedoc, &child);
    bson_t reply;
    query = bson_new ();
    BSON_APPEND_OID (query, "_id",&se_oid);
    bson_t *update = BCON_NEW ("$set", "{", "value", BCON_DOUBLE(value),"updatetime",BCON_DOUBLE(timep), "}");
    if (!mongoc_collection_find_and_modify (sensorcoll, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
    }
    bson_destroy (updatedoc);
    bson_destroy (query);
    bson_destroy (update);
   //
}


void upperquery(char * pid,char* platlon)
{  
   mongoc_collection_t *collection;
   mongoc_collection_t *sensorcoll;
   mongoc_collection_t *sensorlogcoll;
   collection = mongoc_client_get_collection (mgclient, "smart_graze_development", "devices");
   sensorcoll = mongoc_client_get_collection (mgclient, "smart_graze_development", "sensors");
   sensorlogcoll = mongoc_client_get_collection (mgclient, "smart_graze_development", "sensorlogs");
   mongoc_cursor_t *cursor;
   const bson_t *doc;
   bson_t *query;
   char *str;
   bson_oid_t de_oid;
   query = bson_new ();
   BSON_APPEND_UTF8 (query, "sn", pid);

   cursor = mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   int bfind=0;  
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          printf ("%s\n", str);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               printf ("Found a field named: %s\n", bson_iter_key (&iter));
               
               bson_value_t *value;

               value = bson_iter_value (&iter);
             
               if (value->value_type == BSON_TYPE_OID) {
                 if(strcmp(bson_iter_key (&iter),"_id")==0){
                    bson_oid_copy(&value->value.v_oid,&de_oid);
                    char str1[25];
                    bson_oid_to_string (&value->value.v_oid, str1);
                    printf("de_oid %s\n",str1);
                    bfind=1;         
                 }
                 char str[25];
                 bson_oid_to_string (&value->value.v_oid, str);
                 printf ("%s\n", str);
               }
            }
          }
   }

   bson_destroy (query);
   mongoc_cursor_destroy (cursor);
   if(bfind){

  
     //
     char *slat=strtok(platlon,",");
     char *slon=strtok(NULL,",");
     char sdatetime[128];
     memset(sdatetime,'\0',128);
     time_t timep;  
     struct tm *p;   
      
     time(&timep);   
     p = localtime(&timep);  
     sprintf(sdatetime,"%4d-%02d-%02d %02d:%02d:%02d", (1900+p->tm_year), (1+p->tm_mon), p->tm_mday, p->tm_hour, p->tm_min, p->tm_sec);  
     bson_t reply;
     bson_error_t error;
     query = bson_new ();
     BSON_APPEND_OID (query, "_id",&de_oid);
     bson_t *update = BCON_NEW ("$set", "{", "baiduLat", BCON_UTF8(slat), "baiduLng",BCON_UTF8(slon),"serverUtcDate",BCON_UTF8(sdatetime),"}");
     if (!mongoc_collection_find_and_modify (collection, query, NULL, update, NULL, false, false, true, &reply, &error)) {
       fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
     }
     bson_destroy (query);
     bson_destroy (update);
     
     insertSensorRecord(sensorcoll,&de_oid,sensorlogcoll,0,"gps",1,slat,slon,"坐标");
   }
   //

   mongoc_collection_destroy (collection);
   mongoc_collection_destroy (sensorcoll);
   mongoc_collection_destroy (sensorlogcoll);

}
