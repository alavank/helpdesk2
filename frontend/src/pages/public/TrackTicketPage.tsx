export function TrackTicketPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">
          Acompanhar Chamado
        </h1>
        <p className="text-gray-400 mb-6">
          Digite o código de acesso do seu chamado.
        </p>
        <form className="space-y-4">
          <div>
            <label className="label">Código de Acesso</label>
            <input
              type="text"
              className="input text-center text-2xl font-bold tracking-widest uppercase"
              placeholder="ABC123"
              maxLength={6}
            />
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Buscar Chamado
          </button>
        </form>
      </div>
    </div>
  );
}
