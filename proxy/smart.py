#coding=utf-8
import time
import threading
import socket
import struct
import binascii

def tcplink(sock,addr):
    print("accept new connection from %s:%s..." % addr)
    data=sock.recv(1024)
    s=binascii.hexlify(data)
    print(s)
    a=0x01
    buffer = struct.pack('B',a)
    sock.send(buffer)
    sock.close()
    print("Connection from %s:%s closed." % addr)
    
    
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)  # ´´½¨һ¸öÚpv4 µÄCPЭÒµÄocket

s.bind(('0.0.0.0',8881))  #¼à¶˿Ú
s.listen(5)
print("Waiting for connection......")

while True:
    sock,addr=s.accept()
    t=threading.Thread(target=tcplink,args=(sock, addr))
    t.start()
