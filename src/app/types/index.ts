export type ErrorType = string;
export interface ErrorInterface {
  error: ErrorType
}

export interface TokenInterface {
  token: string;
}

export interface CodeInterface {
  code: string;
}

export interface JWTTokens {
  readonly access_token: string;
  readonly refresh_token: string;
}
