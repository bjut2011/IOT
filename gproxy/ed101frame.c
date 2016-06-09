#include "ed101frame.h"
#include "queue.h"
extern queue_t g_qalarm;
extern int bupdate;
extern  mongoc_client_t *mgclient;
void commond_parse(unsigned char code,unsigned char * pTemp_Buf,int start,int end);

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
       commond_parse(code,pTemp_Buf,start,end);
       
    } 
    i=0;
    //for(;i<usTemp_Length;i++){
    //   str[i]=(char)(pTemp_Buf[i]);
    //}
    //str[usTemp_Length]='\0';
    //printf("%s\n",str);

    //BYTE *dsrc=(BYTE *)malloc(sizeof(BYTE)*strlen(pTemp_Buf)/2);
    //memset(dsrc,0,sizeof(BYTE)*strlen(pTemp_Buf)/2);
    //StrToHex(dsrc,pTemp_Buf,sizeof(BYTE)*strlen(pTemp_Buf)/2);
    /*BYTE *dsrc=pTemp_Buf;
    printf("%02x\n",dsrc[0]);
    if(dsrc[0]==0x68){
     printf("okok\n");
    }
    if(dsrc[4]==0x87)
    {
     printf("0x87\n");
     upperquery(dsrc);
    }*/
    


    //free(dsrc);
    return 0x01;
}
void commond_parse(unsigned char code,unsigned char * pTemp_Buf,int start,int end){
      if(code=='A'){
        printf("A");
        int i=start;
        for(;i<end;i++)
        {
            printf("%c",pTemp_Buf[i]);
        }
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
        
        int lng;    
        lng = (int) ( ((pTemp_Buf[start+1] & 0xFF)<<24)  
            |((pTemp_Buf[start+2] & 0xFF)<<16)  
            |((pTemp_Buf[start+3] & 0xFF)<<8)  
            |(pTemp_Buf[start+4] & 0xFF)); 
       
        int lat;    
        lat = (int) ( ((pTemp_Buf[start+8] & 0xFF)<<24)  
            |((pTemp_Buf[start+9] & 0xFF)<<16)  
            |((pTemp_Buf[start+10] & 0xFF)<<8)  
            |(pTemp_Buf[start+11] & 0xFF)); 
        printf("%f,%f\n",convertGPS(lng/100000.0),convertGPS(lat/100000.0));
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

void insertSensorRecord( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value,char *name,int sensorType,char * unit,char *tag){
     
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
     printf("okokok");
     bson_t *sdoc = bson_new ();
     bson_oid_init (&se_oid, NULL);
     BSON_APPEND_OID (sdoc, "_id", &se_oid);
     BSON_APPEND_OID (sdoc, "device_id", de_oid);
     BSON_APPEND_UTF8 (sdoc, "name", name);
     BSON_APPEND_INT32 (sdoc, "sensorType", sensorType);
     BSON_APPEND_INT32 (sdoc, "sensorSign", 0);
     BSON_APPEND_UTF8 (sdoc, "sensorUnit", unit);
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
    BSON_APPEND_OID (doc, "_id", &oid);
    BSON_APPEND_OID (doc, "sensor_id", &se_oid);
    BSON_APPEND_INT32 (doc, "value", value);
    BSON_APPEND_UTF8 (doc, "tag", tag);
    time_t timep;
    time(&timep);
    BSON_APPEND_TIME_T (doc, "time", timep);

    if (!mongoc_collection_insert (sensorlogcoll, MONGOC_INSERT_NONE, doc, NULL, &error)) {
        fprintf (stderr, "%s\n", error.message);
    }
    char *pstr=(char*)malloc(sizeof(char)*25);
    memset(pstr,0,sizeof(char)*25);
    bson_oid_to_string (&se_oid, pstr);
    enQueue(&g_qalarm,str);
 
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

void insertYX0Record( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value){
   if(value&1)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"位置2传感器70%",4,"","有效");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"位置2传感器70%",4,"","无效");
   }
   if(value&2)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"位置1传感器90%",4,"","有效");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"位置1传感器90%",4,"","无效");
   }
   if(value&4)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"电机上限位置",4,"","有效");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"电机上限位置",4,"","无效");
   }
   if(value&8)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"电机下限位置",4,"","有效");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"电机下限位置",4,"","无效");
   }
   if(value&16)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"开门传感器",4,"","有效");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"开门传感器",4,"","无效");
   }
   if(value&32)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"语音开门1",4,"","有效");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"语音开门1",4,"","无效");
   }
   if(value&64)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"语音开门2",4,"","有效");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"语音开门2",4,"","无效");
   }
   if(value&128)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"副箱满桶",4,"","有效");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"副箱满桶",4,"","无效");
   }
}


void insertYX1Record( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value){
   if(value&1)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"主副电池充电",2,"","主充");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"主副电池充电",2,"","副充");
   }
   if(value&2)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"电机状态",2,"","启动");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"电机状态",2,"","停止");
   }
   if(value&4)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"",2,"电磁铁状态","启动");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"电磁铁状态",2,"","停止");
   }
   if(value&8)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"语音模块状态",2,"","运行");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"语音模块状态",2,"","停止");
   }
   if(value&16)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"灯箱状态",2,"","亮");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"灯箱状态",2,"","灭");
   }
   if(value&32)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"LED状态",2,"","亮");
   }else{
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,0,"LED状态",2,"","灭");
   }
}


void insertYX2Record( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value){
   if(value&1)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"推门故障",4,"","推门故障");
   }
   if(value&2)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"导光板故障",4,"","导光板故障");
   }
   if(value&4)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"LED故障",4,"","LED故障");
   }
   if(value&8)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"压缩装置故障",4,"","压缩装置故障");
   }
   if(value&16)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"主电池故障",4,"","主电池故障");
   }
   if(value&32)
   {
     insertSensorRecord(sensorcoll,de_oid,sensorlogcoll,1,"副电池故障",2,"","副电池故障");
   }
}

void upperquery(unsigned char * info)
{  
   mongoc_collection_t *collection;
   mongoc_collection_t *sensorcoll;
   mongoc_collection_t *sensorlogcoll;
   collection = mongoc_client_get_collection (mgclient, "smart_trash_development", "devices");
   sensorcoll = mongoc_client_get_collection (mgclient, "smart_trash_development", "sensors");
   sensorlogcoll = mongoc_client_get_collection (mgclient, "smart_trash_development", "sensorlogs");
   mongoc_cursor_t *cursor;
   const bson_t *doc;
   bson_t *query;
   char *str;
   bson_oid_t de_oid;
   query = bson_new ();
   BSON_APPEND_UTF8 (query, "device_sn", "13810139056");

   cursor = mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   
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


   int iMainBatteryVoltage=0;
   iMainBatteryVoltage=(info[8]<<8)|info[7];
   printf("Main battery voltage %d\n",iMainBatteryVoltage);
   insertSensorRecord(sensorcoll,&de_oid,sensorlogcoll,iMainBatteryVoltage,"主蓄电池电压",1,"V","主蓄电池电压");
   
   int iSecondaryBatteryVoltage=0;
   iSecondaryBatteryVoltage=(info[10]<<8)|info[9];
   printf("Secondary battery voltage %d\n",iSecondaryBatteryVoltage);
   insertSensorRecord(sensorcoll,&de_oid,sensorlogcoll,iSecondaryBatteryVoltage,"副蓄电池电压",1,"V","副蓄电池电压");
   
   int iMotorForwardCurrent=0;
   iMotorForwardCurrent=(info[12]<<8)|info[11];
   printf("Motor forward current %d\n",iMotorForwardCurrent);
   insertSensorRecord(sensorcoll,&de_oid,sensorlogcoll,iMotorForwardCurrent,"电机正向电流",1,"A","电机正向电流");
  
   int iReverseCurrentMotor=0;
   iReverseCurrentMotor=(info[14]<<8)|info[13];
   printf("Reverse current of motor %d\n",iReverseCurrentMotor);
   insertSensorRecord(sensorcoll,&de_oid,sensorlogcoll,iReverseCurrentMotor,"电机反向电流",1,"A","电机反向电流");

   

   int iTemperature=0;
   iTemperature=(info[16]<<8)|info[15];
   printf("temperature %d\n",iTemperature);
   insertSensorRecord(sensorcoll,&de_oid,sensorlogcoll,iTemperature,"温度",1,"度","温度");
    
   int iYX0=0;
   iYX0=info[17];
   printf("YX0 %d\n",iYX0);
   insertYX0Record(sensorcoll,&de_oid,sensorlogcoll,iYX0);

   int iYX1=0;
   iYX1=info[18];
   printf("YX1 %d\n",iYX1);
   insertYX1Record(sensorcoll,&de_oid,sensorlogcoll,iYX1);

   
   int iYX2=0;
   iYX2=info[19];
   printf("YX2 %d\n",iYX2);
   insertYX2Record(sensorcoll,&de_oid,sensorlogcoll,iYX2);

   int iGPSValid =0;
   iGPSValid=info[20];
   printf("GPS data valid identification %d\n",iGPSValid);

   int iYear =0;
   iYear=info[21];
   printf("year %d\n",iYear);

   int iMonth =0;
   iMonth=info[22];
   printf("Month %d\n",iMonth);

   int iDay =0;
   iDay=info[23];
   printf("day %d\n",iDay);

   int iHour =0;
   iHour=info[24];
   printf("Hour %d\n",iHour);

   int iMinute =0;
   iMinute=info[25];
   printf("minute %d\n",iMinute);

   int iSecond =0;
   iSecond=info[26];
   printf("second %d\n",iSecond);

   
   int iLongitudeMark =0;
   iLongitudeMark=info[27];
   printf("Longitude mark %d\n",iLongitudeMark);

   float fLongitude =0;
   fLongitude=info[28];
   float fm=info[29]/10.0+info[30]/100.0+info[31]/1000.0+info[32]/10000.0;
   fLongitude +=fm;
   printf("Longitude  %.04f\n",fLongitude);


   int iLatitudeMark =0;
   iLatitudeMark=info[33];
   printf("latitude mark %d\n",iLatitudeMark);

   float fLatitude =0;
   fLatitude=info[34];
   fm=info[35]/10.0+info[36]/100.0+info[37]/1000.0+info[38]/10000.0;
   fLatitude +=fm;
   printf("latitude  %.04f\n",fLatitude);

   //
   bson_t reply;
   bson_error_t error;
   query = bson_new ();
   BSON_APPEND_OID (query, "_id",&de_oid);
   bson_t *update = BCON_NEW ("$set", "{", "lon", BCON_DOUBLE(fLongitude), "lat",BCON_DOUBLE(fLatitude),"MainBatteryVoltage",BCON_DOUBLE(iMainBatteryVoltage),"}");
   if (!mongoc_collection_find_and_modify (collection, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
   }
   bson_destroy (query);
   bson_destroy (update);
   //

   int iCDMASignalStrength=0;
   iCDMASignalStrength=info[39];
   printf("CDMA Signal Strength %d\n",iCDMASignalStrength);

   int iCDMARunningState=0;
   iCDMARunningState=info[40];
   printf("CDMA running state %d\n",iCDMARunningState);

   int iDeviceAddress=0;
   iDeviceAddress=(info[41]<<8)|info[42];
   printf("Device Address %d\n",iDeviceAddress);
    
   int iMotorReturnCurrent=0;
   iMotorReturnCurrent=info[51];
   printf("Motor return current %d\n",iMotorReturnCurrent);

   int iLampStartHour1=0;
   iLampStartHour1=info[52];
   printf("The initial time of lamp lights hour 1 %d\n",iLampStartHour1);

   int iLampStartMinute1=0;
   iLampStartMinute1=info[53];
   printf("The initial time of lamp lights minute 1 %d\n",iLampStartMinute1);

   int iLampStopHour1=0;
   iLampStopHour1=info[54];
   printf("The stop time of lamp lights hour 1 %d\n",iLampStopHour1);

   int iLampStopMinute1=0;
   iLampStopMinute1=info[55];
   printf("The Stop time of lamp lights minute 1 %d\n",iLampStopMinute1);

   int iLampStartHour2=0;
   iLampStartHour2=info[56];
   printf("The initial time of lamp lights hour 2 %d\n",iLampStartHour2);

   int iLampStartMinute2=0;
   iLampStartMinute2=info[57];
   printf("The initial time of lamp lights minute 2 %d\n",iLampStartMinute2);

   int iLampStopHour2=0;
   iLampStopHour2=info[58];
   printf("The stop time of lamp lights hour 2 %d\n",iLampStopHour2);

   int iLampStopMinute2=0;
   iLampStopMinute2=info[59];
   printf("The Stop time of lamp lights minute 2 %d\n",iLampStopMinute2);

   
   int iLEDStartHour1=0;
   iLEDStartHour1=info[60];
   printf("The initial time of LED lights hour 1 %d\n",iLEDStartHour1);

   int iLEDStartMinute1=0;
   iLEDStartMinute1=info[61];
   printf("The initial time of LED lights minute 1 %d\n",iLEDStartMinute1);

   int iLEDStopHour1=0;
   iLEDStopHour1=info[62];
   printf("The stop time of LED lights hour 1 %d\n",iLEDStopHour1);

   int iLEDStopMinute1=0;
   iLEDStopMinute1=info[63];
   printf("The Stop time of LED lights minute 1 %d\n",iLEDStopMinute1);

   int iLEDStartHour2=0;
   iLEDStartHour2=info[64];
   printf("The initial time of LED lights hour 2 %d\n",iLEDStartHour2);

   int iLEDStartMinute2=0;
   iLEDStartMinute2=info[65];
   printf("The initial time of LED lights minute 2 %d\n",iLEDStartMinute2);

   int iLEDStopHour2=0;
   iLEDStopHour2=info[66];
   printf("The stop time of LED lights hour 2 %d\n",iLEDStopHour2);

   int iLEDStopMinute2=0;
   iLEDStopMinute2=info[67];
   printf("The Stop time of LED lights minute 2 %d\n",iLEDStopMinute2);

   
   int iPLCStartHour1=0;
   iPLCStartHour1=info[68];
   printf("The initial time of PLC lights hour 1 %d\n",iPLCStartHour1);

   int iPLCStartMinute1=0;
   iPLCStartMinute1=info[69];
   printf("The initial time of PLC lights minute 1 %d\n",iPLCStartMinute1);

   int iPLCStopHour1=0;
   iPLCStopHour1=info[70];
   printf("The stop time of PLC lights hour 1 %d\n",iPLCStopHour1);

   int iPLCStopMinute1=0;
   iPLCStopMinute1=info[71];
   printf("The Stop time of PLC lights minute 1 %d\n",iPLCStopMinute1);

   int iPLCStartHour2=0;
   iPLCStartHour2=info[72];
   printf("The initial time of PLC lights hour 2 %d\n",iPLCStartHour2);

   int iPLCStartMinute2=0;
   iPLCStartMinute2=info[73];
   printf("The initial time of PLC lights minute 2 %d\n",iPLCStartMinute2);

   int iPLCStopHour2=0;
   iPLCStopHour2=info[74];
   printf("The stop time of PLC lights hour 2 %d\n",iPLCStopHour2);

   int iPLCStopMinute2=0;
   iPLCStopMinute2=info[75];
   printf("The Stop time of PLC lights minute 2 %d\n",iPLCStopMinute2);

   int iMainMinBatteryVoltage=0;
   iMainMinBatteryVoltage=(info[77]<<8)|info[76];
   printf("Minimum voltage of main battery %d\n",iMainMinBatteryVoltage);
   insertSensorRecord(sensorcoll,&de_oid,sensorlogcoll,iMainMinBatteryVoltage,"主电池运行最低电压",1,"V","主电池运行最低电压");
   

   int iAuxiliaryMinBatteryVoltage=0;
   iAuxiliaryMinBatteryVoltage=(info[79]<<8)|info[78];
   printf("Minimum voltage of Auxiliary battery %d\n",iAuxiliaryMinBatteryVoltage);
   insertSensorRecord(sensorcoll,&de_oid,sensorlogcoll,iAuxiliaryMinBatteryVoltage,"副电池运行最低电压",1,"V","副电池运行最低电压");

   BYTE* pmeg = (BYTE*)malloc(sizeof(BYTE) * 42);
   memset(pmeg,0,sizeof(BYTE) * 42);
   int i=0;
   for( i=0;i<40;i++)
   {
      pmeg[i]=info[122+i];
   }
   char buf2[10];  
   g2u(pmeg, strlen(pmeg), buf2, sizeof(buf2)); 
   printf("memg %s\n ",buf2);
   mongoc_collection_destroy (collection);
   mongoc_collection_destroy (sensorcoll);
   mongoc_collection_destroy (sensorlogcoll);

}
