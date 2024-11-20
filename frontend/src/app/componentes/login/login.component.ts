import { Usuario } from './../cadastroUser/usuario.model';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  private readonly apiUrl = environment.apiUrl;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = this.loginForm.value;


    this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).subscribe({
      next: (response) => {
        console.log(response)

        localStorage.setItem('token', response.bearer);

        this.router.navigate(['/menuInicial']);
      },
      error: (err) => {

        if (err.status === 401) {
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        } else if (err.status === 500) {
          this.errorMessage = 'Erro no servidor. Tente mais tarde.';
        } else {
          this.errorMessage = 'Erro inesperado. Entre em contato com o suporte.';
        }
        console.error(err);
      },
    });
  }
}
