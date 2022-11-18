import { Component, OnInit, TemplateRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from 'src/app/model/Categorie';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  basicModalCloseResult:string;
  form: any = {
    
    nomCategorie: null,
  };

  constructor(private categorieService:CategorieService,
    private modalService: NgbModal) { }
categories:  Categories[];
  ngOnInit(): void {
    this.getAllCategorie();
  }

  getAllCategorie(): void {
   

    this.categorieService.getAllCategories().subscribe({
      next: data => {
        console.log(data);
        this.categories=data
      },
      error: err => {/* 
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true; */
      }
    });
  }
  submit(): void {
    const { nomCategorie } = this.form;
    console.log(this.form.value);
    this.categorieService.createCategorie(nomCategorie).subscribe({
      next: data => {
        //console.log(data);
       
      },
      error: err => {/* 
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true; */
      }
    });
  }
  openBasicModal(content: TemplateRef<any>) {
    this.modalService.open(content, {

    }).result.then((result) => {
       
       this.basicModalCloseResult = "Modal closed" + result;
       this.getAllCategorie();
    }).catch((res) => {});
  }
  onEdit(id:number){
   
  }
  ondelet(id:number){

  }
}
