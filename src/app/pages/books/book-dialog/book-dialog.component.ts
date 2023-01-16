import { Component, Inject, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { IBook } from 'src/app/interfaces/IBook';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit
{
  private _buttonMessege: string = "";
  public get buttonMessege(){return this._buttonMessege;}

  private _titleMessege: string = "";
  public get titleMessege(){return this._titleMessege;}
  constructor(private bookService: BookService,public dialog: MatDialogRef<BookDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: IBook,){}
  
  public bookForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    //countPages:new FormControl('',[Validators.required]),
  });

  public get firstName():FormControl
  {
    return this.bookForm.get("firstName") as FormControl;
  }
  public get lastName():FormControl
  {
    return this.bookForm.get("lastName") as FormControl;
  }
  public get name():FormControl
  {
    return this.bookForm.get("name") as FormControl;
  }
  // public get countPages():FormControl
  // {
  //   return this.bookForm.get("countPages") as FormControl;
  // }

  ngOnInit(): void 
  {
    if (this.data) 
    {
      this.firstName.setValue(this.data.author.firstName);
      this.lastName.setValue(this.data.author.lastName);
      this.name.setValue(this.data.name);
      //this.countPages.setValue(this.data.countPages);

      this._buttonMessege = "Изменить";
      this._titleMessege ="Изменение";
    }
    else
    {
      this._buttonMessege = "Добавить";
      this._titleMessege ="Добавление";
    }

  }

  public add()
  {
    if(this.bookForm.invalid) return;
    
    if (this.data)
    {
      this.data = {
        id: this.data.id,
        author: {firstName: this.firstName.value, lastName: this.lastName.value},
        name: this.name.value,
        //countPages: this.countPages.value
      }
      this.dialog.close(this.data);    
    }
    else
    {
      this.data = {
        id: 0,
        author: {firstName: this.firstName.value, lastName: this.lastName.value},
        name: this.name.value,
        //countPages: this.countPages.value
      }
  
      this.dialog.close(this.data);
    }
  }
  public close()
  {
    this.dialog.close();
  }
}
