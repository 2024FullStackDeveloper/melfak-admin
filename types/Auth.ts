export interface IUser {
  id: string;
  email: string;
  mobileNumber: string;
  fullName: string;
  lastLogin?: string;
  lastLogout?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginResponse {
  id: string;
  tokenType: string;
  token: string;
  expires: number;
  user?: IUser;
}

export interface IEmailVerifyingResponse {
  otpSent: boolean;
}
