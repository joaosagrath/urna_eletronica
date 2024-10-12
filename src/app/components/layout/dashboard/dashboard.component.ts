import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { ApuracaoService } from '../../../services/apuracao.service';
import { withFetch } from '@angular/common/http'; // Adicione isso

interface Candidato {
  id: number;
  nomeCompleto: string;
  numero: number;
  cargo: string;
  status: string;
  votosTotais: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgxChartsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  candidatosPrefeito: Candidato[] = [];
  candidatosVereador: Candidato[] = [];
  
  // Adiciona arrays separados para os gráficos
  graficoPrefeito: { name: string; value: number; }[] = [];
  graficoVereador: { name: string; value: number; }[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private apuracaoService: ApuracaoService) {}

  ngOnInit(): void {
    this.apuracaoService.getApuracao().subscribe({
      next: data => {
        // console.log('Resposta da API:', data);
  
        if (data && data.candidatosPrefeito && data.candidatosVereador) {
          
          this.candidatosPrefeito = data.candidatosPrefeito;
          this.candidatosVereador = data.candidatosVereador;
  
          this.graficoPrefeito = this.candidatosPrefeito.map((candidato: Candidato) => ({
            name: candidato.nomeCompleto,
            value: candidato.votosTotais
          }));
  
          this.graficoVereador = this.candidatosVereador.map((candidato: Candidato) => ({
            name: candidato.nomeCompleto,
            value: candidato.votosTotais
          }));
  
          // console.log('Grafico Prefeito:', this.graficoPrefeito);
          // console.log('Grafico Vereador:', this.graficoVereador);
       
        } else {
          //console.error('Dados da API estão no formato incorreto ou vazios.');
        }
      },
      error: (error) => {
        console.error('Ocorreu um erro ao buscar a apuração:', error);
        alert('Erro ao carregar a apuração. Verifique sua conexão ou tente novamente mais tarde.');
      }
    });
  }

}
