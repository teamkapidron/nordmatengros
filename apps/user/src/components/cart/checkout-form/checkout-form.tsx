'use client';

// Node Modules
import { useRouter } from 'next/navigation';
import React, { memo, useCallback } from 'react';
import { useForm, zodResolver } from '@repo/ui/lib/form';

// Components
import { Form } from '@repo/ui/components/base/form';
import CheckoutFormHeader from './header';
import AddressSelection from './address-selection';
import PalletSelection from './pallet-selection';
import DeliveryDateSelection from './delivery-date-selection';
import Comments from './comments';
import CheckoutFormFooter from './footer';

// Hooks
import { useCart } from '@/hooks/useCart';
import { useOrder } from '@/hooks/useOrder';

// Types/Utils/Constants
import { checkoutFormSchema, CheckoutFormSchema } from './schema';

interface CheckoutFormProps {
  onBack: () => void;
  className?: string;
}

function CheckoutForm(props: CheckoutFormProps) {
  const { onBack, className } = props;

  const router = useRouter();
  const { userCartItems, clearCart } = useCart();
  const { placeOrderMutation } = useOrder();

  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      selectedAddressId: '',
      customerComment: '',
      palletType: 'EUR',
    },
  });

  const handleSubmit = useCallback(
    (values: CheckoutFormSchema) => {
      placeOrderMutation.mutate(
        {
          shippingAddressId: values.selectedAddressId,
          items: userCartItems.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
          palletType: values.palletType,
          desiredDeliveryDate: values.desiredDeliveryDate?.toISOString(),
          customerComment: values.customerComment,
        },
        {
          onSuccess: function () {
            clearCart();
            router.push('/order/list');
          },
        },
      );
    },
    [clearCart, placeOrderMutation, router, userCartItems],
  );

  return (
    <div
      className={`animate-in slide-in-from-right-4 space-y-6 duration-500 ${className}`}
    >
      <CheckoutFormHeader onBack={onBack} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <AddressSelection control={form.control} />

          <PalletSelection control={form.control} />

          <DeliveryDateSelection control={form.control} />

          <Comments control={form.control} />
        </form>
      </Form>

      <CheckoutFormFooter
        onBack={onBack}
        handleSubmit={() => form.handleSubmit(handleSubmit)()}
        isDisabled={!form.formState.isValid}
        isPending={placeOrderMutation.isPending}
      />
    </div>
  );
}

export default memo(CheckoutForm);
