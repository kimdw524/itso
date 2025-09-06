import { fetcher } from '@/api/fetcher';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ResponseType<T extends (...args: any[]) => any> =
  ReturnType<T> extends Promise<infer K> ? K : never;
export type RequestType<T extends (...args: any[]) => any> = Parameters<T>[0];
/* eslint-enable @typescript-eslint/no-explicit-any */

export const http = {
  async request<Response>(url: string, init?: Parameters<typeof fetcher>[1]) {
    const response = await fetcher<Response>(url, {
      ...init,
    });

    const text = await response.text();
    try {
      return JSON.parse(text) as Response;
    } catch {
      return text as Response;
    }
  },

  async get<Response>(url: string, init?: Parameters<typeof fetcher>[1]) {
    return this.request<Response>(url, { method: 'GET', ...init });
  },

  async delete<Response>(url: string, init?: Parameters<typeof fetcher>[1]) {
    return this.request<Response>(url, { method: 'DELETE', ...init });
  },

  async post<Response>(
    url: string,
    body?: unknown,
    init?: Parameters<typeof fetcher>[1],
  ) {
    return this.request<Response>(url, {
      method: 'POST',
      body: body == undefined ? undefined : JSON.stringify(body),
      ...init,
    });
  },

  async put<Response>(
    url: string,
    body?: unknown,
    init?: Parameters<typeof fetcher>[1],
  ) {
    return this.request<Response>(url, {
      method: 'PUT',
      body: body == undefined ? undefined : JSON.stringify(body),
      ...init,
    });
  },

  async patch<Response>(
    url: string,
    body?: unknown,
    init?: Parameters<typeof fetcher>[1],
  ) {
    return this.request<Response>(url, {
      method: 'PATCH',
      body: body == undefined ? undefined : JSON.stringify(body),
      ...init,
    });
  },
};
