import React from 'react';
import { computeMdfCompositionFromAmbientes } from '../utils/mdfComposition';
import { pickMaterialColor } from '../utils/materialColors';

export function ProjectCard({ project, isSelected, onOpen, onPrint, onDelete }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const computed = computeMdfCompositionFromAmbientes(project.ambientes || []);
  const materialsRaw = computed && computed.length ? computed : (project.materiaisMdf?.length ? project.materiaisMdf : [{ nome: 'MDF BRANCO', percentual: 100 }]);
  const materials = materialsRaw.map((m, i) => ({ ...m, cor: m.cor ?? pickMaterialColor(m.nome || m.name, i) }));
  const totalPercentual = materials.reduce((sum, material) => sum + Number(material.percentual || 0), 0) || 100;

  return (
    <article
      className={`project-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'expanded' : 'collapsed'}`}
      onClick={() => setIsExpanded((current) => !current)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsExpanded((current) => !current);
        }
      }}
    >
      <div className="project-card-top">
        <div>
          <h3 className="project-card-title">{project.nomeCliente}</h3>
          <div className="project-card-meta">
            <span>{project.nomeVendedor || 'Vendedor não informado'}</span>
            <span>{project.nomeArquiteto || 'Arquiteto não informado'}</span>
          </div>
        </div>
        <strong className="project-metric">{project.ambientes.length} ambientes</strong>
      </div>

      {isExpanded && (
        <>
          <div className="project-mdf-chart" aria-label="Distribuição de MDF">
            <div className="project-mdf-bar" role="img" aria-label={materials.map((material) => `${material.percentual.toFixed(0)}% ${material.nome}`).join(' - ')}>
              {materials.map((material, index) => {
                const width = (Number(material.percentual || 0) / totalPercentual) * 100;

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
                  style={{ backgroundColor: 'transparent' }}
                  onClick={(event) => event.stopPropagation()}
                  aria-label={`${material.percentual.toFixed(0)}% ${material.nome}`}
                >
                  <span
                    className="project-mdf-dot"
                    style={{ backgroundColor: material.cor || ['#14b8a6', '#f59e0b', '#ef4444', '#0ea5e9', '#8b5cf6'][index % 5] }}
                    aria-hidden="true"
                  />
                  <span className="project-mdf-text">{material.percentual.toFixed(0)}%</span>
                </button>
              ))}
            </div>
          </div>

          <div className="project-actions" onClick={(event) => event.stopPropagation()}>
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
        </>
      )}
    </article>
  );
}