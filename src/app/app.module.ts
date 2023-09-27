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
import {ConfigDgTable, ConfigDynamicTable} from "@datagrupo/dg-ng-util";
import {ConfigDgCurd} from "@datagrupo/dg-crud";
import {ConfigLocalDgCrud} from "./_core/config/dg-crud/config-local-dg-crud";
import {configLocalDgTable} from "./_core/dg-ng-util/config-local-dg-table";
import {configLocalDynamicTable} from "./_core/dg-ng-util/config-local-dynamic-table";


ConfigDynamicTable.set(configLocalDynamicTable)
// ConfigDgTable.set(configLocalDgTable)
ConfigDgCurd.set(ConfigLocalDgCrud)

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {IConfig, NgxMaskModule} from "ngx-mask";

registerLocaleData(localePt);

// config para não impor validação em mascaras NGX-MASK
const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    PublicModule,
    HttpClientModule,
    LayoutsModule,
    UiModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
