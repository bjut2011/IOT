main:main.o util.o re_thread.o ed101frame.o alarm_thread.o queue.o
	gcc -pthread -o main main.o util.o re_thread.o ed101frame.o alarm_thread.o queue.o -lmongoc-1.0 -lbson-1.0

main.o:main.c util.h re_thread.h alarm_thread.h queue.h
	gcc -c main.c -I/usr/local/include/libmongoc-1.0/ -I/usr/local/include/libbson-1.0/
re_thread.o:re_thread.c re_thread.h
	gcc -c re_thread.c 
util.o:util.c util.h
	gcc -c util.c 
queue.o:queue.c queue.h
	gcc -c queue.c 
alarm_thread.o:alarm_thread.c alarm_thread.h
	gcc -c alarm_thread.c 
ed101frame.o:ed101frame.c ed101frame.h queue.h
	gcc -c ed101frame.c  -I/usr/local/include/libmongoc-1.0/ -I/usr/local/include/libbson-1.0/
clean:     
	rm -rf *.o main

