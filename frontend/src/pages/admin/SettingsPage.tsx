export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
        <p className="text-gray-400">Ajustes gerais do sistema</p>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Organização</h3>
        <form className="space-y-4">
          <div>
            <label className="label">Nome da Organização</label>
            <input type="text" className="input" placeholder="Prefeitura Municipal" />
          </div>
          <div>
            <label className="label">CNPJ</label>
            <input type="text" className="input" placeholder="00.000.000/0000-00" />
          </div>
          <button type="submit" className="btn btn-primary">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}
