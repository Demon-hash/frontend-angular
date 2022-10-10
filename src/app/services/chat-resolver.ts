import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "~/src/app/services/session.service";
import { Api } from "~/src/app/api";
import { SignUpInterface } from "~/src/app/modules/auth/store";
import { AppUrls } from "~/src/app/app-urls";
import { AuthUrls } from "~/src/app/modules/auth/auth-urls";

@Injectable({
  providedIn: "root"
})
export class ChatResolver implements Resolve<SignUpInterface | void> {
  constructor(
    private readonly session: SessionService,
    private readonly api: Api,
    private readonly router: Router
  ) {
  }

  async resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<SignUpInterface | void> {
    try {
      const user = await this.api.isValidSession(this.session.access() ?? "");
      if(user == null) {
        this.router.navigateByUrl(`/${AppUrls.auth}/${AuthUrls.login}`).catch(console.warn);
        return;
      }
      return user;
    } catch ( e ) {
      this.router.navigateByUrl(`/${AppUrls.auth}/${AuthUrls.login}`).catch(console.warn);
      return;
    }
  }
}
