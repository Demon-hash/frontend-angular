import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatUserResolver } from "~/src/app/modules/chat/services/chat-user.resolver";
import { CommonComponent } from "./components/common/common.component";
import { ConversationComponent } from "~/src/app/modules/chat/components/conversation/conversation.component";
import { GroupsComponent } from "~/src/app/modules/chat/components/groups/groups.component";
import { ChatUrls } from "~/src/app/modules/chat/chat-urls";

const routes: Routes = [
  {
    path: "",
    component: CommonComponent,
    children: [
      { path: "", redirectTo: ChatUrls.groups, pathMatch: "full" },
      { path: ChatUrls.groups, component: GroupsComponent },
      {
        path: ChatUrls.conversation, component: ConversationComponent, resolve: {
          access: ChatUserResolver
        }
      }
    ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ChatRoutingModule {
}
