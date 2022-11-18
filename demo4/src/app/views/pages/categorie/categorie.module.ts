import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieComponent } from './categorie.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCategorieComponent } from './update-categorie/update-categorie.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CategorieComponent
  }
]
@NgModule({
  declarations: [
    CategorieComponent,
    AddCategorieComponent,
    UpdateCategorieComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class CategorieModule { }
