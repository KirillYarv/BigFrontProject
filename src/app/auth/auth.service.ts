import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuth:boolean = false;

  public get isAuth():boolean { return this._isAuth; }
  public set isAuth(value:boolean)
  {
    this._isAuth = value;
    this.router.navigate(this.isAuth ? ['/page-1'] : ['/auth/login'])
  }
  constructor(private router: Router) 
  { }

  public login(login: LoginModel)
  {
    console.log(login.email);
    console.log(login.password);
    this.isAuth = true;
  }

}
