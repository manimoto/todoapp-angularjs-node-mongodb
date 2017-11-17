module App.Services {
    'use strict';
    import NinjaModel = App.Models.NinjaModel;

    interface IGetNinjas {
        allNinja(): ng.IPromise<NinjaModel[]>;
        removeOneNinja(id: any): ng.IPromise<NinjaModel[]>;
        removeAllNinja();
    }
    export class GetNinjas implements IGetNinjas {

        allNinja() {
            return this.$http.get('http://localhost:4000/api/ninjas').then((response: ng.IHttpPromiseCallbackArg<NinjaModel[]>) => {
                return <NinjaModel[]>response.data;
            }, (response) => {
                alert("Error");
            });
        }

        removeOneNinja(id: any) {
            return this.$http.delete('http://localhost:4000/api/ninjas/' + id).then((response: ng.IHttpPromiseCallbackArg<NinjaModel[]>) => {
                return <NinjaModel[]>response.data;
            }, (response) => {
                alert("Error");
            });
        }

        removeAllNinja() {
            return this.$http.delete('http://localhost:4000/api/allninjasdeleted').then((response: ng.IHttpPromiseCallbackArg<NinjaModel[]>) => {
                return response.data;
            }, (response) => {
                alert("Error");
            });
        }

        addOneNewNinja(ninja){
            return this.$http.post('http://localhost:4000/api/ninjas',ninja).then((response: ng.IHttpPromiseCallbackArg<NinjaModel[]>) => {
                return response.data;
            }, (response) => {
                alert("Error");
            });
        }
        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {

        }
    }

}

app2.service('getNinjas', App.Services.GetNinjas);









