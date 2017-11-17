module App.Controllers {
    import NinjaModel = App.Models.NinjaModel;

    interface INinjaBindings {
        name: string;
        ninjas: NinjaModel[];
        newninja: NinjaModel;
        delMsg: string;
    }

    interface INinjaController extends INinjaBindings {
        removeAll(): void;
        removeNinja(ninja: NinjaModel): void;
        addNinja(): void;
        setAllNinjaFromJson(): void;
        addNinja(): void;
    }

    interface INinjaControllerScope extends ng.IScope {
        ninjaCntrl: NinjaController;
    }

    export class NinjaController implements INinjaController {

        public name: string;
        public ninjas: any[] = [];
        public removedNinja: number;
        public delMsg: string;
        public newninja: NinjaModel;

        removeAll(): void {
            this.getNinjas.removeAllNinja().then((response: any) => {
                this.delMsg = response.message;
                this.ninjas = [];
            },
                (reject) => { alert("Something Went Wrong at Service/Backend Level"); }
            )
        };

        removeNinja(ninja: NinjaModel): void {
            this.removedNinja = this.ninjas.indexOf(ninja);
            console.log(ninja._id);
            this.getNinjas.removeOneNinja(ninja._id).then((response: any) => {
                if (response.message == 'Ninja Successfully Deleted!') {
                    this.ninjas.splice(this.removedNinja, 1);
                    this.delMsg = response.message;
                }
                else {
                    this.delMsg = response.message;
                    alert("Something Went Wrong" + this.delMsg);
                }
            },
                (reject) => { alert("Something Went Wrong at Service/Backend Level"); }

            )
        };

        addNinja(): void {
            this.newninja.available= true;
            this.getNinjas.addOneNewNinja(this.newninja).then((response) => {
                this.ninjas.push(response);
                this.newninja.name = "",
                this.newninja.belt = "",
                this.newninja.rate = 0
                this.newninja.available= true;
            },
                (reject) => { alert("Something Went Wrong"); }
            )
            

           
        };

        setAllNinjaFromJson(): void {
            this.getNinjasFromJson.allNinjaJson().then((response: any[]) => {
                console.log(response);
                this.$route.reload();
            },
                (Error) => {
                    alert("Controller Error" + Error);
                });

        }



        static $inject = ['getNinjasData', 'getNinjas', 'getNinjasFromJson', '$route'];
        constructor(private getNinjasData, private getNinjas: App.Services.GetNinjas, private getNinjasFromJson: App.Services.getNinjasFromJson, private $route) {
            this.name = "Manish sharma";
            //console.log(1, getNinjasData)
            this.ninjas = getNinjasData;
        }
    }
}
app2.controller('NinjaController', App.Controllers.NinjaController);