import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleitor } from '../models/eleitor';

@Injectable({
  providedIn: 'root'
})

export class EleitoresService {
  
  http = inject(HttpClient);

  API = 'http://localhost:8080/api/eleitores';

  constructor() { }

  findById(id: number) {
    return this.http.get<Eleitor>(`${this.API}/findById/${id}`);
  }

  getAllEleitores(): Observable<Eleitor[]> {
    return this.http.get<Eleitor[]>(`${this.API}/findAll`);
  }

  salvarEleitor(formData: FormData): Observable<Eleitor> {
    return this.http.post<Eleitor>(`${this.API}/salvar`, formData);
  }

  editarEleitor(formData: FormData): Observable<Eleitor> {
    return this.http.post<Eleitor>(`${this.API}/salvar`, formData);
  }
}
