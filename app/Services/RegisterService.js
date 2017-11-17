var App;
(function (App) {
    var Services;
    (function (Services) {
        var RegisterService = /** @class */ (function () {
            function RegisterService($http) {
                this.$http = $http;
            }
            RegisterService.prototype.registerUserService = function (user) {
                return this.$http.post('http://localhost:4000/register', user).then(function (response) {
                    console.log("Register Service Console", response.data);
                    return response.data;
                }, function (response) {
                    alert("Error" + response.message);
                });
            };
            RegisterService.$inject = ['$http'];
            return RegisterService;
        }());
        Services.RegisterService = RegisterService;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
app2.service('RegisterService', App.Services.RegisterService);

//# sourceMappingURL=../source-maps/Services/RegisterService.js.map
