import { Pipe, PipeTransform } from '@angular/core';
import { IAuthor } from '../interfaces/IAuthor';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {

  transform(author: IAuthor, ...args: unknown[]): string {
    return author.lastName + ' ' + author.firstName[0]+'.';
  }

}
