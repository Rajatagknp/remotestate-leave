import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GitHubService } from "../github.service";

@Component({
    selector: "prestandup",
    styleUrls:["standup.component.scss"],
    templateUrl:"./prestandup.component.html"
})

export class prestandupcomponent implements OnInit {

    body_one_height:string[] = [];
    change_show_text:boolean = true;
    
    constructor(
        private githubService: GitHubService,
        public datepipe: DatePipe,
        private router: Router,
        private route: ActivatedRoute
    ){}

    standup_id:any[] = []
    standup_date:any[] = []
    standup_id_yes:any = []
    standup_id_today:any = []
    ngOnInit(){
        let header = { 'x-api-key': localStorage.getItem('tokenvalue')}
        this.githubService.getstandupapi(header)
        .subscribe(
            (response) => {
                // console.log(response)
                for(let i=0;i<response.length;i++){
                    this.standup_id.push(response[i].id)
                    this.standup_date.push(this.datepipe.transform(response[i].createdAt, 'dd MMM yyyy'))
                    this.body_one_height.push("max-height: 147px;")
                    this.standup_id_yes.push([])
                    this.standup_id_today.push([])
                    let value1 = response[i].data.split('<br>')[0]?.split('\n')
                    for(let ii=0;ii<value1.length;ii++){
                        this.standup_id_yes[i].push(value1[ii])
                    }
                    let value2 = response[i].data.split('<br>')[1]?.split('\n')
                    for(let ii=0;ii<value2.length;ii++){
                        this.standup_id_today[i].push(value2[ii])
                    }
                }
            }
        )
    }

    show_more(value:any){
        this.body_one_height[value] = "";
        this.change_show_text = false;
    }
    show_less(value:any){
        this.body_one_height[value] = "max-height: 147px;";
        this.change_show_text = true;
    }

    modify_standup(value:any){
        this.router.navigate(["/remotestate/standup/modify",value]);
    }
}