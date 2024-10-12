import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { Router } from '@angular/router';
import { Login } from '../../../models/login';
import { FormsModule, NgModel } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, MdbCollapseModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  login: Login = new Login();
  router = inject(Router)

  authenticar() {
    if (this.login.username == "admin" && this.login.senha == "admin") {
      this.router.navigate(['home'])

      Swal.fire({
        title: "Sucesso!",
        text: "Você entrou!!",
        icon: "success"
      });
    } else

      Swal.fire({
        title: 'Algo deu errado!',
        text: 'Seu nome de usuário ou senha estão incorreto!',
        icon: 'error',
        confirmButtonText: 'Cool'
      })

  }


}