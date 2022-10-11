import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { environment } from "~/src/environments/environment";
import { IGroup, IJWTTokens, ILogin, IUser, ISignUp } from "~/src/app/types";

@Injectable( {
  providedIn: "root"
} )
export class Api {
  constructor( private readonly client: HttpClient ) {
  }

  async signup( data: ISignUp ): Promise<IJWTTokens | string> {
    return await firstValueFrom( this.client.post<IJWTTokens>( `${ environment.api }/user/create`, JSON.stringify( data ), {
        headers: {
          'content-type': 'application/json'
        }
      } )
        .pipe( catchError( () => throwError( () => 'Error' ) ) )
    );
  }

  async login( data: ILogin ): Promise<IJWTTokens | string> {
    return await firstValueFrom( this.client.post<IJWTTokens>( `${ environment.api }/user/login`, JSON.stringify( data ), {
        headers: {
          'content-type': 'application/json'
        }
      } )
        .pipe( catchError( () => throwError( () => 'Error' ) ) )
    );
  }

  async isValidSession(access_token: string): Promise<IUser> {
    return await firstValueFrom( this.client.get<IUser>( `${ environment.api }/user/session`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'content-type': 'text/plain'
        }
      } )
        .pipe( catchError( () => throwError( () => 'Error' ) ) )
    );
  }

  async getGroups(access_token: string): Promise<IGroup[]> {
    return await firstValueFrom( this.client.get<IGroup[]>( `${ environment.api }/groups`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'content-type': 'text/plain'
        }
      } )
        .pipe( catchError( () => throwError( () => 'Error' ) ) )
    );
  }
}
