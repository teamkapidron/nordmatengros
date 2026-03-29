import { Schema, model } from 'mongoose';
import { IConfig } from './interfaces/config.model';

const configSchema = new Schema<IConfig>(
  {
    showPalette: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const Config = model<IConfig>('Config', configSchema);

export default Config;
