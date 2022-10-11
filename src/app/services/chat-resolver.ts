import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { SessionService } from "~/src/app/services/session.service";
import { Api } from "~/src/app/api";
import { AppUrls } from "~/src/app/app-urls";
import { AuthUrls } from "~/src/app/modules/auth/auth-urls";
import { IChatState, IUser } from "~/src/app/types";
import { ChatUserActions } from "~/src/app/modules/chat/store/actions/chat-user.actions";

@Injectable({
  providedIn: "root"
})
export class ChatResolver implements Resolve<IUser | void> {
  constructor(
    private readonly api: Api,
    private readonly session: SessionService,
    private readonly router: Router,
    private readonly store$: Store<IChatState>
  ) {
  }

  async resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<IUser | void> {
    try {
      const user = await this.api.isValidSession(this.session.access() ?? "");
      if(user == null) {
        this.router.navigateByUrl(`/${AppUrls.auth}/${AuthUrls.login}`).catch(console.warn);
        return;
      }
      this.store$.dispatch( ChatUserActions.request( user ) );
      return user;
    } catch ( e ) {
      this.router.navigateByUrl(`/${AppUrls.auth}/${AuthUrls.login}`).catch(console.warn);
      return;
    }
  }
}
