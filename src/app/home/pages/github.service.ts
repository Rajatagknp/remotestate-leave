import { Injectable } from '@angular/core';
 
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

 
@Injectable()
export class GitHubService {
 
    constructor(private https: HttpClient) {
    }
    baseURL:string = "https://suyash.remotestate.com/api"
    // baseURL:string = "http://localhost:8080/api"
    

    loginbaseURL: string = this.baseURL+"/login";
    loginapi(body: any): Observable<any> {
        return this.https.post(this.loginbaseURL,body)
    }

    userbaseURL: string = this.baseURL+"/user";
    dashboardapi(Header:any): Observable<any> {
        return this.https.get(this.userbaseURL,{'headers':Header})
    }
    updatedashboardapi(body: any,Header:any): Observable<any> {
        return this.https.put(this.userbaseURL,body,{'headers':Header})
    }

    leavebaseURL: string = this.baseURL+"/leave";
    postleaveapi(body: any, Header:any): Observable<any> {
        return this.https.post(this.leavebaseURL,body,{'headers':Header})
    }
    getleaveapi(Header:any): Observable<any> {
        return this.https.get(this.leavebaseURL,{'headers':Header})
    }
    putsingleleaveapi(id:number,body: any, Header:any): Observable<any> {
        return this.https.put(this.leavebaseURL+'/'+id,body,{'headers':Header})
    }
    getsingleleaveapi(id:number,Header:any): Observable<any> {
        return this.https.get(this.leavebaseURL+'/'+id,{'headers':Header})
    }
    deletesingleleaveapi(id:number,Header:any): Observable<any> {
        return this.https.delete(this.leavebaseURL+'/'+id,{'headers':Header})
    }
    getleavestatapi(Header:any): Observable<any> {
        return this.https.get(this.leavebaseURL+"/stat",{'headers':Header})
    }
    modifyleaveapi(id:number,body: any,Header:any): Observable<any> {
        return this.https.put(this.leavebaseURL+"/"+id,body,{'headers':Header})
    }

    standupbaseURL:string = this.baseURL+"/standup"
    poststandupapi(body:any,Header:any): Observable<any> {
        return this.https.post(this.standupbaseURL,body,{'headers':Header})
    }
    getstandupapi(Header:any): Observable<any> {
        return this.https.get(this.standupbaseURL,{'headers':Header})
    }
    putstandupapi(id:any,body:any,Header:any): Observable<any> {
        return this.https.put(this.standupbaseURL+'/'+id,body,{'headers':Header})
    }
    getsinglestandupapi(id:any,Header:any): Observable<any> {
        return this.https.get(this.standupbaseURL+'/'+id,{'headers':Header})
    }
}