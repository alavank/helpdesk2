export function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Chamados</h1>
          <p className="text-gray-400">Gerencie todos os chamados do sistema</p>
        </div>
        <button className="btn btn-primary">Novo Chamado</button>
      </div>
      
      <div className="glass-card p-6">
        <p className="text-gray-400 text-center py-12">
          Lista de chamados será implementada aqui
        </p>
      </div>
    </div>
  );
}
