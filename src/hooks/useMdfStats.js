import React from 'react';
import { pickMaterialColor } from '../utils/materialColors';

export function useMdfStats(materials = []) {
  return React.useMemo(() => {
    const chartData = materials.map((material, index) => ({
      name: material.nome,
      value: Number(material.percentual ?? material.percent ?? 0),
      color: material.cor ?? pickMaterialColor(material.nome, index),
    }));

    const totalPercent = chartData.reduce((sum, item) => sum + item.value, 0);

    return {
      totalPercent,
      chartData,
    };
  }, [materials]);
}