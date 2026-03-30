export function TicketDetailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Detalhes do Chamado</h1>
        <p className="text-gray-400">CHM-2024-00001</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Informações</h3>
            <p className="text-gray-400">Conteúdo do chamado...</p>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Mensagens</h3>
            <p className="text-gray-400">Histórico de mensagens...</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Ações</h3>
            <div className="space-y-2">
              <button className="w-full btn btn-primary btn-sm">Atribuir</button>
              <button className="w-full btn btn-secondary btn-sm">Atualizar Status</button>
              <button className="w-full btn btn-outline btn-sm">Concluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
