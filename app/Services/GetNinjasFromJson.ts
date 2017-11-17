module App.Services {
    'use strict';
    export class getNinjasFromJson {

        public finalData:any[]=[];
        allNinjaJson() {
            return this.$http.get('app/data/data.json').then((response) => {
                    return this.$http.post('http://localhost:4000/api/addNinjas',response).then((response)=>{
                                    return response.data;
                    })
        },
            (Error) => {
                alert("Service Error"+ Error);
            });
        }
        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {

        }
    }
}

app2.service('getNinjasFromJson', ['$http', App.Services.getNinjasFromJson])