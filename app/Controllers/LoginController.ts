module App.Controllers {
    import LoginModel = App.Models.LoginModel;

    interface ILoginBindings {
        user: LoginModel;
        lgnmsg:any;
    }

    interface ILoginControllerScope{
        lgnCntrl: LoginController;
    }

    interface ILoginController extends ILoginBindings {
        login(user: LoginModel): void;
    }

    export class LoginController implements ILoginController {
        public user: LoginModel;
        public lgnmsg: any;
        login(user: LoginModel) {
            var __this = this;
            this.user.email = user.email;
            this.user.password = user.password;
            this.LoginService.loginUserService(user)
                .then((response: any) => {
                    if(Error){
                        __this.lgnmsg = "Username or Password is Wrong!";
                    }
                    if(response){
                        __this.lgnmsg = response.data;
                        this.$location.url('/directory');
                    }
                })
        }
        static $inject = ['LoginService','$location']
        constructor(private LoginService: App.Services.LoginService, private $location) { }
         
    }
}

app2.controller('LoginController', App.Controllers.LoginController)