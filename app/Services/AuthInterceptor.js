var App;
(function (App) {
    var Services;
    (function (Services) {
        var AuthInterceptor = /** @class */ (function () {
            function AuthInterceptor(localStorageService, $location, $q) {
                var _this = this;
                this.request = function (config) {
                    config.headers = config.headers || {};
                    var authData = localStorage["ngStorage-authorizationData"];
                    if (authData) {
                        authData = JSON.parse(authData);
                        config.headers.Authorization = 'Bearer ' + authData["token"];
                        console.log(config.headers.Authorization);
                    }
                    return config;
                };
                this.responseError = function (rejection) {
                    if (rejection.status === 401) {
                        location.assign('/login');
                    }
                    else if (rejection.status === 403) {
                        location.assign('/accessforbidden');
                    }
                    return _this.$q.reject("Client side error");
                };
                this.localStorageService = localStorageService;
                this.$q = $q;
                this.$location = $location;
            }
            return AuthInterceptor;
        }());
        Services.AuthInterceptor = AuthInterceptor;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
app2.service('authInterceptor', App.Services.AuthInterceptor);

//# sourceMappingURL=../source-maps/Services/AuthInterceptor.js.map
