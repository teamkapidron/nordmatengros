'use client';

import React from 'react';
import { cn } from '@repo/ui/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/base/alert-dialog';

interface ConfirmationDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  isPending?: boolean;
  confirmButtonClassName?: string;
}

export function ConfirmationDialog({
  trigger,
  title,
  description,
  confirmText,
  cancelText = 'Avbryt',
  onConfirm,
  isPending = false,
  confirmButtonClassName = 'bg-red-600 hover:bg-red-700',
}: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn('cursor-pointer', confirmButtonClassName)}
            onClick={onConfirm}
            disabled={isPending}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
