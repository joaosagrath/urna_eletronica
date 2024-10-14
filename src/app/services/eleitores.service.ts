import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleitor } from '../models/eleitor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EleitorModalComponent } from '../components/eleitor/eleitor-modal/eleitor-modal.component'; // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class EleitoresService {
  http = inject(HttpClient);
  modalService = inject(NgbModal); // Injetando o serviço de modal

  API_GET = 'http://localhost:8080/api/eleitores/todos';
  API_POST = 'http://localhost:8080/api/eleitores/salvar';

  constructor() { }

  getAllEleitores(): Observable<Eleitor[]> {
    return this.http.get<Eleitor[]>(this.API_GET);
  }

  salvarEleitor(formData: FormData): Observable<Eleitor> {
    return this.http.post<Eleitor>(this.API_POST, formData);
  }
  
  abrirModal(eleitor: Eleitor) {
    const modalRef = this.modalService.open(EleitorModalComponent);
    modalRef.componentInstance.eleitor = eleitor; // Passa o eleitor para o modal
  }
}
