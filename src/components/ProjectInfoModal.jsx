import React from 'react';

export function ProjectInfoModal({ open, project, onClose, onSubmit }) {
  const [form, setForm] = React.useState({
    nomeCliente: '',
    nomeVendedor: '',
    nomeArquiteto: '',
  });

  React.useEffect(() => {
    if (open && project) {
      setForm({
        nomeCliente: project.nomeCliente || '',
        nomeVendedor: project.nomeVendedor || '',
        nomeArquiteto: project.nomeArquiteto || '',
      });
    }
  }, [open, project]);

  if (!open || !project) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="editar-cliente-titulo" onClick={(event) => event.stopPropagation()}>
        <h2 id="editar-cliente-titulo">Editar cliente</h2>
        <p>Atualize as informações básicas exibidas no card do cliente.</p>

        <form
          className="project-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit({
              nomeCliente: form.nomeCliente,
              nomeVendedor: form.nomeVendedor,
              nomeArquiteto: form.nomeArquiteto,
            });
          }}
        >
          <div className="form-grid two-columns">
            <label className="field-group full-span">
              <span>Nome do cliente</span>
              <input
                required
                value={form.nomeCliente}
                onChange={(event) => setForm((current) => ({ ...current, nomeCliente: event.target.value }))}
              />
            </label>

            <label className="field-group full-span">
              <span>Nome do vendedor</span>
              <input
                value={form.nomeVendedor}
                onChange={(event) => setForm((current) => ({ ...current, nomeVendedor: event.target.value }))}
              />
            </label>

            <label className="field-group full-span">
              <span>Nome do arquiteto</span>
              <input
                value={form.nomeArquiteto}
                onChange={(event) => setForm((current) => ({ ...current, nomeArquiteto: event.target.value }))}
              />
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}