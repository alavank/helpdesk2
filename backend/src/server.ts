import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';

// Carregar variáveis de ambiente
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3333;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware de segurança
app.use(helmet());

// Configuração de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Token']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: { error: 'Muitas requisições, tente novamente mais tarde.' }
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
import routes from './routes/index.js';
app.use(routes);

// Servir frontend em produção
if (isProduction) {
  const distPath = path.join(__dirname, '../../frontend/dist');
  
  if (fs.existsSync(distPath)) {
    // Servir arquivos estáticos do frontend
    app.use(express.static(distPath));
    
    // Para qualquer rota que não seja API, servir o index.html do frontend
    app.get('*', (req: Request, res: Response) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(distPath, 'index.html'));
      } else {
        res.status(404).json({ error: 'Rota não encontrada' });
      }
    });
  } else {
    console.warn('⚠️  Frontend build não encontrado. Rodando apenas API.');
  }
}

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro:', err);
  
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🏛️  HELPDESK PREFEITURA - BACKEND                       ║
║                                                           ║
║   Servidor rodando em: http://localhost:${PORT}            ║
║   Ambiente: ${process.env.NODE_ENV || 'development'}                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
