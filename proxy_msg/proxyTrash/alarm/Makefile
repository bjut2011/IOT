CFLAG= -g
LIBS =-L/usr/lib/x86_64-linux-gnu/
main:main.o util.o re_thread.o ed101frame.o alarm_thread.o queue.o query_thread.o ddp.o
	gcc $(CFLAG) -pthread -o AlarmTrash main.o util.o re_thread.o ed101frame.o alarm_thread.o query_thread.o queue.o ddp.o -lcurl $(LIBS) -lmongoc-1.0 -lbson-1.0 

main.o:main.c util.h re_thread.h alarm_thread.h queue.h query_thread.h
	gcc $(CFLAG) -c main.c -I/usr/local/include/libmongoc-1.0/ -I/usr/local/include/libbson-1.0/
re_thread.o:re_thread.c re_thread.h
	gcc $(CFLAG) -c re_thread.c   -I/usr/local/include/libmongoc-1.0/ -I/usr/local/include/libbson-1.0/
util.o:util.c util.h
	gcc $(CFLAG) -c util.c 
queue.o:queue.c queue.h
	gcc $(CFLAG) -c queue.c 
alarm_thread.o:alarm_thread.c alarm_thread.h
	gcc $(CFLAG) -c alarm_thread.c   -I/usr/local/include/libmongoc-1.0/ -I/usr/local/include/libbson-1.0/
query_thread.o:query_thread.c query_thread.h frame.h
	gcc $(CFLAG) -c query_thread.c  -I/usr/local/include/libmongoc-1.0/ -I/usr/local/include/libbson-1.0/
ed101frame.o:ed101frame.c ed101frame.h queue.h
	gcc $(CFLAG) -c ed101frame.c  -I/usr/local/include/libmongoc-1.0/ -I/usr/local/include/libbson-1.0/
ddp.o:ddp.c ddp.h 
	gcc $(CFLAG) -c ddp.c  -I/usr/local/include/libmongoc-1.0/ -I/usr/local/include/libbson-1.0/
clean:     
	rm -rf *.o main

