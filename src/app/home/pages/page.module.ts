import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GitHubService } from "./github.service";

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule
  ],
  providers: [GitHubService],
})

export class pageModule{}