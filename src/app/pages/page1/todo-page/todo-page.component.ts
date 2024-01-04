import { Component } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IToDo } from 'src/app/interfaces/IToDo';
import { TodoService } from '../../todo.service';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';


@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent {
  constructor(public todoService: TodoService,public dialog: MatDialog)
  {}
  
  ngOnInit(): void {
    this.todoService.getTodos();
  }
  add()
  {
    const dialogRef = this.dialog.open(TodoDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.add(result).subscribe();
      }
    });
  }
  edit(todo:IToDo)
  {
    const dialogRef = this.dialog.open(TodoDialogComponent,{data: todo});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.edit(result).subscribe();
      }
    });
  }
  remove(id:number):void
  {
    this.todoService.remove(id);
  }
  protected stringToInt(value:string):number
  {
    let month:number = +(value.toString().charAt(0)+value.toString().charAt(1));
    let day:number = +(value.toString().charAt(3)+value.toString().charAt(4));
    let year:number = +(value.toString().charAt(6)+value.toString().charAt(7)+value.toString().charAt(8)+value.toString().charAt(9));
    let hour:number = +(value.toString().charAt(11)+value.toString().charAt(12));
    let minute:number = +(value.toString().charAt(14)+value.toString().charAt(15));
    
    return +new Date(year,month-1,day,hour,minute)-+new Date();
  }
}
