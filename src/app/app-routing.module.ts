import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './pages/page1/page1.component';
import { BooksComponent } from './pages/books/books.component';
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from './auth/login/login.component';
import { NotAuthGuard } from './auth/not-auth.guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "page-1",
    pathMatch: "full",
  },
  {
    path:"auth/login",
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path:"auth/register",
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: "page-1",
    component: Page1Component,
    canActivate: [AuthGuard],
  },
  {
    path: "books",
    component: BooksComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import("./pages/books/book/book.module").then((n) => n.BookModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
