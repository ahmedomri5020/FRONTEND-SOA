import { Image } from './../model/image.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Plat } from '../model/plat.model';
import { Pays } from '../model/pays.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaysWrapper } from '../model/PaysWrapper.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class PlatService {
  imageAPI: string ='http://localhost:8080/api/image'

  apiURL: string = 'http://localhost:8080/api/plats';
  paysURL: string = 'http://localhost:8080/api/pays';
  plats: Plat[] = [];
  pays: Pays[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  listePlats(): Observable<Plat[]> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    return this.http.get<Plat[]>(this.apiURL, { headers: httpHeaders });
  }

  ajouterPlat(plat: Plat): Observable<Plat> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    return this.http.post<Plat>(this.apiURL, plat, { headers: httpHeaders });
  }

  supprimerPlat(id: number): Observable<void> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, { headers: httpHeaders });
  }

  consulterPlat(id: number): Observable<Plat> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Plat>(url, { headers: httpHeaders });
  }

  updatePlat(plat: Plat): Observable<Plat> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    const url = `${this.apiURL}/${plat.idPlat}`;
    return this.http.put<Plat>(url, plat, { headers: httpHeaders });
  }

  listePays(): Observable<PaysWrapper> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    return this.http.get<PaysWrapper>(this.paysURL, { headers: httpHeaders });
  }

  rechercherParPays(idPays: number): Observable<Plat[]> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    const url = `${this.apiURL}/pays/${idPays}`;
    return this.http.get<Plat[]>(url, { headers: httpHeaders });
  }

  rechercherParNom(nom: string): Observable<Plat[]> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    return this.http.get<Plat[]>(`${this.apiURL}/search/name?name=${nom}`, { headers: httpHeaders });
  }

  ajouterPays(p: Pays): Observable<Pays> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    return this.http.post<Pays>(this.paysURL, p, { headers: httpHeaders });
  }

  supprimerPays(id: number): Observable<void> {
    let jwt = this.authService.getToken();
    let httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + jwt });
    const url = `${this.paysURL}/${id}`;
    return this.http.delete<void>(url, { headers: httpHeaders });
  }
  uploadImage(file: File, filename: string): Observable<Image>{ 
    const imageFormData = new FormData(); 
    imageFormData.append('image', file, filename); 
    const url = `${this.imageAPI + '/upload'}`; 
    return this.http.post<Image>(url, imageFormData); 
 }
 loadImage(id: number): Observable<Image> { 
  const url = `${this.imageAPI + '/get/info'}/${id}`; 
  return this.http.get<Image>(url); 
} 
uploadImagePlat(file: File, filename: string, idProd:number): Observable<any>{ 
  const imageFormData = new FormData(); 
  imageFormData.append('image', file, filename); 
  const url = `${this.imageAPI + '/uplaodImagePlat'}/${idProd}`; 
  return this.http.post(url, imageFormData); 
}
supprimerImage(id : number) { 
  const url = `${this.imageAPI}/delete/${id}`; 
  return this.http.delete(url, httpOptions); 
  } 
  uploadImageFS(file: File, filename: string, idProd : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.imageAPI + '/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }

}