import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})

export class CandidatosService {
  http = inject(HttpClient)

  API_GET = 'http://localhost:8080/api/candidatos/todos';
  API_POST = 'http://localhost:8080/api/candidatos/salvar';

  constructor() { }

  getAllCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(this.API_GET);
  }

  salvarCandidato(candidato: Candidato): Observable<Candidato> {
    return this.http.post<Candidato>(this.API_POST, candidato);
  }
}
