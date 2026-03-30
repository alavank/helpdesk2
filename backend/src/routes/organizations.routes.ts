import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de organizações
router.get('/', (req, res) => {
  res.json({ message: 'Get organizations - to be implemented' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get organization by ID - to be implemented' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create organization - to be implemented' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update organization - to be implemented' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete organization - to be implemented' });
});

export default router;
