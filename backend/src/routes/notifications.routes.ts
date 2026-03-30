import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de notificações
router.get('/', (req, res) => {
  res.json({ message: 'Get notifications - to be implemented' });
});

router.get('/unread', (req, res) => {
  res.json({ message: 'Get unread notifications - to be implemented' });
});

router.patch('/:id/read', (req, res) => {
  res.json({ message: 'Mark notification as read - to be implemented' });
});

router.patch('/read-all', (req, res) => {
  res.json({ message: 'Mark all as read - to be implemented' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete notification - to be implemented' });
});

export default router;
