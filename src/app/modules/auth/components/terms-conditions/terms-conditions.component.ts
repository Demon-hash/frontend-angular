import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from "@angular/router";
import { AppUrls } from "~/src/app/app-urls";
import { AuthUrls } from "~/src/app/modules/auth/auth-urls";

@Component( {
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: [ './terms-conditions.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TermsConditionsComponent {

  constructor( private readonly router: Router ) {
  }

  signUpPage() {
    this.router.navigateByUrl( `${ AppUrls.auth }/${ AuthUrls.signUp }` ).catch( console.warn );
  }
}
