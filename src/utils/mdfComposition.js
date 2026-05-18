export function computeMdfCompositionFromAmbientes(ambientes = []) {
  const totals = {};
  let totalMdf = 0;

  ambientes.forEach((a) => {
    const mdf = Number(a.mdfM2 || 0);
    if (!mdf || mdf <= 0) return;

    const interno = a.acabamentoInterno;
    const externo = a.acabamentoExterno;

    if (interno && externo && interno !== externo) {
      totals[interno] = (totals[interno] || 0) + mdf / 2;
      totals[externo] = (totals[externo] || 0) + mdf / 2;
      totalMdf += mdf;
    } else if (interno) {
      totals[interno] = (totals[interno] || 0) + mdf;
      totalMdf += mdf;
    } else if (externo) {
      totals[externo] = (totals[externo] || 0) + mdf;
      totalMdf += mdf;
    }
  });

  if (totalMdf <= 0) return [];

  return Object.entries(totals)
    .map(([nome, m2], index) => ({ nome, percentual: (m2 / totalMdf) * 100, cor: undefined }))
    .sort((a, b) => b.percentual - a.percentual);
}
