import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de autenticação
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint - to be implemented' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint - to be implemented' });
});

router.post('/recover-password', (req, res) => {
  res.json({ message: 'Recover password endpoint - to be implemented' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout endpoint - to be implemented' });
});

router.get('/me', (req, res) => {
  res.json({ message: 'Get current user endpoint - to be implemented' });
});

router.post('/refresh', (req, res) => {
  res.json({ message: 'Refresh token endpoint - to be implemented' });
});

export default router;
