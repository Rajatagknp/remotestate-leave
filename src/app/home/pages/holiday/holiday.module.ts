import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { holidaycomponent } from "./holiday.component";

export const ROUTES: Routes = [
  {path:'',component:holidaycomponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    holidaycomponent
  ],
  exports: [
    holidaycomponent
  ]
})


export class holidayModule { }