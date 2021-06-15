import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SocialUser, SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { Subscription } from "rxjs";
import { GitHubService } from "../github.service";

@Component({
    selector: "login",
    styleUrls:["login.component.scss"],
    templateUrl:"./login.component.html"
})

export class logincomponent implements OnInit {
    
    constructor(
      public socialAuthService: SocialAuthService,
      private router: Router,
      private githubService: GitHubService
    ) { }

    loginForm!: FormGroup;
    socialUser: SocialUser = new SocialUser;
    router_link!: string;
    router_link_for_google!: string;
    log_id_required_style: string = "opacity: 0;";
    password_required_style: string = "opacity: 0;";
    repos: any;
    wrongpassword:boolean = false;
    failed_text:string = ''
    
    public ngOnInit() {
        if (this.socialUser.name==undefined) {
            this.socialUser.name = '';
        }
        if (this.socialUser.email==undefined) {
            this.socialUser.email = '';
        }
    }
    
    static subscription: Subscription;
    loginWithGoogle(): void {
        logincomponent.subscription =  this.socialAuthService.authState.subscribe((user: SocialUser) => {
            this.socialUser = user;
            localStorage.setItem('userNameValue', this.socialUser.name);
            localStorage.setItem('userEmailValue', this.socialUser.email);
            localStorage.setItem('userPhotourlValue', this.socialUser.photoUrl);
            // this.router.navigate(["/remotestate/login/screen"]);
        });
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    logOut(): void {
        this.socialAuthService.signOut();
    }

    print_login_pass(logid: string,password:string){
        this.router_link = "/remotestate/login";
        this.wrongpassword = false;
        let basebody: any = {
            "email":logid,
            "password":password
        }
        if (logid.length>0){
            this.log_id_required_style = "opacity: 0;"
            if (password.length>0){
                this.password_required_style = "opacity: 0;";
                this.githubService.loginapi(basebody)
                .subscribe(
                    (response) => {
                        this.repos = response;
                        localStorage.setItem('tokenvalue', response.token);
                        this.router.navigate(["/remotestate/login/screen"]);
                        this.wrongpassword = false;
                    },
                    (error) => {
                        this.failed_text = error.error.messageToUser
                        this.wrongpassword = true;
                    }
                )
            }else{
                this.password_required_style = "opacity: 1;";
            }
        }else{
            this.log_id_required_style = "opacity: 1;"
            this.password_required_style = "opacity: 1;";
        }
    }
}