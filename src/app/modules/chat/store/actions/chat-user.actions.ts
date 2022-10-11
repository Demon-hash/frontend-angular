import { createAction, props } from "@ngrx/store";
import { feature } from "~/src/app/modules/chat/store";
import { ErrorInterface, IUser } from "~/src/app/types";

export namespace ChatUserActions {
  export const request = createAction(`${feature}/user/request`, props<IUser>());
  export const success = createAction(`${feature}/user/success`, props<IUser>());
  export const error = createAction(`${feature}/user/error`, props<ErrorInterface>());
}
