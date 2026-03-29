// Node Modules
import { memo } from 'react';
import { Control } from '@repo/ui/lib/form';
import { MessageSquare } from '@repo/ui/lib/icons';

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
import { Textarea } from '@repo/ui/components/base/textarea';

// Types
import { CheckoutFormSchema } from './schema';

interface CommentsProps {
  control: Control<CheckoutFormSchema>;
}

function Comments({ control }: CommentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare size={20} className="text-[var(--baladi-primary)]" />
          Kommentar til bestillingen
        </CardTitle>
        <CardDescription>
          Legg til spesielle instruksjoner eller kommentarer (valgfritt)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="customerComment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Skriv din kommentar her..."
                  className="min-h-[100px] resize-none"
                />
              </FormControl>
              <p className="mt-2 font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                {field.value?.length || 0}/500 tegn
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default memo(Comments);
