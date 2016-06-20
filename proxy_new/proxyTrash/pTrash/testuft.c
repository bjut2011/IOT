#include<stdio.h>
#include<string.h>
int main(){
    char a[5];
    strcpy(a,"啊");
    printf("%XH %XH\n",(unsigned char)a[0],(unsigned char)a[1]);
    return 0;
}
