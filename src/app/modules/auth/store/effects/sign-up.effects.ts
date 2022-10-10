import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, from, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthState } from "~/src/app/modules/auth/store";
import { Api } from "~/src/app/api";
import { SignUpActions } from "~/src/app/modules/auth/store/actions/sign-up.actions";
import { JWTTokens } from "~/src/app/types";

@Injectable({
  providedIn: "root"
})
export class SignUpEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AuthState>,
    private readonly api$: Api
  ) {
  }

  @Effect()
  request$ = this.actions$
    .pipe(
      ofType(SignUpActions.request),
      switchMap(props => from(this.api$.create(props))
        .pipe(
          map((tokens) => SignUpActions.success(tokens as JWTTokens)),
          catchError(err => of(SignUpActions.error({ error: err })))
        )
      ));

  @Effect( {
    dispatch: false
  } )
  error$ = this.actions$
    .pipe(
      ofType( SignUpActions.error ),
      map( ( { error } ) => {
        if ( error.length ) {
          this.store$.dispatch( SignUpActions.error( { error: "" } ) )
        }
      } )
    );
}