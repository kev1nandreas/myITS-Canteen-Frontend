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
  point: number;
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
  m_id?: string;
  m_name: string;
  m_price: number;
  m_category: string;
  m_image?: string;
  m_stock: number;
  last_modified?: string;
  td_quantity?: number;
}

export interface TransactionHistoryResponse {
  t_id: string;
  t_time: string;
  t_is_dine: number;
  t_total: number;
  t_discount: number;
  t_payment: string;
  t_status: string;
  c_id: string;
  c_name: string;
  last_modified: string;
  items: MenuResponse[];
  reservation: {
    r_id: string;
    time_in: string;
    time_out: string;
    chairs: {
      ch_id: string;
      ch_name: string;
    }[];
  };
}

export interface DailyReportResponse {
  v_id: string;
  transaction_count: number | 0;
  total_purchased: number | 0;
  total_earnings: number | 0;
  unique_customers: number | 0;
}

export interface weeklySalesResponse {
  period: {
    from: string;
    to: string;
  };
  total_sales_last_week: number;
  sales_per_day: {
    date: string;
    daily_total: number;
  }[];
}

export interface topMenuResponse {
  period: {
    from: string;
    to: string;
  };
  top_menus: {
    menu_id: string;
    menu_name: string;
    total_sold: number;
    percentage: number;
  }[];
  total_menus_sold_last_week: number;
}

export interface MonthlyWeeklyReportResponse {
  view: "monthly" | "weekly";
  records: {
    week_start?: string;
    week_end?: string;
    month?: string;
    total_revenue: number;
  }[];
}

export function typecastLoginResponse(data: any): LoginResponse | undefined {
  return data as LoginResponse | undefined;
}

export function typecastCanteenResponse(
  data: any
): CanteenResponse[] | undefined {
  return data as CanteenResponse[] | undefined;
}

export function typecastVendorResponse(
  data: any
): VendorResponse[] | undefined {
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

export function typecastTransactionHistoryResponse(
  data: any
): TransactionHistoryResponse[] | undefined {
  return data as TransactionHistoryResponse[] | undefined;
}

export function typecastDailyReportResponse(
  data: any
): DailyReportResponse | undefined {
  return data as DailyReportResponse | undefined;
}

export function typecastWeeklySalesResponse(
  data: any
): weeklySalesResponse | undefined {
  return data as weeklySalesResponse | undefined;
}

export function typecastTopMenuResponse(
  data: any
): topMenuResponse | undefined {
  return data as topMenuResponse | undefined;
}

export function typecastMonthlyWeeklyReportResponse(
  data: any
): MonthlyWeeklyReportResponse | undefined {
  return data as MonthlyWeeklyReportResponse | undefined;
}
