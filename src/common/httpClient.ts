import { CustomError } from './customError';
import { lang } from '../lang';

const bytesToBase64 = (bytes: Uint8Array) => btoa(String.fromCodePoint(...bytes));

const buildBasicToken = (username?: string, password?: string) => {
  if (!username && !password) {
    return undefined;
  }
  const encoded = bytesToBase64(new TextEncoder().encode(`${username}:${password}`));
  return `Basic ${encoded}`;
};

const catchHandler = (err: unknown) => {
  if (err instanceof CustomError) {
    if (err.status === 401) {
      throw new CustomError(err.status, lang.global.t('connection.unAuthorized'));
    }
    throw new CustomError(err.status, err.details);
  }
  if (err instanceof Error) {
    throw new CustomError(500, err.message);
  }
  throw new CustomError(500, `unknown error, trace: ${JSON.stringify(err)}`);
};

const buildURL = (host: string, port: number, path?: string, queryParameters?: string) => {
  let url = `${host}:${port}`;
  url += path ?? '';
  url += queryParameters ? `?${queryParameters}` : '';

  return url;
};
const fetchWrapper = async ({
  method,
  path,
  queryParameters,
  payload,
  host,
  port,
  username,
  password,
}: {
  method: string;
  path?: string;
  queryParameters?: string;
  payload?: unknown;
  username?: string;
  password?: string;
  host: string;
  port: number;
}) => {
  const authorization = buildBasicToken(username, password);

  const url = buildURL(host, port, path, queryParameters);
  try {
    const result = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', authorization } as unknown as Headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });
    if (result.ok) {
      return await result.json();
    }
    throw new CustomError(result.status, await result.text());
  } catch (e) {
    throw catchHandler(e);
  }
};
export const loadHttpClient = (con: {
  host: string;
  port: number;
  username?: string;
  password?: string;
}) => ({
  get: async (path?: string, queryParameters?: string) =>
    fetchWrapper({
      ...con,
      method: 'GET',
      path,
      queryParameters,
    }),
  post: async (path: string, queryParameters?: string, payload?: unknown) =>
    fetchWrapper({
      ...con,
      method: 'POST',
      path,
      queryParameters,
      payload,
    }),
  put: async (path: string, queryParameters?: string, payload?: unknown) =>
    fetchWrapper({
      ...con,
      method: 'PUT',
      path,
      queryParameters,
      payload,
    }),

  delete: async (path: string, queryParameters?: string, payload?: unknown) =>
    fetchWrapper({
      ...con,
      method: 'DELETE',
      path,
      queryParameters,
      payload,
    }),
});
