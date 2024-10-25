import { Component, inject } from '@angular/core';
import { UrnaService } from '../../services/urna.service';
import { Eleitor } from '../../models/eleitor';
import { CandidatosService } from '../../services/candidatos.service'; // Importe o serviço de candidatos
import { Candidato } from '../../models/candidato'; // Importe o modelo de candidato
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-urna',
	standalone: true,
	imports: [MdbFormsModule, FormsModule, HttpClientModule, CommonModule, NgxMaskDirective, NgxMaskPipe],
	templateUrl: './urna.component.html',
	styleUrls: ['./urna.component.scss'],
	providers: [provideNgxMask()],
})
export class UrnaComponent {
	cpf: string = '';
	eleitor: Eleitor | null = null;
	pin: string = '';
	numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

	isVotingForVereador: boolean = true; // Inicialmente, a votação é para Vereador
	isVotingForPrefeito: boolean = false; // Inicialmente, a votação não é para Prefeito

	candidato: Candidato | null = null; // Armazena as informações do candidato

	candidatoPrefeitoId: number | null = null; // Armazena o ID do candidato a Prefeito
	candidatoVereadorId: number | null = null; // Armazena o ID do candidato a Vereador

	eleitorId: number | null = null; // Armazena o ID do eleitor

	urnaService = inject(UrnaService);
	candidatoService = inject(CandidatosService); // Injeta o serviço de candidatos
	http: HttpClient = inject(HttpClient); // Injetar HttpClient

	consoleLog: boolean = false;

	// Método para capturar a seleção dos botões de rádio
	onRadioChange(event: any) {
		const selectedValue = event.target.id; // Captura o id do botão selecionado
		this.consoleLog = selectedValue === 'impresso'; // Define consoleLog como true ou false
		console.log('Console Log is:', this.consoleLog); // Apenas para teste
	}

	validateCpf(cpf: string): void {
		this.cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

		this.urnaService.findByCpf(this.cpf).subscribe(
			(response: Eleitor) => {
				this.eleitor = response;
				this.isVotingForVereador = true; // Reiniciar votação para vereador
				this.isVotingForPrefeito = false;
				this.candidato = null; // Reiniciar candidato ao validar CPF
				this.eleitorId = this.eleitor.id;
				return this.eleitorId;
			},
			(error) => {
				Swal.fire({
					title: 'Algo deu errado!',
					text: 'Eleitor não encontrado',
					icon: 'error',
					confirmButtonText: 'Ok',
				});
				this.eleitor = null;
			}
		);
	}

	addPin(num: number) {
		this.pin += num.toString();

		// Verifica se o PIN está completo para vereador ou prefeito
		if (this.isVotingForVereador && this.pin.length === 5) {
			this.buscarCandidato(this.pin); // Busca o candidato vereador
		} else if (this.isVotingForPrefeito && this.pin.length === 2) {
			this.buscarCandidato(this.pin); // Busca o candidato prefeito
		}
	}

	buscarCandidato(numero: string): void {
		const num = parseInt(numero, 10); // Converte o número de string para inteiro
		this.candidatoService.findByNumero(num).subscribe({
			next: (data: Candidato) => {
				this.candidato = data; // Armazena as informações do candidato
			},
			error: (err) => {
				console.error('Candidato não encontrado.', err);
				this.candidato = null; // Reinicia o candidato se ocorrer um erro
			},
		});
	}

	clearPin() {
		this.pin = '';
		this.candidato = null; // Limpa a informação do candidato ao limpar o PIN
	}

	submitPin() {
		if (this.isVotingForVereador) {
			console.log('Votou para Vereador com o número:', this.pin);
			this.candidatoVereadorId = this.candidato?.id || null; // Armazena o ID do candidato a Vereador
			Swal.fire({
				title: 'Voto registrado!',
				text: 'Agora vote no Prefeito.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			this.isVotingForVereador = false; // Passa para a votação de Prefeito
			this.isVotingForPrefeito = true;
			this.clearPin();
		} else {
			console.log('Votou para Prefeito com o número:', this.pin);
			this.candidatoPrefeitoId = this.candidato?.id || null; // Armazena o ID do candidato a Prefeito
			Swal.fire({
				title: 'Voto registrado!',
				text: 'Obrigado por votar.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			this.clearPin();
			this.eleitor = null; // Reiniciar o processo de votação

			// Monta o objeto JSON com os candidatos votados
			const votacao = {
				candidatoPrefeito: {
					id: this.candidatoPrefeitoId,
				},
				candidatoVereador: {
					id: this.candidatoVereadorId,
				},
			};

			if (this.consoleLog) {
				// Exibe o Id do eleitor no console
				console.log('ID do Eleitor:', this.eleitorId); // Exibe o ID do eleitor
				// Exibe o objeto JSON no console
				console.log('Votação:', JSON.stringify(votacao, null, 2));
			}

			// Envia a votação usando o método do UrnaService
			this.urnaService.enviarVoto(this.eleitorId, votacao).subscribe({
				next: (response) => {
				  console.log('Voto registrado com sucesso:', response);
				},
				error: (err) => {
				  console.error('Erro ao registrar voto:', err);
				},
			  });
		}
	}
}
