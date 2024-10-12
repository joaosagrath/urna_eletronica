import { Component, inject } from '@angular/core';
import { EleitorFormComponent } from '../eleitor-form/eleitor-form.component';
import { Eleitor } from '../../models/eleitor';
import { EleitoresService } from '../../services/eleitores.service';
import { error } from 'console';

@Component({
  selector: 'app-eleitor-list',
  standalone: true,
  imports: [EleitorFormComponent],
  templateUrl: './eleitor-list.component.html',
  styleUrl: './eleitor-list.component.scss'
})
export class EleitorListComponent {

  lista: Eleitor [] = [];

  // Usando o inject para obter uma instância do serviço
  eleitoresService = inject(EleitoresService);

  constructor() {
    this.getAllEleitores(); // Chama o método no construtor
  }

  getAllEleitores(): void {
    this.eleitoresService.getAllEleitores().subscribe({
      next: (data) => {
        this.lista = data;
      },
      error: (error) => {
        console.error('Erro ao carregar eleitores:', error);
        alert('Erro ao carregar eleitores. Verifique sua conexão ou tente novamente mais tarde.');
      }
    });
  }
  
}