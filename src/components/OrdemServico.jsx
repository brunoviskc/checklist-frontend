import { formatEnumLabel } from '../constants/backendEnums';

const environmentDetailFields = [
  { key: 'acabamentoInterno', label: 'Acabamento interno' },
  { key: 'acabamentoExterno', label: 'Acabamento externo' },
  { key: 'acabamentoPerfil', label: 'Acabamento do perfil' },
  { key: 'acabamentoTelinha', label: 'Telinha' },
  { key: 'tipoPorta', label: 'Tipo de porta' },
  { key: 'tipoPortaPassagem', label: 'Tipo de porta passagem' },
  { key: 'tipoPuxador', label: 'Puxador' },
  { key: 'tipoVidro', label: 'Vidro' },
  { key: 'tipoCorredica', label: 'Corrediça' },
  { key: 'tipoDobradica', label: 'Dobradiça' },
  { key: 'tipoAventos', label: 'Aventos' },
  { key: 'tipoAcessorio', label: 'Acessório' },
  { key: 'tipoCabideiro', label: 'Cabideiro' },
  { key: 'tipoLed', label: 'LED' },
  { key: 'tipoPainel', label: 'Painel' },
  { key: 'tipoRodape', label: 'Rodapé' },
];

export function OrdemServico({ project }) {
  const formattedDate = new Date(project.createdAt || project.dataCriacao).toLocaleDateString('pt-BR');

  return (
    <article className="print-document">
      <header className="print-header">
        <div>
          <span>Checklist System</span>
          <h1>Detalhamento do cliente</h1>
        </div>
        <div className="print-meta">
          <span>Cliente #{project.id}</span>
          <span>{formattedDate}</span>
        </div>
      </header>

      <section className="print-section">
        <h2>Dados gerais</h2>
        <div className="print-grid two-columns">
          <div><strong>Cliente</strong><p>{project.nomeCliente}</p></div>
          <div><strong>Vendedor</strong><p>{project.nomeVendedor || '-'}</p></div>
          <div><strong>Arquiteto</strong><p>{project.nomeArquiteto || '-'}</p></div>
          <div><strong>Data</strong><p>{formattedDate}</p></div>
        </div>
      </section>

      <section className="print-section">
        <h2>Ambientes</h2>
        <div className="print-environment-list">
          {project.ambientes.map((ambiente) => (
            <article key={ambiente.id} className="print-environment-card">
              <header className="print-environment-header">
                <div className="print-environment-title">
                  <h3>{ambiente.nome}</h3>
                  {ambiente.tipoAmbiente && (
                    <span className="print-environment-type">
                      Tipo: {formatEnumLabel(ambiente.tipoAmbiente)}
                    </span>
                  )}
                </div>
              </header>

              <div className="print-environment-body">
                {environmentDetailFields
                  .filter((field) => ambiente[field.key])
                  .map((field) => (
                    <p key={`${ambiente.id}-${field.key}`}>
                      {field.label}: {formatEnumLabel(ambiente[field.key])}
                    </p>
                  ))}

                {ambiente.areaM2 > 0 && <p>Área: {ambiente.areaM2.toFixed(2)} m²</p>}

                {ambiente.itens?.length ? (
                  <div className="print-environment-items">
                    <strong>Itens</strong>
                    <ul>
                      {ambiente.itens.map((item) => (
                        <li key={`${ambiente.id}-${item.descricao}`}>
                          {item.quantidade}x {item.descricao}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}