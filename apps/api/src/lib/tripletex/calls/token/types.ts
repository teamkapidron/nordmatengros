export interface SessionToken {
  expirationDate: string;
  token: string;
}

export interface GetTokenResponse {
  value: SessionToken;
}

export interface CreateSessionTokenInput {
  employeeToken: string;
  consumerToken: string;
  expirationDate: Date;
}
