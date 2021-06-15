import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GitHubService } from "../github.service";

@Component({
    selector: "standup",
    styleUrls:["standup.component.scss"],
    templateUrl:"./standup.component.html"
})

export class standupcomponent implements OnInit {

    did_yes:any = '';
    do_today:any = '';
    standupmodify_ID:any = ''

    ngOnInit(){
        this.standupmodify_ID = this.route.snapshot.paramMap.get('index')
        let header = { 'x-api-key': localStorage.getItem('tokenvalue')}
        if(this.standupmodify_ID){
            this.githubService.getsinglestandupapi(this.standupmodify_ID,header)
            .subscribe(
                (response) => {
                    this.did_yes = response.data.split('<br>')[0]
                    this.do_today = response.data.split('<br>')[1]
                }
            )
        }
    }

    constructor(
        private githubService: GitHubService,
        private router: Router,
        private route: ActivatedRoute
    ){}
    textarea_value:any = '';

    submit_form(value1:any,value2:any){
        let header = { 'x-api-key': localStorage.getItem('tokenvalue')}
        let basebody = {
            'data':value1.value+'<br>'+value2.value
        }
        if(!this.standupmodify_ID){
            this.githubService.poststandupapi(basebody,header)
            .subscribe(
                (response) => {
                    // console.log(response)
                }
            )
            this.router.navigate(["/remotestate/login/screen"]);
        }else{
            this.githubService.putstandupapi(this.standupmodify_ID,basebody,header)
            .subscribe(
                (response) => {
                    // console.log(response)
                }
            )
            this.router.navigate(["/remotestate/standup/previous"]);
        }
    }

    delete_standup_id(){
        localStorage.removeItem('modifystandupID')
    }
}