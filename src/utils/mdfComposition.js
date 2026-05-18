export function computeMdfCompositionFromAmbientes(ambientes = []) {
  const counts = {};
  let totalCount = 0;

  ambientes.forEach((a) => {
    if (!a) return;
    // Priorize acabamento interno quando disponível, caso contrário use acabamento externo
    const key = a.acabamentoInterno || a.acabamentoExterno;
    if (!key) return;

    counts[key] = (counts[key] || 0) + 1;
    totalCount += 1;
  });

  if (totalCount === 0) return [];

  return Object.entries(counts)
    .map(([nome, count]) => ({ nome, percentual: (count / totalCount) * 100, cor: undefined }))
    .sort((a, b) => b.percentual - a.percentual);
}
