import { ResourceRef } from '../types';

export interface Order {
  id: number;
  version?: number | null;
  customer?: ResourceRef | null;
  contact?: ResourceRef | null;
  attn?: ResourceRef | null;
  receiverEmail?: string | null;
  overdueNoticeEmail?: string | null;
  number: string;
  reference?: string | null;
  ourContact?: ResourceRef | null;
  ourContactEmployee?: ResourceRef | null;
  department?: ResourceRef | null;
  orderDate: string;
  project?: ResourceRef | null;
  invoiceComment?: string | null;
  currency?: ResourceRef | null;
  invoicesDueIn?: number | null;
  invoicesDueInType?: 'DAYS' | 'MONTHS' | 'RECURRING_DAY_OF_MONTH' | null;
  isShowOpenPostsOnInvoices?: boolean | null;
  isClosed: boolean;
  deliveryDate: string;
  deliveryAddress?: ResourceRef | null;
  deliveryComment?: string | null;
  isPrioritizeAmountsIncludingVat?: boolean | null;
  orderLineSorting?: 'ID' | 'PRODUCT' | 'CUSTOM' | null;
  isSubscription?: boolean | null;
  subscriptionDuration?: number | null;
  subscriptionDurationType?: 'MONTHS' | 'YEAR' | null;
  subscriptionPeriodsOnInvoice?: number | null;
  subscriptionInvoicingTimeInAdvanceOrArrears?: 'ADVANCE' | 'ARREARS' | null;
  subscriptionInvoicingTime?: number | null;
  subscriptionInvoicingTimeType?: 'DAYS' | 'MONTHS' | null;
  isSubscriptionAutoInvoicing?: boolean | null;
  preliminaryInvoice?: ResourceRef | null;
}

export interface OrderLineInput {
  product: { id: number };
  count: number;
  unitPriceExcludingVatCurrency?: number;
  unitPriceIncludingVatCurrency?: number;
  discount?: number;
  vatType?: { id?: number };
}

export interface CreateOrderInput {
  customer: { id: number };
  deliveryDate: string;
  orderDate: string;
  orderLines?: OrderLineInput[];
  attnId?: number;
  receiverEmail?: string;
  overdueNoticeEmail?: string;
  reference?: string;
  ourContactId?: number;
  ourContactEmployeeId?: number;
  departmentId?: number;
  projectId?: number;
  invoiceComment?: string;
  currencyId?: number;
  invoicesDueIn?: number;
  invoicesDueInType?: 'DAYS' | 'MONTHS' | 'RECURRING_DAY_OF_MONTH';
  isShowOpenPostsOnInvoices?: boolean;
  deliveryAddressId?: number;
  deliveryComment?: string;
  isPrioritizeAmountsIncludingVat?: boolean;
  orderLineSorting?: 'ID' | 'PRODUCT' | 'CUSTOM';
  isSubscription?: boolean;
  subscriptionDuration?: number;
  subscriptionDurationType?: 'MONTHS' | 'YEAR';
  subscriptionPeriodsOnInvoice?: number;
  subscriptionInvoicingTimeInAdvanceOrArrears?: 'ADVANCE' | 'ARREARS';
  subscriptionInvoicingTime?: number;
  subscriptionInvoicingTimeType?: 'DAYS' | 'MONTHS';
  isSubscriptionAutoInvoicing?: boolean;
}

// Create order response type
export interface CreateOrderResponse {
  value: Order;
}

// Create order result type
export interface CreateOrderResult {
  orderId: number;
}
