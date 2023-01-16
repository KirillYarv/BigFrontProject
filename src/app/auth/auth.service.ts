import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';
import { IloginResponse } from '../interfaces/ILoginResponse';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _accessToken: string | null = null;
  private _userName: string | null = null;

  public get isAuth():boolean { return !!this._accessToken; }
  
  public get accessToken():string | null { return this._accessToken; }
  public get userName():string | null { return this._userName; }

  constructor(private router: Router, private httpsClient:HttpClient) 
  { }

  public login(model: LoginModel) : Observable<IloginResponse>
  {
    let headers = new HttpHeaders({['Content-Type']: 'application/json'});

    return this.httpsClient.post<IloginResponse>(enviroment.spiUrl+'auth/login',JSON.stringify(model),
    {headers:headers})
    .pipe(
      tap(result => 
      {
        this._accessToken = result.accessToken;
        this.parseTokenToModel();
      },
      _ =>
      {
        this._accessToken = null;
        this._userName = null;
      }
      
    ));
  }
  public register(model:RegisterModel):Observable<any>
  {
    let headers = new HttpHeaders({['Content-Type']: 'application/json'});

    return this.httpsClient.post(enviroment.spiUrl + 'auth/register', JSON.stringify(model),
    {headers:headers});
  }
  private parseTokenToModel()
  {
    let arrayofToken = this._accessToken?.split(".")[1] ?? '';
    let JSONString = window.atob(arrayofToken);
    let JSONObject = JSON.parse(JSONString);

    this._userName = JSONObject.name + ' <' + JSONObject.email + '>';
  }
  public loginOut()
  {
    this._accessToken = null;
    this.router.navigate(['/auth/login']);
  }
}
