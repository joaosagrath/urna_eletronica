import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Eleitor } from '../../../models/eleitor';
import { EleitoresService } from '../../../services/eleitores.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-eleitor-form',
	standalone: true,
	imports: [MdbFormsModule, FormsModule, HttpClientModule, CommonModule, NgxMaskDirective, NgxMaskPipe],
	templateUrl: './eleitor-form.component.html',
	styleUrls: ['./eleitor-form.component.scss'],
	providers: [provideNgxMask()],
})

export class EleitorFormComponent {
	@Input() eleitor: Eleitor = new Eleitor();
	@Output() eleitorSalvo = new EventEmitter();

	selectedFile: File | null = null; // Para armazenar o arquivo selecionado
	imageSrc: any;

    @Input() isModalOpen: boolean = false;

	// INJECT
	eleitoresService = inject(EleitoresService);
	rotaAtivada = inject(ActivatedRoute);

	constructor() {
		let id = this.rotaAtivada.snapshot.params['id'];
		if (id > 0) this.getEleitorById(id);
	}

	// Método para buscar os dados do eleitor pelo ID
	getEleitorById(id: number): void {
		this.eleitoresService.findById(id).subscribe({
			next: (data: Eleitor) => {
				this.eleitor = data; // Preencher os inputs com os dados retornados
			},
			error: (error) => {
				console.error('Erro ao buscar eleitor:', error);
				alert('Erro ao buscar eleitor. Tente novamente mais tarde.');
			},
		});
	}

	onFileChange(event: Event): void {
		const input = event.target as HTMLInputElement;

		if (input.files && input.files.length > 0) {
			this.selectedFile = input.files[0]; // Armazena o arquivo selecionado
			console.log('Arquivo selecionado:', this.selectedFile); // Log para verificar o arquivo

			const reader = new FileReader();

			// Carregar o arquivo como URL para exibição
			reader.onload = () => {
				this.imageSrc = reader.result as string; // Define a URL da imagem para pré-visualização
			};

			reader.readAsDataURL(this.selectedFile); // Lê o arquivo como Data URL para exibição
		} else {
			console.log('Nenhum arquivo foi selecionado.'); // Log se nenhum arquivo foi selecionado
			this.imageSrc = null; // Reseta a pré-visualização se nenhum arquivo for selecionado
		}
	}

	salvarEleitor() {
		console.log('Nome: ' + this.eleitor.nomeCompleto);
		console.log('CPF: ' + this.eleitor.cpf);
		console.log('Profissão: ' + this.eleitor.profissao);
		console.log('Celular: ' + this.eleitor.telefoneCelular);
		console.log('Telefone: ' + this.eleitor.telefoneFixo);
		console.log('Email: ' + this.eleitor.email);
		console.log('Foto: ', this.selectedFile); // Log para verificar o arquivo selecionado

		// Aplica a formatação correta aos campos antes de enviar
		this.eleitor.cpf = this.formatarCPF(this.eleitor.cpf);
		this.eleitor.telefoneCelular = this.formatarCelular(this.eleitor.telefoneCelular);
		this.eleitor.telefoneFixo = this.formatarTelefone(this.eleitor.telefoneFixo);
		this.eleitor.email = this.formatarEmail(this.eleitor.email);

		const formData = new FormData();
		formData.append(
			'eleitor',
			new Blob([JSON.stringify(this.eleitor)], {
				type: 'application/json',
			})
		);

		// Verifica se selectedFile não é null antes de adicionar ao formData
		if (this.selectedFile) {
			formData.append('foto', this.selectedFile);
		} else {
			console.warn('Nenhum arquivo selecionado para enviar.');
		}

		if (this.eleitor.status) {
			this.eleitor.status = 'VERIFICAR';
		}

		this.eleitoresService.salvarEleitor(formData).subscribe({
			next: (response) => {

                this.eleitorSalvo.emit(response);

				Swal.fire('Sucesso!', 'Eleitor salvo com sucesso!', 'success');
				this.limparFormulario();
				this.eleitorSalvo.emit();
			},
			error: (error) => {
				console.error('Erro ao salvar eleitor:', error);
				Swal.fire('Erro!', 'Houve um problema ao salvar o eleitor.', 'error');
			},
		});
	}

	// Formatar CPF no formato esperado
	formatarCPF(cpf: string): string {
		if (cpf) {
			// alert(cpf);
			// Exemplo de formatação do CPF
			return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
		} else {
			// Exemplo de formatação do CPF
			return (cpf = '');
		}
	}

	// Formatar telefone celular no formato esperado
	formatarCelular(celular: string): string {
		// Exemplo de formatação do telefone celular
		return celular.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
	}

	// Formatar telefone fixo no formato esperado
	formatarTelefone(telefone: string): string {
		// Exemplo de formatação do telefone fixo
		return telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
	}

	// Formatar telefone fixo no formato esperado
	formatarEmail(email: string): string {
		if (email) {
			// Exemplo de formatação do telefone fixo
			return email;
		} else {
			return '';
		}
	}

	limparFormulario() {
		this.eleitor = {
			id: 0,
			nomeCompleto: '',
			cpf: '',
			profissao: '',
			telefoneCelular: '',
			telefoneFixo: '',
			email: '',
			status: '',
			foto: '',
		};
		this.selectedFile = null; // Limpa o arquivo selecionado
	}
}
