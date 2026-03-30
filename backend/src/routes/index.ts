// Index de rotas - Corrige problema de import/export
import { Router } from 'express';

const router = Router();

// Importação dinâmica das rotas
import authRoutes from './auth.routes.js';
import organizationsRoutes from './organizations.routes.js';
import unitsRoutes from './units.routes.js';
import usersRoutes from './users.routes.js';
import ticketsRoutes from './tickets.routes.js';
import parametersRoutes from './parameters.routes.js';
import auditRoutes from './audit.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import formsRoutes from './forms.routes.js';
import notificationsRoutes from './notifications.routes.js';

// API Routes
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/organizations', organizationsRoutes);
router.use('/api/v1/units', unitsRoutes);
router.use('/api/v1/users', usersRoutes);
router.use('/api/v1/tickets', ticketsRoutes);
router.use('/api/v1/parameters', parametersRoutes);
router.use('/api/v1/audit', auditRoutes);
router.use('/api/v1/dashboard', dashboardRoutes);
router.use('/api/v1/forms', formsRoutes);
router.use('/api/v1/notifications', notificationsRoutes);

export default router;
