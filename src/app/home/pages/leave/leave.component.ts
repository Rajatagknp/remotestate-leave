import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { GitHubService } from "../github.service";

@Component({
    selector: "leave",
    styleUrls:["leave.component.scss"],
    templateUrl:"./leave.component.html"
})

export class leavecomponent implements OnInit {
    constructor(
        private githubService: GitHubService,
        public datepipe: DatePipe,
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ){}
    fromdate:any[] = []
    todate:any[] = []
    reson_array:any[] = []
    leave_id:any = []
    all_post_leave:any[] = []
    used_leave:any[] = [0,0,0];
    allowed_leave:any[] = [7,15,20];

    editbox_style:boolean[] = [];
    no_box_open:number = 0;
    header:any = { 'x-api-key': localStorage.getItem('tokenvalue')}
    
    render_leaves(){
        this.githubService.getleaveapi(this.header).subscribe(
            (response) => {
                this.all_post_leave = response
                for(let i=0;i<response.length;i++){
                    this.editbox_style.push(false)
                    this.leave_id.push(this.all_post_leave[i].id)
                    this.fromdate.push(this.datepipe.transform(this.all_post_leave[i].leaveFrom, 'dd MMM yyyy'));
                    this.todate.push(this.datepipe.transform(this.all_post_leave[i].leaveTo, 'dd MMM yyyy'));
                    this.reson_array.push(this.all_post_leave[i].reason);
                }
            }
        )
    }
    
    render_usedleave(){
        this.githubService.getleavestatapi(this.header)
        .subscribe(
            (response) => {
                for(let ii=0;ii<3;ii++){
                    if(response[ii]){
                        this.used_leave[ii] = response[ii]?.usedLeaves
                        this.allowed_leave[ii] = response[ii]?.allowedLeaves
                    }
                }
            }
        )
    }

    leavemodi_id:any = '';
    ngOnInit(){
        this.render_leaves()
        this.render_usedleave()
    }

    disapear_0_leave_body:boolean = true

    ngDoCheck(){
        this.disapear_0_leave_body = true;
        if(this.leave_id.length==0){
            this.disapear_0_leave_body = false
        }
    }

    addedit_box(value:number){
        if(this.no_box_open==0){
            this.githubService.getsingleleaveapi(this.leave_id[value],this.header)
            .subscribe(
                (response) => {
                    let today_date = new Date();
                    let leave_from = new Date(response.leaveFrom);
                    if(leave_from.getTime()-today_date.getTime()>0){
                        this.editbox_style[value] = true
                        this.no_box_open = 1;
                    }
                }
            )
        }
    }
    removeedit_box(){
        for(let i=0;i<this.editbox_style.length;i++){
            this.editbox_style[i] = false;
        }
        this.no_box_open = 0;
    }

    remove_leave(value:any){
        this.githubService.getsingleleaveapi(value,this.header)
        .subscribe(
            (response) => {
                let today_date = new Date();
                let leave_from = new Date(response.leaveFrom);
                if(leave_from.getTime()-today_date.getTime()>0){
                    this.githubService.deletesingleleaveapi(value,this.header)
                    .subscribe(
                        () => {
                            this.fromdate = []
                            this.todate = []
                            this.reson_array = []
                            this.leave_id = []
                            this.editbox_style = []
                            this.render_leaves()
                            this.used_leave = [0,0,0];
                            this.allowed_leave = [7,15,20];
                            this.render_usedleave()
                            this.no_box_open = 0;
                        }
                    )
                }
            }
        )
    }

    modify_leave(value:any){
        let header = {'x-api-key': localStorage.getItem('tokenvalue')}
        this.githubService.getsingleleaveapi(value,header)
        .subscribe(
            (response) => {
                this.router.navigate(["/remotestate/leave/modify/",response.id]);
            }
        )
    }
}