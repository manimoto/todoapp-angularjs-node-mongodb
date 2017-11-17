module App.Services {
    export class RegisterService{
        
        registerUserService(user){
           return  this.$http.post('http://localhost:4000/register' ,user).then((response: any)=> {
            console.log("Register Service Console", response.data);
            return response.data;
        }, (response:any)=>{
            alert("Error"+ response.message);
        });
    }

    static $inject = ['$http'];
    constructor(private $http: ng.IHttpService){
        
    }
}
}


app2.service('RegisterService',App.Services.RegisterService);
