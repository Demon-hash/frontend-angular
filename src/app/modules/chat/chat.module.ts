import { NgModule } from '@angular/core';
import { ChatRoutingModule } from "./chat-routing.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { feature } from "./store";
import { reducers } from "./store/reducers";

import { ChatUserEffects } from "~/src/app/modules/chat/store/effects/chat-user.effects";

import { CommonComponent } from './components/common/common.component';
import { SharedModule } from "~/src/app/modules/shared/shared.module";
import { NewGroupComponent } from './components/new-group/new-group.component';
import { GroupSelectComponent } from './components/group-select/group-select.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { GroupsComponent } from './components/groups/groups.component';

@NgModule( {
  declarations: [
    CommonComponent,
    NewGroupComponent,
    GroupSelectComponent,
    MessagesComponent,
    ConversationComponent,
    GroupsComponent
  ],
  imports: [
    SharedModule,
    ChatRoutingModule,
    StoreModule.forFeature( feature, reducers ),
    EffectsModule.forFeature( [ ChatUserEffects ] )
  ],
} )
export class ChatModule {
}
