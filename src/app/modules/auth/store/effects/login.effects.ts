import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoginActions } from "~/src/app/modules/auth/store/actions/login.actions";
import { catchError, from, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthState } from "~/src/app/modules/auth/store";
import { Api } from "~/src/app/api";
import { JWTTokens } from "~/src/app/types";

@Injectable( {
  providedIn: "root"
} )
export class LoginEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AuthState>,
    private readonly api$: Api
  ) {
  }

  @Effect()
  request$ = this.actions$
    .pipe(
      ofType( LoginActions.request ),
      switchMap( props => from( this.api$.login( props ) )
        .pipe(
          map( tokens => LoginActions.success( tokens as JWTTokens ) ),
          catchError( err => of( LoginActions.error( { error: err } ) ) )
        )
      ) );

  @Effect( {
    dispatch: false
  } )
  error$ = this.actions$
    .pipe(
      ofType( LoginActions.error ),
      map( ( { error } ) => {
        if ( error.length ) {
          this.store$.dispatch( LoginActions.error( { error: "" } ) )
        }
      } )
    );
}
