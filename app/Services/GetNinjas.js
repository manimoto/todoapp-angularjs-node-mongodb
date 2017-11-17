var App;
(function (App) {
    var Services;
    (function (Services) {
        'use strict';
        var GetNinjas = /** @class */ (function () {
            function GetNinjas($http) {
                this.$http = $http;
            }
            GetNinjas.prototype.allNinja = function () {
                return this.$http.get('http://localhost:4000/api/ninjas').then(function (response) {
                    return response.data;
                }, function (response) {
                    alert("Error");
                });
            };
            GetNinjas.prototype.removeOneNinja = function (id) {
                return this.$http.delete('http://localhost:4000/api/ninjas/' + id).then(function (response) {
                    return response.data;
                }, function (response) {
                    alert("Error");
                });
            };
            GetNinjas.prototype.removeAllNinja = function () {
                return this.$http.delete('http://localhost:4000/api/allninjasdeleted').then(function (response) {
                    return response.data;
                }, function (response) {
                    alert("Error");
                });
            };
            GetNinjas.prototype.addOneNewNinja = function (ninja) {
                return this.$http.post('http://localhost:4000/api/ninjas', ninja).then(function (response) {
                    return response.data;
                }, function (response) {
                    alert("Error");
                });
            };
            GetNinjas.$inject = ['$http'];
            return GetNinjas;
        }());
        Services.GetNinjas = GetNinjas;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
app2.service('getNinjas', App.Services.GetNinjas);

//# sourceMappingURL=../source-maps/Services/GetNinjas.js.map
