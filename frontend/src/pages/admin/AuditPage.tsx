export function AuditPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Auditoria</h1>
          <p className="text-gray-400">Acompanhe todos os logs e sessões ativas</p>
        </div>
        <button className="btn btn-outline">Exportar Logs</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Sessões Ativas</h3>
          <p className="text-gray-400 text-sm">
            Monitoramento em tempo real de usuários logados
          </p>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Logs Recentes</h3>
          <p className="text-gray-400 text-sm">
            Histórico completo de ações no sistema
          </p>
        </div>
      </div>
    </div>
  );
}
