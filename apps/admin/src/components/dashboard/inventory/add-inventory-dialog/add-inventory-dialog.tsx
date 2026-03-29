'use client';

// Node Modules
import React, { memo, useCallback, useState } from 'react';
import { Plus } from '@repo/ui/lib/icons';

// Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from '@repo/ui/components/base/dialog';
import { Button } from '@repo/ui/components/base/button';
import AddInventoryForm from './add-inventory-form';

interface AddInventoryDialogProps {
  trigger?: React.ReactNode;
}

function AddInventoryDialog({ trigger }: AddInventoryDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="hidden">Legg til Lager</DialogTitle>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="group flex h-9 items-center gap-2 rounded-md bg-white px-3 py-2 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-primary)] transition-all duration-200 hover:bg-white/95 hover:shadow-md focus:ring-2 focus:ring-white/40 focus:outline-none">
            <Plus className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            <span>Legg til Lager</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md border-0 bg-white p-0 shadow-2xl">
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--baladi-primary)]/5 via-transparent to-[var(--baladi-secondary)]/5" />

          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[var(--baladi-primary)]/10" />
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[var(--baladi-secondary)]/10" />

          <div className="relative p-8">
            <AddInventoryForm onSuccess={handleSuccess} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddInventoryDialog);
