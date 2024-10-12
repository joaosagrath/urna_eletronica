/*import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-candidato-form',
  standalone: true,
  imports: [MdbFormsModule],
  templateUrl: './candidato-form.component.html',
  styleUrl: './candidato-form.component.scss'
})
export class CandidatoFormComponent {

}*/

import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CandidatosService } from '../../../services/candidatos.service';
import { Candidato } from '../../../models/candidato';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-candidato-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, HttpClientModule],
  templateUrl: './candidato-form.component.html',
  styleUrls: ['./candidato-form.component.scss']
})

export class CandidatoFormComponent {

  candidato: Candidato = new Candidato();

  constructor(private candidatosService: CandidatosService) {}

  salvarCandidato() {

    if (this.candidato.nomeCompleto && this.candidato.numero && this.candidato.cargo) {

      console.log("Nome: " + this.candidato.nomeCompleto)
      console.log("Numero: " + this.candidato.numero)
      console.log("Cargo: " + this.candidato.cargo)

      // Adicionando log para exibir o JSON que será enviado
      console.log("JSON a ser enviado:", JSON.stringify(this.candidato));
      
      this.candidatosService.salvarCandidato(this.candidato).subscribe({
        next: (response) => {
          Swal.fire('Sucesso!', 'Candidato salvo com sucesso!', 'success');
          this.limparFormulario();
        },
        error: (error) => {
          console.log("Erro: ", error)
          Swal.fire('Erro!', 'Houve um problema ao salvar o candidato.', 'error');
        }
      });
    } else {
      Swal.fire('Atenção!', 'Preencha todos os campos.', 'warning');
    }
  }

  limparFormulario() {
    this.candidato = {
      nomeCompleto: '',
      numero: 0,
      cargo: '',
    };
  }
}
