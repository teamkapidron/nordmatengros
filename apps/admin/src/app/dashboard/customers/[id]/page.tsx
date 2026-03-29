import CustomerDetailHeader from '@/components/dashboard/customers/customer-detail/customer-detail-header';
import CustomerCompanyInfo from '@/components/dashboard/customers/customer-detail/customer-company-info';
import CustomerVerificationStatus from '@/components/dashboard/customers/customer-detail/customer-verification-status';
import CustomerInfo from '@/components/dashboard/customers/customer-detail/customer-info';

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CustomerDetailPageProps) {
  const { id } = await params;

  return {
    title: `#${id.slice(-8).toUpperCase()} | Kunde`,
  };
}

export default async function CustomerDetailPage(
  props: CustomerDetailPageProps,
) {
  const { id } = await props.params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--baladi-light)] via-white to-[var(--baladi-muted)]">
      <div className="mx-auto max-w-7xl space-y-6">
        <CustomerDetailHeader customerId={id} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <CustomerVerificationStatus customerId={id} />
            <CustomerInfo customerId={id} />
          </div>
          <div className="space-y-6">
            <CustomerCompanyInfo customerId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
