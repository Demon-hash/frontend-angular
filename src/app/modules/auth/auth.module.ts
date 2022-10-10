import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "~/src/app/modules/shared/shared.module";

import { LoginEffects } from "~/src/app/modules/auth/store/effects/login.effects";
import { SignUpEffects } from "~/src/app/modules/auth/store/effects/sign-up.effects";

import { feature } from "./store";
import { reducers } from "./store/reducers";

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthCommonComponent } from './components/auth-common/auth-common.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';

@NgModule( {
  declarations: [
    SignUpComponent,
    LogInComponent,
    ResetPasswordComponent,
    AuthCommonComponent,
    TermsConditionsComponent
  ],
  imports: [
    AuthRoutingModule,
    StoreModule.forFeature(feature, reducers),
    EffectsModule.forFeature([LoginEffects, SignUpEffects]),
    SharedModule
  ],
} )
export class AuthModule {
}
