import { createAction, props } from "@ngrx/store";
import { feature } from "~/src/app/modules/chat/store";
import { ErrorInterface, IGroup, IID } from "~/src/app/types";

export namespace NewGroupActions {
  export const request = createAction(`${feature}/new-group/request`, props<IGroup>());
  export const success = createAction(`${feature}/new-group/success`, props<IID>());
  export const error = createAction(`${feature}/new-group/error`, props<ErrorInterface>());
}
