import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: 
  [
    BookDialogComponent,
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class BookModule { }
