import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page1Component } from '../page1.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = 
[
  {
    path: '',
    component: Page1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page1RoutingModule { }
