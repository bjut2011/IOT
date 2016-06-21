#include "ddp.h"
extern  mongoc_client_t *mgclient;
unsigned char VerifyDDPFrame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port){
    int i=0;
    for(;i<usTemp_Length;i++){
       printf("%02x",pTemp_Buf[i]);
    }
    printf("\n");
    //BYTE *dsrc=(BYTE *)malloc(sizeof(BYTE)*strlen(pTemp_Buf)/2);
    //memset(dsrc,0,sizeof(BYTE)*strlen(pTemp_Buf)/2);
    //StrToHex(dsrc,pTemp_Buf,sizeof(BYTE)*strlen(pTemp_Buf)/2);
    BYTE *dsrc=pTemp_Buf;
    printf("%02x\n",dsrc[0]);
    if(dsrc[0]==0x7B){
     printf("DDP Pack\n");
    }
    if(dsrc[2]==0x81)
    {
     printf("0x87\n");
     //upperquery(dsrc);
    }
    


    //free(dsrc);
    return 0x01;
}

