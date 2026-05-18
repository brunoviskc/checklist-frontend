const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const fallbackProjects = [
  {
    id: 1,
    nomeCliente: 'Bruno',
    nomeVendedor: 'Camila Santos',
    nomeArquiteto: 'Rafael Lima',
    createdAt: '2026-05-14T08:00:00.000Z',
    materiaisMdf: [
      { nome: 'MDF BRANCO', percentual: 80, cor: '#0ea5e9' },
      { nome: 'MDF ROSA', percentual: 10, cor: '#f43f5e' },
      { nome: 'MDF VERDE', percentual: 10, cor: '#22c55e' },
    ],
    ambientes: [
      {
        id: 'amb-1',
        nome: 'Quarto principal',
        tipoAmbiente: 'SUITE',
        acabamentoInterno: 'SIRENA',
        acabamentoExterno: 'SABBIA',
        tipoPainel: 'PAINEL_RIPADO',
        tipoRodape: 'MDF',
        areaM2: 18.4,
        mdfM2: 12.8,
        materiaisMdf: [
          { nome: 'MDF BRANCO', percentual: 70, cor: '#0ea5e9' },
          { nome: 'MDF VERDE', percentual: 30, cor: '#22c55e' },
        ],
        itens: [
          { descricao: 'Guarda-roupa', quantidade: 1, unidade: 'conjunto' },
          { descricao: 'Mesa de apoio', quantidade: 1, unidade: 'peça' },
        ],
      },
      {
        id: 'amb-2',
        nome: 'Closet',
        tipoAmbiente: 'CLOSET',
        acabamentoInterno: 'NOCE_DI_MILANO',
        acabamentoExterno: 'BIANCO_CARRARA',
        tipoPuxador: 'LINEA_TOTAL',
        tipoLed: 'PADRAO_OG',
        areaM2: 15.2,
        mdfM2: 8.7,
        materiaisMdf: [
          { nome: 'MDF BRANCO', percentual: 100, cor: '#0ea5e9' },
        ],
        itens: [
          { descricao: 'Cabideiro', quantidade: 1, unidade: 'unidade' },
          { descricao: 'Prateleiras', quantidade: 4, unidade: 'unidade' },
        ],
      },
    ],
  },
  {
    id: 2,
    nomeCliente: 'Boutique Linha Norte Ltda.',
    nomeVendedor: 'Marcos Alves',
    nomeArquiteto: 'Fernanda Costa',
    createdAt: '2026-05-13T08:00:00.000Z',
    materiaisMdf: [
      { nome: 'MDF CARVALHO', percentual: 55, cor: '#a16207' },
      { nome: 'MDF BRANCO', percentual: 25, cor: '#14b8a6' },
      { nome: 'MDF PRETO', percentual: 20, cor: '#64748b' },
    ],
    ambientes: [
      {
        id: 'amb-3',
        nome: 'Recepção',
        tipoAmbiente: 'HALL',
        acabamentoInterno: 'ROVERE',
        acabamentoExterno: 'ROVERE',
        tipoPainel: 'PAINEL_LISO',
        tipoRodape: 'ALVENARIA',
        areaM2: 12.1,
        mdfM2: 6.2,
        materiaisMdf: [
          { nome: 'MDF CARVALHO', percentual: 55, cor: '#a16207' },
          { nome: 'MDF PRETO', percentual: 45, cor: '#64748b' },
        ],
        itens: [
          { descricao: 'Balcão curvo', quantidade: 1, unidade: 'peça' },
          { descricao: 'Painel institucional', quantidade: 1, unidade: 'peça' },
        ],
      },
      {
        id: 'amb-4',
        nome: 'Showroom',
        tipoAmbiente: 'ESCRITORIO',
        acabamentoInterno: 'LEGNO_VIVO',
        acabamentoExterno: 'LEGNO_VIVO',
        tipoPorta: 'VITRINA',
        tipoPuxador: 'EXTERNO_ZEN',
        areaM2: 21.9,
        mdfM2: 14.6,
        materiaisMdf: [
          { nome: 'MDF PRETO', percentual: 100, cor: '#64748b' },
        ],
        itens: [
          { descricao: 'Módulos expositores', quantidade: 4, unidade: 'unidade' },
          { descricao: 'Mesa central', quantidade: 1, unidade: 'peça' },
        ],
      },
    ],
  },
  {
    id: 3,
    nomeCliente: 'Residencial Aurora',
    nomeVendedor: 'João Pedro',
    nomeArquiteto: 'Marina Silva',
    createdAt: '2026-05-12T08:00:00.000Z',
    materiaisMdf: [
      { nome: 'MDF BRANCO', percentual: 72, cor: '#14b8a6' },
      { nome: 'MDF FREIJO', percentual: 18, cor: '#f59e0b' },
      { nome: 'MDF PRETO', percentual: 10, cor: '#8b5cf6' },
    ],
    ambientes: [
      {
        id: 'amb-5',
        nome: 'Quarto principal',
        tipoAmbiente: 'SUITE',
        acabamentoInterno: 'LACA',
        acabamentoExterno: 'LACA',
        tipoPorta: 'RIPADA',
        areaM2: 14.2,
        mdfM2: 9.1,
        materiaisMdf: [
          { nome: 'MDF FREIJO', percentual: 60, cor: '#f59e0b' },
          { nome: 'MDF PRETO', percentual: 40, cor: '#8b5cf6' },
        ],
        itens: [
          { descricao: 'Guarda-roupa', quantidade: 1, unidade: 'conjunto' },
          { descricao: 'Mesa de estudo', quantidade: 1, unidade: 'peça' },
        ],
      },
    ],
  },
];

function timeoutSignal(ms = 5000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => window.clearTimeout(timeoutId) };
}

function toPersistedId(id) {
  return Number.isFinite(Number(id)) ? Number(id) : undefined;
}

export function normalizeProject(rawProject) {
  const ambientes = rawProject.ambientes || rawProject.listaAmbientes || rawProject.ambienteList || [];
  const materiaisMdf = rawProject.materiaisMdf || rawProject.mdfMateriais || rawProject.materials || rawProject.mdfMaterials || [];

  const normalizedAmbientes = ambientes.map((ambiente, index) => {
    const areaM2 = Number(ambiente.areaM2 ?? ambiente.area ?? ambiente.totalArea ?? ambiente.m2 ?? 0);
    const mdfM2 = Number(ambiente.mdfM2 ?? ambiente.areaMdf ?? ambiente.mdf ?? ambiente.mdfTotal ?? areaM2 * 0.65);
    const materiaisAmbiente = ambiente.materiaisMdf || ambiente.mdfMateriais || ambiente.materials || ambiente.mdfMaterials || [];

    return {
      id: ambiente.id ?? `${rawProject.id || 'project'}-${index + 1}`,
      nome: ambiente.nome ?? ambiente.nomeAmbiente ?? ambiente.descricao ?? `Ambiente ${index + 1}`,
      tipoAmbiente: ambiente.tipoAmbiente ?? null,
      acabamentoInterno: ambiente.acabamentoInterno ?? null,
      acabamentoExterno: ambiente.acabamentoExterno ?? null,
      acabamentoPerfil: ambiente.acabamentoPerfil ?? null,
      acabamentoTelinha: ambiente.acabamentoTelinha ?? null,
      tipoPorta: ambiente.tipoPorta ?? null,
      tipoPortaPassagem: ambiente.tipoPortaPassagem ?? null,
      tipoPuxador: ambiente.tipoPuxador ?? null,
      tipoVidro: ambiente.tipoVidro ?? null,
      tipoCorredica: ambiente.tipoCorredica ?? null,
      tipoDobradica: ambiente.tipoDobradica ?? null,
      tipoAventos: ambiente.tipoAventos ?? null,
      tipoAcessorio: ambiente.tipoAcessorio ?? null,
      tipoCabideiro: ambiente.tipoCabideiro ?? null,
      tipoLed: ambiente.tipoLed ?? null,
      tipoPainel: ambiente.tipoPainel ?? null,
      tipoRodape: ambiente.tipoRodape ?? null,
      observacoes: ambiente.observacoes ?? '',
      areaM2,
      mdfM2,
      materiaisMdf: materiaisAmbiente
        .map((material, materialIndex) => ({
          nome: material.nome ?? material.material ?? material.descricao ?? `Material ${materialIndex + 1}`,
          percentual: Number(material.percentual ?? material.percent ?? material.porcentagem ?? 0),
          cor: material.cor ?? material.color ?? ['#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'][materialIndex % 5],
        }))
        .filter((material) => material.nome),
      itens: (ambiente.itens || ambiente.listaItens || []).map((item, itemIndex) => ({
        descricao: item.descricao ?? item.nome ?? item.nomeItem ?? `Item ${itemIndex + 1}`,
        quantidade: Number(item.quantidade ?? item.qtd ?? 1),
        unidade: item.unidade ?? item.tipo ?? '',
      })),
    };
  });

  const normalizedMateriais = materiaisMdf
    .map((material, index) => ({
      nome: material.nome ?? material.material ?? material.descricao ?? `Material ${index + 1}`,
      percentual: Number(material.percentual ?? material.percent ?? material.porcentagem ?? 0),
      cor: material.cor ?? material.color ?? ['#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5],
    }))
    .filter((material) => material.nome);

  const materialPercentualTotal = normalizedMateriais.reduce((sum, material) => sum + material.percentual, 0);
  const finalMateriais = normalizedMateriais.length > 0
    ? normalizedMateriais
    : [{ nome: 'MDF Branco', percentual: 100, cor: '#14b8a6' }];

  const totalMdf = normalizedAmbientes.reduce((sum, ambiente) => sum + ambiente.mdfM2, 0);
  const totalArea = normalizedAmbientes.reduce((sum, ambiente) => sum + ambiente.areaM2, 0);

  return {
    id: rawProject.id ?? crypto.randomUUID(),
    nomeCliente: rawProject.nomeCliente ?? rawProject.cliente ?? rawProject.nomeProjeto ?? rawProject.nome ?? rawProject.titulo ?? 'Cliente não informado',
    nomeVendedor: rawProject.nomeVendedor ?? rawProject.vendedor ?? '',
    nomeArquiteto: rawProject.nomeArquiteto ?? rawProject.arquiteto ?? '',
    observacao: rawProject.observacao ?? rawProject.descricao ?? '',
    dataCriacao: rawProject.dataCriacao ?? rawProject.createdAt ?? rawProject.dataCriacao ?? new Date().toISOString(),
    createdAt: rawProject.createdAt ?? rawProject.dataCriacao ?? new Date().toISOString(),
    ambientes: normalizedAmbientes,
    materiaisMdf: finalMateriais,
    materialPercentualTotal,
    totalMdf,
    totalArea,
    percentualMedio: totalArea === 0 ? 0 : (totalMdf / totalArea) * 100,
    // Backward-compatible aliases for the current UI while it is being migrated.
    nomeProjeto: rawProject.nomeProjeto ?? rawProject.nomeCliente ?? rawProject.cliente ?? 'Cliente não informado',
    cliente: rawProject.cliente ?? rawProject.nomeCliente ?? 'Cliente não informado',
  };
}

export function toApiProjectPayload(project) {
  return {
    id: toPersistedId(project.id),
    nomeCliente: project.nomeCliente ?? project.cliente ?? project.nomeProjeto,
    nomeVendedor: project.nomeVendedor ?? '',
    nomeArquiteto: project.nomeArquiteto ?? '',
    ambientes: (project.ambientes || []).map((ambiente) => ({
      id: toPersistedId(ambiente.id),
      nome: ambiente.nome,
      tipoAmbiente: ambiente.tipoAmbiente,
      acabamentoInterno: ambiente.acabamentoInterno,
      acabamentoExterno: ambiente.acabamentoExterno,
      acabamentoPerfil: ambiente.acabamentoPerfil || null,
      acabamentoTelinha: ambiente.acabamentoTelinha || null,
      tipoPorta: ambiente.tipoPorta || null,
      tipoPortaPassagem: ambiente.tipoPortaPassagem || null,
      tipoPuxador: ambiente.tipoPuxador || null,
      tipoVidro: ambiente.tipoVidro || null,
      tipoCorredica: ambiente.tipoCorredica || null,
      tipoDobradica: ambiente.tipoDobradica || null,
      tipoAventos: ambiente.tipoAventos || null,
      tipoAcessorio: ambiente.tipoAcessorio || null,
      tipoCabideiro: ambiente.tipoCabideiro || null,
      tipoLed: ambiente.tipoLed || null,
      tipoPainel: ambiente.tipoPainel || null,
      tipoRodape: ambiente.tipoRodape || null,
      observacoes: ambiente.observacoes || '',
      itens: ambiente.itens || [],
      materiaisMdf: ambiente.materiaisMdf || [],
      areaM2: ambiente.areaM2,
      mdfM2: ambiente.mdfM2,
    })),
  };
}

async function request(path, options = {}) {
  const { signal, clear } = timeoutSignal(options.timeout || 5000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  } finally {
    clear();
  }
}

export async function getProjects() {
  // Dev helper: force local fallback when URL contains ?local=1
  if (typeof window !== 'undefined' && window.location && window.location.search && window.location.search.includes('local=1')) {
    throw new Error('force-local');
  }
  const data = await request('/api/projetos');
  return (Array.isArray(data) ? data : []).map(normalizeProject);
}

export async function createProjectOnApi(project) {
  const data = await request('/api/projetos', {
    method: 'POST',
    body: JSON.stringify(toApiProjectPayload(project)),
  });

  return normalizeProject(data || project);
}

export async function updateProjectOnApi(id, project) {
  const data = await request(`/api/projetos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(toApiProjectPayload(project)),
  });

  return normalizeProject(data || project);
}

export async function deleteProjectOnApi(id) {
  await request(`/api/projetos/${id}`, {
    method: 'DELETE',
  });
}

export { fallbackProjects };