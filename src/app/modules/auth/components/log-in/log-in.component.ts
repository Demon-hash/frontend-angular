import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Store } from "@ngrx/store";
import { SessionService } from "~/src/app/services/session.service";
import { LoginActions } from "~/src/app/modules/auth/store/actions/login.actions";
import { EMAIL_PATTERN } from "~/src/app/modules/shared/consts";
import { selectError, selectTokens } from "~/src/app/modules/auth/store/selectors";
import { AppUrls } from "~/src/app/app-urls";
import { AuthUrls } from "~/src/app/modules/auth/auth-urls";
import { IAuthState, ILogin } from "~/src/app/types";

@Component( {
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: [ './log-in.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class LogInComponent implements OnDestroy {

  readonly FORGET_PASSWORD_PAGE = `/${ AppUrls.auth }/${ AuthUrls.resetPassword }`;

  readonly form = this.formBuilder.group( {
    email: [ '', [ Validators.required, Validators.pattern( EMAIL_PATTERN ) ] ],
    password: [ '', [ Validators.required ] ],
  } );

  readonly spinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );

  readonly error$ = this.store$.select( selectError )
    .subscribe( () => {
      this?.spinner$?.next( false );
    } );

  readonly response$ = this.store$.select( selectTokens )
    .subscribe( ( { access, refresh } ) => {
      this?.spinner$?.next( false );
      this.session.set( access, refresh );
    } );

  constructor(
    private readonly store$: Store<IAuthState>,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly session: SessionService
  ) {
  }

  ngOnDestroy(): void {
    this.spinner$.complete();
    this.response$.unsubscribe();
    this.error$.unsubscribe();
  }

  signUpPage() {
    this.router.navigateByUrl( `${ AppUrls.auth }/${ AuthUrls.signUp }` ).catch( console.warn );
  }

  onSubmit() {
    if ( !this.form.invalid ) {
      this.store$.dispatch( LoginActions.request( this.form.getRawValue() as ILogin ) );
      this.spinner$.next( true );
    }
  }
}
