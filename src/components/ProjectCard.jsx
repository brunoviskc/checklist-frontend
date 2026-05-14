export function ProjectCard({ project, isSelected, onOpen, onPrint, onDelete }) {
  const summaryMaterials = project.materiaisMdf?.slice(0, 3).map((material) => `${material.percentual.toFixed(0)}% ${material.nome}`).join(' · ');

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

      <div className="project-footnotes">
        <span>{project.totalMdf.toFixed(2)} m² MDF</span>
        <span>{project.percentualMedio.toFixed(1)}% médio</span>
      </div>

      {summaryMaterials && <p className="project-description muted-materials">{summaryMaterials}</p>}

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