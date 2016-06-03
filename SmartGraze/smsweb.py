#-*- coding:utf-8 -*-
#!/usr/bin/env python
import web
import requests
import sys
import urllib2, urllib
from sys import argv
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding("utf-8")

urls = (
        '/index/(.*)', 'index',
        '/sms', 'index',
        '/smsinfo', 'smsinfo',
        '/mosinfo', 'mosinfo',
        '/smstshopper', 'sms2shop'
)

class smsinfo:
        def POST(self):
            getInput = web.input(info="",telphone="13810139056")
            info=getInput.info
            telphone=getInput.telphone
            data = {'account' : 'cf_zst','password':'cdc123456','mobile':telphone,'content':info}
            f = urllib2.urlopen(
                     url     = 'http://106.ihuyi.cn/webservice/sms.php?method=Submit',
                     data    = urllib.urlencode(data)
                 )
            print f.read()
            return "code:0"

class mosinfo:
        def POST(self):
            getInput = web.input(info="",telphone="13810139056")
            info=getInput.info
            telphone=getInput.telphone
            data = {'username' : 'gzzrkj@gzzrkj','password':'v,}3L,99','to':telphone,'text':info}
            #data ='username=gzzrkj@gzzrkj&password=v,}3L,99&to='+telphone+'&text='+info.encode('gb2312')
            print info
            print data
            #result = requests.get('http://211.147.239.62:9050/cgi-bin/sendsms', params = data)
            urlmos='http://211.147.239.62:9050/cgi-bin/sendsms?username=gzzrkj@gzzrkj&password=v,}3L,99&to='+telphone+'&text='+info.encode('gb2312')
            print urlmos
            result=urllib2.urlopen(urlmos)
            print result
            return "code:0"

               
class sms2shop:
        def POST(self):
            getInput = web.input(name="先生/女士",clerk="home87",telphone="13810139056")
            name=(getInput.name)
            clerk=getInput.clerk
            telphone=getInput.telphone
            str='会员：{name}，您好！感谢您在home87，有需要店员{clerk}为您服务'.format(name=name,clerk=clerk)
            data = {'account' : 'cf_zst','password':'cdc123456','mobile':telphone,'content':str}
            f = urllib2.urlopen(
                     url     = 'http://106.ihuyi.cn/webservice/sms.php?method=Submit',
                     data    = urllib.urlencode(data)
                 )
            print f.read()
            return "code:0"

class index:
        def POST(self):
            getInput = web.input(name="先生/女士",commodity="沙发",telphone="13810139056")
            name=(getInput.name)
            commodity=getInput.commodity
            telphone=getInput.telphone
            str='店员：会员{name}已经入店，请接待，{commodity}，优质服务！'.format(name=name,commodity=commodity) 
            data = {'account' : 'cf_zst','password':'cdc123456','mobile':telphone,'content':str}
            f = urllib2.urlopen(
                     url     = 'http://106.ihuyi.cn/webservice/sms.php?method=Submit',
                     data    = urllib.urlencode(data)
                 )
            print f.read()
            return "code:0"
	def GET(self,name):
		url = name
		url1 = 'http://stu.baidu.com/n/pc_search?rn=10&appid=0&tag=1&isMobile=0&queryImageUrl=http://'+url+'&querySign=&fromProduct=&productBackUrl=&fm=&uptype=plug_in'
		result = ""
		headers = { "Accept":"text/html,application/xhtml+xml,application/xml;",
            "Accept-Encoding":"gzip",
            "Accept-Language":"zh-CN,zh;q=0.8",
            "Referer":"http://www.example.com/",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36"
            	}
		res2 = requests.get(url1, headers=headers)
		html_doc = res2.text
		soup = BeautifulSoup(html_doc, 'html.parser')
		for each_div in soup.find_all('a', class_="guess-info-word-link"):
			result += each_div.get_text()
			result += " "
		return  result.decode('UTF-8').encode('GBK');
	


if __name__ == "__main__":
	print sys.getdefaultencoding()
	app = web.application(urls, locals())
	app.run()



