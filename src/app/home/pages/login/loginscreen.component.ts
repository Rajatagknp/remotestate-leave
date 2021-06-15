import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SocialAuthService } from "angularx-social-login";
import { GitHubService } from "../github.service";

@Component({
    selector: "loginscreen",
    styleUrls:["login.component.scss"],
    templateUrl:"./loginscreen.component.html"
})

export class loginscreencomponent implements OnInit{

    constructor(
        public socialAuthService: SocialAuthService,
        private githubService: GitHubService,
        public datepipe: DatePipe
    ) { }

    name:any = localStorage.getItem('userNameValue')
    email:any = localStorage.getItem('userEmailValue')
    photourl:any = localStorage.getItem('userPhotourlValue')

    edit_dashboard:boolean = false;
    phonevalue:any = '999999999';
    desvalue:any = 'Training';

    used_leave:any[] = [0,0,0];
    allowed_leave:any[] = [7,15,21];
    standup_date:any = ''
    standup_yes:any[] = []
    standup_today:any[] = []

    ngOnInit(): void {
        let header = { 'x-api-key': localStorage.getItem('tokenvalue')}
        this.githubService.dashboardapi(header)
        .subscribe(
            (response) => {
                this.name = response.name
                this.email = response.email
                this.photourl = '../../../../assets/img_leave/User Image.png'
                this.phonevalue = this.phonevalue
                this.desvalue = response.position
            }
        )
        this.githubService.getleavestatapi(header)
        .subscribe(
            (response) => {
                for(let i=0;i<3;i++){
                    if(response[i]){
                        this.used_leave[i] = response[i]?.usedLeaves
                        this.allowed_leave[i] = response[i]?.allowedLeaves
                    }
                }
            }
        )
        this.githubService.getstandupapi(header)
        .subscribe(
            (response) => {
                this.standup_date = this.datepipe.transform(response[0]?.createdAt, 'dd MMM yyyy')
                let value1 = response[0]?.data.split('<br>')[0].split('\n')
                for(let ii=0;ii<value1?.length;ii++){
                    this.standup_yes.push(value1[ii])
                }
                let value2 = response[0]?.data.split('<br>')[1]?.split('\n')
                for(let ii=0;ii<value2?.length;ii++){
                    this.standup_today.push(value2[ii])
                }
            }
        )
    }

    edit_containt(){
        this.edit_dashboard = (! this.edit_dashboard);
        if (!this.edit_dashboard){
            this.desvalue = document.querySelector('#des_text')?.innerHTML;
            this.phonevalue = document.querySelector("#phone_no")?.innerHTML;
            let basebody:any = {}
            let header = { 'x-api-key': localStorage.getItem('tokenvalue')}
            this.githubService.dashboardapi(header)
            .subscribe(
                (response) => {
                    basebody = response
                    basebody.phone = this.phonevalue
                    basebody.position = this.desvalue
                    basebody.profileImageLink = '../../../../assets/img_leave/User Image.png'
                    // this.githubService.updatedashboardapi(basebody,header)
                    // .subscribe(
                    //     (response) => {
                    //         console.log(response)
                    //     }
                    // )
                }
            )
        }
    }

    logout(){
        localStorage.clear();
    }
}