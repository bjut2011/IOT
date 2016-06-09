#include "util.h"
#include <locale.h>  

double convertGPS(float lan){
  double Latitude;
  Latitude=(double)(lan)/100;
  Latitude=(Latitude-(int)(Latitude))/0.6+(int)(Latitude);
  return Latitude;
}
void StrToHex(BYTE *pbDest, BYTE *pbSrc, int nLen)
{
char h1,h2;
BYTE s1,s2;
int i;

for (i=0; i<nLen; i++)
{
h1 = pbSrc[2*i];
h2 = pbSrc[2*i+1];

s1 = toupper(h1) - 0x30;
if (s1 > 9) 
s1 -= 7;

s2 = toupper(h2) - 0x30;
if (s2 > 9) 
s2 -= 7;

pbDest[i] = s1*16 + s2;
}
}


void HexToStr(BYTE *pbDest, BYTE *pbSrc, int nLen)
{
char	ddl,ddh;
int i;

for (i=0; i<nLen; i++)
{
ddh = 48 + pbSrc[i] / 16;
ddl = 48 + pbSrc[i] % 16;
if (ddh > 57) ddh = ddh + 7;
if (ddl > 57) ddl = ddl + 7;
pbDest[i*2] = ddh;
pbDest[i*2+1] = ddl;
}

pbDest[nLen*2] = '\0';
}


int code_convert(char *from_charset, char *to_charset, char *inbuf, size_t inlen,
		char *outbuf, size_t outlen) {
	iconv_t cd;
	char **pin = &inbuf;
	char **pout = &outbuf;

	cd = iconv_open(to_charset, from_charset);
	if (cd == 0)
		return -1;
	memset(outbuf, 0, outlen);
	if (iconv(cd, pin, &inlen, pout, &outlen) == -1)
		return -1;
	iconv_close(cd);
	*pout = '\0';

	return 0;
}

int u2g(char *inbuf, size_t inlen, char *outbuf, size_t outlen) {
	return code_convert("utf-8", "gb2312", inbuf, inlen, outbuf, outlen);
}

int g2u(char *inbuf, size_t inlen, char *outbuf, size_t outlen) {
	return code_convert("gb2312", "utf-8", inbuf, inlen, outbuf, outlen);
}

int utf82gbk(char *gbkStr, const char *srcStr, int maxGbkStrlen) {  
    if (NULL == srcStr) {  
        printf("Bad Parameter\n");  
        return -1;  
    }  
  
    //首先先将utf8编码转换为unicode编码  
    if (NULL == setlocale(LC_ALL, "zh_CN.utf8")) //设置转换为unicode前的码,当前为utf8编码  
            {  
        printf("Bad Parameter\n");  
        return -1;  
    }  
  
    int unicodeLen = mbstowcs(NULL, srcStr, 0); //计算转换后的长度  
    if (unicodeLen <= 0) {  
        printf("Can not Transfer!!!\n");  
        return -1;  
    }  
    wchar_t *unicodeStr = (wchar_t *) calloc(sizeof(wchar_t), unicodeLen + 1);  
    mbstowcs(unicodeStr, srcStr, strlen(srcStr)); //将utf8转换为unicode  
  
    //将unicode编码转换为gbk编码  
    if (NULL == setlocale(LC_ALL, "zh_CN.gbk")) //设置unicode转换后的码,当前为gbk  
            {  
        printf("Bad Parameter\n");  
        return -1;  
    }  
    int gbkLen = wcstombs(NULL, unicodeStr, 0); //计算转换后的长度  
    if (gbkLen <= 0) {  
        printf("Can not Transfer!!!\n");  
        return -1;  
    } else if (gbkLen >= maxGbkStrlen) //判断空间是否足够  
            {  
        printf("Dst Str memory not enough\n");  
        return -1;  
    }  
    wcstombs(gbkStr, unicodeStr, gbkLen);  
    gbkStr[gbkLen] = 0; //添加结束符  
    free(unicodeStr);  
    return gbkLen;  
}

int URLEncode(const char* str, const int strSize, char* result, const int resultSize)  
{  
    int i;  
    int j = 0;//for result index  
    char ch;  
  
    if ((str==NULL) || (result==NULL) || (strSize<=0) || (resultSize<=0)) {  
        return 0;  
    }  
  
    for ( i=0; (i<strSize)&&(j<resultSize); ++i) {  
        ch = str[i];  
        if (((ch>='A') && (ch<'Z')) ||  
            ((ch>='a') && (ch<'z')) ||  
            ((ch>='0') && (ch<'9'))) {  
            result[j++] = ch;  
        } else if (ch == ' ') {  
            result[j++] = '+';  
        } else if (ch == '.' || ch == '-' || ch == '_' || ch == '*') {  
            result[j++] = ch;  
        } else {  
            if (j+3 < resultSize) {  
                sprintf(result+j, "%%%02X", (unsigned char)ch);  
                j += 3;  
            } else {  
                return 0;  
            }  
        }  
    }  
  
    result[j] = '\0';  
    return j;  
}

int URLEncodeGBK(const char* str, const int strSize, char* result, const int resultSize){
    char buf[2048];
    int len=utf82gbk(buf,str,2048);
    return URLEncode(buf, len, result, resultSize);  
}
