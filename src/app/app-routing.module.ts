import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUrls } from "./app-urls";
import { AuthResolver } from "~/src/app/services/auth.resolver";
import { ChatResolver } from "./services/chat-resolver";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: AppUrls.auth },
  {
    path: AppUrls.auth,
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule ),
    resolve: {
      redirect: AuthResolver
    }
  },
  {
    path: AppUrls.chat,
    loadChildren: () => import('./modules/chat/chat.module').then( m => m.ChatModule ),
    resolve: {
      user: ChatResolver
    }
  }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
