var app = angular.module('app', ['ngRoute','ngCookies']);



app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!

$routeProvider
        
        .when('/',{
          templateUrl: 'partials/homepage.html',
           controller: 'user_controller'
        })

        .when('/about',{
          templateUrl: 'partials/about.html',
           controller: 'user_controller'
        })

        .when('/sign_up',{
          templateUrl: 'partials/registration.html',
           controller: 'user_controller'
        })

        .when('/log_in',{
          templateUrl: 'partials/login.html',
           controller: 'user_controller'
        })

        .when('/dashboard',{
          templateUrl: 'partials/dashboard.html',
           controller: 'user_controller'
        })

        

});