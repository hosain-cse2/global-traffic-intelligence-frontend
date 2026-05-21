import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartData } from "recharts/types/state/chartDataSlice";

const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 12,
};

export type AISAreaChartData = {
  time: string;
  value: number;
};

type AISAreaChartProps = {
  data: ChartData<AISAreaChartData>;
};

const AisAreaChart = ({ data }: AISAreaChartProps) => {
  return (
    <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="fillAis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
      <XAxis
        dataKey="time"
        tick={{ fontSize: 11, fill: "#64748b" }}
        axisLine={{ stroke: "#e2e8f0" }}
        tickLine={false}
      />
      <YAxis
        tick={{ fontSize: 11, fill: "#64748b" }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip contentStyle={tooltipStyle} />
      <Area
        type="monotone"
        dataKey="value"
        stroke="#2563eb"
        strokeWidth={2}
        fill="url(#fillAis)"
      />
    </AreaChart>
  );
};

export default AisAreaChart;

/** Static demo data — replace with API-driven state later */
// const HOURLY_AIS: ChartData<AISAreaChartData> = [
//   { time: "00:00", value: 320 },
//   { time: "04:00", value: 180 },
//   { time: "08:00", value: 890 },
//   { time: "12:00", value: 1240 },
//   { time: "16:00", value: 1100 },
//   { time: "20:00", value: 760 },
//   { time: "24:00", value: 410 },
// ];
