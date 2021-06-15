import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { homecomponent } from "./home.component";
import { holidayModule } from "./pages/holiday/holiday.module";
import { leaveModule } from "./pages/leave/leave.module";
import { loginModule } from "./pages/login/login.module";
import { standupModule } from "./pages/standup/standup.module";


export const ROUTES: Routes = [
  { path: '', redirectTo: 'remotestate/login',pathMatch: 'full'},
  {
    path: "remotestate",
    children:[
      {path:'login',loadChildren:'./pages/login/login.module#loginModule'},
      {path:'standup',loadChildren:'./pages/standup/standup.module#standupModule'},
      {path:'leave',loadChildren:'./pages/leave/leave.module#leaveModule'},
      {path:'holiday',loadChildren:'./pages/holiday/holiday.module#holidayModule'}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    loginModule,
    standupModule,
    leaveModule,
    holidayModule
  ],
  declarations: [
    homecomponent,
  ],
  exports: [
    homecomponent
  ]
})


export class homeModule { }