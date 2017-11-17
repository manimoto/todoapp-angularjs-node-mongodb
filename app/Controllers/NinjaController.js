var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var NinjaController = /** @class */ (function () {
            function NinjaController(getNinjasData, getNinjas, getNinjasFromJson, $route) {
                this.getNinjasData = getNinjasData;
                this.getNinjas = getNinjas;
                this.getNinjasFromJson = getNinjasFromJson;
                this.$route = $route;
                this.ninjas = [];
                this.name = "Manish sharma";
                //console.log(1, getNinjasData)
                this.ninjas = getNinjasData;
            }
            NinjaController.prototype.removeAll = function () {
                var _this = this;
                this.getNinjas.removeAllNinja().then(function (response) {
                    _this.delMsg = response.message;
                    _this.ninjas = [];
                }, function (reject) { alert("Something Went Wrong at Service/Backend Level"); });
            };
            ;
            NinjaController.prototype.removeNinja = function (ninja) {
                var _this = this;
                this.removedNinja = this.ninjas.indexOf(ninja);
                console.log(ninja._id);
                this.getNinjas.removeOneNinja(ninja._id).then(function (response) {
                    if (response.message == 'Ninja Successfully Deleted!') {
                        _this.ninjas.splice(_this.removedNinja, 1);
                        _this.delMsg = response.message;
                    }
                    else {
                        _this.delMsg = response.message;
                        alert("Something Went Wrong" + _this.delMsg);
                    }
                }, function (reject) { alert("Something Went Wrong at Service/Backend Level"); });
            };
            ;
            NinjaController.prototype.addNinja = function () {
                var _this = this;
                this.newninja.available = true;
                this.getNinjas.addOneNewNinja(this.newninja).then(function (response) {
                    _this.ninjas.push(response);
                    _this.newninja.name = "",
                        _this.newninja.belt = "",
                        _this.newninja.rate = 0;
                    _this.newninja.available = true;
                }, function (reject) { alert("Something Went Wrong"); });
            };
            ;
            NinjaController.prototype.setAllNinjaFromJson = function () {
                var _this = this;
                this.getNinjasFromJson.allNinjaJson().then(function (response) {
                    console.log(response);
                    _this.$route.reload();
                }, function (Error) {
                    alert("Controller Error" + Error);
                });
            };
            NinjaController.$inject = ['getNinjasData', 'getNinjas', 'getNinjasFromJson', '$route'];
            return NinjaController;
        }());
        Controllers.NinjaController = NinjaController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
app2.controller('NinjaController', App.Controllers.NinjaController);

//# sourceMappingURL=../source-maps/Controllers/NinjaController.js.map
