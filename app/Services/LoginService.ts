module App.Services{

    export class LoginService{
        storage :any;
        loginUserService(user){
            //this is written in js style how to bind properly, 
            //a short of closure example like var _this=this is used to bind localStorageService
                var __this = this;
                return this.$http.post('http://localhost:4000/login',user).then(onSuccess, onError)
               function onSuccess(response: any):any{
                    console.log("Login Service Console", response.data);
                      let res = response.data;
                       __this.localStorageService.storage.$reset();
                        //this.cacheService.cache.removeAll();
                        this.userName = user.email;
                        __this.localStorageService.storage["authorizationData"] = {
                            token: res["token"]
                            //userName: this.userName
                            //userpermissions: res["userpermissions"],
                            //userroles: res['userroles']
                        };
                        __this.localStorageService.storage.$apply();
                        __this.localStorageService.storage.$sync();
                        //this.$rootScope.$broadcast('userAuthorized', res["access_token"]);
                        
                    
                    return response.data;
                };
                function onError(response:any){
                   // alert("Error"+ response.message);
                }
        }

        static $inject = ['$http','localStorageService'];
        constructor(private $http: ng.IHttpService, private localStorageService: App.Services.LocalStorageService){

        }
    }
}

app2.service('LoginService', App.Services.LoginService)