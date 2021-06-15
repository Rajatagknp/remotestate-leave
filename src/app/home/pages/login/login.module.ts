import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { logincomponent } from "./login.component";
import { loginscreencomponent } from "./loginscreen.component";
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from "@angular/material/core";
import { GoogleLoginProvider, SocialAuthServiceConfig } from "angularx-social-login";
import { pageModule } from "../page.module";

export const ROUTES: Routes = [
  {path:'',component: logincomponent},
  {path:'screen',component:loginscreencomponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    pageModule
  ],
  declarations: [
    logincomponent,
    loginscreencomponent,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1009279315824-f9mq196bo21cb7vkpenf2i4rqlemak6t.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }    
  ],
  exports: [
    logincomponent
  ]
})


export class loginModule { }