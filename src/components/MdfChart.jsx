import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend, Label } from 'recharts';
import { useMdfStats } from '../hooks/useMdfStats';
import { computeMdfCompositionFromAmbientes } from '../utils/mdfComposition';

export function MdfChart({ ambientes = [], materiaisMdf }) {
  const computed = computeMdfCompositionFromAmbientes(ambientes || []);
  // Prioritize computed composition from ambientes; fall back to legacy materiaisMdf when computed empty
  const source = computed && computed.length ? computed : (materiaisMdf || []);
  const { chartData, totalPercent } = useMdfStats(source);

  return (
    <div className="chart-block">
      <div className="chart-summary">
        <h3>Composição MDF por cliente</h3>
        <strong>{chartData.length} materiais</strong>
        <span>Distribuição por material MDF</span>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={82} outerRadius={118} paddingAngle={3}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
              <Label value={`${totalPercent.toFixed(0)}%`} position="center" style={{ fontSize: '28px', fontWeight: 800, fill: 'currentColor' }} />
            </Pie>
            <Tooltip formatter={(value, name, props) => [`${Number(value).toFixed(0)}%`, props.payload.name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="material-breakdown">
        {chartData.map((material) => (
          <div className="material-pill" key={material.name} aria-label={`${material.value.toFixed(0)}% ${material.name}`}>
            <span className="material-dot" style={{ backgroundColor: material.color }} aria-hidden="true" />
            <span className="material-percent">{material.value.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}