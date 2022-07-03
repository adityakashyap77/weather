const express = require('express');
const https = require('https');
const bodyparser = require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended : true}));
app.listen(3000,function(){
    console.log("STARTED!");
});

app.get("/",function(request,response){
    response.sendFile(__dirname +"/index.html"); 
})
app.post("/",function(request,response){
    var location = request.body.cityname
    const apikey= "1d935b144662435db07623d730d2f1b2";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+apikey+"&units=metric";
    https.get(url,function(res){
        res.on("data",function(data){
            var weatherinfo=JSON.parse(data);
            var weather=weatherinfo.weather[0].main;
            var temperature = weatherinfo.main.temp;
            var place =weatherinfo.name;
            var i=weatherinfo.weather[0].icon;
            var imgURL = "http://openweathermap.org/img/wn/"+i+"@2x.png";
            response.write("<h1>Weather Status in "+place+" : "+ weather +"</h1>");
            response.write("Temperature = "+ temperature + " C<br><br>");
            response.write("<img src="+imgURL+">");
            response.send();
        });
    });
});