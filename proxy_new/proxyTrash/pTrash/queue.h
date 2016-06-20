#ifndef _QUEUE_H_
#define _QUEUE_H_
#include <stdio.h>
#include <stdlib.h>

typedef char* elemType;
/**************************/
/*           */
/**************************/
typedef struct nodet 
{
	elemType data;
	struct nodet * next;
} node_t;            // 节点的结构

typedef struct queuet
{
	node_t * head;
	node_t * tail;
} queue_t;          // 队列的结构

void initQueue(queue_t * queue_eg);
void enQueue(queue_t *hq, elemType x);
elemType outQueue(queue_t * hq);
elemType peekQueue(queue_t * hq);
int is_emptyQueue(queue_t * hq);
void clearQueue(queue_t * hq);

#endif
