import { Component, OnInit, TemplateRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from 'src/app/model/Categorie';
import { CategorieService } from 'src/app/service/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  form: any = {
    nomCategorie: ['',[Validators.required]],
  };
  categories: Categories[];
  constructor(private categorieService:CategorieService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  
  getAllCategorie(): void {
   

    this.categorieService.getAllCategories().subscribe({
      next: data => {
        
        this.categories=data
      },
      error: err => {/* 
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true; */
      }
    });
  }
 

}
