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
export type IID = { id: string };

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
    group: IID;
    error: string;
  }
}

export interface IJWTTokens {
  readonly access_token: string;
  readonly refresh_token: string;
}

export interface IGroup {
  id?: string;
  ownerId: string;
  title: string;
  ico: string;
  hidden?: boolean;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserWithGroupId {
  user: IUser;
  group: string;
}
