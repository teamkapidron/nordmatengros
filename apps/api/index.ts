// Node Modules
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import serverlessExpress from '@codegenie/serverless-express';

// Database
import connectToMongo from '@/database/mongo.db';

// Middlewares
import errorMiddleware from '@/middlewares/error.middleware';

// Routes
import userRoute from '@/routes/user.route';
import authRoute from '@/routes/auth.route';
import orderRoute from '@/routes/order.route';
import healthRoute from '@/routes/health.route';
import productRoute from '@/routes/product.route';
import addressRoute from '@/routes/address.route';
import favoriteRoute from '@/routes/favorite.route';
import categoryRoute from '@/routes/category.route';
import discountRoute from '@/routes/discount.route';
import inventoryRoute from '@/routes/inventory.route';
import marketingRoute from '@/routes/marketing.route';
import exportRoute from '@/routes/export.route';
import configRoute from '@/routes/config.route';

const app = express();

dotenv.config({ path: '.env.local' });
(async () => {
  await connectToMongo();
})();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://baladiengros.no',
      'https://www.baladiengros.no',
      'https://admin.baladiengros.no',
      'https://www.admin.baladiengros.no',
    ],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/order', orderRoute);
app.use('/api/health', healthRoute);
app.use('/api/product', productRoute);
app.use('/api/address', addressRoute);
app.use('/api/category', categoryRoute);
app.use('/api/favorite', favoriteRoute);
app.use('/api/discount', discountRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/marketing', marketingRoute);
app.use('/api/export', exportRoute);
app.use('/api/config', configRoute);

app.use(errorMiddleware);

app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});

export const handler = serverlessExpress({ app });
