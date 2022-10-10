import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUrls } from "./auth-urls";
import { AuthCommonComponent } from "./components/auth-common/auth-common.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { TermsConditionsComponent } from "./components/terms-conditions/terms-conditions.component";

const routes: Routes = [
  {
    path: "",
    component: AuthCommonComponent,
    children: [
      { path: "", redirectTo: AuthUrls.login, pathMatch: "full", },
      { path: AuthUrls.login, component: LogInComponent },
      { path: AuthUrls.signUp, component: SignUpComponent },
      { path: AuthUrls.resetPassword, component: ResetPasswordComponent },
      { path: AuthUrls.termsConditions, component: TermsConditionsComponent },
    ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AuthRoutingModule {
}
