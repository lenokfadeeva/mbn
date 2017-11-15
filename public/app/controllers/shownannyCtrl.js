angular.module('shownannyController', [])
.controller('shownannyCtrl', function(User){
    
    var app=this;
    app.errorMsg=false;
    app.editAccess=false;
    
    function getUsers(){
    
   User.getUsers().then(function(data){
       if(data.data.success){
               app.users=data.data.users;
           }else{
               app.errorMsg=data.data.message;
       }
   }); 
}
    
    getUsers();
    
});

