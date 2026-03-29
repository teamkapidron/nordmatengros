'use client';

// Node Modules
import React, { memo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/base/dialog';
import EditInventoryForm from './edit-inventory-form';

// Types
import { InventoryResponse } from '@/hooks/useInventory/types';
import { ReactQueryKeys } from '@/hooks/useReactQuery/types';

interface EditInventoryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string;
  inventoryItem: InventoryResponse;
}

function EditInventoryDialog(props: EditInventoryDialogProps) {
  const { open, setOpen, productId, inventoryItem } = props;
  const queryClient = useQueryClient();

  const handleSuccess = useCallback(() => {
    setOpen(false);
    queryClient.invalidateQueries({
      queryKey: [ReactQueryKeys.GET_PRODUCT_INVENTORY, productId],
    });
  }, [setOpen, productId, queryClient]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Rediger Lager</DialogTitle>
        </DialogHeader>
        <EditInventoryForm
          inventoryItem={inventoryItem}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(EditInventoryDialog);
