#ifndef _GPS_H_
#define _GPS_H_
#include <iconv.h>  
#include <stdlib.h>  
#include <stdio.h>  
#include <unistd.h>  
#include <fcntl.h>  
#include <string.h>  
#include <sys/stat.h> 
#include <math.h> 


 void gtransform(double wgLat, double wgLon, double *mgLatLon);
 int outOfChina(double lat, double lon);

 double transformLat(double x, double y);
 double transformLon(double x, double y);

 void bd_encrypt(double gg_lat, double gg_lon, double* bd_latlon);




#endif
