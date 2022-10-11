import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoginActions } from "~/src/app/modules/auth/store/actions/login.actions";
import { map } from "rxjs";
import { Store } from "@ngrx/store";
import { IChatState, IUser } from "~/src/app/types";
import { ChatUserActions } from "~/src/app/modules/chat/store/actions/chat-user.actions";

@Injectable( {
  providedIn: "root"
} )
export class ChatUserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<IChatState>
  ) {
  }

  @Effect()
  request$ = this.actions$
    .pipe(
      ofType( ChatUserActions.request ),
      map( user => ChatUserActions.success( user as IUser ) ),
    );

  @Effect( {
    dispatch: false
  } )
  error$ = this.actions$
    .pipe(
      ofType( ChatUserActions.error ),
      map( ( { error } ) => {
        if ( error.length ) {
          this.store$.dispatch( LoginActions.error( { error: "" } ) )
        }
      } )
    );
}
