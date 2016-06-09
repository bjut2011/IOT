
#ifndef _DDP_H_
#define _DDP_H_
#include <mongoc.h>
#include <bson.h>
#include "util.h"
unsigned char VerifyDDPFrame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port); 

//void upperquery(unsigned char * info);

//void insertSensorRecord( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value,char *name,int sensorType,char * unit,char *tag);
//void insertYX0Record( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value);
//void insertYX1Record( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value);
//void insertYX2Record( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value);
#endif
