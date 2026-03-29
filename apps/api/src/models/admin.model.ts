import { Schema, model } from 'mongoose';
import { IAdmin } from './interfaces/admin.model';

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
