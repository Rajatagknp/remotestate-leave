import { Component, OnInit } from "@angular/core";
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core";
import { Router } from "@angular/router";
import { GitHubService } from "../github.service";

import * as _moment from 'moment';
import {defaultFormat as _rollupMoment} from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { FormControl } from "@angular/forms";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'DD-MMM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: "leavemodify",
    styleUrls:["leave.component.scss"],
    templateUrl:"./leavemodify.component.html",
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
  
      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})


export class leavemodifycomponent implements OnInit {
    date = new FormControl(moment);
    selectedValue: any[] = [false,false,false,false];
    leavefrom_date!:any;
    leaveto_date!:any;
    reason_text_value:any = '';
    repos: any;

    constructor(
      private githubService: GitHubService,
      private router: Router,
    ){}
    ngOnChanges(){
    }

    header:any = {'x-api-key': localStorage.getItem('tokenvalue')}
    leave_id:any = ''

    ngOnInit(): void {
        this.leave_id = document.location.pathname.split('/').reverse()[0]
        this.selectedValue = [false,false,false,false];
        let leave_type_array = ['select','sick','casual','other']
        if(this.leave_id){
            this.githubService.getsingleleaveapi(this.leave_id,this.header)
            .subscribe(
                (response) => {
                    this.leavefrom_date = response.leaveFrom;
                    this.leaveto_date = response.leaveTo;
                    this.reason_text_value = response.reason;
                    for(let i=0;i<leave_type_array.length;i++){
                        if(response.leaveType==leave_type_array[i]){
                            this.selectedValue[i] = true
                        }
                    }
                }
            )
        }
    }

    delete_modification(){
    }

    router_link:string = "/remotestate/leave/apply"
    formdate_style:boolean = false;
    todate_style:boolean = false;
    leave_type_style:boolean = false;
    from_mindate:Date = new Date;
    from_maxdate:Date = new Date(3000,11,31);
    to_mindate:Date = this.from_mindate;

    events: string[] = [];

    ngDoCheck(){
        // console.log(1)
    }

    total_days(from_value:any,to_value:any){
        if(from_value.length!=0){
            this.to_mindate = new Date(from_value)
        }
        if(to_value.length!=0){
            this.from_maxdate = new Date(to_value)
        }
        let start_date = new Date(from_value).getTime()
        let end_date = new Date(to_value).getTime()
        let no_days = Math.floor(end_date-start_date)/(1000 * 60 * 60 * 24)+1
        if(no_days){
            return no_days;
        }else{
            return 'Select Dates';
        }
    }

    console_data(from_value:any,to_value:any,leave_value:any){
        let reson_text:any = document.getElementById("myParagraph")?.innerHTML;
        if(from_value.length==0){
            this.formdate_style = true;
        }else{
            this.formdate_style = false;
        }
        if(to_value.length==0){
            this.todate_style = true;
        }else{
            this.todate_style = false;
        }
        if(leave_value=='select'){
            this.leave_type_style = true;
        }else{
            this.leave_type_style = false;
        }
        if (from_value.length!=0){
            if (to_value.length!=0){
                if(leave_value!='Select'){
                    let basebody = {
                        "leaveFrom" : new Date(from_value),
                        "leaveTo" : new Date(to_value),
                        "leaveType" : leave_value,
                        "reason" : reson_text
                    }
                    this.githubService.putsingleleaveapi(this.leave_id,basebody,this.header)
                    .subscribe(
                        (response) => {
                            this.router.navigate(["/remotestate/leave/complete"]);
                        }
                    )
                }
            }
        }
    }
}