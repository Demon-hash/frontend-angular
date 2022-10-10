import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatCommonComponent } from "./components/chat-common/chat-common.component";

const routes: Routes = [
  {
    path: "",
    component: ChatCommonComponent,
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ChatRoutingModule {
}
