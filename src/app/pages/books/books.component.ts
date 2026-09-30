import { Component, HostListener, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import {MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { IBook, IBook1 } from '../../interfaces/IBook';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit
{
  ngOnInit(): void {
    this.bookService.getBooks();
  }
  private _buttonAddmessege: boolean =false;
  
  public get buttonAddmessege(): boolean { return this._buttonAddmessege; }
  
  constructor(public bookService: BookService, public dialog: MatDialog)
  {
    this.getScreenSize();
  }

  @HostListener('window:resize')
  getScreenSize(): void
  {
    if (window.innerWidth < 600) {
      this._buttonAddmessege = true
    } else {
      this._buttonAddmessege = false;
    }
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

  edit(book1: IBook1): void
  {
    let authorSplit = book1.author.split(" ");
    let book :IBook = {
      id: book1.id, 
      author: {
        firstName: authorSplit[1], 
        lastName: authorSplit[0]
      }, 
      name: book1.name
    };
    
    const dialogRef = this.dialog.open(BookDialogComponent, {
     data:book});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.edit(result).subscribe();
      }
    });
  }

  remove(id:number): void
  {
    this.bookService.remove(id);
  }
}
