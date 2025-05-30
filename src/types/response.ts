/* eslint-disable @typescript-eslint/no-explicit-any */
export type PaginationType = {
  Total: number;
  Limit: number;
  PageCurrent: number;
  PageTotal: number;
};

export type ResponseMeta<T> = {
  Message: string;
  Results: {
    Status: boolean;
    Data: T;
    Pagination?: PaginationType;
  };
};

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export function typecastLoginResponse(data: any): LoginResponse | undefined {
  return data as LoginResponse | undefined;
}
