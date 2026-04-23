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
  name: string;
  value: number;
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
  /** In-slice count labels. Default `true`; set `false` to hide. */
  sliceLabels?: boolean;
};

const RAD = Math.PI / 180;

/** Same angle convention as Recharts `polarToCartesian`. */
function pointInAnnulus(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  midAngleDeg: number,
  /** 0 = inner edge, 1 = outer edge */
  tAlongBand: number,
) {
  const r =
    innerRadius + (outerRadius - innerRadius) * Math.min(1, Math.max(0, tAlongBand));
  return {
    x: cx + Math.cos(-RAD * midAngleDeg) * r,
    y: cy + Math.sin(-RAD * midAngleDeg) * r,
  };
}

function renderCountInsideSlice(props: PieLabelRenderProps) {
  const cx = Number(props.cx);
  const cy = Number(props.cy);
  const inner = Number(props.innerRadius);
  const outer = Number(props.outerRadius);
  const mid = Number(props.midAngle ?? 0);
  const n = typeof props.value === "number" ? props.value : Number(props.value);
  const count = Number.isFinite(n) ? n.toLocaleString() : "—";
  const { x, y } = pointInAnnulus(cx, cy, inner, outer, mid, 0.56);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#ffffff"
      style={{
        pointerEvents: "none",
        textShadow: "0 1px 4px rgba(15, 23, 42, 0.55)",
      }}
    >
      <tspan fontSize={12} fontWeight={700}>
        {count}
      </tspan>
    </text>
  );
}

/** Solid fill per slice index (repeats if there are more slices than colors). */
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

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
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
  const pct = total > 0 ? Math.round((row.value / total) * 100) : 0;
  return (
    <div
      style={{
        ...tooltipStyle,
        padding: "10px 12px",
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.name}</div>
      <div style={{ color: "#64748b", marginTop: 4 }}>
        {row.value.toLocaleString()} units · {pct}%
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
        const name = pl?.name ?? String(entry.value ?? "");
        const label = pl?.name ?? String(entry.value ?? "");
        const color =
          SLICE_COLORS[i % SLICE_COLORS.length] ?? SLICE_COLORS[0];
        return (
          <span
            key={`${name}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
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
  const total = data.reduce((s, d) => s + d.value, 0);
  const showInnerLabels = sliceLabels !== false;
  const pieLabel = showInnerLabels ? renderCountInsideSlice : false;

  if (variant === "ring") {
    return (
      <PieChart margin={{ top: 12, right: 8, bottom: 12, left: 8 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
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
          {data.map((_, i) => (
            <Cell
              key={data[i].name}
              fill={SLICE_COLORS[i % SLICE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          content={(props) => <PieTooltip {...props} total={total} />}
        />
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
      <PieChart margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
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
          {data.map((_, i) => (
            <Cell
              key={data[i].name}
              fill={SLICE_COLORS[i % SLICE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          content={(props) => <PieTooltip {...props} total={total} />}
        />
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
    <PieChart margin={{ top: 4, right: 12, bottom: 8, left: 12 }}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
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
        {data.map((_, i) => (
          <Cell
            key={data[i].name}
            fill={SLICE_COLORS[i % SLICE_COLORS.length]}
          />
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
