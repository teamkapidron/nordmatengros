import { Document } from 'mongoose';
import { User } from '@repo/types/user';

export interface IUser extends Document, User {}
