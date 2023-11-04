import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputNumberComponent } from './input-number/input-number.component';
import {NgxMaskModule} from "ngx-mask";



@NgModule({
  declarations: [
    InputNumberComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        NgxMaskModule,
        ReactiveFormsModule
    ],
  exports: [
    InputNumberComponent
  ]
})
export class CustomInputsModule { }
