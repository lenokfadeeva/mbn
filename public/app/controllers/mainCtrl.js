angular.module('mainController', ['authServices', 'userServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, User){
    
    
     var app=this;
    
    app.loadme=false;
    
    $rootScope.$on('$routeChangeStart', function(){
        if(Auth.isLoggedIn()){
        app.isLoggedIn=true;
        Auth.getUser().then(function(data){
            app.username=data.data.username;
            app.useremail=data.data.email;
            
                    
            User.getStatus().then(function(data){
                if(data.data.status==='nanny'){
                    app.authorized=true;
                    app.loadme=true;
                }else{
                    app.loadme=true;
                }
            });
            
        });
        }else{
            app.isLoggedIn=false;
            app.username='';
            app.loadme=true;
        }
    
    });
    
    
    this.doLogin=function(logData){
       
        app.errorMsg=false;
        
        Auth.login(app.logData).then(function(data){
             if(data.data.success){
            
                 app.successMsg=data.data.message;
                 $timeout(function(){
                     $location.path('/shownanny');
                     app.logData='';
                     app.successMsg=false;
                 }, 2000);
             }else{
                 app.errorMsg=data.data.message;
             }   
        }); 
    };
    
    this.logout=function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
        }, 2000);
    };
});
