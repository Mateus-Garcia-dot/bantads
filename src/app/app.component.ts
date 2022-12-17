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

  async ngOnInit() {
    this.router.events.subscribe(async event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isLoggedIn = await this.loginService.isLoggedIn()
      }
    })
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['/']);
  }

}
