import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoginService } from './authentication/services/login.service';
import { ClienteModule } from './cliente/cliente.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClienteModule,
    RouterModule,
    AuthenticationModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
