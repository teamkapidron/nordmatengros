'use client';

// Node Modules
import { memo, useCallback, useState } from 'react';

// Components
import CartContent from '@/components/cart/cart-content';
import CartSummary from '@/components/cart/cart-summary';
import CheckoutForm from '@/components/cart/checkout-form/checkout-form';

function Cart() {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const handleShowCheckout = useCallback(() => {
    setShowCheckoutForm(true);
  }, []);

  const handleBackToCart = useCallback(() => {
    setShowCheckoutForm(false);
  }, []);

  return (
    <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-dark)] md:text-4xl">
          {showCheckoutForm ? 'Kassen' : 'Handlekurv'}
        </h1>
        <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
          {showCheckoutForm
            ? 'Velg leveringsadresse og tilpass bestillingen'
            : 'Gjennomgå og fullfør din bestilling'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {!showCheckoutForm && (
          <>
            <div className="lg:col-span-2">
              <CartContent />
            </div>
            <div className="lg:col-span-1">
              <CartSummary
                onCheckout={handleShowCheckout}
                className="animate-in fade-in-0 duration-300"
              />
            </div>
          </>
        )}

        {showCheckoutForm && (
          <div className="lg:col-span-3">
            <CheckoutForm
              onBack={handleBackToCart}
              className="animate-in slide-in-from-right-4 fade-in-0 duration-500"
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default memo(Cart);
