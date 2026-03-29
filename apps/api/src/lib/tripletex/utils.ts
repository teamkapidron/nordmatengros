import axios from 'axios';

export const defaultBaseUrl = 'https://api-test.tripletex.tech/';

export async function makeRequest<T>(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    query?: Record<string, string>;
  } = {},
): Promise<T> {
  const { method = 'GET', headers = {}, body, query } = options;

  try {
    const response = await axios({
      url,
      method: method as any,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data: body,
      params: query,
    });
    return response.data as T;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
}
