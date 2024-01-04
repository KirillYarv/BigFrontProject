import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IToDo } from 'src/app/interfaces/IToDo';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component {
  constructor()
  {}
  
  ngOnInit(): void {
    
  }
  

}
