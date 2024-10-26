import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Eleitor } from '../models/eleitor';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})

export class UrnaService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/api';

  constructor() { }

  findByCpf(cpf: string) {
    return this.http.get<Eleitor>(`${this.API}/eleitores/findByCpf/${cpf}`);
  }

  enviarVoto(eleitorId: number | null, votacao: any) {
    
    console.log(`${this.API}/votos/${eleitorId}`);

    return this.http.post(`${this.API}/votos/${eleitorId}`, votacao, {
      responseType: 'text' as 'json',
    });
  }


}
