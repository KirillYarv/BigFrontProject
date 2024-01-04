import { Injectable } from '@angular/core';
import { ISession } from '../interfaces/ISession';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _session :ISession[]= [];

  get sessions() : Observable<ISession[]>
  {
    return of(this._session);
  }
  
  constructor(private httpClient:HttpClient) 
  { }
  
  public getSessions()
  {
    this.httpClient.get<ISession[]>(enviroment.spiUrl + 'session/', {}).subscribe(result=>{this._session=result;});
  }
  

  add(__session: ISession) : Observable<any>
  {
    let session :ISession={
      id:__session.id, 
      dataStartSemester: __session.dataStartSemester,
      dataEndSemester: __session.dataEndSemester,
      dataStartSession: __session.dataStartSession
    };
    return this.httpClient.post<ISession>(enviroment.spiUrl + 'session/',JSON.stringify(session))
    .pipe(
      tap(result => 
      {
        this._session.push(result);
      },
    ));
  }

  edit(__session: ISession):Observable<ISession>
  {
    let session :ISession={
      id:__session.id, 
      dataStartSemester: __session.dataStartSemester,
      dataEndSemester: __session.dataEndSemester,
      dataStartSession: __session.dataStartSession,
    };
    let i = 0;
    
    for (i = 0; i < this._session.length; i++) 
    {
      if (this._session[i].id == session.id) 
      {
        break;     
      }
    }
    
    this._session[i].dataStartSemester = session.dataStartSemester;
    this._session[i].dataEndSemester = session.dataEndSemester;
    this._session[i].dataStartSession = session.dataStartSession;
    
    return this.httpClient.put<ISession>(enviroment.spiUrl + 'session/' + session.id,JSON.stringify(session));
  }

}
