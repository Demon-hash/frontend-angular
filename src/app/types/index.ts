export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp extends ILogin {
  firstName: string;
  lastName: string;
}

export type ErrorType = string;
export interface ErrorInterface {
  error: ErrorType
}

export interface IResetCode {
  code: string;
}

export type IResetPassword = IResetCode & Pick<ILogin, "email">;

export interface IAuthState {
  auth: {
    login: ILogin,
    signUp: ISignUp,
    reset: IResetPassword,
    error: ErrorType,
    access_token: string
    refresh_token: string
  }
}

export interface IChatState {
  chat: {
    user: IUser;
    error: string;
  }
}

export interface IJWTTokens {
  readonly access_token: string;
  readonly refresh_token: string;
}

export interface IGroup {
  id: string;
  title: string;
  ico: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserWithGroupId {
  user: IUser;
  group: string;
}
