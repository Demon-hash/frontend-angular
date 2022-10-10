import { createReducer, on } from "@ngrx/store";
import { LoginActions } from "~/src/app/modules/auth/store/actions/login.actions";
import { SignUpActions } from "~/src/app/modules/auth/store/actions/sign-up.actions";

const initial = {
  login: {
    email: "",
    password: "",
  },
  signUp: {
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  },
  reset: {
    email: "",
    code: ""
  },
  error: "",
  access_token: "",
  refresh_token: ""
}

export const authReducer = createReducer(
  initial,
  on( LoginActions.request, ( state, { email, password } ) => ({
    ...state,
    login: {
      email: email,
      password: password
    }
  }) ),
  on( SignUpActions.request, ( state, { email, password, firstName, lastName } ) => ({
    ...state,
    signUp: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }
  }) ),
  on(
    LoginActions.success,
    SignUpActions.success,
    ( state, { access_token, refresh_token } ) => ({
      ...state,
      access_token: access_token,
      refresh_token: refresh_token
    }) ),
  on( LoginActions.error,
    SignUpActions.error,
    ( state, { error } ) => ({
      ...state,
      error: error
    }) )
);
