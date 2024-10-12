import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apuracao } from '../models/apuracao';

@Injectable({
  providedIn: 'root'
})

export class ApuracaoService {
  http = inject(HttpClient)

  API = 'http://localhost:8080/api/votacao/apuracao';

  constructor() { }

  getApuracao(): Observable<Apuracao> {
    return this.http.get<Apuracao>(this.API);
  }
}
