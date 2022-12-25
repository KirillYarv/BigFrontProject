import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
  });

  public get email():FormControl
  {
    return this.loginForm.get("email") as FormControl;
  }
  public get password():FormControl
  {
    return this.loginForm.get("password") as FormControl;
  }

  constructor(public authService: AuthService){}

  public login()
  {
    let model = new LoginModel(this.email.value,this.password.value);
    this.authService.login(model);
  }
}
