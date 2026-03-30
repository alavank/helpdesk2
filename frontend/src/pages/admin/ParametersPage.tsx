export function ParametersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Parâmetros</h1>
        <p className="text-gray-400">Configure status, prioridades e categorias</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
          <p className="text-gray-400 text-sm mb-4">
            Gerencie os status disponíveis para chamados
          </p>
          <button className="btn btn-primary btn-sm w-full">Gerenciar</button>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Prioridades</h3>
          <p className="text-gray-400 text-sm mb-4">
            Configure os níveis de prioridade e SLA
          </p>
          <button className="btn btn-primary btn-sm w-full">Gerenciar</button>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Categorias</h3>
          <p className="text-gray-400 text-sm mb-4">
            Defina as categorias de chamados
          </p>
          <button className="btn btn-primary btn-sm w-full">Gerenciar</button>
        </div>
      </div>
    </div>
  );
}
