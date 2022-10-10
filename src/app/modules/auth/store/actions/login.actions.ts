import { createAction, props } from "@ngrx/store";
import { feature, LoginInterface } from "~/src/app/modules/auth/store";
import { ErrorInterface, JWTTokens } from "~/src/app/types";

export namespace LoginActions {
  export const request = createAction(`${feature}/login/request`, props<LoginInterface>());
  export const success = createAction(`${feature}/login/success`, props<JWTTokens>());
  export const error = createAction(`${feature}/login/error`, props<ErrorInterface>());
}
