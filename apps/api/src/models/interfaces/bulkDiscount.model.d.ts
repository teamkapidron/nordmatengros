import { Document, Types } from 'mongoose';
import { BulkDiscount } from '@repo/types/bulkDiscount';

export interface IBulkDiscount extends Document, BulkDiscount {}
