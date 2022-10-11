import { createAction, props } from "@ngrx/store";
import { feature } from "~/src/app/modules/auth/store";
import { ErrorInterface, IJWTTokens, ILogin } from "~/src/app/types";

export namespace LoginActions {
  export const request = createAction(`${feature}/login/request`, props<ILogin>());
  export const success = createAction(`${feature}/login/success`, props<IJWTTokens>());
  export const error = createAction(`${feature}/login/error`, props<ErrorInterface>());
}
