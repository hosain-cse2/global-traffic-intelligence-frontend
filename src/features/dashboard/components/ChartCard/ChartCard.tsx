import { useLayoutEffect, useRef, useState } from "react";
import { ResponsiveContainer } from "recharts";
import styles from "./ChartCard.module.css";

type ChartCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const ChartCard = ({ title, description, children }: ChartCardProps) => {
  const chartBoxRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const chartBox = chartBoxRef.current;
    if (!chartBox) return;

    const updateChartSize = () => {
      const { width, height } = chartBox.getBoundingClientRect();
      const nextSize =
        width > 0 && height > 0
          ? { width: Math.floor(width), height: Math.floor(height) }
          : null;

      setChartSize((currentSize) => {
        if (
          currentSize?.width === nextSize?.width &&
          currentSize?.height === nextSize?.height
        ) {
          return currentSize;
        }

        return nextSize;
      });
    };

    updateChartSize();

    const resizeObserver = new ResizeObserver(updateChartSize);
    resizeObserver.observe(chartBox);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>{title.toUpperCase()}</h2>
      <p className={styles.panelDesc}>{description}</p>
      <div ref={chartBoxRef} className={styles.chartBox}>
        {chartSize ? (
          <ResponsiveContainer
            width={chartSize.width}
            height={chartSize.height}
          >
            {children}
          </ResponsiveContainer>
        ) : null}
      </div>
    </div>
  );
};

export default ChartCard;
