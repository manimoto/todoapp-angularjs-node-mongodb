var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var RegisterController = /** @class */ (function () {
            function RegisterController(RegisterService) {
                this.RegisterService = RegisterService;
            }
            RegisterController.prototype.registerUser = function (user) {
                var __this = this; //not neccessary if you are using lambda function
                this.user.email = user.email;
                this.user.password = user.password;
                console.log(this.user);
                this.RegisterService.registerUserService(user)
                    .then(function (response) {
                    __this.message = response;
                });
                //this will not print because of aysnchronocity
                console.log(15, __this.message);
            };
            RegisterController.$inject = ["RegisterService"];
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
app2.controller('RegisterController', App.Controllers.RegisterController);

//# sourceMappingURL=../source-maps/Controllers/RegisterController.js.map
