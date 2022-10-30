import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-logo',
  templateUrl: './sidebar-logo.component.html',
  styleUrls: ['./sidebar-logo.component.scss']
})
export class SidebarLogoComponent implements OnInit {

  @Input('url-img') img: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
