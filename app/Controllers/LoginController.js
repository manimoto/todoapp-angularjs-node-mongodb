var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var LoginController = /** @class */ (function () {
            function LoginController(LoginService, $location) {
                this.LoginService = LoginService;
                this.$location = $location;
            }
            LoginController.prototype.login = function (user) {
                var _this = this;
                var __this = this;
                this.user.email = user.email;
                this.user.password = user.password;
                this.LoginService.loginUserService(user)
                    .then(function (response) {
                    if (Error) {
                        __this.lgnmsg = "Username or Password is Wrong!";
                    }
                    if (response) {
                        __this.lgnmsg = response.data;
                        _this.$location.url('/directory');
                    }
                });
            };
            LoginController.$inject = ['LoginService', '$location'];
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
app2.controller('LoginController', App.Controllers.LoginController);

//# sourceMappingURL=../source-maps/Controllers/LoginController.js.map
