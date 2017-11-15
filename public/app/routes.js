var app=angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
    
    $routeProvider
        .when('/', {
        templateUrl: 'app/views/pages/home.html'        
    })
        .when('/about', {
        templateUrl: 'app/views/pages/about.html'        
    })
        .when('/login', {
        templateUrl: 'app/views/pages/users/login.html',
        authenticated: false
    }) 
        .when('/register', {
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register',
        authenticated: false
    })
        .when('/shownanny', {
        templateUrl: 'app/views/pages/users/shownanny.html',
        controller: 'shownannyCtrl',
        controllerAs: 'shownanny',
        status: ['parent', 'nanny']
    })
        .when('/userpage', {
        templateUrl: 'app/views/pages/users/userpage.html',
        controller: 'userpageCtrl',
        controllerAs: 'userpage',
        authenticated: true
    })
        .when('/edit/:id', {
        templateUrl: 'app/views/pages/users/edit.html',
        controller: 'editCtrl',
        controllerAs: 'edit',
        authenticated: true
    }) 
        .otherwise({
        redirectTo: '/'
    });
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(next.$$route !== undefined){
        if(next.$$route.authenticated==true){
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/');
            }
        }else if (next.$$route.authenticated==false){
            if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/profile');
            }
        }
    }
});

}]);

 