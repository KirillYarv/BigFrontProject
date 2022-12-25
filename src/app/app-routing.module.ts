import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from './auth/login/login.component';
import { NotAuthGuard } from './auth/not-auth.guard';

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
    path: "page-1",
    component: Page1Component,
    canActivate: [AuthGuard],
  },
  {
    path: "page-2",
    component: Page2Component,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
