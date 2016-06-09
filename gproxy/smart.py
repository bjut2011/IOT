#coding=utf-8
import time
import threading
import socket


def tcplink(sock,addr):
    print("accept new connection from %s:%s..." % addr)
    sock.send("Welcom!".encode())
    while True:
        data=sock.recv(1024)
        time.sleep(1)
        if data=='exit' or not data:
            break
        sock.send("hello: ".encode()+data)
    sock.close()
    print("Connection from %s:%s closed." % addr)
    
    
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)  # ´´½¨һ¸öÚpv4 µÄCPЭÒµÄocket

s.bind(('0.0.0.0',24912))  #¼à¶˿Ú
s.listen(5)
print("Waiting for connection......")

while True:
    sock,addr=s.accept()
    t=threading.Thread(target=tcplink,args=(sock, addr))
    t.start()
