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

export interface CanteenResponse {
  k_id: string;
  k_name: string;
  k_address: string;
}

export interface VendorResponse {
  v_id: string;
  v_name: string;
  v_join_date: string;
  k_id: string;
  c_id: string;
}

export function typecastLoginResponse(data: any): LoginResponse | undefined {
  return data as LoginResponse | undefined;
}

export function typecastCanteenResponse(data: any): CanteenResponse[] | undefined {
  return data as CanteenResponse[] | undefined;
}

export function typecastVendorResponse(data: any): VendorResponse[] | undefined {
  return data as VendorResponse[] | undefined;
}
