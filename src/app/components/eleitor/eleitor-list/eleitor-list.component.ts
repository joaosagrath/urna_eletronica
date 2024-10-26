import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { EleitorFormComponent } from '../eleitor-form/eleitor-form.component';
import { Eleitor } from '../../../models/eleitor';
import { EleitoresService } from '../../../services/eleitores.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
	selector: 'app-eleitor-list',
	standalone: true,
	imports: [EleitorFormComponent, CommonModule, MdbModalModule, EleitorFormComponent],
	templateUrl: './eleitor-list.component.html',
	styleUrls: ['./eleitor-list.component.scss'],
})

export class EleitorListComponent {
	
  modalService = inject(MdbModalService); //
	@ViewChild('modalEleitoresForm') modalEleitoresForm!: TemplateRef<any>;
	modalRef!: MdbModalRef<any>;

	isModalOpen: boolean = false; // Variável para controlar a abertura da modal

	eleitorEdit!: Eleitor;

	editar(eleitor: Eleitor) {
		this.eleitorEdit = eleitor;
		this.eleitorEdit = Object.assign({}, eleitor);
		this.isModalOpen = true; // Define que a modal está aberta
		this.modalRef = this.modalService.open(this.modalEleitoresForm);
	}

	retornoForm() {
		this.isModalOpen = false;
		this.modalRef.close();
		this.getAllEleitores();
	}

	lista: Eleitor[] = [];

	// Usando o inject para obter uma instância do serviço
	eleitoresService = inject(EleitoresService);
	router = inject(Router);

	constructor() {
		this.getAllEleitores(); // Chama o método no construtor
	}

	editEleitor(eleitor: Eleitor): void {
		// alert("AQUI")
		this.router.navigate([`/home/eleitor/edit/${eleitor.id}`]);
	}

	getAllEleitores(): void {
		this.eleitoresService.getAllEleitores().subscribe({
			next: (data) => {
			
				this.lista = data;
			},
			error: (error) => {
				console.error('Erro ao carregar eleitores:', error);
				alert('Erro ao carregar eleitores. Verifique sua conexão ou tente novamente mais tarde.');
			},
		});
	}

	deleteById(eleitor: Eleitor) {}

	onEleitorSalvo(): void {
		console.log('Evento Eleitor capturado. Atualizando a lista...');

		this.modalRef.close();

		// Adicionando um delay de 1 segundo para dar tempo ao backend para atualizar a lista
		setTimeout(() => {
			this.getAllEleitores();
		}, 1000);
	}
}
