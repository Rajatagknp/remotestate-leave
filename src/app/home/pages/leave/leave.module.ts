import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { leavecomponent } from "./leave.component";
import { leaveapplycomponent } from "./leaveapply.component";
import { leavecompletecomponent } from "./leavecomplete.component";
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from "@angular/material/core";
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';


export const ROUTES: Routes = [
  {path:'',component:leavecomponent},
  {path:'modify/:leavemodi_id',component:leaveapplycomponent},
  {path:'apply',component:leaveapplycomponent},
  {path:'complete',component:leavecompletecomponent}
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
    MatSelectModule
  ],
  declarations: [
    leavecomponent,
    leaveapplycomponent,
    leavecompletecomponent
  ],
  exports: [
    leavecomponent
  ],
  providers: [DatePipe]
})


export class leaveModule { }