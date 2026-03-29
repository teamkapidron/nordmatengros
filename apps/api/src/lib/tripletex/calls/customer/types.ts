import { ResourceRef } from '../types';

export interface CustomerCategory {
  id?: number | null;
  version?: number | null;
  name?: string | null;
  number?: string | null;
  description?: string | null;
  type?: number | null;
}

export interface CompanyBankAccountPresentation {
  iban?: string | null;
  bban?: string | null;
  bic?: string | null;
  country?: ResourceRef | null;
  provider?: 'NETS' | 'AUTOPAY' | null;
}

export interface Customer {
  id: number;
  version?: number | null;
  name: string;
  organizationNumber?: string | null;
  supplierNumber?: number | null;
  customerNumber?: number | null;
  isSupplier: boolean;
  accountManager?: ResourceRef | null;
  email?: string | null;
  invoiceEmail?: string | null;
  overdueNoticeEmail?: string | null;
  bankAccounts?: string[] | null;
  phoneNumber?: string | null;
  phoneNumberMobile?: string | null;
  description?: string | null;
  language: 'NO' | 'EN' | 'SV';
  isPrivateIndividual?: boolean | null;
  singleCustomerInvoice?: boolean | null;
  invoiceSendMethod:
    | 'EMAIL'
    | 'EHF'
    | 'EFAKTURA'
    | 'VIPPS'
    | 'PAPER'
    | 'MANUAL';
  emailAttachmentType: 'LINK' | 'ATTACHMENT';
  postalAddress?: ResourceRef | null;
  physicalAddress?: ResourceRef | null;
  deliveryAddress?: ResourceRef | null;
  category1?: CustomerCategory | null;
  category2?: CustomerCategory | null;
  category3?: CustomerCategory | null;
  invoicesDueIn?: number | null;
  invoicesDueInType: 'DAYS' | 'MONTHS' | 'RECURRING_DAY_OF_MONTH';
  currency?: ResourceRef | null;
  bankAccountPresentation?: CompanyBankAccountPresentation[] | null;
  isCustomer: boolean;
  isInactive: boolean;
}

export interface CreateCustomerInput {
  name: string;
  organizationNumber?: string;
  email?: string;
  invoiceEmail?: string;
  phoneNumber?: string;
  phoneNumberMobile?: string;
  description?: string;
  language?: 'NO' | 'EN' | 'SV';
  isPrivateIndividual?: boolean;
  singleCustomerInvoice?: boolean;
  invoiceSendMethod?:
    | 'EMAIL'
    | 'EHF'
    | 'EFAKTURA'
    | 'VIPPS'
    | 'PAPER'
    | 'MANUAL';
  emailAttachmentType?: 'LINK' | 'ATTACHMENT';
  invoicesDueIn?: number;
  invoicesDueInType?: 'DAYS' | 'MONTHS' | 'RECURRING_DAY_OF_MONTH';
  isCustomer?: boolean;
  isSupplier?: boolean;
  accountManagerId?: number;
  currencyId?: number;
}

export interface CreateCustomerResponse {
  value: Customer;
}

export interface CreateCustomerResult {
  customerId: number;
  isInactive?: boolean | null;
}
