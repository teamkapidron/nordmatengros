'use client';

// Node Modules
import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Hash } from '@repo/ui/lib/icons';

// Components
import { Button } from '@repo/ui/components/base/button';
import { Card, CardContent } from '@repo/ui/components/base/card';

// Hooks
import { useOrderDetails } from '@/hooks/useOrder';

interface CustomerInfoCardProps {
  orderId: string;
}

function CustomerInfoCard(props: CustomerInfoCardProps) {
  const { orderId } = props;

  const router = useRouter();
  const { data: orderData } = useOrderDetails(orderId);
  const order = orderData?.order;

  const onViewCustomerProfile = useCallback(() => {
    router.push(`/dashboard/customers/${order?.userId._id}`);
  }, [order?.userId._id, router]);

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center">
            {order?.userId.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{order?.userId.name}</h3>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Mail className="mr-1.5 h-3.5 w-3.5" />
              {order?.userId.email}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex items-center gap-2 text-sm">
            <Hash className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Kundenummer:</span>
            <span className="bg-gray-100 px-2 py-1 font-mono text-xs">
              {order?.userId._id}
            </span>
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={onViewCustomerProfile}
            >
              Se kundeside
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(CustomerInfoCard);
