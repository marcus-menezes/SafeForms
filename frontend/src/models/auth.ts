interface IUser {
  email: string;
  password: string;
}

export interface ISignInRequest extends IUser { };

export interface ISignUpRequest extends IUser { };

export interface IPasswordResetRequest extends Pick<IUser, 'email'> { }