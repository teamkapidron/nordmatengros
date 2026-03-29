// Node Modules
import { memo } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Control } from '@repo/ui/lib/form';
import { Package } from '@repo/ui/lib/icons';

// Components
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
import { Label } from '@repo/ui/components/base/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@repo/ui/components/base/radio-group';

// Types
import { CheckoutFormSchema } from './schema';

interface PalletSelectionProps {
  control: Control<CheckoutFormSchema>;
}

function PalletSelection({ control }: PalletSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package size={20} className="text-[var(--baladi-primary)]" />
          Pallettype
        </CardTitle>
        <CardDescription>Velg ønsket pallettype for leveransen</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="palletType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div className={cn('relative')}>
                    <RadioGroupItem value="EUR" id="EUR" className="sr-only" />
                    <Label
                      htmlFor="EUR"
                      className={cn(
                        'flex cursor-pointer items-center justify-between rounded-lg border-2 border-[var(--baladi-border)] p-4 peer-checked:border-[var(--baladi-primary)] peer-checked:bg-[var(--baladi-primary)]/5 hover:border-[var(--baladi-primary)]/50',
                        field.value === 'EUR' &&
                          'border-[var(--baladi-primary)] bg-[var(--baladi-primary)]/5',
                      )}
                    >
                      <div className="space-y-1">
                        <div className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                          Europall
                        </div>
                        <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                          220 cm = 1,92 m³
                        </div>
                      </div>
                      <Package
                        size={20}
                        className="text-[var(--baladi-primary)]"
                      />
                    </Label>
                  </div>

                  <div className={cn('relative')}>
                    <RadioGroupItem
                      value="Large"
                      id="Large"
                      className="sr-only"
                    />
                    <Label
                      htmlFor="Large"
                      className={cn(
                        'flex cursor-pointer items-center justify-between rounded-lg border-2 border-[var(--baladi-border)] p-4 peer-checked:border-[var(--baladi-primary)] peer-checked:bg-[var(--baladi-primary)]/5 hover:border-[var(--baladi-primary)]/50',
                        field.value === 'Large' &&
                          'border-[var(--baladi-primary)] bg-[var(--baladi-primary)]/5',
                      )}
                    >
                      <div className="space-y-1">
                        <div className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-dark)]">
                          Stor pall
                        </div>
                        <div className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                          220 cm = 2,4 m³
                        </div>
                      </div>
                      <Package
                        size={20}
                        className="text-[var(--baladi-primary)]"
                      />
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default memo(PalletSelection);
