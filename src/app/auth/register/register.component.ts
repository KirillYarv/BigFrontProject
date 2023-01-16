import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/register.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent 
{
  constructor(private router: Router, public authService: AuthService) 
  { }

  public registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
  });

  public get name():FormControl
  {
    return this.registerForm.get("name") as FormControl;
  }
  public get email():FormControl
  {
    return this.registerForm.get("email") as FormControl;
  }
  public get password():FormControl
  {
    return this.registerForm.get("password") as FormControl;
  }
  register():void
  {
    let model = new RegisterModel(this.name.value,this.email.value,this.password.value);
    
    this.authService.register(model).subscribe
    (
      result => {this.router.navigate(['/page-1'])}
    );
  }
}
