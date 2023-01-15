import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public status = '';

  constructor(public auth: UserAuthService, private userService: UserService, private _router: Router) { }

  public async submitLoginClicked(name: string, password: string) {
    if (name.trim() === '' || password.trim() === '') {
      this.status = 'validationErr';
      return;
    }

    try {
      const loggedIn = await this.auth.login(name, password);
      if (loggedIn) {
        this._router.navigate(["game-builder"]);
      } else {
        this.status = 'invalidCredentials';
      }
    } catch (err) {
      this.status = 'networkErr';
    }
  }

  public async submitRegisterClicked(name: string, password: string) {
    if (name.trim() === '' || password.trim() === '') {
      this.status = 'validationErr';
      return;
    }

    try {
      const succesfulRegister = await this.auth.register(name, password);

      if (succesfulRegister) {
        this.status = "welcome";
      } else {
        this.status = 'invalidCredentials';
      }
    } catch (err) {
      this.status = 'duplicate';
    }
  }
}
