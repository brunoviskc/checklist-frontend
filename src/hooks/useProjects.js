import React from 'react';
import { getProjects, createProjectOnApi, deleteProjectOnApi, normalizeProject, fallbackProjects, toApiProjectPayload } from '../services/api';

const STORAGE_KEY = 'checklist-projects-local';

function readLocalProjects() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw).map(normalizeProject);
  } catch {
    return null;
  }
}

function writeLocalProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function mergeById(apiProjects, localProjects) {
  const localById = new Map(localProjects.map((project) => [String(project.id), project]));
  return apiProjects.map((project) => {
    const localProject = localById.get(String(project.id));
    return localProject ? { ...project, ...localProject, ambientes: localProject.ambientes?.length ? localProject.ambientes : project.ambientes } : project;
  });
}

export function useProjects() {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);
  const [mode, setMode] = React.useState('api');

  React.useEffect(() => {
    let active = true;

    async function loadProjects() {
      try {
        const apiProjects = await getProjects();
        if (!active) {
          return;
        }

        const localProjects = readLocalProjects() || [];
        const mergedProjects = localProjects.length > 0 ? mergeById(apiProjects, localProjects) : apiProjects;

        setProjects(mergedProjects);
        setSelectedProjectId(mergedProjects[0]?.id ?? null);
        setError('');
      } catch {
        const localProjects = readLocalProjects();
        const fallbackList = localProjects || fallbackProjects.map(normalizeProject);
        if (!active) {
          return;
        }

        setProjects(fallbackList);
        setSelectedProjectId(fallbackList[0]?.id ?? null);
        setMode('local');
        setError('Backend indisponível. Trabalhando com dados locais.');

        if (!localProjects) {
          writeLocalProjects(fallbackList);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    if (!loading) {
      writeLocalProjects(projects);
    }
  }, [loading, projects]);

  const filteredProjects = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return projects;
    }

    return projects.filter((project) => {
      const searchableText = [project.nomeCliente, project.nomeVendedor, project.nomeArquiteto, project.observacao, ...project.ambientes.map((ambiente) => ambiente.nome)]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [projects, search]);

  async function createProject(payload) {
    const nextProject = normalizeProject({
      id: payload.id || crypto.randomUUID(),
      ...payload,
    });

    if (mode === 'api') {
      try {
        const createdProject = await createProjectOnApi(nextProject);
        const mergedProject = { ...createdProject, ...nextProject, id: createdProject.id ?? nextProject.id };
        setProjects((currentProjects) => [mergedProject, ...currentProjects.filter((project) => String(project.id) !== String(mergedProject.id))]);
        setSelectedProjectId(mergedProject.id);
        return;
      } catch {
        setMode('local');
        setError('Cadastro salvo localmente porque a API não respondeu.');
      }
    }

    setProjects((currentProjects) => {
      const nextProjects = [nextProject, ...currentProjects];
      writeLocalProjects(nextProjects);
      return nextProjects;
    });
    setSelectedProjectId(nextProject.id);
  }

  async function deleteProject(id) {
    if (mode === 'api') {
      try {
        await deleteProjectOnApi(id);
      } catch {
        setMode('local');
        setError('Exclusão aplicada localmente porque a API não respondeu.');
      }
    }

    setProjects((currentProjects) => {
      const nextProjects = currentProjects.filter((project) => String(project.id) !== String(id));
      writeLocalProjects(nextProjects);
      if (String(selectedProjectId) === String(id)) {
        setSelectedProjectId(nextProjects[0]?.id ?? null);
      }
      return nextProjects;
    });
  }

  function addEnvironmentToProject(projectId) {
    setProjects((currentProjects) => {
      const nextProjects = currentProjects.map((project) => {
        if (String(project.id) !== String(projectId)) {
          return project;
        }

        const nextIndex = (project.ambientes?.length || 0) + 1;
        const newEnvironment = {
          id: crypto.randomUUID(),
          nome: `Ambiente ${nextIndex}`,
          tipoAmbiente: null,
          acabamentoInterno: null,
          acabamentoExterno: null,
          acabamentoPerfil: null,
          acabamentoTelinha: null,
          tipoPorta: null,
          tipoPortaPassagem: null,
          tipoPuxador: null,
          tipoVidro: null,
          tipoCorredica: null,
          tipoDobradica: null,
          tipoAventos: null,
          tipoAcessorio: null,
          tipoCabideiro: null,
          tipoLed: null,
          tipoPainel: null,
          tipoRodape: null,
          observacoes: '',
          areaM2: 0,
          mdfM2: 0,
          itens: [],
        };

        const ambientes = [...(project.ambientes || []), newEnvironment];
        const totalMdf = ambientes.reduce((sum, ambiente) => sum + Number(ambiente.mdfM2 || 0), 0);
        const totalArea = ambientes.reduce((sum, ambiente) => sum + Number(ambiente.areaM2 || 0), 0);

        return {
          ...project,
          ambientes,
          totalMdf,
          totalArea,
          percentualMedio: totalArea === 0 ? 0 : (totalMdf / totalArea) * 100,
        };
      });

      writeLocalProjects(nextProjects);
      return nextProjects;
    });
  }

  return {
    projects,
    filteredProjects,
    loading,
    error,
    search,
    setSearch,
    createProject,
    deleteProject,
    addEnvironmentToProject,
    selectedProjectId,
  };
}