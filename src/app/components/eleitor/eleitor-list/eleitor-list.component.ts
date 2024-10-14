import { Component, inject } from '@angular/core';
import { EleitorFormComponent } from '../eleitor-form/eleitor-form.component';
import { Eleitor } from '../../../models/eleitor';
import { EleitoresService } from '../../../services/eleitores.service';
import { CommonModule } from '@angular/common';
import { EleitorModalComponent } from '../eleitor-modal/eleitor-modal.component';


@Component({
  selector: 'app-eleitor-list',
  standalone: true,
  imports: [EleitorFormComponent, CommonModule],
  templateUrl: './eleitor-list.component.html',
  styleUrls: ['./eleitor-list.component.scss'],
})
export class EleitorListComponent {

  lista: Eleitor[] = [];

  // Usando o inject para obter uma instância do serviço
  eleitoresService = inject(EleitoresService);

  constructor() {
    this.getAllEleitores(); // Chama o método no construtor
  }

  abrirModal(eleitor: Eleitor) {
    this.eleitoresService.abrirModal(eleitor);
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

  onEleitorSalvo(): void {
    console.log("Evento candidatoSalvo capturado. Atualizando a lista...");
    // Adicionando um delay de 1 segundo para dar tempo ao backend para atualizar a lista
    setTimeout(() => {
      this.getAllEleitores();
    }, 1000);
  }

}