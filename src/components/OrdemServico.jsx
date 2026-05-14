export function OrdemServico({ project }) {
  return (
    <article className="print-document">
      <header className="print-header">
        <div>
          <span>Checklist System</span>
          <h1>Detalhamento Técnico</h1>
        </div>
        <div className="print-meta">
          <span>Cliente #{project.id}</span>
          <span>{new Date(project.createdAt || project.dataCriacao).toLocaleDateString('pt-BR')}</span>
        </div>
      </header>

      <section className="print-section">
        <h2>Dados gerais</h2>
        <div className="print-grid two-columns">
          <div><strong>Cliente</strong><p>{project.nomeCliente}</p></div>
          <div><strong>Vendedor</strong><p>{project.nomeVendedor || '-'}</p></div>
          <div><strong>Arquiteto</strong><p>{project.nomeArquiteto || '-'}</p></div>
          <div><strong>Data</strong><p>{new Date(project.createdAt || project.dataCriacao).toLocaleDateString('pt-BR')}</p></div>
        </div>
      </section>

      <section className="print-section">
        <h2>Ambientes e itens</h2>
        <table className="print-table">
          <thead>
            <tr>
              <th>Ambiente</th>
              <th>Tipo</th>
              <th>Acabamento</th>
              <th>Área</th>
              <th>MDF</th>
              <th>Itens</th>
            </tr>
          </thead>
          <tbody>
            {project.ambientes.map((ambiente) => (
              <tr key={ambiente.id}>
                <td>{ambiente.nome}</td>
                <td>{ambiente.tipoAmbiente || '-'}</td>
                <td>
                  {ambiente.acabamentoInterno || '-'}
                  {ambiente.acabamentoExterno ? ` / ${ambiente.acabamentoExterno}` : ''}
                </td>
                <td>{ambiente.areaM2.toFixed(2)} m²</td>
                <td>{ambiente.mdfM2.toFixed(2)} m²</td>
                <td>
                  <ul>
                    {ambiente.itens.map((item) => (
                      <li key={`${ambiente.id}-${item.descricao}`}>
                        {item.quantidade}x {item.descricao}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {project.materiaisMdf?.length > 0 && (
        <section className="print-section">
          <h2>Composição MDF por cliente</h2>
          <div className="print-materials">
            {project.materiaisMdf.map((material) => (
              <div key={material.nome} className="print-material-item">
                <strong>{material.percentual.toFixed(0)}%</strong>
                <span>{material.nome}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}