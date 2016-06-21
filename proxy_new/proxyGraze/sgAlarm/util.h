#ifndef _UTIL_H_
#define _UTIL_H_
#define MAX_CONN_LIMIT 512     //MAX connection limit
#define BUFFER_LENGTH 1024
#include <iconv.h>  
#include <stdlib.h>  
#include <stdio.h>  
#include <unistd.h>  
#include <fcntl.h>  
#include <string.h>  
#include <sys/stat.h> 

typedef unsigned char BYTE;
double convertGPS(float lan);
void StrToHex(BYTE *pbDest, BYTE *pbSrc, int nLen);
void HexToStr(BYTE *pbDest, BYTE *pbSrc, int nLen);
int code_convert(char *from_charset, char *to_charset, char *inbuf, size_t inlen,  
        char *outbuf, size_t outlen);
int u2g(char *inbuf, size_t inlen, char *outbuf, size_t outlen);
int g2u(char *inbuf, size_t inlen, char *outbuf, size_t outlen);
int utf82gbk(char *gbkStr, const char *srcStr, int maxGbkStrlen);
int URLEncode(const char* str, const int strSize, char* result, const int resultSize); 
#endif
