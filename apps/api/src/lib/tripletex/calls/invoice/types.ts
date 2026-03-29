import { ResourceRef } from '../types';

export interface Invoice {
  id: number;
  version?: number | null;
  invoiceNumber: number;
  invoiceDate: string;
  customer?: ResourceRef | null;
  creditedInvoice?: ResourceRef | null;
  isCredited: boolean;
  invoiceDueDate: string;
  kid?: string | null;
  invoiceComment?: string | null;
  comment?: string | null;
  orders?: ResourceRef[] | null;
  orderLines?: ResourceRef[] | null;
  travelReports?: ResourceRef[] | null;
  project?: ResourceRef | null;
  invoiceRemarks?: string | null;
  invoiceReceiver?: string | null;
  invoiceType?: string | null;
  totalInvoiceAmountCurrency?: number | null;
  totalInvoiceAmountIncludingVatCurrency?: number | null;
  totalAmountCurrency?: number | null;
  currency?: ResourceRef | null;
  invoice?: ResourceRef | null;
  deliveryDate?: string | null;
  vatSpecification?: any | null;
  sumRemaining?: number | null;
  sumRemainingCurrency?: number | null;
  ehfSendStatus?: string | null;
}

export interface CreateInvoiceResponse {
  value: Invoice;
}

export interface CreateInvoiceResult {
  invoiceId: number;
}

export interface InvoicePdfResponse {
  url: string;
  filename?: string;
}

export interface ViewInvoiceResult {
  invoiceUrl: string;
  invoiceId: number;
  invoiceNumber: number;
}
