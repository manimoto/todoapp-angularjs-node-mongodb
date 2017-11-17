module App.Services {
    export class AuthService{
        login(userName: string, password: string) {
            let data = "grant_type=password&username=" + userName + "&password=" + password;
            return this.$http.post(this.baseUrlLogin,
                data,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then((response) => {
                    let res = response.data;
                    this.localStorageService.storage.$reset();
                    //this.cacheService.cache.removeAll();
                    userName = userName.split('@')[0];
                    this.localStorageService.storage.authorizationData = {
                        token: res["access_token"],
                        userName: userName,
                        userpermissions: res["userpermissions"],
                        userroles: res['userroles']
                    };
                    this.localStorageService.storage.$apply();
                    this.localStorageService.storage.$sync();
                    this.$rootScope.$broadcast('userAuthorized', res["access_token"]);
                    
                }, () => {
                    alert("error in authentication. please try again");
                });
                            
        }
        IsAuthorize(permissions) {
            var authData = localStorage["ngStorage-authorizationData"];
            authData = JSON.parse(authData);
            if (!authData || !authData['token']) return "NotLoggedIn";
            if (!authData['userroles'] || !authData['userpermissions']) return "AccessForbidden";
            let userroles = authData['userroles'].split(',');
            let userpermissions = authData["userpermissions"].split(',');
         /*   if (userroles.indexOf('Admin')
                || userroles.indexOf('SuperAdmin')
                || _.intersection(permissions, userpermissions).length > 0
            ) {
                return "Allow";
            } else {
                return "AccessForbidden";
            }
            */
        }

       /* haspermissiontoview(permissions) {
            var authData = localStorage["ngStorage-authorizationData"];
            authData = JSON.parse(authData);
            let userpermissions = authData["userpermissions"].split(',');
            if (_.intersection(permissions, userpermissions).length != 0) {
                return true;
            }
            return false;
        }*/

        constructor(private $http: ng.IHttpService,
            //private $state: ng.ui.IStateService,
            private localStorageService: App.Services.LocalStorageService,
            private baseUrlLogin: string,
            private $rootScope: ng.IScope
            //private cacheService: Services.CacheService
        ) {
            
        }
    }
}
app2.service('authService', App.Services.AuthService);


