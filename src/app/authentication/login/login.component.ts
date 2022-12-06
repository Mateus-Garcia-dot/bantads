import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("formLogin") formLogin!: NgForm
  public email= ""
  public senha= ""

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.formLogin.invalid){
      this.formLogin.control.markAllAsTouched()
      return
    }
  }

}
