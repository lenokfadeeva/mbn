var User = require('../modules/user');
var jwt =require('jsonwebtoken');
var secret = 'mjaw';

module.exports=function(router){  

    router.post('/users', function(req, res) {
    
        var user=new User();
    
        user.email= req.body.email;
        user.username= req.body.username;
        user.name= req.body.name;
        user.password= req.body.password;
        user.city=req.body.city;
        user.status=req.body.status;
        
        
    
        if(req.body.email==null||req.body.email==''||req.body.username==null||req.body.username=='' ||req.body.name==null||req.body.name==''||req.body.password==null||req.body.password==''||req.body.city==null||req.body.city==''||req.body.status==null||req.body.status==''){
            res.json({success: false, message: "Ensure email, username, name and passport and city were provided"});
        }else{
            user.save(function(err){
                if(err){
                    if(err.errors!=null){
                        if(err.errors.name){
                            res.json({success: false, message: err.errors.name.message});
                        }else if(err.errors.email){
                            res.json({success: false, message: err.errors.email.message});
                        }else if(err.errors.username){
                            res.json({success: false, message: err.errors.username.message});
                        }else if(err.errors.password){
                            res.json({success: false, message: err.errors.password.message});
                        }else if(err.errors.city){
                            res.json({success: false, message: err.errors.city.message});
                        }else if(err.errors.status){
                            res.json({success: false, message: err.errors.status.message});
                        }else{
                            res.json({success: false, message: err});
                        }
                    }else if(err){
                        if(err.code==11000){
                            res.json({success: false, message: 'Username or e-mail already taken'});
                        }else{
                            res.json({success: false, message: err}); 
                        }
                    }
                }else{
                    res.json({success: true, message: "User created!"});
                }
            });
        }

    });
    
    //User login route
    
    router.post('/authenticate',function(req,res){
       User.findOne({username: req.body.username}).select("email username name password city status").exec(function(err,user){
           if(err) throw err;
           
           if(!user){
               res.json({success: false, message: "Could not authenticate user"});
           }else if(user){
               if(req.body.password){
                   var validPassword=user.comparePassword(req.body.password);
               }else{
                   res.json({success: false, message: "No password provided"});
               }
               if(!validPassword){
                   res.json({success: false, message: "Could not authenticate password"});
               }else{
                   var token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '24h'});
                   res.json({success: true, message: "User authenticated", token: token});
               }
           }
       }); 
    });
    router.use(function(req,res,next){
       var token = req.body.token ||req.body.query || req.headers['x-access-token'];
        if(token){
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                     res.json({success: false, message: 'Token invalid'});
                }else{
                    req.decoded=decoded;
                    next();
                }
            });
        }else{
            res.json({success: false, message: 'No token provided'});
        }
    });
    
    router.post('/me', function(req,res){
        res.send(req.decoded);
    });
    
    
    router.get('/status', function(req,res){
        User.find({}, function(err, users){
          if (err) throw err;
           User.findOne({username: req.decoded.username}, function(err, mainUser){
                if(err) throw err;
                if(!mainUser){
                    res.json({success: false, message: 'No user found'});
            }else{
                    res.json({success: true, users:users, status: mainUser.status}); 
              }
          });
      });
  });
    
   
    router.get('/shownanny', function(req,res){
        User.find({status:'nanny'}, function(err, users){
            if (err) throw err;
            User.findOne({username: req.decoded.username}, function(err, mainUser){
                if(err) throw err;
                if(!mainUser){
                    res.json({success: false, message: 'No user found'});
                }else{
                    res.json({success: true, users:users}); 
                }
            });
        });
    });
    
    router.get('/userpage', function(req,res){
         User.find({username: req.decoded.username}, function(err, user){
            if (err) throw err;
            User.findOne({username: req.decoded.username}, function(err, mainUser){
                if(err) throw err;
                if(!mainUser){
                    res.json({success: false, message: 'No user found'});
                }else{
                    res.json({success: true, user:user}); 
                }
            });
        });
    });
    
    router.get('/edit/:id', function(req,res){
        var editUser=req.params.id;
        User.findOne({username: req.decoded.username}, function(err, mainUser){
            if(err) throw err;
            if(!mainUser){
                res.json({success: false, message: 'No user found'});
            }else{
                User.findOne({_id: editUser}, function(err, user){
                    if (err) throw err;
                    if(!user){
                        res.json({success: false, message: 'No user found'});
                    }else{
                        res.json({success:true, user:user});
                    }
                });
            }
        });
    });
    
    router.put('/edit', function(req,res){
        var editUser = req.body._id;
        if (req.body.name) var newName=req.body.name;
        if (req.body.username) var newUsername=req.body.username;
        if (req.body.email) var newEmail=req.body.email;
        if (req.body.phone) var newPhone=req.body.phone;
        if (req.body.age) var newAge=req.body.age;
        if (req.body.experience) var newExperience=req.body.experience;
        User.findOne({username: req.decoded.username}, function(err, mainUser){
            if (err) throw err;
            if(!mainUser){
                res.json({success: false, message: 'No user found'});
            }else{
                if(newName){
                 User.findOneAndUpdate({_id: editUser},
                                       {$set: {'name':newName}},
                                       {upsert: true},
                                       function(err){
                            if(err){
                                res.json({success: false, message:'Error'});
                            }else{
                                res.json({success: true, message:'Name has been updated'});
                            }
                 });
                }
                if(newUsername){
                 User.findOneAndUpdate({_id: editUser},
                                       {$set: {'username':newUsername}},
                                       {upsert: true},
                                       function(err){
                            if(err){
                                res.json({success: false, message:'Error'});
                            }else{
                                res.json({success: true, message:'Username has been updated'});
                            }
                 });
                }
                if(newEmail){
                 User.findOneAndUpdate({_id: editUser},
                                       {$set: {'email':newEmail}},
                                       {upsert: true},
                                       function(err){
                            if(err){
                                res.json({success: false, message:'Error'});
                            }else{
                                res.json({success: true, message:'E-mail has been updated'});
                            }
                 });
                }
                if(newPhone){
                 User.findOneAndUpdate({_id: editUser},
                                       {$set: {'phone':newPhone}},
                                       {upsert: true},
                                       function(err){
                            if(err){
                                res.json({success: false, message:'Error'});
                            }else{
                                res.json({success: true, message:'Phone has been updated'});
                            }
                 });
                }
                if(newAge){
                 User.findOneAndUpdate({_id: editUser},
                                       {$set: {'age':newAge}},
                                       {upsert: true},
                                       function(err){
                            if(err){
                                res.json({success: false, message:'Error'});
                            }else{
                                res.json({success: true, message:'Age has been updated'});
                            }
                 });
                }
                if(newExperience){
                 User.findOneAndUpdate({_id: editUser},
                                       {$set: {'experience':newExperience}},
                                       {upsert: true},
                                       function(err){
                            if(err){
                                res.json({success: false, message:'Error'});
                            }else{
                                res.json({success: true, message:'Experience has been updated'});
                            }
                 });
                }
            }
         });   
    });
    
    return router;
}