const PALETTE = ['#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b', '#a16207'];

function hashStringToIndex(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) % PALETTE.length;
}

export function pickMaterialColor(name, index = undefined) {
  if (name && typeof name === 'string' && name.length > 0) {
    const idx = index !== undefined ? index % PALETTE.length : hashStringToIndex(name);
    return PALETTE[idx];
  }

  if (typeof index === 'number') {
    return PALETTE[index % PALETTE.length];
  }

  return PALETTE[0];
}

export { PALETTE };
