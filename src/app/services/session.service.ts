import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";
import { AppUrls } from "~/src/app/app-urls";

@Injectable( {
  providedIn: "root"
} )
export class SessionService {
  constructor(
    private readonly cookie: CookieService,
    private readonly router: Router
  ) {
  }

  set( access: string, refresh: string ) {
    if(!access.length || !refresh.length) {
      return;
    }
    this.cookie.put( 'access', access );
    this.cookie.put( 'refresh', refresh );
    this.router.navigateByUrl( `/${ AppUrls.chat }` ).catch( console.warn );
  }

  access() {
    return this.cookie.get( 'access' );
  }

  refresh() {
    return this.cookie.get( 'refresh' );
  }
}
