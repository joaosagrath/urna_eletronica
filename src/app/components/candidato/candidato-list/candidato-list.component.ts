import { Component, inject } from '@angular/core';
import { Candidato } from '../../models/candidato';
import { CandidatoFormComponent } from '../candidato-form/candidato-form.component';
import { CandidatosService } from '../../services/candidatos.service';

@Component({
  selector: 'app-candidato-list',
  standalone: true,
  imports: [CandidatoFormComponent],
  templateUrl: './candidato-list.component.html',
  styleUrls: ['./candidato-list.component.scss']
})
export class CandidatoListComponent {
  lista: Candidato[] = [];
  
  // Usando o inject para obter uma instância do serviço
  candidatosService = inject(CandidatosService);

  constructor() {
    this.getAllCandidatos(); // Chama o método no construtor
  }

  getAllCandidatos(): void {
    this.candidatosService.getAllCandidatos().subscribe({
      next: (data) => {
        this.lista = data; // Supondo que a API retorne uma lista de candidatos
      },
      error: (error) => {
        console.error('Erro ao carregar candidatos:', error);
        alert('Erro ao carregar candidatos. Verifique sua conexão ou tente novamente mais tarde.');
      }
    });
  }
}
