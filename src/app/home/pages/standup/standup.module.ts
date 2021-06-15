import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { prestandupcomponent } from "./prestandup.component";
import { standupcomponent } from "./standup.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

export const ROUTES: Routes = [
  {path:'',component:standupcomponent},
  {path:'modify/:index',component:standupcomponent},
  {path:'previous',component:prestandupcomponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    MatFormFieldModule,
    MatInputModule,
    TextareaAutosizeModule
  ],
  declarations: [
    standupcomponent,
    prestandupcomponent
  ],
  exports: [
    standupcomponent
  ]
})


export class standupModule { }