import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { EMAIL_PATTERN } from "~/src/app/modules/shared/consts";
import { FieldsMatcher } from "~/src/app/modules/shared/services/fields-mather";
import { AppUrls } from "~/src/app/app-urls";
import { AuthUrls } from "~/src/app/modules/auth/auth-urls";
import { Store } from "@ngrx/store";
import { AuthState, SignUpInterface } from "~/src/app/modules/auth/store";
import { SignUpActions } from "~/src/app/modules/auth/store/actions/sign-up.actions";
import { selectError, selectTokens } from "~/src/app/modules/auth/store/selectors";
import { SessionService } from "~/src/app/services/session.service";

@Component( {
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SignUpComponent implements OnDestroy {

  readonly LOGIN_PAGE = `/${ AppUrls.auth }/${ AuthUrls.login }`;
  readonly TERMS_PAGE = `/${ AppUrls.auth }/${ AuthUrls.termsConditions }`;

  readonly matcher = new FieldsMatcher( 'password', 'confirm' );

  readonly form = this.formBuilder.group( {
    firstName: [ '', [ Validators.required ] ],
    lastName: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required, Validators.pattern( EMAIL_PATTERN ) ] ],
    password: [ '', [ Validators.required ] ],
    confirm: [ '', [ Validators.required ] ],
    termsConditions: [ false, [ Validators.requiredTrue ] ],
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
    private readonly formBuilder: FormBuilder,
    private readonly store$: Store<AuthState>,
    private readonly session: SessionService
  ) {
    this.form.setValidators( this.validateFields( 'password', 'confirm' ) );
  }

  validateFields( first: string, second: string ): ValidatorFn {
    return ( control: AbstractControl ) => {
      const [ a, b ] = [ control.get( first ), control.get( second ) ];
      return (a?.value !== b?.value) ? { mismatch: true } : null;
    }
  }

  ngOnDestroy(): void {
    this.spinner$.complete();
    this.response$.unsubscribe();
    this.error$.unsubscribe();
  }

  onSubmit() {
    if ( !this.form.invalid ) {
      this.store$.dispatch( SignUpActions.request( this.form.getRawValue() as SignUpInterface ) );
      this?.spinner$?.next( true );
    }
  }
}
