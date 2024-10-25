import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { EleitoresService } from '../../../services/eleitores.service';
import { CandidatosService } from '../../../services/candidatos.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgxChartsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Arrays para armazenar os dados formatados
  graficoEleitores: any[] = [];
  graficoCandidatos: any[] = [];

  // Configuração de cores
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private eleitoresService: EleitoresService,
    private candidatosService: CandidatosService
  ) {}

  ngOnInit(): void {
    this.carregarEleitores();
    this.carregarCandidatos();
  }

  // Método para carregar e agrupar dados dos eleitores por status
  carregarEleitores() {
    this.eleitoresService.getAllEleitores().subscribe((eleitores) => {
      // Define um tipo para armazenar as contagens de status
      const eleitoresPorStatus: { [key: string]: number } = {};

      // Agrupa eleitores por status e conta a quantidade de cada status
      eleitores.forEach(eleitor => {
        eleitoresPorStatus[eleitor.status] = (eleitoresPorStatus[eleitor.status] || 0) + 1;
      });

      // Converte o objeto agrupado em um array para o gráfico
      this.graficoEleitores = Object.keys(eleitoresPorStatus).map(status => ({
        name: status,
        value: eleitoresPorStatus[status]
      }));
    });
  }

  // Método para carregar e agrupar dados dos candidatos por status
  carregarCandidatos() {
    this.candidatosService.getAllCandidatos().subscribe((candidatos) => {
      // Define um tipo para armazenar as contagens de status
      const candidatosPorStatus: { [key: string]: number } = {};

      // Agrupa candidatos por status e conta a quantidade de cada status
      candidatos.forEach(candidato => {
        candidatosPorStatus[candidato.status] = (candidatosPorStatus[candidato.status] || 0) + 1;
      });

      // Converte o objeto agrupado em um array para o gráfico
      this.graficoCandidatos = Object.keys(candidatosPorStatus).map(status => ({
        name: status,
        value: candidatosPorStatus[status]
      }));
    });
  }

}
