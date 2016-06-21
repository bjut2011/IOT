#include "ddp.h"
#include "ed101frame.h"
extern  mongoc_client_t *mgclient;
int VerifyDDPFrame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port ,unsigned char *  send_Buf){
    int i=0;
    int len=0;
    for(;i<usTemp_Length;i++){
       printf("%02x",pTemp_Buf[i]);
    }
    printf("\n");
    //BYTE *dsrc=(BYTE *)malloc(sizeof(BYTE)*strlen(pTemp_Buf)/2);
    //memset(dsrc,0,sizeof(BYTE)*strlen(pTemp_Buf)/2);
    //StrToHex(dsrc,pTemp_Buf,sizeof(BYTE)*strlen(pTemp_Buf)/2);
    BYTE *dsrc=pTemp_Buf;
    printf("%02x\n",dsrc[0]);
    if(0==1&&dsrc[1]==0x01){
     
     send_Buf[0]=0x7B;
     send_Buf[1]=0x81;
     send_Buf[2]=0x00;
     send_Buf[3]=0x10;
     int k=4;
     for(;k<15;k++);
     { 
         send_Buf[k]=dsrc[k];
         printf("%02x",dsrc[k]);
     } 
      send_Buf[15]=0x7B;
     len=16;
    
     printf("DDP register Pack\n");
      
    }else if(dsrc[1]!=0x09){
     printf("DDP Pack\n");
     send_Buf[0]=0x7B;
     send_Buf[1]=0x89;
     send_Buf[2]=0x00;
     send_Buf[3]=0x19;
     i=4;
     for(;i<15;i++);
     { 
         send_Buf[i]=pTemp_Buf[i];
     } 
      send_Buf[15]=0x68;
      send_Buf[16]=0x03;
      send_Buf[17]=0x03;
      send_Buf[18]=0x68;
      send_Buf[19]=0x07;
      send_Buf[20]=0x01;
      send_Buf[21]=0x00;
      send_Buf[22]=0x08;
      send_Buf[23]=0x16;
      send_Buf[24]=0x7B;
      len=25;
    }
    if(dsrc[1]==0x09)
    {
      printf("0x09\n");
      char phone[15];
      sprintf(phone,"%c%c%c%c%c%c%c%c%C%C%C",dsrc[4],dsrc[5],dsrc[6],dsrc[7],dsrc[8],dsrc[9],dsrc[10],dsrc[11],dsrc[12],dsrc[13],dsrc[14]);
      printf("%s\n",phone);
      BYTE eframe[2048];
      memset(eframe,0,2048);
      int i=0;
      int el=(dsrc[2]<<8)|dsrc[3]-16;
      memcpy(eframe,dsrc+sizeof(BYTE)*15,el);
      for(;i<el;i++){
         printf("%02x",eframe[i]);
      }
      printf("\n");
      VerifyIED101Frame(eframe,el,0);
     //upperquery(dsrc);
      
      BYTE cmd[1024];
      memset(cmd,0,1024);
      cmd[0]=0x68;
      cmd[1]=128;
      cmd[2]=128;
      cmd[3]=0x68;
      cmd[4]=0x09;
      cmd[5]=0x01;
      cmd[6]=0x00;
      
      //参数数据标识
      cmd[7]=0x01;
      cmd[8]=eframe[41];
      cmd[9]=eframe[42];
      //YC矫正系数
      cmd[10]=eframe[43];
      cmd[11]=eframe[44];
      cmd[12]=eframe[45];
      cmd[13]=eframe[46];
      cmd[14]=eframe[47];
      cmd[15]=eframe[48];
      cmd[16]=eframe[49];
      cmd[17]=eframe[50];
      //电机返回电流
      cmd[18]=eframe[51];

      //时间
      cmd[19]=eframe[52];
      cmd[20]=eframe[53];
      cmd[21]=eframe[54];
      cmd[22]=eframe[55];
      cmd[23]=eframe[56];
      cmd[24]=eframe[57];
      cmd[25]=eframe[58];
      cmd[26]=eframe[59];
      cmd[27]=eframe[60];
      cmd[28]=eframe[61];
      cmd[29]=eframe[62];
      cmd[30]=eframe[63];
      cmd[31]=eframe[64];
      cmd[32]=eframe[65];
      cmd[33]=eframe[66];
      cmd[34]=eframe[67];
      cmd[35]=eframe[68];
      cmd[36]=eframe[69];
      cmd[37]=eframe[70];
      cmd[38]=eframe[71];
      cmd[39]=eframe[72];
      cmd[40]=eframe[73];
      cmd[41]=eframe[74];
      cmd[42]=eframe[75];
      //主电池运行最低电压
      cmd[43]=0x00;
      cmd[44]=0x00;
      cmd[45]=0x00;
      cmd[46]=0x00;
      //LED数据标志
      cmd[47]=0x01;
      int m=0;
      for(;m<60;m++){
        cmd[48+m]=eframe[103+m];
      }
      BYTE c_a=cmd[48];
      BYTE c_b=cmd[48+1];
      cmd[48]=cmd[48+2];
      cmd[48+1]=cmd[48+3];
      cmd[48+2]=c_a;
      cmd[48+3]=c_b;
      
      //LED移动速度和亮度
      
      cmd[108]=eframe[163];
      //GPRS数据标识
      cmd[109]=0x01;
      //DTU号码
      m=0;
      for(;m<11;m++){
        cmd[110+m]=eframe[80+m];
      }
      //在线报告时间
      cmd[121]=eframe[91];
      cmd[122]=eframe[92];
      //重连时间间隔
      cmd[123]=eframe[93];
      cmd[124]=eframe[94];
      //DSC的IP地址
      cmd[125]=eframe[95];
      cmd[126]=eframe[96];
      cmd[127]=eframe[97];
      cmd[128]=eframe[98];

      cmd[129]=eframe[99];
      cmd[130]=eframe[100];

      cmd[131]=eframe[101];

      cmd[132]=eframe[102];


      int cs=cmd[4];
      m=5;
      for(;m<133;m++){
          cs+=cmd[m];
      }
      cs =cs&0xFF;
      cmd[133]=cs;
      //结束符
      cmd[134]=0x16;
      m=0;
      for(;m<135;m++){
        send_Buf[15+m]=cmd[m];
      }
      send_Buf[15+135]=0x7B;
      len=15+135+1;
      send_Buf[0]=0x7B;
      send_Buf[1]=0x89;
      send_Buf[2]=0x00;
      send_Buf[3]=len;





      printf("start\n");
      int cn=0;
      m=0;
      for(;m<eframe[1];m++){
         cn+=eframe[4+m];
         printf(",%02x",eframe[4+m]);
      }
      
      m=1;
      int ics=eframe[4];
      for(;m<eframe[1]-3;m++){
         ics^=eframe[4+3+m];
      }
      printf("cs123 %02x , %02x ,%02x\n",cn&0xFF,cn/256,eframe[eframe[1]+4]);
      
      m=0;
      for(;m<el;m++){
         cn+=eframe[m];
         printf("%02x",eframe[m]);
      }
      printf("\n");
    }
    


    //free(dsrc);
    return len;
}

