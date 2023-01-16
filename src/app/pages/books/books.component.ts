import { Component, HostListener, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { IBook, IBook1 } from 'src/app/interfaces/IBook';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit
{
  ngOnInit(): void {
    this.bookService.getBooks();
  }
  private _buttonAddmessege: boolean =false;
  
  public get buttonAddmessege() : boolean {return this._buttonAddmessege;}
  
  constructor(public bookService: BookService,public dialog: MatDialog)
  {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if(window.innerWidth<540)
    {
      this._buttonAddmessege = true
    }
    else
    {
      this._buttonAddmessege = false;
    }
  }
  generate()
  {
    this.bookService.generate(10);
  }
  add(): void 
  {
    const dialogRef = this.dialog.open(BookDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.add(result).subscribe();
      }
    });
  }
  edit(book1: IBook1)
  {
    let authorSplit = book1.author.split(" ");
    let book :IBook = {id:book1.id, author: {firstName: authorSplit[1], lastName: authorSplit[0]}, name:book1.name};
    
    const dialogRef = this.dialog.open(BookDialogComponent, {
     data:book});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.edit(result).subscribe();
      }
    });
  }
  remove(id:number)
  {
    this.bookService.remove(id);
  }
}
