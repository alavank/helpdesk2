import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de chamados
router.get('/', (req, res) => {
  res.json({ message: 'Get tickets - to be implemented' });
});

router.get('/number/:number', (req, res) => {
  res.json({ message: 'Get ticket by number - to be implemented' });
});

router.get('/access-code/:code', (req, res) => {
  res.json({ message: 'Get ticket by access code - to be implemented' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get ticket by ID - to be implemented' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create ticket - to be implemented' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update ticket - to be implemented' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete ticket - to be implemented' });
});

router.patch('/:id/assign', (req, res) => {
  res.json({ message: 'Assign ticket - to be implemented' });
});

router.patch('/:id/status', (req, res) => {
  res.json({ message: 'Update ticket status - to be implemented' });
});

router.post('/:id/messages', (req, res) => {
  res.json({ message: 'Add message to ticket - to be implemented' });
});

router.post('/:id/attachments', (req, res) => {
  res.json({ message: 'Upload attachment - to be implemented' });
});

router.patch('/:id/view', (req, res) => {
  res.json({ message: 'Mark ticket as viewed - to be implemented' });
});

router.patch('/:id/resolve', (req, res) => {
  res.json({ message: 'Resolve ticket - to be implemented' });
});

export default router;
