///<reference path="typings/angularjs/angular.d.ts"/>
var app2 = angular.module('app', ['ngRoute', 'ngAnimate', 'ngStorage']);
app2.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.common = { 'X-Requested-With': 'XMLHttpRequest' };
        $httpProvider.interceptors.push('authInterceptor');
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/home', {
            templateUrl: 'app/templates/home.html',
            // only work in angl2 template: '<h3 [innerText]="name"></h3>',
            controller: 'NinjaController',
            controllerAs: 'ninjaCntrl',
            resolve: {
                getNinjasData: function (getNinjas) {
                    return getNinjas.allNinja;
                }
            }
        })
            .when('/contact', {
            templateUrl: 'app/templates/contact.html',
            controller: 'ContactController',
            controllerAs: 'contCntrl'
        })
            .when('/contact-success', {
            templateUrl: 'app/templates/contact-success.html'
        })
            .when('/login', {
            templateUrl: 'app/templates/admin/login.html',
            controller: 'LoginController',
            controllerAs: 'lgnCntrl'
        })
            .when('/admin/register', {
            templateUrl: 'app/templates/admin/register.html',
            controller: 'RegisterController',
            controllerAs: 'RegCntrl'
        })
            .when('/register', {
            templateUrl: 'app/templates/admin/dashboard.html'
        })
            .when('/directory', {
            templateUrl: 'app/templates/directory.html',
            controller: 'NinjaController',
            controllerAs: 'ninjaCntrl',
            resolve: {
                getNinjasData: function (getNinjas) {
                    return getNinjas.allNinja();
                }
            }
        })
            .when('/msgview', {
            templateUrl: 'app/templates/msg-view.html',
            controller: 'MessageController',
            controllerAs: 'msg',
            resolve: {
                message: function (messageService) {
                    return messageService.getMessage();
                }
            },
        })
            .otherwise({
            redirectTo: '/login'
        });
    }]);
//# sourceMappingURL=source-maps/app.js.map 

//# sourceMappingURL=source-maps/app.js.map
