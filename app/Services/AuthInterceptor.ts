module App.Services {
    
        export class AuthInterceptor {
            localStorageService: App.Services.LocalStorageService;
            $q: ng.IQService;
            $location: ng.ILocationService;
            
            request = (config) => {
                config.headers = config.headers || {};
               
                var authData = localStorage["ngStorage-authorizationData"];
                if (authData) {
                    authData = JSON.parse(authData);
                    config.headers.Authorization = 'Bearer ' + authData["token"];
                    console.log(config.headers.Authorization );
                }
                return config;
            }
            responseError = (rejection: any) => {
                if (rejection.status === 401) {
                    location.assign('/login');
                }
                else if (rejection.status === 403) {
                    location.assign('/accessforbidden');
                }
                return this.$q.reject("Client side error");
            }
    
            constructor(localStorageService: App.Services.LocalStorageService,
                $location: ng.ILocationService,
                $q: ng.IQService
            ) {
                this.localStorageService = localStorageService;
                this.$q = $q;
                this.$location = $location;
            }
    
        }
    }
    
    app2.service('authInterceptor', App.Services.AuthInterceptor);