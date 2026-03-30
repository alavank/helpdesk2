export function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Usuários</h1>
          <p className="text-gray-400">Gerencie técnicos, coordenadores e solicitantes</p>
        </div>
        <button className="btn btn-primary">Novo Usuário</button>
      </div>
      
      <div className="glass-card p-6">
        <p className="text-gray-400 text-center py-12">
          Lista de usuários será implementada aqui
        </p>
      </div>
    </div>
  );
}
