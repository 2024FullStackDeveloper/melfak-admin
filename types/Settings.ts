export interface ISettings {
  id: string;
  applicationName: string;
  arSummary?: string;
  enSummary?: string;
  otpExpiryInMin?: number;
  misLoginAttemptsLimit?: number;
  passwordMinLength?: number;
  passwordRequireUppercase?: boolean;
  passwordRequireLowercase?: boolean;
  passwordRequireNumber?: boolean;
  passwordRequireSpecialCharacter?: boolean;
  host?: string;
  port?: number;
  useSsl?: boolean;
  email?: string;
  password?: string;
}
