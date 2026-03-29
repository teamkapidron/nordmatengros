'use client';

// Node Modules
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useMemo, useState } from 'react';
import { Heart, ShoppingCart, BarChart3, LogIn } from '@repo/ui/lib/icons';
import { toast } from '@repo/ui/lib/sonner';

// Components
import { Button } from '@repo/ui/components/base/button';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';

// Hooks
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useDiscount } from '@/hooks/useDiscount';
import { useFavourite } from '@/hooks/useFavourite';

// Types/Utils
import { getPricing } from '@/utils/price.util';
import { formatPrice } from '@/utils/price.util';
import { ProductResponse } from '@/hooks/useProduct/types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

interface ProductCardProps {
  product: ProductResponse;
  className?: string;
}

interface ProductImageProps {
  product: ProductResponse;
  isAuthenticated: boolean;
}

const ProductImage = memo(({ product, isAuthenticated }: ProductImageProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToFavoritesMutation, removeFromFavoritesMutation } =
    useFavourite();
  const productImage = product.images?.[0] || '';

  const handleToggleFavorite = useCallback(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }

    if (product.isFavorite) {
      removeFromFavoritesMutation.mutate(
        { productId: product._id },
        {
          onSuccess: async function () {
            await queryClient.invalidateQueries({
              queryKey: [ReactQueryKeys.GET_PRODUCTS],
            });
          },
        },
      );
    } else {
      addToFavoritesMutation.mutate(
        { productId: product._id },
        {
          onSuccess: async function () {
            await queryClient.invalidateQueries({
              queryKey: [ReactQueryKeys.GET_PRODUCTS],
            });
          },
        },
      );
    }
  }, [
    isAuthenticated,
    product.isFavorite,
    product._id,
    router,
    removeFromFavoritesMutation,
    queryClient,
    addToFavoritesMutation,
  ]);

  return (
    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[var(--baladi-light)]/30">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <Link
            scroll={false}
            href={`/product/${product.slug}`}
            className="block h-full w-full"
          >
            <Image
              width={400}
              height={400}
              src={productImage}
              alt={product.name}
              className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              priority={false}
              quality={85}
            />
          </Link>

          {isAuthenticated && (
            <Button
              variant="ghost"
              className={cn(
                'absolute top-3 right-3 z-20 rounded-full p-2 transition-all duration-300',
                'hover:scale-110 hover:shadow-md active:scale-95',
                'bg-white/90 text-[var(--baladi-gray)] hover:bg-white hover:text-red-500',
                product.isFavorite
                  ? 'text-red-500'
                  : 'text-[var(--baladi-gray)]',
              )}
              onClick={handleToggleFavorite}
            >
              <Heart
                size={16}
                className="transition-all duration-300"
                fill={product.isFavorite ? 'red' : 'none'}
              />
            </Button>
          )}

          {product.hasVolumeDiscount && (
            <div className="absolute top-3 left-3 z-20 rounded-full bg-gradient-to-r from-[var(--baladi-secondary)] to-[var(--baladi-accent)] px-2 py-1 text-xs font-medium text-white shadow-sm">
              <BarChart3 size={12} className="mr-1 inline-block" />
              Volum rabatt
            </div>
          )}
        </div>
      </div>

      <ProductStockBadge stock={product.stock} />
    </div>
  );
});

interface ProductStockBadgeProps {
  stock: number;
}

const ProductStockBadge = memo(({ stock }: ProductStockBadgeProps) => {
  const isOutOfStock = stock <= 0;

  if (isOutOfStock) {
    return (
      <div className="absolute bottom-3 left-3 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-medium text-white shadow-sm">
        Utsolgt
      </div>
    );
  }

  return (
    <div
      className={cn(
        'absolute bottom-3 left-3 z-10 rounded-lg px-2 py-1 text-xs font-medium text-white shadow-sm',
        stock <= 5 ? 'bg-amber-500' : 'bg-green-500',
      )}
    >
      {stock <= 5 ? `${stock} igjen` : 'På lager'}
    </div>
  );
});

interface ProductInfoSectionProps {
  product: ProductResponse;
  price: number;
  pricePerUnit: number;
  isAuthenticated: boolean;
}

const ProductInfoSection = memo(
  ({
    product,
    price,
    pricePerUnit,
    isAuthenticated,
  }: ProductInfoSectionProps) => {
    return (
      <div className="mb-3">
        <div className="mb-2">
          <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-[var(--baladi-primary)]">
            {product.categories[0]?.name || 'Ukategoriserad'}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-dark)]">
          <Link
            href={`/product/${product.slug}`}
            className="transition-colors hover:text-[var(--baladi-primary)]"
          >
            {product.name}
          </Link>
        </h3>

        {isAuthenticated && (
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline">
                <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
                  {formatPrice(price)} kr
                </span>
              </div>
              <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                {product.vat}% Inkl. mva
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-dm-sans)] font-bold text-green-700">
                {formatPrice(pricePerUnit)} kr/enhet
              </span>
            </div>
          </div>
        )}
      </div>
    );
  },
);

interface ProductActionsProps {
  isAuthenticated: boolean;
  isOutOfStock: boolean;
  quantity: number;
  stockCount: number;
  isInCart: boolean;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onGoToLogin: () => void;
}

const ProductActions = memo(
  ({
    isAuthenticated,
    isOutOfStock,
    quantity,
    stockCount,
    isInCart,
    onQuantityChange,
    onAddToCart,
    onGoToLogin,
  }: ProductActionsProps) => {
    if (isOutOfStock) {
      return (
        <Button
          className="flex w-full items-center justify-center rounded-lg border border-[var(--baladi-border)] bg-[var(--baladi-muted)] px-3 py-2.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-gray)]"
          disabled
        >
          Utsolgt
        </Button>
      );
    }

    if (!isAuthenticated) {
      return (
        <Button
          onClick={onGoToLogin}
          className="flex w-full items-center justify-center rounded-lg bg-[var(--baladi-primary)]/95 px-3 py-2.5 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--baladi-primary)]"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Logg inn
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-between space-x-2">
        <div className="max-w-[100px] flex-grow">
          <QuantityInput
            value={quantity}
            onChange={onQuantityChange}
            min={1}
            max={Math.min(99, stockCount)}
            size="sm"
          />
        </div>

        <Button
          onClick={onAddToCart}
          className={cn(
            'flex items-center justify-center rounded-lg p-2.5 text-white transition-all duration-300',
            isInCart
              ? 'bg-green-600 shadow-md hover:bg-green-700 hover:shadow-lg'
              : 'bg-[var(--baladi-primary)] shadow-md hover:bg-[var(--baladi-primary-dark)] hover:shadow-lg',
          )}
        >
          <ShoppingCart size={16} />
          {isInCart && <span className="ml-1 text-xs font-medium">✓</span>}
        </Button>
      </div>
    );
  },
);

function ProductCard(props: ProductCardProps) {
  const { product, className } = props;

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { bulkDiscountQuery } = useDiscount();
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();

  const itemQuantity = getItemQuantity(product._id);

  const [quantity, setQuantity] = useState(itemQuantity || 1);

  const { isOutOfStock, stockCount, price, pricePerUnit } = useMemo(() => {
    const bulkDiscounts = bulkDiscountQuery.data?.bulkDiscounts || [];

    const { netPrice, pricePerUnit } = getPricing({
      product,
      quantity,
      bulkDiscounts,
    });

    return {
      isOutOfStock: product.stock <= 0,
      stockCount: product.stock,
      price: netPrice,
      pricePerUnit,
    };
  }, [bulkDiscountQuery.data?.bulkDiscounts, product, quantity]);

  const handleAddToCart = useCallback(() => {
    if (isOutOfStock || !isAuthenticated) return;

    if (isInCart(product._id)) {
      updateQuantity(product._id, quantity);
      toast.success('Antall oppdatert i handlekurven');
    } else {
      addToCart(product, quantity);
      toast.success('Produktet er lagt til i handlekurven');
    }
  }, [
    addToCart,
    isAuthenticated,
    isOutOfStock,
    product,
    quantity,
    isInCart,
    updateQuantity,
  ]);

  const handleGoToLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-white transition-all duration-300',
        'border border-[var(--baladi-border)] hover:border-[var(--baladi-primary)]/30',
        'hover:shadow-[var(--baladi-primary)]/10 hover:shadow-lg',
        className,
      )}
    >
      <ProductImage product={product} isAuthenticated={isAuthenticated} />

      <div className="relative z-10 bg-white p-4">
        <ProductInfoSection
          product={product}
          price={price}
          pricePerUnit={pricePerUnit}
          isAuthenticated={isAuthenticated}
        />

        <ProductActions
          isAuthenticated={isAuthenticated}
          isOutOfStock={isOutOfStock}
          quantity={quantity}
          isInCart={isInCart(product._id)}
          stockCount={stockCount}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          onGoToLogin={handleGoToLogin}
        />
      </div>
    </div>
  );
}

export default memo(ProductCard);
