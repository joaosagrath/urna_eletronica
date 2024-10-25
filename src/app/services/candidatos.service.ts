import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})

export class CandidatosService {

  http = inject(HttpClient)

  API = 'http://localhost:8080/api/candidatos';

  constructor() { }

  findById(id: number) {
    return this.http.get<Candidato>(`${this.API}/findById/${id}`);
  }

  findByNumero(numero: number) {
    return this.http.get<Candidato>(`${this.API}/findByNumero/${numero}`);
  }

  getAllCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.API}/todos`);
  }

  salvarCandidato(formData: FormData): Observable<Candidato> {
    return this.http.post<Candidato>(`${this.API}/salvar`, formData);
  }
}
