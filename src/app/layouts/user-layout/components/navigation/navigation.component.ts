import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface InterfaceMenuList {
  url?: string,
  nome: string,
  icon: string,
  subMenu?: InterfaceMenuList[]
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [
    './navigation.component.scss',
    './scss/minify-navigation.component.scss'
  ]
})
export class NavigationComponent implements OnInit {

  @Input('listNavigation') listNavigation: InterfaceMenuList[] | undefined = [];
  @Input('open') open?: boolean = true;
  @Input('isSubmenu') isSubmenu?: boolean = false;
  @Input('startHr') startHr = false
  @Input('endHr') endHr = false

  @Output() changedropdown = new EventEmitter<boolean>()
  public IconDropdown = false;

  constructor() { }

  ngOnInit(): void {
  }

  public click() {
    this.open = !this.open;
    this.changedropdown.emit(this.open)
  }

  public activeItemMenu(menu: InterfaceMenuList, dropdown = false) {
    if (menu.url) {
      if (window.location.pathname === menu.url) {
        return true;
      } else if (dropdown) {
        return this.activeSubmenuUrl(menu);
      }
    }

    return false;
  }

  public activeSubmenuUrl(menu: InterfaceMenuList){
    if (menu.url){
      if (window.location.pathname === menu.url) {
        return true;
      } else {
        const currentUrl = window.location.pathname.split('/');
        let comparaUrl: string[] = [];

        menu.url.split('/').map((path, index) => {
          comparaUrl.push(currentUrl[index]);
        })

        return comparaUrl.join('/') === menu.url;
      }
    }
    return false;
  }

  getOpen = () => {
    return this.open;
  }

  redirectExternalLink(url: string = '') {
    if (url.startsWith('http') || url.startsWith('www')) {
      window.open(url, '_blank')
    }
  }

  clearExternalLinkUrl(url: string = '') {
    if (url.startsWith('http') || url.startsWith('www')) {
      return undefined;
    }

    return url
  }
}
