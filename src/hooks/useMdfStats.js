import React from 'react';

export function useMdfStats(materials = []) {
  return React.useMemo(() => {
    const chartData = materials.map((material, index) => ({
      name: material.nome,
      value: Number(material.percentual ?? material.percent ?? 0),
      color: material.cor ?? ['#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5],
    }));

    const totalPercent = chartData.reduce((sum, item) => sum + item.value, 0);

    return {
      totalPercent,
      chartData,
    };
  }, [materials]);
}