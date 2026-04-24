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
    <BarChart data={data} margin={{ top: 26, right: 8, left: 4, bottom: 28 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
      <XAxis
        type="category"
        dataKey="type"
        tick={{ fontSize: 14, fill: "#000000", fontWeight: 700 }}
        axisLine={false}
        tickLine={false}
        interval={0}
        angle={-28}
        textAnchor="end"
        height={56}
      />
      <YAxis
        type="number"
        tick={{ fontSize: 14, fill: "#000000", fontWeight: 700 }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
        <LabelList
          dataKey="count"
          position="top"
          formatter={(v) => (typeof v === "number" ? v.toLocaleString() : v)}
          fill="#94a3b8"
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
