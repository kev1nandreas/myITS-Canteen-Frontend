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

export interface ChairResponse {
  ch_id: string;
  chair_name: string;
}

export interface MenuResponse {
  m_id: string;
  m_name: string;
  m_price: number;
  m_category: string;
  m_image: string;
  m_stock: number;
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

export function typecastUserResponse(data: any): UserResponse | undefined {
  return data as UserResponse | undefined;
}

export function typecastChairResponse(data: any): ChairResponse[] | undefined {
  return data as ChairResponse[] | undefined;
}

export function typecastMenuResponse(data: any): MenuResponse[] | undefined {
  return data as MenuResponse[] | undefined;
}