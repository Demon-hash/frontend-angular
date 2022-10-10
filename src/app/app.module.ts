import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SocketIoModule } from "ngx-socket-io";
import { CookieModule } from "ngx-cookie";

import { environment } from "~/src/environments/environment";
import { reducers } from "./store/reducers";
import { IoConfig } from "./io-config";

import { AppComponent } from './app.component';


@NgModule( {
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot( IoConfig ),
    StoreModule.forRoot( reducers ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot( {
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: ( client: HttpClient ) => new TranslateHttpLoader( client, './assets/i18n/', '.json' ),
        deps: [ HttpClient ]
      }
    } ),
    EffectsModule.forRoot( [] ),
    CookieModule.withOptions({
      expires: '30m'
    }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
} )
export class AppModule {
}
