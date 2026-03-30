import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de unidades
router.get('/', (req, res) => {
  res.json({ message: 'Get units - to be implemented' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get unit by ID - to be implemented' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create unit - to be implemented' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update unit - to be implemented' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete unit - to be implemented' });
});

router.get('/:id/form', (req, res) => {
  res.json({ message: 'Get unit form - to be implemented' });
});

router.post('/:id/form/submit', (req, res) => {
  res.json({ message: 'Submit unit form - to be implemented' });
});

export default router;
