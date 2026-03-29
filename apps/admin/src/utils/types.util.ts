export interface ApiError {
  success: boolean;
  name: string;
  error: string;
}

export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface ApiData<Payload, Response> {
  payload: Payload;
  response: BaseResponse & {
    data: Response;
  };
}
