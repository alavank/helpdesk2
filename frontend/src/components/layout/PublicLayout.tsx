import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Background animado */}
      <div className="fixed inset-0 bg-animated opacity-50" />
      
      {/* Efeitos de fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
