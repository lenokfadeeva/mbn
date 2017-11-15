angular.module('userpageController', [])
.controller('userpageCtrl', function(User){
    
    var app=this;
    app.errorMsg=false;
    app.editAccess=false;
    
    function getupUser(){
    
   User.getupUser().then(function(data){
       if(data.data.success){
           app.user=data.data.user;
        }else{
               app.errorMsg=data.data.message;
       }
   }); 
}
    
    getupUser();
    
});