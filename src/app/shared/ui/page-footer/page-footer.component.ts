import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from "../../../layouts/user-layout/components/sidebar/sidebar.component";

@Component({
  selector: 'page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {

  public sidebaOpened2 = true

  constructor() { }

  ngOnInit(): void {
    document.getElementsByClassName('router-outlet-root')[0].classList.add('pagind-footer');
  }

  sidebaOpened() {
    return SidebarComponent.open
  }
}
