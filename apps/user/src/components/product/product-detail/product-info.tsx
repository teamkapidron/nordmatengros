'use client';

// Node Modules
import { cn } from '@repo/ui/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState, memo, useMemo, useCallback, useEffect } from 'react';
import { toast } from '@repo/ui/lib/sonner';
import {
  ShoppingCart,
  Package2,
  Truck,
  Bell,
  Percent,
  TrendingDown,
  Scale,
  Ruler,
  Barcode,
  Calendar,
  Heart,
  LogIn,
} from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Separator } from '@repo/ui/components/base/separator';
import { QuantityInput } from '@repo/ui/components/base/quantity-input';

// Hooks
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useDiscount } from '@/hooks/useDiscount';
import { useFavourite } from '@/hooks/useFavourite';
import { useProductBySlug } from '@/hooks/useProduct';

// Types/Utils
import { formatDate } from '@/utils/date.util';
import { formatPrice } from '@/utils/price.util';
import { getPricing } from '@/utils/price.util';
import { BulkDiscount } from '@repo/types/bulkDiscount';
import { ProductResponse } from '@/hooks/useProduct/types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

// Sub-components
interface ProductPriceDisplayProps {
  price: number;
  vat: number;
  pricePerUnit: number;
  isAuthenticated: boolean;
}

const ProductPriceDisplay = memo(
  ({ vat, isAuthenticated, pricePerUnit, price }: ProductPriceDisplayProps) => {
    if (!isAuthenticated) return null;

    return (
      <div className="space-y-4 rounded-lg py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-primary)]">
              {formatPrice(price)} kr
            </span>
          </div>
          <div className="rounded-lg border border-[var(--baladi-secondary)]/20 bg-gradient-to-r from-[var(--baladi-secondary)]/10 to-[var(--baladi-accent)]/10 px-3 py-2">
            <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-secondary)]">
              {formatPrice(pricePerUnit)} kr
            </span>
            <span className="ml-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              per enhet
            </span>
          </div>
        </div>
        <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          Pris inkluderer {vat}% MVA
        </p>
      </div>
    );
  },
);

interface ProductSpecificationRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const ProductSpecificationRow = memo(
  ({ icon, label, value }: ProductSpecificationRowProps) => (
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
        <strong>{label}:</strong> {value}
      </span>
    </div>
  ),
);

interface ProductSpecificationsProps {
  product: ProductResponse;
  volume: number;
  isAuthenticated: boolean;
}

const ProductSpecifications = memo(
  ({ product, volume, isAuthenticated }: ProductSpecificationsProps) => (
    <div className="space-y-3">
      <ProductSpecificationRow
        icon={<Package2 size={18} className="text-[var(--baladi-primary)]" />}
        label="Kartong"
        value={`${product.noOfUnits} enheter`}
      />

      <ProductSpecificationRow
        icon={<Scale size={18} className="text-[var(--baladi-primary)]" />}
        label="Vekt"
        value={`${product.weight} kg`}
      />

      <ProductSpecificationRow
        icon={<Ruler size={18} className="text-[var(--baladi-primary)]" />}
        label="Volum"
        value={`${volume} m³`}
      />

      {product.barcode && (
        <ProductSpecificationRow
          icon={<Barcode size={18} className="text-[var(--baladi-primary)]" />}
          label="Barcode"
          value={product.barcode}
        />
      )}

      {product.supplier?.countryOfOrigin && (
        <ProductSpecificationRow
          icon={<Truck size={18} className="text-[var(--baladi-primary)]" />}
          label="Opprinnelsesland"
          value={product.supplier.countryOfOrigin}
        />
      )}

      {isAuthenticated && product.bestBeforeDate && (
        <ProductSpecificationRow
          icon={<Calendar size={18} className="text-[var(--baladi-primary)]" />}
          label="Utløpsdato"
          value={formatDate(product.bestBeforeDate)}
        />
      )}
    </div>
  ),
);

interface BulkDiscountDisplayProps {
  bulkDiscounts: BulkDiscount[] | undefined;
  hasVolumeDiscount: boolean;
}

const BulkDiscountDisplay = memo(
  ({ bulkDiscounts, hasVolumeDiscount }: BulkDiscountDisplayProps) => {
    if (!bulkDiscounts?.length || !hasVolumeDiscount) return null;

    return (
      <div className="rounded-lg bg-gradient-to-r from-[var(--baladi-primary)]/10 to-[var(--baladi-accent)]/10 p-4">
        <div className="mb-3 flex items-center gap-3">
          <TrendingDown size={20} className="text-[var(--baladi-primary)]" />
          <h4 className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
            Mengderabatter tilgjengelig!
          </h4>
        </div>

        <div className="space-y-2">
          {bulkDiscounts
            .sort((a, b) => a.minQuantity - b.minQuantity)
            .slice(0, 3)
            .map((discount) => (
              <div
                key={discount._id}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  <Percent size={14} className="text-[var(--baladi-primary)]" />
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-dark)]">
                    {discount.minQuantity}+ enheter
                  </span>
                </div>
                <span className="rounded-full bg-[var(--baladi-accent)] px-2 py-1 font-[family-name:var(--font-sora)] text-xs font-bold text-white">
                  {discount.discountPercentage}% rabatt
                </span>
              </div>
            ))}
        </div>

        <p className="mt-3 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
          Rabattene gjelder automatisk ved kassen
        </p>
      </div>
    );
  },
);

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxStock: number;
  isOutOfStock: boolean;
  availableStock: number;
}

const QuantitySelector = memo(
  ({
    quantity,
    onQuantityChange,
    maxStock,
    isOutOfStock,
    availableStock,
  }: QuantitySelectorProps) => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <QuantityInput
          value={quantity}
          onChange={onQuantityChange}
          min={1}
          max={Math.min(99, maxStock)}
          disabled={isOutOfStock}
          size="lg"
        />
      </div>
      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
        {availableStock > 0 ? 'På lager' : 'Ikke på lager'}
      </span>
    </div>
  ),
);

interface ProductActionsProps {
  isAuthenticated: boolean;
  isOutOfStock: boolean;
  quantity: number;
  price: number;
  product: ProductResponse;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  onGoToLogin: () => void;
  isInCart: boolean;
}

const ProductActions = memo(
  ({
    isAuthenticated,
    isOutOfStock,
    quantity,
    price,
    onAddToCart,
    onAddToWishlist,
    onGoToLogin,
    product,
    isInCart,
  }: ProductActionsProps) => {
    if (!isAuthenticated) {
      return (
        <Button
          size="lg"
          variant="outline"
          className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
          onClick={onGoToLogin}
        >
          <LogIn size={18} />
          Logg inn for å bestille
        </Button>
      );
    }

    if (isOutOfStock) {
      return (
        <Button
          size="lg"
          variant="outline"
          className="flex-1 font-[family-name:var(--font-dm-sans)] font-medium"
          disabled
        >
          <Bell size={18} />
          Produktet er ikke tilgjengelig
        </Button>
      );
    }

    return (
      <div className="flex gap-3">
        <Button
          size="lg"
          onClick={onAddToCart}
          className={cn(
            'flex-1 font-[family-name:var(--font-dm-sans)] font-medium',
            isInCart && 'bg-green-600 hover:bg-green-700',
          )}
        >
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} />
            {isInCart ? (
              <>
                <span>Oppdatert i handlekurv</span>
                <span className="text-sm opacity-80">
                  • {formatPrice(price * quantity)} kr
                </span>
              </>
            ) : (
              <>
                <span>Legg til i Handlekurv</span>
                <span className="text-sm opacity-80">
                  • {formatPrice(price * quantity)} kr
                </span>
              </>
            )}
          </div>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className={cn(
            'font-[family-name:var(--font-dm-sans)] font-medium',
            product.isFavorite && 'bg-red-500 text-white',
          )}
          onClick={onAddToWishlist}
        >
          <Heart size={18} />
        </Button>
      </div>
    );
  },
);

function useProductInfo(slug: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { addToCart, getItemQuantity, updateQuantity, isInCart } = useCart();
  const { addToFavoritesMutation, removeFromFavoritesMutation } =
    useFavourite();
  const { bulkDiscountQuery } = useDiscount();
  const { data: productData, isLoading } = useProductBySlug(slug);

  const [quantity, setQuantity] = useState(
    getItemQuantity(productData?.product?._id) || 1,
  );

  useEffect(() => {
    setQuantity(getItemQuantity(productData?.product?._id) || 1);
  }, [productData?.product?._id, getItemQuantity]);

  const productDetails = useMemo(() => {
    if (!productData?.product) return null;

    const product = productData.product;
    const volume =
      (product.dimensions?.length ?? 0) *
      (product.dimensions?.width ?? 0) *
      (product.dimensions?.height ?? 0);

    const { netPrice, pricePerUnit } = getPricing({
      product,
      quantity,
      bulkDiscounts: bulkDiscountQuery.data?.bulkDiscounts,
    });

    return {
      product,
      isOutOfStock: product.stock <= 0,
      volume: volume / 1000000,
      price: netPrice,
      pricePerUnit,
      bulkDiscounts: bulkDiscountQuery.data?.bulkDiscounts,
    };
  }, [productData?.product, bulkDiscountQuery.data?.bulkDiscounts, quantity]);

  const handleAddToCart = useCallback(() => {
    if (!productDetails?.product || !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isInCart(productDetails.product._id)) {
      updateQuantity(productDetails.product._id, quantity);
      toast.success('Antall oppdatert');
    } else {
      addToCart(productDetails.product, quantity);
      toast.success('Produktet er lagt til i handlekurv');
    }
  }, [
    productDetails?.product,
    isAuthenticated,
    isInCart,
    router,
    updateQuantity,
    quantity,
    addToCart,
  ]);

  const handleAddToWishlist = useCallback(() => {
    if (!productDetails?.product._id) {
      return;
    }

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (productDetails?.product.isFavorite) {
      removeFromFavoritesMutation.mutate(
        { productId: productDetails.product._id },
        {
          onSuccess: async function () {
            await queryClient.invalidateQueries({
              queryKey: [ReactQueryKeys.GET_PRODUCT_BY_SLUG, slug],
            });
          },
        },
      );
    } else {
      addToFavoritesMutation.mutate(
        {
          productId: productDetails?.product._id,
        },
        {
          onSuccess: async function () {
            await queryClient.invalidateQueries({
              queryKey: [ReactQueryKeys.GET_PRODUCT_BY_SLUG, slug],
            });
          },
        },
      );
    }
  }, [
    isAuthenticated,
    productDetails?.product.isFavorite,
    productDetails?.product._id,
    router,
    removeFromFavoritesMutation,
    queryClient,
    slug,
    addToFavoritesMutation,
  ]);

  const handleGoToLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  return {
    ...productDetails,
    isLoading,
    quantity,
    setQuantity,
    isAuthenticated,
    handleAddToCart,
    handleAddToWishlist,
    handleGoToLogin,
    isInCart: isInCart(productDetails?.product?._id ?? ''),
  };
}

const ProductInfoSkeleton = memo(() => (
  <div className="space-y-6">
    <div className="space-y-4">
      <div className="h-8 w-3/4 animate-pulse rounded bg-[var(--baladi-light)]" />
      <div className="h-6 w-full animate-pulse rounded bg-[var(--baladi-light)]" />
      <div className="h-6 w-2/3 animate-pulse rounded bg-[var(--baladi-light)]" />
    </div>

    <div className="space-y-2">
      <div className="h-10 w-48 animate-pulse rounded bg-[var(--baladi-light)]" />
      <div className="h-5 w-32 animate-pulse rounded bg-[var(--baladi-light)]" />
    </div>

    <div className="space-y-4">
      <div className="h-12 w-full animate-pulse rounded bg-[var(--baladi-light)]" />
      <div className="flex gap-4">
        <div className="h-12 w-32 animate-pulse rounded bg-[var(--baladi-light)]" />
        <div className="h-12 flex-1 animate-pulse rounded bg-[var(--baladi-light)]" />
      </div>
    </div>
  </div>
));

function ProductInfo() {
  const { slug } = useParams<{ slug: string }>();
  const {
    product,
    isOutOfStock,
    volume,
    price,
    pricePerUnit,
    bulkDiscounts,
    isLoading,
    quantity,
    setQuantity,
    isAuthenticated,
    handleAddToCart,
    handleAddToWishlist,
    handleGoToLogin,
    isInCart,
  } = useProductInfo(slug);

  if (isLoading) {
    return <ProductInfoSkeleton />;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-bold text-[var(--baladi-dark)] lg:text-3xl">
          {product.name}
        </h1>
        <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
          {product.shortDescription}
        </p>
      </div>

      <ProductPriceDisplay
        price={price ?? 0}
        vat={product.vat}
        isAuthenticated={isAuthenticated}
        pricePerUnit={pricePerUnit ?? 0}
      />

      <ProductSpecifications
        product={product}
        volume={volume ?? 0}
        isAuthenticated={isAuthenticated}
      />

      <BulkDiscountDisplay
        bulkDiscounts={bulkDiscounts}
        hasVolumeDiscount={product.hasVolumeDiscount}
      />

      <Separator />

      <div className="space-y-4">
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          maxStock={product.stock ?? 0}
          isOutOfStock={isOutOfStock ?? false}
          availableStock={product.stock ?? 0}
        />

        <ProductActions
          isAuthenticated={isAuthenticated}
          isOutOfStock={isOutOfStock ?? false}
          quantity={quantity}
          price={price ?? 0}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onGoToLogin={handleGoToLogin}
          product={product}
          isInCart={isInCart}
        />
      </div>
    </div>
  );
}

export default memo(ProductInfo);
