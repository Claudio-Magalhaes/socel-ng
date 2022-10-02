import { Component, OnInit } from '@angular/core';
import {InterfaceMenuList} from "./components/navigation/navigation.component";

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  public navigateMenu: InterfaceMenuList[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
