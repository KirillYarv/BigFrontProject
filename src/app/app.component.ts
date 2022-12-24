import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'BigFrontProject';
  my ='Моя страница';
  messege='Сообщения'
  readonly my_c ='Моя страница';
  readonly messege_c='Сообщения'

  public isOpened: boolean = true;
  public isLowerThen: boolean = false;
  screenWidth: number | undefined;
  
  @HostListener('window:resize', ['$event'])
    getScreenSize() {
      if(window.innerWidth<720)
      {
        this.my = '';
        this.messege = '';
      }
      else
      {
        this.my = this.my_c;
        this.messege = this.messege_c;
      }
    }
  constructor(private iconRegistry: MatIconRegistry, ){}

  ngOnInit()
  {
    this.iconRegistry.setDefaultFontSetClass("material-icons-outlined");
  }

  public openCloseSidenav() :void
  {
    this.isOpened = !this.isOpened;
  }
}
