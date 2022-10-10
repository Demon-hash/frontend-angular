import { createAction, props } from "@ngrx/store";
import { feature, SignUpInterface } from "~/src/app/modules/auth/store";
import { ErrorInterface, JWTTokens } from "~/src/app/types";

export namespace SignUpActions {
  export const request = createAction(`${feature}/sign/request`, props<SignUpInterface>());
  export const success = createAction(`${feature}/sign/success`, props<JWTTokens>());
  export const error = createAction(`${feature}/sign/error`, props<ErrorInterface>());
}
