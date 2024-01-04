import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { IToDo } from 'src/app/interfaces/IToDo';
import { TodoService } from '../../todo.service';
import { DataTimePipe } from 'src/app/pipes/data-time.pipe';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent {

  private _buttonMessege: string = "";
  public get buttonMessege(){return this._buttonMessege;}

  private _titleMessege: string = "";
  public get titleMessege(){return this._titleMessege;}

  constructor(private todoService: TodoService,public dialog: MatDialogRef<TodoDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: IToDo,){}

  public todoForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    lesson: new FormControl('',[Validators.required]),
    dataPicker:new FormControl('',[Validators.required]),
  });
  public get name():FormControl
  {
    return this.todoForm.get("name") as FormControl;
  }
  public get lesson():FormControl
  {
    return this.todoForm.get("lesson") as FormControl;
  }
  public get dataPicker():FormControl
  {
    return this.todoForm.get("dataPicker") as FormControl;
  }
  private dataTimePipe:DataTimePipe = new DataTimePipe();
  ngOnInit(): void 
  {
    if (this.data) 
    {

      this.name.setValue(this.data.name);
      this.lesson.setValue(this.data.lesson);
      this.dataPicker.setValue(this.data.data);

      this._buttonMessege = "Изменить";
      this._titleMessege ="Изменение";
    }
    else
    {
      this._buttonMessege = "Добавить";
      this._titleMessege ="Добавление";
    }
  }
  add()
  {
    if(this.todoForm.invalid) return;
    
    if (this.data)
    {
      this.data = {
        id: this.data.id,
        name: this.name.value,
        lesson:this.lesson.value,
        isCompleted:true,
        data: this.dataTimePipe.transform(this.dataPicker.value)+ " " +this.dataPicker.value[11]+this.dataPicker.value[12]+this.dataPicker.value[13]+this.dataPicker.value[14]+this.dataPicker.value[15]
      }
      this.dialog.close(this.data);    
    }
    else
    {
      this.data = {
        id: 0,
        name: this.name.value,
        lesson: this.lesson.value,
        isCompleted: true,
        data: this.dataTimePipe.transform(this.dataPicker.value)+ " " +this.dataPicker.value[11]+this.dataPicker.value[12]+this.dataPicker.value[13]+this.dataPicker.value[14]+this.dataPicker.value[15]
      }
  
      this.dialog.close(this.data);
    }
  }
  public close()
  {
    this.dialog.close();
  }
}
