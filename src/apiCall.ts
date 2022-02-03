import axios, { AxiosResponse, Method } from "axios";

export default async function apiCall(
  url: string,
  method: Method,
  body: unknown
): Promise<AxiosResponse<unknown, unknown>> {
  const response = await axios({
    method,
    url,
    data: body,
  });
  return response;
}
