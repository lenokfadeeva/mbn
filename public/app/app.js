var myApp=angular.module('MyApp', ['appRoutes', 'userControllers', 'userServices', 'mainController', 'authServices', 'shownannyController', 'userpageController', 'editController'])
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});

