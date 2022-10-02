import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import {RouterModule} from "@angular/router";
import {SidebarLogoComponent} from "./user-layout/components/sidebar-logo/sidebar-logo.component";
import {SidebarComponent} from "./user-layout/components/sidebar/sidebar.component";
import {NavigationComponent} from "./user-layout/components/navigation/navigation.component";
import {MatIconModule} from "@angular/material/icon";
import {NavbarHeaderComponent} from "./user-layout/components/navbar-header/navbar-header.component";



@NgModule({
  declarations: [
    UserLayoutComponent,
    SidebarLogoComponent,
    SidebarComponent,
    NavigationComponent,
    NavbarHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class LayoutsModule { }
