var App;
(function (App) {
    var Services;
    (function (Services) {
        var LoginService = /** @class */ (function () {
            function LoginService($http, localStorageService) {
                this.$http = $http;
                this.localStorageService = localStorageService;
            }
            LoginService.prototype.loginUserService = function (user) {
                //this is written in js style how to bind properly, 
                //a short of closure example like var _this=this is used to bind localStorageService
                var __this = this;
                return this.$http.post('http://localhost:4000/login', user).then(onSuccess, onError);
                function onSuccess(response) {
                    console.log("Login Service Console", response.data);
                    var res = response.data;
                    __this.localStorageService.storage.$reset();
                    //this.cacheService.cache.removeAll();
                    this.userName = user.email;
                    __this.localStorageService.storage["authorizationData"] = {
                        token: res["token"]
                        //userName: this.userName
                        //userpermissions: res["userpermissions"],
                        //userroles: res['userroles']
                    };
                    __this.localStorageService.storage.$apply();
                    __this.localStorageService.storage.$sync();
                    //this.$rootScope.$broadcast('userAuthorized', res["access_token"]);
                    return response.data;
                }
                ;
                function onError(response) {
                    // alert("Error"+ response.message);
                }
            };
            LoginService.$inject = ['$http', 'localStorageService'];
            return LoginService;
        }());
        Services.LoginService = LoginService;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
app2.service('LoginService', App.Services.LoginService);

//# sourceMappingURL=../source-maps/Services/LoginService.js.map
