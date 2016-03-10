var express = require('express');

var path = require('path');

function route(app){

    //static
    app.use(express.static('public'));

    //html
    app.get('/*',function(req,res){

        console.log("GET app.html");

        res.sendFile(path.join(__dirname+'/public/view/app.html'))
    });
}

module.exports = route;