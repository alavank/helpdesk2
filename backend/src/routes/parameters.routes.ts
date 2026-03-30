import { Router } from 'express';

const router = Router();

// Status
router.get('/statuses', (req, res) => {
  res.json({ message: 'Get statuses - to be implemented' });
});

router.post('/statuses', (req, res) => {
  res.json({ message: 'Create status - to be implemented' });
});

router.put('/statuses/:id', (req, res) => {
  res.json({ message: 'Update status - to be implemented' });
});

router.delete('/statuses/:id', (req, res) => {
  res.json({ message: 'Delete status - to be implemented' });
});

// Priorities
router.get('/priorities', (req, res) => {
  res.json({ message: 'Get priorities - to be implemented' });
});

router.post('/priorities', (req, res) => {
  res.json({ message: 'Create priority - to be implemented' });
});

router.put('/priorities/:id', (req, res) => {
  res.json({ message: 'Update priority - to be implemented' });
});

router.delete('/priorities/:id', (req, res) => {
  res.json({ message: 'Delete priority - to be implemented' });
});

// Categories
router.get('/categories', (req, res) => {
  res.json({ message: 'Get categories - to be implemented' });
});

router.post('/categories', (req, res) => {
  res.json({ message: 'Create category - to be implemented' });
});

router.put('/categories/:id', (req, res) => {
  res.json({ message: 'Update category - to be implemented' });
});

router.delete('/categories/:id', (req, res) => {
  res.json({ message: 'Delete category - to be implemented' });
});

export default router;
