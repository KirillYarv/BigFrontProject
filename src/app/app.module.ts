import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

//new component
import { Page1Component } from './pages/page1/page1.component';
import { BooksComponent } from './pages/books/books.component';
import { LoginComponent } from './auth/login/login.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { AuthorPipe } from './pipes/author.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    BooksComponent,
    LoginComponent,
    AuthorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
