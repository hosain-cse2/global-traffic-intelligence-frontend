import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartData } from "recharts/types/state/chartDataSlice";

export type AISBarChartData = {
  type: string;
  count: number;
};

type AISBarChartProps = {
  data: ChartData<AISBarChartData>;
};

const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 12,
};

const BAR_COLORS = ["#22c55e", "#ef4444", "#38bdf8", "#f59e0b", "#94a3b8"];

const AisBarChart = ({ data }: AISBarChartProps) => {
  return (
    <BarChart
      data={data}
      layout="vertical"
      margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
      <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
      <YAxis
        type="category"
        dataKey="type"
        width={88}
        tick={{ fontSize: 11, fill: "#64748b" }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="count" radius={[0, 6, 6, 0]}>
        {data.map((_, i) => (
          <Cell key={data[i].type} fill={BAR_COLORS[i]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default AisBarChart;
