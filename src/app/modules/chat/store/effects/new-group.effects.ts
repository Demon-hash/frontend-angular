import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, from, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { IAuthState } from "~/src/app/types";
import { NewGroupActions } from "~/src/app/modules/chat/store/actions/new-group.actions";
import { GroupsService } from "~/src/app/modules/chat/services/groups.service";

@Injectable( {
  providedIn: "root"
} )
export class NewGroupEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<IAuthState>,
    private readonly groupsService: GroupsService
  ) {
  }

  @Effect()
  request$ = this.actions$
    .pipe(
      ofType( NewGroupActions.request ),
      switchMap( props => this.groupsService.create( props )
        .pipe(
          map( ( id ) => NewGroupActions.success(id) ),
          catchError( err => of( NewGroupActions.error( { error: err } ) ) )
        )
      ) );

  @Effect( {
    dispatch: false
  } )
  error$ = this.actions$
    .pipe(
      ofType( NewGroupActions.error ),
      map( ( { error } ) => {
        if ( error.length ) {
          this.store$.dispatch( NewGroupActions.error( { error: "" } ) )
        }
      } )
    );
}
