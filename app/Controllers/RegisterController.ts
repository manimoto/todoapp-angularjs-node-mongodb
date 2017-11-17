module App.Controllers {
                
    export class RegisterController{
        public user : {
                        email: string
                        password: any
                    }
        public message: any;
        registerUser(user){
            var __this = this; //not neccessary if you are using lambda function
            this.user.email = user.email;
            this.user.password = user.password;
            console.log(this.user);
            this.RegisterService.registerUserService(user)
                .then((response)=> { 
                    __this.message = response;
                 });
           
           //this will not print because of aysnchronocity
           console.log(15, __this.message);
        }

        static $inject = ["RegisterService"];
        constructor(private RegisterService: App.Services.RegisterService){
         
        }


    }
}

app2.controller('RegisterController', App.Controllers.RegisterController);