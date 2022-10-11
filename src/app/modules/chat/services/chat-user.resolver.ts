import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { IChatState, IUser, IUserWithGroupId } from "~/src/app/types";
import { ChatUserSelectors } from "~/src/app/modules/chat/store/selectors/chat-user.selectors";
import { ChatUserActions } from "~/src/app/modules/chat/store/actions/chat-user.actions";
import { AppUrls } from "~/src/app/app-urls";

@Injectable( {
  providedIn: "root"
} )
export class ChatUserResolver implements Resolve<IUserWithGroupId | void> {
  constructor(
    private readonly store: Store<IChatState>,
    private readonly router: Router
  ) {
  }

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<IUserWithGroupId | void> | IUserWithGroupId | void {
    return this.store.select( ChatUserSelectors.selectUser ).pipe(
      map( ( user: IUser | undefined ) => {
        const group: string | undefined = this.router.getCurrentNavigation()?.extras?.state?.[ 'group' ];
        if ( user == null || group == null || !group.length || user?.email == "" ) {
          void this.router.navigateByUrl( `/${ AppUrls.chat }` )
          return;
        }
        return { user, group };
      } )
    );
  }
}
