
#ifndef _ED101FRAME_H_
#define _ED101FRAME_H_
#include <mongoc.h>
#include <bson.h>
#include "util.h"
unsigned char VerifyIED101Frame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port); 

void upperquery(unsigned char * info);

void insertSensorRecord( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value,char *name);
#endif
