import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.formLogin.invalid) {
      this.formLogin.control.markAllAsTouched()
      return
    }
    const success = await this.loginService.login(this.email, this.senha)
    if (!success) {
      this.errorMessage = "Sadge"
      return
    }
    this.errorMessage = "logado"

  }

}
