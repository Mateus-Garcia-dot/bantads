import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './authentication/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bantads';
  isLoggedIn = false

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        if (!this.loginService.getUsuario()) {
          this.isLoggedIn = false
          return
        }
        this.isLoggedIn = true
      }
    })
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['/']);
  }

}
