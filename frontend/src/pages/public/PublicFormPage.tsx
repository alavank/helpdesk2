export function PublicFormPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-white mb-4">
          Abrir Novo Chamado
        </h1>
        <p className="text-gray-400 mb-6">
          Preencha o formulário abaixo para solicitar atendimento.
        </p>
        <form className="space-y-4">
          <div>
            <label className="label">Nome Completo</label>
            <input type="text" className="input" placeholder="Seu nome" />
          </div>
          <div>
            <label className="label">Contato/WhatsApp</label>
            <input type="tel" className="input" placeholder="(00) 00000-0000" />
          </div>
          <div>
            <label className="label">Descrição do Problema</label>
            <textarea className="input min-h-[120px]" placeholder="Descreva o problema..." />
          </div>
          <div>
            <label className="label">Anexos (Fotos)</label>
            <input type="file" className="input" multiple accept="image/*" />
          </div>
          <button type="submit" className="w-full btn btn-primary">
            Enviar Chamado
          </button>
        </form>
      </div>
    </div>
  );
}
