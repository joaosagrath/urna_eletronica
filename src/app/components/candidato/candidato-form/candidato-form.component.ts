import { Component, EventEmitter, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CandidatosService } from '../../../services/candidatos.service';
import { Candidato } from '../../../models/candidato';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-candidato-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, HttpClientModule],
  templateUrl: './candidato-form.component.html',
  styleUrls: ['./candidato-form.component.scss']
})

export class CandidatoFormComponent {
  

  candidato: Candidato = new Candidato();

  // Evento para notificar quando o candidato for salvo
  @Output() candidatoSalvo: EventEmitter<void> = new EventEmitter<void>();

  selectedFile: File | null = null; // Para armazenar o arquivo selecionado

  constructor(private candidatosService: CandidatosService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Armazena o arquivo selecionado
      console.log("Arquivo selecionado:", this.selectedFile); // Log para verificar o arquivo
    } else {
      console.log("Nenhum arquivo foi selecionado."); // Log se nenhum arquivo foi selecionado
    }
  }

  salvarCandidato() {
    console.log("Nome: " + this.candidato.nomeCompleto);
    console.log("Numero: " + this.candidato.numero);
    console.log("Cargo: " + this.candidato.cargo);
    console.log("Foto: ", this.selectedFile); // Log para verificar o arquivo selecionado
  
    if (this.candidato.nomeCompleto && this.candidato.numero && this.candidato.cargo && this.selectedFile) {
      const formData = new FormData();
      formData.append('candidato', new Blob([JSON.stringify(this.candidato)], { type: 'application/json' }));
      formData.append('foto', this.selectedFile);
  
      this.candidatosService.salvarCandidato(formData).subscribe({
        next: (response) => {
          Swal.fire('Sucesso!', 'Candidato salvo com sucesso!', 'success');
          this.limparFormulario();
        },
        error: (error) => {
          console.error("Erro ao salvar candidato:", error); // Log do erro para ajudar na depuração
          Swal.fire('Erro!', 'Houve um problema ao salvar o candidato.', 'error');
        }
      });
    } else {
      Swal.fire('Atenção!', 'Preencha todos os campos e selecione uma foto.', 'warning');
    }
  }
  

      limparFormulario() {
        this.candidato = {
          nomeCompleto: '',
          numero: 0,
          cargo: '',
          foto: ''
        };
        this.selectedFile = null; // Limpa o arquivo selecionado
      }
    }