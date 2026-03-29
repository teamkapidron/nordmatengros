import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/check', (_req, res) => {
  res.status(200).json({
    message: 'Server is running',
  });
});

export default router;
