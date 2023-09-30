import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PageFooterComponent} from "./page-footer/page-footer.component";
import { FiltersComponent } from './filters/filters.component';
import {CdkDynamicGroupModule} from "@datagrupo/dg-ng-util";



@NgModule({
  declarations: [
    CardComponent,
    PageFooterComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CdkDynamicGroupModule
  ],
   exports: [
     CardComponent,
     PageFooterComponent,
     FiltersComponent
   ]
})
export class UiModule { }
