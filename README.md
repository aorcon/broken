*.html  保存在p/h/     such as 404.html 
*.css   保存在p/c/     暂时使用静态文件 
*.js    第三方保存在p/j   暂时不考虑移动 
*.js    生成的客户端页面引用文件    from /src/js    to /disc/p/j 

AJAX采用页面fetch、post、application/json，可使用ji.fetch函数 
AJAX返回数据范例: 
```json
    {
        "code": 200,
        "desc": "OK",
        "result": {
        }
    }
```
