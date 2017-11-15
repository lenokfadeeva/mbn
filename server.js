    var express  = require('express');
    var app      = express();
    var port =process.env.PORT||8080;
    var mongoose = require('mongoose');                   
    var bodyParser = require('body-parser');
    var router=express.Router();
    var appRoutes =require('./app/routes/api')(router);
    var path=require('path');

  
    mongoose.connect('mongodb://lena:lena@ds227035.mlab.com:27035/user');     

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({'extended':'true'}));   
    app.use(express.static(__dirname+'/public'));
    app.use('/api', appRoutes);


  
    app.get('*', function(req,res){
            res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
    });
     
    app.listen(port,function(){
        console.log("App listening on port" + port);
    });