import { Document } from 'mongoose';
import { Admin } from '@repo/types/admin';

export interface IAdmin extends Document, Admin {}
