import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { HostListener } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  title = 'BigFrontProject';
  my ='Моя страница';
  messege='Сообщения';
  logout = 'Logout';
  readonly my_c ='Моя страница';
  readonly messege_c='Сообщения';
  readonly logout_c = 'Logout';
  
  public isOpened: boolean = true;
  screenWidth: number | undefined;

  constructor(private iconRegistry: MatIconRegistry, public authService : AuthService)
  {
    this.getScreenSize();
  }
  
  @HostListener('window:resize', ['$event'])
    getScreenSize() {
      if(window.innerWidth<720)
      {
        this.my = '';
        this.messege = '';
        this.logout = '';
      }
      else
      {
        this.my = this.my_c;
        this.messege = this.messege_c;
        this.logout = this.logout_c;
      }
    }

  ngOnInit()
  {
    this.iconRegistry.setDefaultFontSetClass("material-icons-outlined");
  }

  public openCloseSidenav()
  {
    this.isOpened = !this.isOpened;
  }
  public loginOut()
  {
    this.authService.isAuth = false;
  }
}
