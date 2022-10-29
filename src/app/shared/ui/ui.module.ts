import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import {ModalComponent} from "./modal/modal.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    CardComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
   exports: [
     CardComponent,
     ModalComponent
   ]
})
export class UiModule { }
