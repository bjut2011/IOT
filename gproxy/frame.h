#ifndef _FRAME_H_
#define _FRAME_H_
#include "util.h"
typedef struct _t_frame_q {
    BYTE type;
    BYTE tel[11];
    BYTE start;
    BYTE length;
    BYTE length_c;
    BYTE start_c;
    BYTE command;
    BYTE addr[2];
    BYTE cs;
    BYTE end;
    
    
}t_frame_q;
#endif
