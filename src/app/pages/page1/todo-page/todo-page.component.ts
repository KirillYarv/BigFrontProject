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
}
