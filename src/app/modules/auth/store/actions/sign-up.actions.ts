import { createAction, props } from "@ngrx/store";
import { feature } from "~/src/app/modules/auth/store";
import { ErrorInterface, IJWTTokens, ISignUp } from "~/src/app/types";

export namespace SignUpActions {
  export const request = createAction( `${ feature }/sign/request`, props<ISignUp>() );
  export const success = createAction( `${ feature }/sign/success`, props<IJWTTokens>() );
  export const error = createAction( `${ feature }/sign/error`, props<ErrorInterface>() );
}
