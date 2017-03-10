var express=require('express');
var serviceFactory=require('./service/ServiceFactory');
var app=express();

app.use(express.static("public"));
app.use(["/index.html/","/"],serviceFactory);
app.listen(8080);

