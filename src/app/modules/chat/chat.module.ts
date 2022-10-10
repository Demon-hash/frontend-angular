import { NgModule } from '@angular/core';
import { ChatRoutingModule } from "./chat-routing.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { feature } from "./store";
import { reducers } from "./store/reducers";

import { ChatCommonComponent } from './components/chat-common/chat-common.component';
import { SharedModule } from "~/src/app/modules/shared/shared.module";

@NgModule( {
  declarations: [
    ChatCommonComponent
  ],
  imports: [
    SharedModule,
    ChatRoutingModule,
    StoreModule.forFeature(feature, reducers),
    EffectsModule.forFeature([])
  ],
} )
export class ChatModule {
}
