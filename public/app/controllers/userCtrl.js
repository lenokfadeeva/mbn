angular.module('userControllers', [])

.controller('regCtrl', function($http, $location, $timeout){
    
    var app=this;
    
    this.regUser=function(regData, valid){
        app.errorMsg=false;
        if(valid){
        $http.post('/api/users', this.regData).then(function(data){
             if(data.data.success){
                 app.successMsg=data.data.message;
                 $timeout(function(){
                     $location.path('/login');
                     
                 }, 2000);
             }else{
                 app.errorMsg=data.data.message;
             }   
        });
        }else{
            app.errorMsg="Please ensure form is field out properly";
        }
    };
});

