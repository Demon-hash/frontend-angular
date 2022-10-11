import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMAIL_PATTERN } from "~/src/app/modules/shared/consts";
import { AppUrls } from "~/src/app/app-urls";
import { AuthUrls } from "~/src/app/modules/auth/auth-urls";
import { ResetPasswordActions } from "~/src/app/modules/auth/store/actions/reset-password.actions";
import { IAuthState, IResetPassword } from "~/src/app/types";

@Component( {
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: [ './reset-password.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ResetPasswordComponent implements OnInit {

  readonly form = this.formBuilder.group( {
    email: [ '', [ Validators.required, Validators.pattern( EMAIL_PATTERN ) ] ],
  } );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly store: Store<IAuthState>
  ) {
  }

  ngOnInit(): void {
  }

  loginPage() {
    this.router.navigateByUrl( `/${ AppUrls.auth }/${ AuthUrls.login }` );
  }

  onSubmit() {
    if ( !this.form.invalid ) {
      this.store.dispatch( ResetPasswordActions.request( this.form.getRawValue() as IResetPassword ) );
    }
  }

}
