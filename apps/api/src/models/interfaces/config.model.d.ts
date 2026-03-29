import { Document } from 'mongoose';
import { Config } from '@repo/types/config';

export interface IConfig extends Config, Document {}
