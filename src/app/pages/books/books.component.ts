import { Component, HostListener } from '@angular/core';
import { BookService } from '../book.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { IBook } from 'src/app/interfaces/IBook';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

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

  add(): void 
  {
    const dialogRef = this.dialog.open(BookDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.add(result).subscribe();
      }
    });
  }
  edit(book: IBook)
  {
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
