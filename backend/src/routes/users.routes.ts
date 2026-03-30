import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de usuários
router.get('/', (req, res) => {
  res.json({ message: 'Get users - to be implemented' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get user by ID - to be implemented' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create user - to be implemented' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update user - to be implemented' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete user - to be implemented' });
});

router.get('/by-unit/:unitId', (req, res) => {
  res.json({ message: 'Get users by unit - to be implemented' });
});

export default router;
