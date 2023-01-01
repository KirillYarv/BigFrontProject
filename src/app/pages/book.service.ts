import { Injectable } from '@angular/core';
import { Observable ,of} from 'rxjs';
import { IBook } from '../interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService 
{
  private _currentId:number=1;
  
  private _books :IBook[]= [
    {
      id:this._currentId, 
      author:
      {
        firstName:"Лев",
        lastName:"Толстой"
      }, 
      name: "Война и мир",
      countPages: 1275
    }
  ];

  get books() : Observable<IBook[]>
  {
    return of(this._books);
  }

  constructor() { }

  add(book: IBook) : Observable<IBook[]>
  {
    this._currentId++;
    this._books.push
    (
      {
        id:this._currentId,
        author: {firstName:book.author.firstName,lastName:book.author.lastName},
        name: book.name,
        countPages: book.countPages
      }
    );

    return of();
  }
  edit(book:IBook):Observable<IBook[]>
  {
    this._books[book.id-1].author = book.author;
    this._books[book.id-1].name = book.name;
    this._books[book.id-1].countPages = book.countPages;

    return of();
  }
  remove(id:number):Observable<IBook[]>
  {
    let book: IBook[] = [];
    for (let i = 0; i < this._books.length; i++) 
    {
      if (this._books[i].id != id) {
        book.push(this._books[i]);        
      }
    }
    this._books = book;

    return of();
  }
}
