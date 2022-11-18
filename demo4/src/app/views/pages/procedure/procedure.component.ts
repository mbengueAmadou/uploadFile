import { Component, OnInit, TemplateRef } from '@angular/core';
import { Procedures } from 'src/app/model/Procedures';
import { ProcedureService } from 'src/app/service/procedure.service';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {

  form: any = {
    
    nomProcedure: null,
    nomDocument: null,
    version: null,
    refference: null,
    statut: null

  };
  nomProc: string;
  constructor(
    private procedureService: ProcedureService
  ) { }
  procedures:  Procedures[];
  ngOnInit(): void {
    this.getAllProcedure();
  }
  openAjoutUpLoad(){

  }
  getAllProcedure(): void {
   

    this.procedureService.getAllProcedures().subscribe({
      next: data => {
        console.log(data);
        this.procedures=data
      },
      error: err => {/* 
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true; */
      }
    });
  }
  
  selectDocument1(event: any): void {
    //this.document_1 = <File>event.target.files.item(0);
    this.nomProc = this.form.value.nomProcedure;
  }
  submit(): void {
    const formData: FormData = new FormData();
    formData.append('document', JSON.stringify(this.form.value));
    if (this.nomProc)
      formData.append('nomProc', this.nomProc);
      this.procedureService.createProcedure(formData).subscribe({

        next: data => {
       console.log(data);
       
        },
        error: err => {
          
      }
    });
  }
  openBasicModal(content: TemplateRef<any>) {
    /* this.modalService.open(content, {

    }).result.then((result) => {
       
       this.basicModalCloseResult = "Modal closed" + result;
       this.getAllCategorie();
    }).catch((res) => {}); */
  }
  onEdit(id:number){
   
  }
  ondelet(id:number){

  }
}
