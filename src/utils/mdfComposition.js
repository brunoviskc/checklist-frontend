export function computeMdfCompositionFromAmbientes(ambientes = []) {
  const counts = {};
  let totalVotes = 0;

  ambientes.forEach((a) => {
    if (!a) return;
    const interno = a.acabamentoInterno;
    const externo = a.acabamentoExterno;

    if (interno) {
      counts[interno] = (counts[interno] || 0) + 1;
      totalVotes += 1;
    }

    if (externo) {
      counts[externo] = (counts[externo] || 0) + 1;
      totalVotes += 1;
    }
  });

  if (totalVotes === 0) return [];

  return Object.entries(counts)
    .map(([nome, votes]) => ({ nome, percentual: (votes / totalVotes) * 100, cor: undefined }))
    .sort((a, b) => b.percentual - a.percentual);
}
