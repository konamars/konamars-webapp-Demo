export interface APIError {
  message: string;
}

export interface ProfileUpdateResponse {
  name: string;
  email: string;
  pictrue: string;
  email_verified: boolean;
}
