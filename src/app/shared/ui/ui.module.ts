import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PageFooterComponent} from "./page-footer/page-footer.component";



@NgModule({
  declarations: [
    CardComponent,
    PageFooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
   exports: [
     CardComponent,
     PageFooterComponent
   ]
})
export class UiModule { }
