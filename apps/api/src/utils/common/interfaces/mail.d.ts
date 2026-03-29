interface VerifyEmailTemplate {
  type: 'verifyEmail';
  data: {
    name: string;
    otp: string;
  };
}

interface AdminApprovalTemplate {
  type: 'adminApproval';
  data: {
    name: string;
    email: string;
    userId: string;
    createdAt: string;
  };
}

interface PasswordResetTemplate {
  type: 'passwordReset';
  data: {
    name: string;
    resetLink: string;
  };
}

interface AdminCredentialsTemplate {
  type: 'adminCredentials';
  data: {
    name: string;
    password: string;
  };
}

interface UserApprovalConfirmationTemplate {
  type: 'userApprovalConfirmation';
  data: {
    name: string;
    email: string;
  };
}

interface InventoryAlertTemplate {
  type: 'inventoryAlert';
  data: {
    products: {
      productName: string;
      productImage: string;
      totalQuantity: number;
    }[];
  };
}

interface OrderPlacedTemplate {
  type: 'orderPlaced';
  data: {
    order: OrderResponse;
  };
}

interface ContactUsTemplate {
  type: 'contactUs';
  data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
    submittedAt: string;
  };
}

interface NewsletterTemplate {
  type: 'newArrival' | 'promotion';
  data: {
    customerName: string;
    products: {
      name: string;
      price: number;
      image: string;
    }[];
  };
}

export type MailTemplate =
  | VerifyEmailTemplate
  | AdminApprovalTemplate
  | PasswordResetTemplate
  | AdminCredentialsTemplate
  | WarehouseNotificationTemplate
  | InventoryAlertTemplate
  | UserApprovalConfirmationTemplate
  | OrderPlacedTemplate
  | ContactUsTemplate
  | NewsletterTemplate;
