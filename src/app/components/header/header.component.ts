import { Component } from '@angular/core';
import {Router} from "@angular/router";

export class MenuItem {
  name: string;
  display: string;
  route: string;
  selected: boolean;
  constructor(name: string, display: string, route : string, selected: boolean = false) {
    this.name = name;
    this.display = display;
    this.route = route;
    this.selected = selected;
  }

}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems: MenuItem[] = [
    new MenuItem("patientSearch", "SEARCH PATIENT", '/',  true),
    new MenuItem("item2", "MENU ITEM", '/'),
  ]

  constructor(private router: Router) {
  }

  onMenuItemSelected(menuItem: MenuItem){
    this.menuItems = this.menuItems.map(item => {
      menuItem.name == item.name ? item.selected = true: item.selected=false;
      return item;
    });
    this.onRouteSelected(menuItem.route);
  }
  onRouteSelected(route?: string){
    if(route){
      this.router.navigate([route]);
    }
    else {
      this.router.navigate(['/']);
    }
  }
}
