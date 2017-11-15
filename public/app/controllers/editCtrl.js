angular.module('editController', [])

.controller('editCtrl', function($scope, $routeParams, User, $timeout){
    var app=this;
    

    $scope.nameTab='active';
    app.phase1=true;
    
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
    
    
    User.getUser($routeParams.id).then(function(data){
            if(data.data.success){
                $scope.newName=data.data.user.name;
                $scope.newUsername=data.data.user.username;
                $scope.newEmail=data.data.user.email;
                $scope.newPhone=data.data.user.phone;
                $scope.newAge=data.data.user.age;
                $scope.newExperience=data.data.user.experience
                app.currentUser=data.data.user._id;
            }else{
                app.errorMsg=data.data.message;
            }
        });
    
    app.namePhase=function(){
        $scope.nameTab='active';
        $scope.usernameTab='default';
        $scope.emailTab='default';
        $scope.phoneTab='default';
        $scope.ageTab='default';
        $scope.experienceTab='default';
        app.phase1=true;
        app.phase2=false;
        app.phase3=false;  
        app.phase4=false;  
        app.phase5=false;  
        app.phase6=false;    
    };
    
    app.usernamePhase=function(){
        $scope.nameTab='default';
        $scope.usernameTab='active';
        $scope.emailTab='default';
        $scope.phoneTab='default';
        $scope.ageTab='default';
        $scope.experienceTab='default';
        app.phase1=false;
        app.phase2=true;
        app.phase3=false;
        app.phase4=false;
        app.phase5=false;  
        app.phase6=false;
    };
    app.emailPhase=function(){
        $scope.nameTab='default';
        $scope.usernameTab='default';
        $scope.emailTab='active';
        $scope.phoneTab='default';
        $scope.ageTab='default';
        $scope.experienceTab='default';
        app.phase1=false;
        app.phase2=false;
        app.phase3=true;
        app.phase4=false;
        app.phase5=false;  
        app.phase6=false;
    };
    app.phonePhase=function(){
        $scope.nameTab='default';
        $scope.usernameTab='default';
        $scope.emailTab='default';
        $scope.phoneTab='active';
        $scope.ageTab='default';
        $scope.experienceTab='default';
        $scope.photoTab='default';
        app.phase1=false;
        app.phase2=false;
        app.phase3=false;
        app.phase4=true;
        app.phase5=false;  
        app.phase6=false;
    };
    app.agePhase=function(){
        $scope.nameTab='default';
        $scope.usernameTab='default';
        $scope.emailTab='default';
        $scope.phoneTab='default';
        $scope.ageTab='active';
        $scope.experienceTab='default';       
        app.phase1=false;
        app.phase2=false;
        app.phase3=false;
        app.phase4=false;
        app.phase5=true;  
        app.phase6=false;
    };
    app.experiencePhase=function(){
        $scope.nameTab='default';
        $scope.usernameTab='default';
        $scope.emailTab='default';
        $scope.phoneTab='default';
        $scope.ageTab='default';
        $scope.experienceTab='active';
        app.phase1=false;
        app.phase2=false;
        app.phase3=false;
        app.phase4=false;
        app.phase5=false;  
        app.phase6=true;
     };
            
    app.updateName=function(newName, valid){
        app.errorMsg=false;
        app.disabled=true;
            
        if(valid){
            var userObject={};   
            userObject._id=app.currentUser;
            userObject.name=$scope.newName;
            User.editUser(userObject).then(function(data){
                if(data.data.success){
                    app.successMsg=data.data.message;
                    $timeout(function(){
                        app.nameForm.name.$setPristine();
                        app.nameForm.name.$setUntouched();
                        app.successMsg=false;
                        app.disabled=false;
                    }, 2000);
                }else{
                    app.errorMsg=data.data.message;
                    app.disabled=false;
                }
            });
        }else{
            app.errorMsg='Please ensure form is filled out properly';
            app.disabled=false;
        }
    };
    
    app.updateUsername=function(newUsername, valid){
        app.errorMsg=false;
        app.disabled=true;
            
        if(valid){
            var userObject={};   
            userObject._id=app.currentUser;
            userObject.username=$scope.newUsername;
            User.editUser(userObject).then(function(data){
                if(data.data.success){
                    app.successMsg=data.data.message;
                    $timeout(function(){
                        app.usernameForm.username.$setPristine();
                        app.usernameForm.username.$setUntouched();
                        app.successMsg=false;
                        app.disabled=false;
                    }, 2000);
                }else{
                    app.errorMsg=data.data.message;
                    app.disabled=false;
                }
            });
        }else{
            app.errorMsg='Please ensure form is filled out properly';
            app.disabled=false;
        }
    };
    
    app.updateEmail=function(newEmail, valid){
        app.errorMsg=false;
        app.disabled=true;
            
        if(valid){
            var userObject={};   
            userObject._id=app.currentUser;
            userObject.email=$scope.newEmail;
            User.editUser(userObject).then(function(data){
                if(data.data.success){
                    app.successMsg=data.data.message;
                    $timeout(function(){
                        app.emailForm.email.$setPristine();
                        app.emailForm.email.$setUntouched();
                        app.successMsg=false;
                        app.disabled=false;
                    }, 2000);
                }else{
                    app.errorMsg=data.data.message;
                    app.disabled=false;
                }
            });
        }else{
            app.errorMsg='Please ensure form is filled out properly';
            app.disabled=false;
        }
    };
    
        app.updatePhone=function(newPhone, valid){
        app.errorMsg=false;
        app.disabled=true;
            
        if(valid){
            var userObject={};   
            userObject._id=app.currentUser;
            userObject.phone=$scope.newPhone;
            User.editUser(userObject).then(function(data){
                if(data.data.success){
                    app.successMsg=data.data.message;
                    $timeout(function(){
                        app.phoneForm.phone.$setPristine();
                        app.phoneForm.phone.$setUntouched();
                        app.successMsg=false;
                        app.disabled=false;
                    }, 2000);
                }else{
                    app.errorMsg=data.data.message;
                    app.disabled=false;
                }
            });
        }else{
            app.errorMsg='Please ensure form is filled out properly';
            app.disabled=false;
        }
    };
    
    app.updateAge=function(newAge, valid){
        app.errorMsg=false;
        app.disabled=true;
            
        if(valid){
            var userObject={};   
            userObject._id=app.currentUser;
            userObject.age=$scope.newAge;
            User.editUser(userObject).then(function(data){
                if(data.data.success){
                    app.successMsg=data.data.message;
                    $timeout(function(){
                        app.ageForm.age.$setPristine();
                        app.ageForm.age.$setUntouched();
                        app.successMsg=false;
                        app.disabled=false;
                    }, 2000);
                }else{
                    app.errorMsg=data.data.message;
                    app.disabled=false;
                }
            });
        }else{
            app.errorMsg='Please ensure form is filled out properly';
            app.disabled=false;
        }
    };
    
    app.updateExperience=function(newExperience, valid){
        app.errorMsg=false;
        app.disabled=true;
            
        if(valid){
            var userObject={};   
            userObject._id=app.currentUser;
            userObject.experience=$scope.newExperience;
            User.editUser(userObject).then(function(data){
                if(data.data.success){
                    app.successMsg=data.data.message;
                    $timeout(function(){
                        app.experienceForm.experience.$setPristine();
                        app.experienceForm.experience.$setUntouched();
                        app.successMsg=false;
                        app.disabled=false;
                    }, 2000);
                }else{
                    app.errorMsg=data.data.message;
                    app.disabled=false;
                }
            });
        }else{
            app.errorMsg='Please ensure form is filled out properly';
            app.disabled=false;
        }
    };
});