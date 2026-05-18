import React from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { useProjects } from './hooks/useProjects';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectFormModal } from './components/ProjectFormModal';
import { ProjectInfoModal } from './components/ProjectInfoModal';
import { EnvironmentFormModal } from './components/EnvironmentFormModal';
import { MdfChart } from './components/MdfChart';
import { OrdemServico } from './components/OrdemServico';
import { formatEnumLabel } from './constants/backendEnums';

const environmentEnumFields = [
  { key: 'tipoAmbiente', label: 'Tipo' },
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

function Shell({ children, onCreateProject, onAddEnvironment, search, setSearch, projects, loading, error, selectedProjectId, onDeleteProject }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/';
  const clienteMatch = location.pathname.match(/^\/cliente\/([^/]+)$/);
  const primaryActionLabel = isDashboard ? 'Novo projeto' : 'Novo ambiente';
  const primaryAction = isDashboard
    ? onCreateProject
    : () => onAddEnvironment(clienteMatch?.[1] || selectedProjectId);

  return (
    <div className={`app-shell theme-${theme}`}>
      <Header
        onPrimaryAction={primaryAction}
        primaryActionLabel={primaryActionLabel}
        search={search}
        setSearch={setSearch}
        showSearch={isDashboard}
        theme={theme}
        onToggleTheme={toggleTheme}
        onBack={location.pathname !== '/' ? () => navigate('/') : null}
      />
      <main className="page-container">
        {children}
        {isDashboard && loading && <section className="state-card">Carregando projetos...</section>}
        {isDashboard && error && <section className="state-card state-card-error">{error}</section>}
        {isDashboard && !loading && projects.length === 0 && <section className="state-card">Nenhum projeto encontrado.</section>}
        {isDashboard && projects.length > 0 && (
          <section className="dashboard-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={String(project.id) === String(selectedProjectId)}
                onOpen={() => navigate(`/cliente/${project.id}`)}
                onPrint={() => navigate(`/impressao/${project.id}`)}
                onDelete={() => onDeleteProject(project.id)}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function DashboardPage({ projects, loading, error, search, setSearch, onDeleteProject, onCreateProject }) {
  const firstProjectId = projects[0]?.id ?? '1';

  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <span className="eyebrow">Sistema Checklist</span>
        <h1>Gerencie clientes, ambientes e materiais MDF em uma interface única.</h1>
        <p>
          Dashboard operacional com busca rápida, cadastro alinhado ao backend, painel de MDF por cliente e impressão técnica pronta para papel.
        </p>
      </div>

      <div className="hero-stats">
        <div className="stat-card">
          <span>Clientes ativos</span>
          <strong>{projects.length}</strong>
        </div>
        <div className="stat-card">
          <span>Ambientes totais</span>
          <strong>{projects.reduce((sum, project) => sum + (project.ambientes?.length || 0), 0)}</strong>
        </div>
        <div className="stat-card">
          <span>Origem dos dados</span>
          <strong>{error ? 'Mock local' : 'API REST'}</strong>
        </div>
      </div>

      <div className="hero-actions">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="search-input"
          placeholder="Buscar por cliente, vendedor, arquiteto ou ambiente..."
        />
        <button type="button" className="primary-button" onClick={onCreateProject}>
          Novo projeto
        </button>
      </div>

      <div className="helper-row">
        <span>{loading ? 'Sincronizando...' : 'Busca em tempo real'}</span>
        <Link to={`/impressao/${firstProjectId}`} className="text-link">Abrir modelo de impressão</Link>
      </div>
    </section>
  );
}

function ClientePanelPage({ projects, selectedProjectId, onAddEnvironment, onEditProject, onEditEnvironment, onDeleteEnvironment }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => String(item.id) === String(id)) || projects.find((item) => String(item.id) === String(selectedProjectId));

  if (!project) {
    return <div className="state-card">Projeto não encontrado.</div>;
  }

  return (
    <section className="detail-layout">
      <div className="detail-card">
        <span className="eyebrow">Painel do cliente</span>
        <h2>{project.nomeCliente}</h2>
        <div className="detail-meta">
          <p>Vendedor: {project.nomeVendedor || 'Vendedor não informado'}</p>
          <p>Arquiteto: {project.nomeArquiteto || 'Arquiteto não informado'}</p>
        </div>

        <div className="detail-summary-row">
          <div className="metric-box"><span>Ambientes</span><strong>{project.ambientes.length}</strong></div>
          <div className="detail-action-group">
            <button type="button" className="secondary-button detail-action-card" onClick={() => navigate(`/impressao/${project.id}`)}>
              Imprimir
            </button>
            <button type="button" className="secondary-button detail-action-card" onClick={() => onEditProject(project.id)}>
              Editar
            </button>
          </div>
        </div>
      </div>

      <div className="detail-card chart-card">
        <MdfChart materiaisMdf={project.materiaisMdf} />
      </div>

      <div className="detail-card">
        <div className="section-head">
          <h3>Ambientes</h3>
          <button
            type="button"
            className="secondary-button"
            onClick={() => onAddEnvironment(project.id)}
          >
            Adicionar ambiente
          </button>
        </div>
        <div className="accordion-list">
          {project.ambientes.map((ambiente) => (
            <details key={ambiente.id}>
              <summary>
                <span>{ambiente.nome}</span>
                <div className="summary-actions">
                  <button
                    type="button"
                    className="summary-edit-button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onEditEnvironment(project.id, ambiente.id);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="summary-delete-button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onDeleteEnvironment(project.id, ambiente.id);
                    }}
                  >
                    Excluir
                  </button>
                  <div className="summary-material-dots" aria-hidden="true">
                    {(ambiente.materiaisMdf?.length ? ambiente.materiaisMdf : project.materiaisMdf)?.map((mat, i) => (
                      <span
                        key={`${ambiente.id}-mat-${i}`}
                        className="material-dot summary-dot"
                        style={{ backgroundColor: mat.cor }}
                      />
                    ))}
                  </div>
                </div>
              </summary>
              <div className="accordion-content">
                {environmentEnumFields
                  .filter((field) => ambiente[field.key])
                  .map((field) => (
                    <p key={`${ambiente.id}-${field.key}`}>
                      {field.label}: {formatEnumLabel(ambiente[field.key])}
                    </p>
                  ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrintPage({ projects }) {
  const { id } = useParams();
  const project = projects.find((item) => String(item.id) === String(id));

  if (!project) {
    return <div className="state-card">Projeto não encontrado para impressão.</div>;
  }

  return (
    <section className="print-page">
      <div className="print-toolbar no-print">
        <Link to="/" className="secondary-button">Voltar</Link>
        <button type="button" className="primary-button" onClick={() => window.print()}>
          Imprimir
        </button>
      </div>
      <OrdemServico project={project} />
    </section>
  );
}

function AppContent() {
  const {
    projects,
    filteredProjects,
    loading,
    error,
    search,
    setSearch,
    createProject,
    deleteProject,
    updateProject,
    updateEnvironmentInProject,
    deleteEnvironmentFromProject,
    addEnvironmentToProject,
    selectedProjectId,
  } = useProjects();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingProjectId, setEditingProjectId] = React.useState(null);
  const [editingEnvironment, setEditingEnvironment] = React.useState(null);
  const editingProject = projects.find((project) => String(project.id) === String(editingProjectId));

  function handleAddEnvironment(projectId) {
    const newEnv = addEnvironmentToProject(projectId);
    if (newEnv) {
      setEditingEnvironment({ projectId, environment: newEnv });
    }
  }

  return (
    <BrowserRouter>
      <Shell
        onCreateProject={() => setIsModalOpen(true)}
        onAddEnvironment={handleAddEnvironment}
        search={search}
        setSearch={setSearch}
        projects={filteredProjects}
        loading={loading}
        error={error}
        selectedProjectId={selectedProjectId}
        onDeleteProject={deleteProject}
      >
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                projects={filteredProjects}
                loading={loading}
                error={error}
                search={search}
                setSearch={setSearch}
                onDeleteProject={deleteProject}
                onCreateProject={() => setIsModalOpen(true)}
              />
            }
          />
          <Route
            path="/cliente/:id"
            element={
              <ClientePanelPage
                projects={projects}
                selectedProjectId={selectedProjectId}
                onAddEnvironment={handleAddEnvironment}
                onEditProject={(projectId) => setEditingProjectId(projectId)}
                onEditEnvironment={(projectId, environmentId) => setEditingEnvironment({
                  projectId,
                  environment: projects.find((project) => String(project.id) === String(projectId))?.ambientes.find((ambiente) => String(ambiente.id) === String(environmentId)),
                })}
                onDeleteEnvironment={(projectId, environmentId) => deleteEnvironmentFromProject(projectId, environmentId)}
              />
            }
          />
          <Route path="/impressao/:id" element={<PrintPage projects={projects} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>

      <ProjectFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(payload) => {
          createProject(payload);
          setIsModalOpen(false);
        }}
      />

      <ProjectInfoModal
        open={Boolean(editingProject)}
        project={editingProject}
        onClose={() => setEditingProjectId(null)}
        onSubmit={(payload) => {
          updateProject(editingProject.id, payload);
          setEditingProjectId(null);
        }}
      />

      <EnvironmentFormModal
        open={Boolean(editingEnvironment?.environment)}
        environment={editingEnvironment?.environment}
        onClose={() => setEditingEnvironment(null)}
        onSubmit={(payload) => {
          if (!editingEnvironment?.environment) {
            return;
          }

          updateEnvironmentInProject(editingEnvironment.projectId, editingEnvironment.environment.id, payload);
          setEditingEnvironment(null);
        }}
      />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}