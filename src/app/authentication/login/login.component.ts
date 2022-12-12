import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("formLogin") formLogin!: NgForm
  public email = ""
  public senha = ""
  public errorMessage = ""

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.loginService.getUsuario() !== null) {
      this.router.navigate(['/home']);
    }
  }

  async onSubmit() {
    if (this.formLogin.invalid) {
      this.formLogin.control.markAllAsTouched()
      return
    }
    const success = await this.loginService.login(this.email, this.senha)
    if (!success) {
      this.errorMessage = "Usuario ou senha incorretos"
      return
    }
    this.router.navigate(['/home']);
  }

}
