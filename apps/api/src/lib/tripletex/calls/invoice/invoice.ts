import { TripletexBase } from '../base';
import {
  CreateInvoiceResult,
  Invoice,
  InvoicePdfResponse,
  ViewInvoiceResult,
} from '@/lib/tripletex/calls/invoice/types';

export class TripletexInvoice extends TripletexBase {
  async create(
    orderId: number,
    invoiceDate: string,
  ): Promise<CreateInvoiceResult> {
    const response = await this.performRequest<CreateInvoiceResult>(() =>
      this.authenticatedRequest(
        `/v2/order/${orderId}/:invoice?invoiceDate=${invoiceDate}`,
        {
          method: 'PUT',
        },
      ),
    );

    return response;
  }

  async view(invoiceId: number): Promise<ViewInvoiceResult> {
    const invoice = await this.performRequest<Invoice>(() =>
      this.authenticatedRequest(`/v2/invoice/${invoiceId}`, {
        method: 'GET',
      }),
    );

    const pdfData = await this.performRequest<InvoicePdfResponse>(() =>
      this.authenticatedRequest(`/v2/invoice/${invoiceId}/pdf`, {
        method: 'GET',
      }),
    );

    return {
      invoiceUrl: pdfData.url,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
    };
  }
}
