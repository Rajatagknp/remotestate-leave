import { Component } from "@angular/core";
import { GitHubService } from "../github.service";

@Component({
    selector: "leavecomplete",
    styleUrls:["leave.component.scss"],
    templateUrl:"./leavecomplete.component.html"
})

export class leavecompletecomponent {
    constructor(
        private githubService: GitHubService
    ){}

    img_src:string = "../../../../assets/img_leave/Complete.svg";

    ngOnInit(){
        setTimeout(() => {
            this.img_src = "../../../../assets/img_leave/Complete (1).svg"
        }, 1000);
    }

    submit_form(){
    }
}