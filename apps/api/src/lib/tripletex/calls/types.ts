export interface TripletexClientConfig {
  baseUrl?: string;
  userAgent?: string;
  employeeToken?: string;
  consumerToken?: string;
  organizationId?: string;
  expirationDate?: Date;
}

export interface DefaultTripletexInputs {
  from?: number;
  count?: number;
  sorting?: Date;
}

export interface ResourceRef {
  id: number;
}
