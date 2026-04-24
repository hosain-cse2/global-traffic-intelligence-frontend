import { getShipColor } from "@/features/map/components/VesselMap/VesselMapHelper";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
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

const AisBarChart = ({ data }: AISBarChartProps) => {
  const barColors = useMemo(() => {
    return data.map((item) => getShipColor(item.type));
  }, [data]);
  return (
    <BarChart
      data={data}
      layout="vertical"
      margin={{ top: 8, right: 40, left: 8, bottom: 8 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
      <XAxis type="number" tick={{ fontSize: 14, fill: "#64748b" }} />
      <YAxis
        type="category"
        dataKey="type"
        width={96}
        tick={{ fontSize: 14, fill: "#64748b" }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="count" radius={[0, 6, 6, 0]}>
        <LabelList
          dataKey="count"
          position="right"
          formatter={(v) => (typeof v === "number" ? v.toLocaleString() : v)}
          fill="#334155"
          fontSize={13}
          fontWeight={700}
        />
        {data.map((_, i) => (
          <Cell key={data[i].type} fill={barColors[i]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default AisBarChart;
