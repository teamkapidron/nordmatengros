// Node Modules
import { memo } from 'react';
import { Control } from '@repo/ui/lib/form';
import { Calendar } from '@repo/ui/lib/icons';

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/base/popover';
import { Calendar as CalendarComponent } from '@repo/ui/components/base/calendar';

// Types
import { CheckoutFormSchema } from './schema';

interface DeliveryDateSelectionProps {
  control: Control<CheckoutFormSchema>;
}

function DeliveryDateSelection({ control }: DeliveryDateSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar size={20} className="text-[var(--baladi-primary)]" />
          Ønsket leveringsdato
        </CardTitle>
        <CardDescription>
          Velg når du ønsker at bestillingen skal leveres (valgfritt)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="desiredDeliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar size={16} className="mr-2" />
                      {field.value ? (
                        field.value.toLocaleDateString('nb-NO', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      ) : (
                        <span>Velg leveringsdato</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default memo(DeliveryDateSelection);
