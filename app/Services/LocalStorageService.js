var App;
(function (App) {
    var Services;
    (function (Services) {
        var LocalStorageService = /** @class */ (function () {
            function LocalStorageService($localStorage) {
                this.storage = $localStorage;
                console.log(this.storage);
            }
            LocalStorageService.$inject = ['$localStorage'];
            return LocalStorageService;
        }());
        Services.LocalStorageService = LocalStorageService;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
app2.service('localStorageService', App.Services.LocalStorageService);

//# sourceMappingURL=../source-maps/Services/LocalStorageService.js.map
