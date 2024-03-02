import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {SessionService} from "../../../../services/session-service/session.service";

@Component({
  selector: 'navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.scss']
})
export class NavbarHeaderComponent implements OnInit {

  @Output() changeSidebar = new EventEmitter<any>()

  constructor(private session: SessionService) { }

  ngOnInit(): void {
  }

  sidebarChange() {
    this.changeSidebar.emit();
  }

  sidebaOpened() {
    return SidebarComponent.open
  }

  sair() {
    if (confirm('sair do sistema?')) {
      this.session.logout()
    }
  }

  openNewsletter() {
    window.dispatchEvent(new CustomEvent('event-open-newsletter'));
  }

  openLix() {
    window.dispatchEvent(new CustomEvent('event-open-lix'));
  }

}
