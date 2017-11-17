module App.Services {
    
    export class LocalStorageService {
        storage: any;
       
        static $inject = ['$localStorage'];
        constructor($localStorage: angular.storage.IStorageService) {
           this.storage = $localStorage;
            console.log(this.storage);
        }
    }
}
app2.service('localStorageService', App.Services.LocalStorageService);