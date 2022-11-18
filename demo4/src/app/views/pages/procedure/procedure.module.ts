import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedureComponent } from './procedure.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ProcedureComponent
  }
]
@NgModule({
  declarations: [
    ProcedureComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProcedureModule { }
