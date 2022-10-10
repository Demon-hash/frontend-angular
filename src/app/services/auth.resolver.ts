import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "~/src/app/services/session.service";
import { Api } from "~/src/app/api";
import { AppUrls } from "~/src/app/app-urls";

@Injectable({
  providedIn: "root"
})
export class AuthResolver implements Resolve<boolean> {
  constructor(
    private readonly session: SessionService,
    private readonly router: Router,
    private readonly api: Api
  ) {
  }

  async resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean> {
    try {
      const redirect = await this.api.isValidSession(this.session.access() ?? "");
      if(redirect != null) {
        this.router.navigateByUrl(`/${AppUrls.chat}`).catch(console.warn);
        return true;
      }
      return false;
    } catch ( e ) {
      return false;
    }
  }
}
