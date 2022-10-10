import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserModule} from "./pages/_user/user.module";
import {PublicModule} from "./pages/_public/public.module";
import {HttpClientModule} from "@angular/common/http";
import {LayoutsModule} from "./layouts/layouts.module";
import {UiModule} from "./shared/ui/ui.module";
import {ProdutosModule} from "./pages/_user/produtos/produtos.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    ProdutosModule,
    PublicModule,
    HttpClientModule,
    LayoutsModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
