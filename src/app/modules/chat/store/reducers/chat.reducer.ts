import { createReducer, on } from "@ngrx/store";
import { ChatUserActions } from "~/src/app/modules/chat/store/actions/chat-user.actions";

const initial = {
  user: {
    firstName: "",
    lastName: "",
    email: ""
  },
  error: ""
}

export const chatReducer = createReducer(
  initial,
  on(
    ChatUserActions.request,
    ChatUserActions.success,
    ( state, { firstName, lastName, email } ) => ({
      ...state,
      user: {
        firstName: firstName,
        lastName: lastName,
        email: email
      }
    }) ),
  on( ChatUserActions.error, ( state, { error } ) => ({
    ...state,
    error: error
  }) )
);
