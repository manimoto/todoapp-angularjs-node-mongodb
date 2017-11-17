var App;
(function (App) {
    var Services;
    (function (Services) {
        'use strict';
        var getNinjasFromJson = /** @class */ (function () {
            function getNinjasFromJson($http) {
                this.$http = $http;
                this.finalData = [];
            }
            getNinjasFromJson.prototype.allNinjaJson = function () {
                var _this = this;
                return this.$http.get('app/data/data.json').then(function (response) {
                    return _this.$http.post('http://localhost:4000/api/addNinjas', response).then(function (response) {
                        return response.data;
                    });
                }, function (Error) {
                    alert("Service Error" + Error);
                });
            };
            getNinjasFromJson.$inject = ['$http'];
            return getNinjasFromJson;
        }());
        Services.getNinjasFromJson = getNinjasFromJson;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
app2.service('getNinjasFromJson', ['$http', App.Services.getNinjasFromJson]);

//# sourceMappingURL=../source-maps/Services/GetNinjasFromJson.js.map
