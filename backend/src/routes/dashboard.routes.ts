import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas do dashboard
router.get('/metrics', (req, res) => {
  res.json({ message: 'Get dashboard metrics - to be implemented' });
});

router.get('/tickets', (req, res) => {
  res.json({ message: 'Get ticket metrics - to be implemented' });
});

router.get('/charts', (req, res) => {
  res.json({ message: 'Get chart data - to be implemented' });
});

export default router;
