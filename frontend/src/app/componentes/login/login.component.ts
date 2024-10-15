import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { Tela1Component } from '../tela1/tela1.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../primary-input/primary-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[
    Tela1Component,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers:[
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:  FormGroup;

  constructor(private router:Router,
              private LoginService: LoginService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,  Validators.minLength(6)])
    })
  }

  submit(){
    console.log(this.loginForm.value)
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next:() => console.log("sucesso" ),
      error:() => console.log("error" )
    })
  }
}
