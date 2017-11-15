angular.module('userServices', [])

.factory('User', function($http){
    var userFactory={};
    
    userFactory.create=function(regData){
        return $http.post('/api/users', regData);
    };
    
        
    userFactory.getStatus= function(){
        return $http.get('/api/status/');
    };
    
    userFactory.getUsers= function(){
        return $http.get('/api/shownanny/');
    };
    
    userFactory.getupUser= function(){
        return $http.get('/api/userpage/');
    };
    
    userFactory.getUser=function(id){
        return $http.get('/api/edit/'+id);
    }
    
    userFactory.editUser=function(id){
        return $http.put('/api/edit', id);
    }
    
    return userFactory;
});