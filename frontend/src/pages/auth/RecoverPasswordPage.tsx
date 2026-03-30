export function RecoverPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Recuperar Senha</h1>
        <p className="text-gray-400 mb-6">
          Digite seu e-mail para receber as instruções de recuperação de senha.
        </p>
        <form className="space-y-4">
          <div>
            <label className="label">E-mail</label>
            <input type="email" className="input" placeholder="seu@email.com" />
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Enviar Instruções
          </button>
        </form>
      </div>
    </div>
  );
}
