import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Candidato } from '../../../models/candidato';
import { CandidatoFormComponent } from '../candidato-form/candidato-form.component';
import { CandidatosService } from '../../../services/candidatos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
	selector: 'app-candidato-list',
	standalone: true,
	imports: [CandidatoFormComponent, CommonModule],
	templateUrl: './candidato-list.component.html',
	styleUrls: ['./candidato-list.component.scss'],
	providers: [MdbModalService] // Adicionando o MdbModalService aos providers
})

export class CandidatoListComponent {

	modalService = inject(MdbModalService); //
	@ViewChild('modalCandidatosForm') modalEleitoresForm!: TemplateRef<any>;
	modalRef!: MdbModalRef<any>;

	isModalOpen: boolean = false; // Variável para controlar a abertura da modal

	candidatoEdit!: Candidato;
	
	editar(candidato: Candidato) {
		this.candidatoEdit = candidato;
		this.candidatoEdit = Object.assign({}, candidato);
		this.isModalOpen = true; // Define que a modal está aberta
		this.modalRef = this.modalService.open(this.modalEleitoresForm);
	}

	retornoForm() {
		this.isModalOpen = false;
		this.modalRef.close();
		this.getAllCandidatos();
	}
	 
	lista: Candidato[] = [];
	
	// Usando o inject para obter uma instância do serviço
	candidatosService = inject(CandidatosService);
	router = inject(Router);

	constructor() {
		this.getAllCandidatos(); // Chama o método no construtor
	}
	
	editCandidato(candidato: Candidato): void {
		// alert("AQUI")
		this.router.navigate([`/home/candidato/edit/${candidato.id}`]);
	}

	getAllCandidatos(): void {
		this.candidatosService.getAllCandidatos().subscribe({
			next: (data) => {
				console.log('Lista de candidatos carregada:', data); // Log para verificar os dados recebidos
				this.lista = data; // Supondo que a API retorne uma lista de candidatos
			},
			error: (error) => {
				console.error('Erro ao carregar candidatos:', error);
				alert('Erro ao carregar candidatos. Verifique sua conexão ou tente novamente mais tarde.');
			},
		});
	}

	deleteById(candidato: Candidato) {}
	
	onCandidatoSalvo(): void {
		console.log('Evento candidatoSalvo capturado. Atualizando a lista...');
		
		this.modalRef.close();
		
		// Adicionando um delay de 1 segundo para dar tempo ao backend para atualizar a lista
		setTimeout(() => {
			this.getAllCandidatos();
		}, 1000);
	}
}
