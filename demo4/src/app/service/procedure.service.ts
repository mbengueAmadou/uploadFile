import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Procedures } from '../model/Procedures';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  apiRoot: String;
  constructor(public http: HttpClient) {
    this.apiRoot = environment.apiUrl;
  }
   getAllProcedures() {

    return this.http.get<Procedures[]>(`${this.apiRoot}/all`);
  }
 
  createProcedure(formData: FormData) {

    return this.http.post(`${this.apiRoot}/create`,formData);
  }/* 

  updateCategorie(id:number,procedure:Procedures) {

    return this.http.put(`${this.apiRoot}/procedure/${id}`,procedure);
  }

  deleteCategorie(id:number) {

    return this.http.delete(`${this.apiRoot}/procedure/${id}`);
  } */
}
