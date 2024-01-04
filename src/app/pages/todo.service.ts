import { Injectable } from '@angular/core';
import { IToDo } from '../interfaces/IToDo';
import { Observable ,of, tap,map} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos :IToDo[]= [];

  get todos() : Observable<IToDo[]>
  {
    return of(this._todos);
  }
  
  constructor(private httpClient:HttpClient) 
  { }
  
  public getTodos(): void
  {
    this.httpClient.get<IToDo[]>(enviroment.spiUrl + 'todo/', {}).subscribe(result=>{this._todos=result});
  }
  

  add(todo: IToDo) : Observable<any>
  {
    let todo1 :IToDo={id:todo.id, name: todo.name,isCompleted:todo.isCompleted, lesson: todo.lesson, data:todo.data};
    
    return this.httpClient.post<IToDo>(enviroment.spiUrl + 'todo/',JSON.stringify(todo1))
    .pipe(
      tap(result => 
      {
        this._todos.push(result);
      },
    ));
  }
  remove(id:number):void
  {
    let todo: IToDo[] = [];
    for (let i = 0; i < this._todos.length; i++) 
    {
      if (this._todos[i].id != id) 
      {
        todo.push(this._todos[i]);        
      }
    }
    this._todos = todo;
    
    this.httpClient.delete<IToDo>(enviroment.spiUrl + 'todo/' + id).subscribe(result=>{});
  }


  edit(todo:IToDo):Observable<IToDo>
  {
    let todo1 :IToDo={id:todo.id, name: todo.name,isCompleted:todo.isCompleted, lesson: todo.lesson, data:todo.data};
    let i = 0;
    
    for (i = 0; i < this._todos.length; i++) 
    {
      if (this._todos[i].id == todo1.id) 
      {
        break;     
      }
    }
    
    this._todos[i].name = todo1.name;
    this._todos[i].lesson = todo1.lesson;
    this._todos[i].isCompleted = todo1.isCompleted;
    this._todos[i].data = todo1.data;
    return this.httpClient.put<IToDo>(enviroment.spiUrl + 'todo/' + todo1.id,JSON.stringify(todo1));
  }

}
