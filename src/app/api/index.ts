import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { environment } from "~/src/environments/environment";
import { LoginInterface, SignUpInterface } from "~/src/app/modules/auth/store";
import { JWTTokens } from "~/src/app/types";

@Injectable( {
  providedIn: "root"
} )
export class Api {
  constructor( private readonly client: HttpClient ) {
  }

  async create( data: SignUpInterface ): Promise<JWTTokens | string> {
    return await firstValueFrom( this.client.post<JWTTokens>( `${ environment.api }/user/create`, JSON.stringify( data ), {
        headers: {
          'content-type': 'application/json'
        }
      } )
        .pipe( catchError( () => throwError( () => 'Error' ) ) )
    );
  }

  async login( data: LoginInterface ): Promise<JWTTokens | string> {
    return await firstValueFrom( this.client.post<JWTTokens>( `${ environment.api }/user/login`, JSON.stringify( data ), {
        headers: {
          'content-type': 'application/json'
        }
      } )
        .pipe( catchError( () => throwError( () => 'Error' ) ) )
    );
  }

  async isValidSession(access_token: string): Promise<SignUpInterface> {
    return await firstValueFrom( this.client.get<SignUpInterface>( `${ environment.api }/user/session`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'content-type': 'text/plain'
        }
      } )
        .pipe( catchError( () => throwError( () => 'Error' ) ) )
    );
  }
}
