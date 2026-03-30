import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de formulários
router.get('/unit/:unitId', (req, res) => {
  res.json({ message: 'Get forms by unit - to be implemented' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get form by ID - to be implemented' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create form - to be implemented' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update form - to be implemented' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete form - to be implemented' });
});

router.get('/:id/submissions', (req, res) => {
  res.json({ message: 'Get form submissions - to be implemented' });
});

export default router;
