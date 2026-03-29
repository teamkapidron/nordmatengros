// Node Modules
import { memo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Control, useFormContext } from '@repo/ui/lib/form';
import { MapPin } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/components/base/form';
import { Badge } from '@repo/ui/components/base/badge';

// Hooks
import { useAddress } from '@/hooks/useAddress';

// Types
import { Address } from '@repo/types/address';
import { CheckoutFormSchema } from './schema';

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: () => void;
}

const AddressCard = memo(
  ({ address, isSelected, onSelect }: AddressCardProps) => (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
        isSelected
          ? 'bg-[var(--baladi-primary)]/5 border-[var(--baladi-primary)]'
          : 'hover:border-[var(--baladi-primary)]/50 border-[var(--baladi-border)]'
      }`}
    >
      {address.isDefault && (
        <Badge className="absolute -top-2 right-4 bg-[var(--baladi-accent)] text-white">
          Standard
        </Badge>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[var(--baladi-primary)]" />
          <span className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
            {address.label || 'Adresse'}
          </span>
        </div>

        <div className="space-y-1 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          <p>
            {address.postalCode} {address.city}
          </p>
          <p>
            {address.state}, {address.country}
          </p>
          {address.phoneNumber && <p>Tlf: {address.phoneNumber}</p>}
        </div>
      </div>

      {isSelected && (
        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[var(--baladi-primary)]">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>
      )}
    </div>
  ),
);

interface AddressSelectionProps {
  control: Control<CheckoutFormSchema>;
}

function AddressSelection({ control }: AddressSelectionProps) {
  const router = useRouter();
  const { address: addresses, isAddressLoading } = useAddress();
  const form = useFormContext<CheckoutFormSchema>();

  useEffect(() => {
    if (addresses?.addresses && !form.getValues('selectedAddressId')) {
      const defaultAddress = addresses.addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        form.setValue('selectedAddressId', defaultAddress._id);
      } else if (
        addresses.addresses.length > 0 &&
        addresses.addresses[0]?._id
      ) {
        form.setValue('selectedAddressId', addresses.addresses[0]._id);
      }
    }
  }, [addresses, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin size={20} className="text-[var(--baladi-primary)]" />
          Leveringsadresse
        </CardTitle>
        <CardDescription>
          Velg hvor du vil at bestillingen skal leveres
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAddressLoading ? (
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-24 w-full animate-pulse rounded-lg bg-[var(--baladi-light)]"
              />
            ))}
          </div>
        ) : addresses?.addresses && addresses.addresses.length > 0 ? (
          <FormField
            control={control}
            name="selectedAddressId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid gap-3">
                    {addresses.addresses.map((address) => (
                      <AddressCard
                        key={address._id}
                        address={address}
                        isSelected={field.value === address._id}
                        onSelect={() => field.onChange(address._id)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="rounded-lg border-2 border-dashed border-[var(--baladi-border)] p-6 text-center">
            <MapPin
              size={24}
              className="mx-auto mb-2 text-[var(--baladi-gray)]"
            />
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
              Du har ikke lagt til noen leveringsadresser ennå. Legg til en
              adresse for å fortsette med bestillingen.
            </p>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => router.push('/address/list')}
            >
              Gå til adresser
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(AddressSelection);
