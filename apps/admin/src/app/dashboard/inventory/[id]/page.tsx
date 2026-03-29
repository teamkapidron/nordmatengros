import { Metadata } from 'next';
import ProductInventoryView from '@/components/dashboard/inventory/productInventory/product-inventory-view';

export const metadata: Metadata = {
  title: 'Produktlager - Detaljer',
};

interface InventoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function InventoryDetailPage(
  props: InventoryDetailPageProps,
) {
  const { id } = await props.params;

  return <ProductInventoryView productId={id} />;
}
