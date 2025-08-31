import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.send('Hello World!');
});

export default router;
