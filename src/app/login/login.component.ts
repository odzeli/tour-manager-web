import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email], ),
      password: new FormControl('', Validators.required)
    });
  }

  public login = (login: Login) => {
    if (this.loginForm.valid) {
      this.authService.login(login.email, login.password)
        .subscribe(
          res => {
            this.router.navigate(['/dashboard'])
          },
          error => {
            alert("Wrong login or password.");
          });
    }
  }

  public logout = () => {
    this.authService.logout();
  }

}

export class Login {
  public email: string;
  public password: string;
}
