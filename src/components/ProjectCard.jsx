export function ProjectCard({ project, isSelected, onOpen, onPrint, onDelete }) {
  const materials = project.materiaisMdf?.length ? project.materiaisMdf : [{ nome: 'MDF BRANCO', percentual: 100, cor: '#14b8a6' }];
  const totalPercentual = materials.reduce((sum, material) => sum + Number(material.percentual || 0), 0) || 100;

  return (
    <article className={`project-card ${isSelected ? 'selected' : ''}`}>
      <div className="project-card-top">
        <div>
          <span className="project-tag">#{project.id}</span>
          <h3>{project.nomeCliente}</h3>
          <p>{project.nomeVendedor || 'Vendedor não informado'}</p>
        </div>
        <strong className="project-metric">{project.ambientes.length} ambientes</strong>
      </div>

      <p className="project-description">
        Arquiteto: {project.nomeArquiteto || 'não informado'}
      </p>

      <div className="project-mdf-chart" aria-label="Distribuição de MDF">
        <div className="project-mdf-bar" role="img" aria-label={materials.map((material) => `${material.percentual.toFixed(0)}% ${material.nome}`).join(' - ')}>
          {materials.map((material, index) => {
            const width = Math.max((Number(material.percentual || 0) / totalPercentual) * 100, index === materials.length - 1 ? 0 : 0);

            return (
              <span
                key={`${material.nome}-${index}`}
                className="project-mdf-segment"
                style={{ width: `${width}%`, backgroundColor: material.cor || ['#14b8a6', '#f59e0b', '#ef4444', '#0ea5e9', '#8b5cf6'][index % 5] }}
                title={`${material.percentual.toFixed(0)}% ${material.nome}`}
              />
            );
          })}
        </div>

        <div className="project-mdf-legend">
          {materials.map((material, index) => (
            <button
              key={`${material.nome}-${index}`}
              type="button"
              className="project-mdf-pill"
              style={{ backgroundColor: material.cor || ['#14b8a6', '#f59e0b', '#ef4444', '#0ea5e9', '#8b5cf6'][index % 5] }}
            >
              {material.percentual.toFixed(0)}% {material.nome}
            </button>
          ))}
        </div>
      </div>

      <div className="project-actions">
        <button type="button" className="secondary-button" onClick={onOpen}>
          Detalhes
        </button>
        <button type="button" className="secondary-button" onClick={onPrint}>
          Imprimir
        </button>
        <button type="button" className="danger-button" onClick={onDelete}>
          Excluir
        </button>
      </div>
    </article>
  );
}