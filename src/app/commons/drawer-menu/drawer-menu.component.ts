import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-drawer-menu',
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.scss']
})
export class DrawerMenuComponent implements OnInit {
  showFiller = false;

  public links = [
    {
      link: '/',
      icon: 'home',
      text: 'Home',
    },
    {
      link: '/dashboard',
      icon: 'dashboard',
      text: 'Dashboard',
    },
    {
      link: '/viewer',
      icon: 'graphic_eq',
      text: 'View Graph',
    },
    {
      link: '/upload',
      icon: 'cloud_upload',
      text: 'Upload Graph',
    },
    {
      link: '/about',
      icon: 'info',
      text: 'About',
    },
  ];
  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }

}
