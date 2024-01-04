import { Injectable, OnInit } from '@angular/core';
import { Observable ,of, tap,map} from 'rxjs';
import { IBook, IBook1 } from '../interfaces/IBook';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';
import { AuthorPipe } from '../pipes/author.pipe';

@Injectable({
  providedIn: 'root'
})
export class BookService
{ 
  private _books :IBook1[]= [];

  get books() : Observable<IBook1[]>
  {
    return of(this._books);
  }
  
  private author:AuthorPipe = new AuthorPipe();
  
  constructor(private httpClient:HttpClient) 
  { }
  
  public getBooks(): void
  {
    this.httpClient.get<IBook1[]>(enviroment.spiUrl + 'books/', {}).subscribe(result=>{this._books=result});
  }
  
  add(book: IBook) : Observable<any>
  {
    let book1 :IBook1={id:book.id, author: this.author.transform(book.author),name:book.name};

    return this.httpClient.post<IBook1>(enviroment.spiUrl + 'books/',JSON.stringify(book1))
    .pipe(
      tap(result => 
      {
        this._books.push(result);
      },
    ));
  }
  remove(id:number):void
  {
    let book: IBook1[] = [];
    for (let i = 0; i < this._books.length; i++) 
    {
      if (this._books[i].id != id) 
      {
        book.push(this._books[i]);        
      }
    }
    this._books = book;
    
    this.httpClient.delete<IBook1>(enviroment.spiUrl + 'books/' + id).subscribe(result=>{});
  }


  edit(book:IBook):Observable<IBook1>
  {
    let book1 :IBook1={id:book.id, author: this.author.transform(book.author),name:book.name};
    let i = 0;
    
    for (i = 0; i < this._books.length; i++) 
    {
      if (this._books[i].id == book1.id) 
      {
        break;     
      }
    }
    
    this._books[i].author = book1.author;
    this._books[i].name = book1.name;

    return this.httpClient.put<IBook1>(enviroment.spiUrl + 'books/' + book1.id,JSON.stringify(book1));
  }
}
