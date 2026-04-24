import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  type PieLabelRenderProps,
} from "recharts";
import type { ChartData } from "recharts/types/state/chartDataSlice";

export type AisPieChartDatum = {
  state: string;
  count: number;
};

/**
 * `ring` — donut + legend on the right.
 * `classic` — full pie + horizontal legend under the chart.
 * `fill` — large donut + compact legend (default).
 */
export type AisPieChartVariant = "ring" | "classic" | "fill";

type AisPieChartProps = {
  data: ChartData<AisPieChartDatum>;
  variant?: AisPieChartVariant;
  /** Count labels just outside the ring. Default `true`; set `false` to hide. */
  sliceLabels?: boolean;
};

const RAD = Math.PI / 180;

/** Pixels past the slice outer radius for count labels. */
const LABEL_OUTSIDE_OFFSET = 18;

/** Same angle convention as Recharts `polarToCartesian`. */
function pointAtRadius(
  cx: number,
  cy: number,
  radius: number,
  midAngleDeg: number,
) {
  return {
    x: cx + Math.cos(-RAD * midAngleDeg) * radius,
    y: cy + Math.sin(-RAD * midAngleDeg) * radius,
  };
}

function renderSliceCountOutside(props: PieLabelRenderProps) {
  const cx = Number(props.cx);
  const cy = Number(props.cy);
  const outer = Number(props.outerRadius);
  const mid = Number(props.midAngle ?? 0);
  const pl = props.payload as AisPieChartDatum | undefined;
  const raw =
    pl != null && typeof pl.count === "number"
      ? pl.count
      : typeof props.value === "number"
        ? props.value
        : Number(props.value);
  const count = Number.isFinite(raw) ? raw.toLocaleString() : "—";
  const { x, y } = pointAtRadius(cx, cy, outer + LABEL_OUTSIDE_OFFSET, mid);
  const ta = props.textAnchor as "start" | "middle" | "end" | undefined;

  return (
    <text
      x={x}
      y={y}
      textAnchor={ta ?? "middle"}
      dominantBaseline="middle"
      fill="#0f172a"
      style={{
        pointerEvents: "none",
        textShadow: "0 0 1px rgba(255,255,255,0.9), 0 1px 2px rgba(255,255,255,0.6)",
      }}
    >
      <tspan fontSize={12} fontWeight={700}>
        {count}
      </tspan>
    </text>
  );
}

/** Fallback palette for unknown categories (movement uses `fillForState`). */
const SLICE_COLORS = [
  "#2563eb",
  "#65a30d",
  "#eab308",
  "#c026d3",
  "#06b6d4",
  "#f43f5e",
  "#ea580c",
  "#7c3aed",
] as const;

/** Stable slice / legend order for AIS movement buckets. */
// TODO: use the actual movement state order from the backend.
const MOVEMENT_STATE_ORDER = ["fast", "normal", "slow", "stationary"] as const;

const STATE_FILL: Record<string, string> = {
  fast: SLICE_COLORS[0],
  normal: SLICE_COLORS[1],
  slow: SLICE_COLORS[2],
  stationary: SLICE_COLORS[3],
};

function sortPieData(
  data: ChartData<AisPieChartDatum>,
): ChartData<AisPieChartDatum> {
  const rank = new Map<string, number>(
    MOVEMENT_STATE_ORDER.map((s, i) => [s, i]),
  );
  return [...data].sort((a, b) => {
    const ia = rank.get(a.state.toLowerCase()) ?? 99;
    const ib = rank.get(b.state.toLowerCase()) ?? 99;
    if (ia !== ib) return ia - ib;
    return a.state.localeCompare(b.state);
  });
}

function fillForState(state: string | undefined): string {
  if (!state) return SLICE_COLORS[0];
  const key = state.toLowerCase();
  if (STATE_FILL[key]) return STATE_FILL[key];
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h + key.charCodeAt(i) * (i + 1)) % 997;
  }
  return SLICE_COLORS[4 + (h % (SLICE_COLORS.length - 4))];
}

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
};

type PieTipProps = {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: AisPieChartDatum }>;
  total: number;
};

function PieTooltip({ active, payload, total }: PieTipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  const pct = total > 0 ? Math.round((row.count / total) * 100) : 0;
  return (
    <div
      style={{
        ...tooltipStyle,
        padding: "10px 12px",
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.state}</div>
      <div style={{ color: "#64748b", marginTop: 4 }}>
        {row.count.toLocaleString()} units · {pct}%
      </div>
    </div>
  );
}

/** Tight legend row — swatches match slice colors */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CompactLegend(props: any) {
  const payload = props?.payload as
    | ReadonlyArray<{ value?: unknown; payload?: unknown }>
    | undefined;
  if (!payload?.length) return null;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px 14px",
        padding: "10px 8px 4px",
        width: "100%",
      }}
    >
      {payload.map((entry, i) => {
        const pl = entry.payload as AisPieChartDatum | undefined;
        const name = pl?.state ?? String(entry.value ?? "");
        const label = pl?.state ?? String(entry.value ?? "");
        const color = fillForState(pl?.state);
        return (
          <span
            key={`${name}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 600,
              color: "#334155",
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 999,
                background: color,
                boxShadow: "0 1px 3px rgba(15,23,42,0.25)",
                flexShrink: 0,
              }}
            />
            {label}
          </span>
        );
      })}
    </div>
  );
}

/** Soft shadow on the whole pie */
const pieDepthStyle = {
  filter: "drop-shadow(0 10px 14px rgba(15, 23, 42, 0.22))",
} as const;

const AisPieChart = ({
  data,
  variant = "fill",
  sliceLabels,
}: AisPieChartProps) => {
  const pieData = useMemo(() => sortPieData(data), [data]);
  const total = pieData.reduce((s, d) => s + d.count, 0);
  const showSliceCountLabels = sliceLabels !== false;
  const pieLabel = showSliceCountLabels ? renderSliceCountOutside : false;

  if (variant === "ring") {
    return (
      <PieChart
        margin={{
          top: showSliceCountLabels ? 18 : 12,
          right: 8,
          bottom: showSliceCountLabels ? 18 : 12,
          left: showSliceCountLabels ? 28 : 8,
        }}
      >
        <Pie
          data={pieData}
          dataKey="count"
          nameKey="state"
          cx="44%"
          cy="50%"
          innerRadius={64}
          outerRadius={96}
          paddingAngle={3}
          cornerRadius={4}
          stroke="#ffffff"
          strokeWidth={3}
          label={pieLabel}
          labelLine={false}
          style={pieDepthStyle}
        >
          {pieData.map((row) => (
            <Cell key={row.state} fill={fillForState(row.state)} />
          ))}
        </Pie>
        <Tooltip content={(props) => <PieTooltip {...props} total={total} />} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{
            paddingLeft: 8,
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 12,
            color: "#64748b",
          }}
          formatter={(value) => (
            <span style={{ color: "#334155", fontWeight: 600 }}>{value}</span>
          )}
        />
      </PieChart>
    );
  }

  if (variant === "fill") {
    return (
      <PieChart
        margin={{
          top: showSliceCountLabels ? 24 : 4,
          right: showSliceCountLabels ? 40 : 4,
          bottom: showSliceCountLabels ? 14 : 0,
          left: showSliceCountLabels ? 40 : 4,
        }}
      >
        <Pie
          data={pieData}
          dataKey="count"
          nameKey="state"
          cx="50%"
          cy="48%"
          innerRadius="34%"
          outerRadius="80%"
          paddingAngle={2.5}
          cornerRadius={4}
          stroke="#ffffff"
          strokeWidth={2}
          label={pieLabel}
          labelLine={false}
          style={pieDepthStyle}
        >
          {pieData.map((row) => (
            <Cell key={row.state} fill={fillForState(row.state)} />
          ))}
        </Pie>
        <Tooltip content={(props) => <PieTooltip {...props} total={total} />} />
        <Legend
          verticalAlign="bottom"
          align="center"
          content={(props) => <CompactLegend {...props} />}
        />
      </PieChart>
    );
  }

  /* classic */
  return (
    <PieChart
      margin={{
        top: showSliceCountLabels ? 22 : 4,
        right: showSliceCountLabels ? 36 : 12,
        bottom: showSliceCountLabels ? 34 : 8,
        left: showSliceCountLabels ? 36 : 12,
      }}
    >
      <Pie
        data={pieData}
        dataKey="count"
        nameKey="state"
        cx="50%"
        cy="48%"
        innerRadius={0}
        outerRadius={92}
        paddingAngle={2}
        stroke="#ffffff"
        strokeWidth={2}
        label={pieLabel}
        labelLine={false}
        style={pieDepthStyle}
      >
        {pieData.map((row) => (
          <Cell key={row.state} fill={fillForState(row.state)} />
        ))}
      </Pie>
      <Tooltip content={(props) => <PieTooltip {...props} total={total} />} />
      <Legend
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
        iconType="circle"
        iconSize={8}
        wrapperStyle={{
          paddingTop: 12,
          fontSize: 11,
          width: "100%",
        }}
        formatter={(value) => (
          <span style={{ color: "#475569", fontWeight: 600 }}>{value}</span>
        )}
      />
    </PieChart>
  );
};

export default AisPieChart;
