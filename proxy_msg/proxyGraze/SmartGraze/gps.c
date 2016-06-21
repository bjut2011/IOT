#include "gps.h"

double pi = 3.14159265358979324;
double a = 6378245.0;
double ee = 0.00669342162296594323;
double x_pi = 3.14159265358979324 * 3000.0 / 180.0;
 void gtransform(double wgLat, double wgLon, double *mgLatLon){

            if (outOfChina(wgLat, wgLon))  //不再中国坐标范围
            {
                mgLatLon[0] = wgLat;
                mgLatLon[1] = wgLon;
                return;
            }
            double dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
            double dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
            double radLat = wgLat / 180.0 * pi;
            double magic = sin(radLat);
            magic = 1 - ee * magic * magic;
            double sqrtMagic = sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
            dLon = (dLon * 180.0) / (a / sqrtMagic * cos(radLat) * pi);
            mgLatLon[0] = wgLat + dLat;
            mgLatLon[1] = wgLon + dLon;
}


 int outOfChina(double lat, double lon)
{
            if (lon < 72.004 || lon > 137.8347)
                return 1;
            if (lat < 0.8293 || lat > 55.8271)
                return 1;
            return 0;
}


 double transformLat(double x, double y)
        {
            double ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * sqrt(abs(x));
            ret += (20.0 * sin(6.0 * x * pi) + 20.0 * sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * sin(y * pi) + 40.0 * sin(y / 3.0 * pi)) * 2.0 / 3.0;
            ret += (160.0 * sin(y / 12.0 * pi) + 320 * sin(y * pi / 30.0)) * 2.0 / 3.0;
            return ret;
        }


 double transformLon(double x, double y)
        {
            double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * sqrt(abs(x));
            ret += (20.0 * sin(6.0 * x * pi) + 20.0 * sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * sin(x * pi) + 40.0 * sin(x / 3.0 * pi)) * 2.0 / 3.0;
            ret += (150.0 * sin(x / 12.0 * pi) + 300.0 * sin(x / 30.0 * pi)) * 2.0 / 3.0;
            return ret;
        }





  void bd_encrypt(double gg_lat, double gg_lon,double* bd_latlon)  
        {  
            double x = gg_lon, y = gg_lat;  
            double z = sqrt(x * x + y * y) + 0.00002 *sin(y * x_pi);  
            double theta = atan2(y, x) + 0.000003 * cos(x * x_pi);  
            bd_latlon[1] = z * cos(theta) + 0.0065;  
            bd_latlon[0] = z *  sin(theta) + 0.006;  
        }  
