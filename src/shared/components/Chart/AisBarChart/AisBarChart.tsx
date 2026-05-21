import {
  getMovementStateColor,
  getShipColor,
} from "@/features/map/components/VesselMap/VesselMapHelper";
import styles from "./AisBarChart.module.css";
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
  category: string;
  count: number;
};

type AISBarChartProps = {
  data: ChartData<AISBarChartData>;
  /** `vesselType` uses ship-type colors; `movement` uses speed-band colors. */
  series?: "vesselType" | "movement";
  isLoading?: boolean;
};

const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 12,
};

const AisBarChart = ({
  data,
  series = "vesselType",
  isLoading = false,
}: AISBarChartProps) => {
  const barColors = useMemo(() => {
    return data.map((item) =>
      series === "movement"
        ? getMovementStateColor(item.category)
        : getShipColor(item.category),
    );
  }, [data, series]);

  if (isLoading) {
    return (
      <div className={styles.barChartSkeleton} aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div className={styles.skeletonRow} key={index}>
            <span className={styles.skeletonLabel} />
            <span
              className={styles.skeletonBar}
              style={{ width: `${72 - index * 10}%` }}
            />
          </div>
        ))}
      </div>
    );
  }

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
        dataKey="category"
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
          <Cell key={data[i].category} fill={barColors[i]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default AisBarChart;
