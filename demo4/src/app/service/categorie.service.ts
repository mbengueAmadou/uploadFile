import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categories } from '../model/Categorie';
import { HttpClient, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  
  apiRoot: String;
  constructor(public http: HttpClient) {
    this.apiRoot = environment.apiUrl;
  }

  getAllCategories() {

    return this.http.get<Categories[]>(`${this.apiRoot}/categories`);
  }
  
  getCategorieById(id:number) {

    return this.http.get(`${this.apiRoot}/categorie/${id}`);
  }

  createCategorie(nomCategorie:string) {

    return this.http.post(`${this.apiRoot}/ajoutCategorie`,{nomCategorie});
  }

  updateCategorie(id:number,categorie:Categories) {

    return this.http.put(`${this.apiRoot}/categorie/${id}`,categorie);
  }

  deleteCategorie(id:number) {

    return this.http.delete(`${this.apiRoot}/categorie/${id}`);
  }
}
