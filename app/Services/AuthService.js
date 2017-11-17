var App;
(function (App) {
    var Services;
    (function (Services) {
        var AuthService = /** @class */ (function () {
            /* haspermissiontoview(permissions) {
                 var authData = localStorage["ngStorage-authorizationData"];
                 authData = JSON.parse(authData);
                 let userpermissions = authData["userpermissions"].split(',');
                 if (_.intersection(permissions, userpermissions).length != 0) {
                     return true;
                 }
                 return false;
             }*/
            function AuthService($http, 
                //private $state: ng.ui.IStateService,
                localStorageService, baseUrlLogin, $rootScope
                //private cacheService: Services.CacheService
            ) {
                this.$http = $http;
                this.localStorageService = localStorageService;
                this.baseUrlLogin = baseUrlLogin;
                this.$rootScope = $rootScope;
            }
            AuthService.prototype.login = function (userName, password) {
                var _this = this;
                var data = "grant_type=password&username=" + userName + "&password=" + password;
                return this.$http.post(this.baseUrlLogin, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then(function (response) {
                    var res = response.data;
                    _this.localStorageService.storage.$reset();
                    //this.cacheService.cache.removeAll();
                    userName = userName.split('@')[0];
                    _this.localStorageService.storage.authorizationData = {
                        token: res["access_token"],
                        userName: userName,
                        userpermissions: res["userpermissions"],
                        userroles: res['userroles']
                    };
                    _this.localStorageService.storage.$apply();
                    _this.localStorageService.storage.$sync();
                    _this.$rootScope.$broadcast('userAuthorized', res["access_token"]);
                }, function () {
                    alert("error in authentication. please try again");
                });
            };
            AuthService.prototype.IsAuthorize = function (permissions) {
                var authData = localStorage["ngStorage-authorizationData"];
                authData = JSON.parse(authData);
                if (!authData || !authData['token'])
                    return "NotLoggedIn";
                if (!authData['userroles'] || !authData['userpermissions'])
                    return "AccessForbidden";
                var userroles = authData['userroles'].split(',');
                var userpermissions = authData["userpermissions"].split(',');
                /*   if (userroles.indexOf('Admin')
                       || userroles.indexOf('SuperAdmin')
                       || _.intersection(permissions, userpermissions).length > 0
                   ) {
                       return "Allow";
                   } else {
                       return "AccessForbidden";
                   }
                   */
            };
            return AuthService;
        }());
        Services.AuthService = AuthService;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
app2.service('authService', App.Services.AuthService);

//# sourceMappingURL=../source-maps/Services/AuthService.js.map
