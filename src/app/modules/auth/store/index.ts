import { CodeInterface, ErrorType } from "~/src/app/types";

export const feature = 'auth';

export interface LoginInterface {
  email: string;
  password: string;
}

export interface SignUpInterface extends LoginInterface {
  firstName: string;
  lastName: string;
}

export interface ResetPasswordInterface extends Exclude<LoginInterface, "password">, CodeInterface {
}

export interface AuthState {
  auth: {
    login: LoginInterface,
    signUp: SignUpInterface,
    reset: ResetPasswordInterface,
    error: ErrorType,
    access_token: string
    refresh_token: string
  }
}
