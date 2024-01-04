import { Injectable } from '@angular/core';
import { ISchedule } from '../interfaces/ISchedule';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private _schedule :ISchedule[]= [];

  get schedules() : Observable<ISchedule[]>
  {
    return of(this._schedule);
  }
  
  constructor(private httpClient:HttpClient) 
  { }
  
  public getSchedules(): void
  {
    this.httpClient.get<ISchedule[]>(enviroment.spiUrl + 'schedule/', {}).subscribe(result=>{this._schedule=result});
  }
  

  add(__schedule: ISchedule) : Observable<any>
  {
    let schedule :ISchedule={
      id:__schedule.id, 
      name: __schedule.name,
      place: __schedule.place,
      teacher: __schedule.teacher,
      time: __schedule.time,
      type: __schedule.type,
      week: __schedule.week,
      data: __schedule.data
    };
    return this.httpClient.post<ISchedule>(enviroment.spiUrl + 'schedule/',JSON.stringify(schedule))
    .pipe(
      tap(result => 
      {
        this._schedule.push(result);
      },
    ));
  }
  remove(id:number):void
  {
    let schedule: ISchedule[] = [];
    for (let i = 0; i < this._schedule.length; i++) 
    {
      if (this._schedule[i].id != id) 
      {
        schedule.push(this._schedule[i]);        
      }
    }
    this._schedule = schedule;
    
    this.httpClient.delete<ISchedule>(enviroment.spiUrl + 'schedule/' + id).subscribe(result=>{});
  }


  edit(__schedule:ISchedule):Observable<ISchedule>
  {
    let schedule :ISchedule={
      id:__schedule.id, 
      name: __schedule.name,
      place: __schedule.place,
      teacher: __schedule.teacher,
      time: __schedule.time,
      type: __schedule.type,
      week: __schedule.week,
      data: __schedule.data
    };
    let i = 0;
    
    for (i = 0; i < this._schedule.length; i++) 
    {
      if (this._schedule[i].id == schedule.id) 
      {
        break;     
      }
    }
    
    this._schedule[i].name = schedule.name;
    this._schedule[i].place = schedule.place;
    this._schedule[i].teacher = schedule.teacher;
    this._schedule[i].time = schedule.time;
    this._schedule[i].type = schedule.type;
    this._schedule[i].week = schedule.week;
    return this.httpClient.put<ISchedule>(enviroment.spiUrl + 'schedule/' + schedule.id,JSON.stringify(schedule));
  }

}
