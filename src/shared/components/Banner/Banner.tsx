import styles from "./Banner.module.css";
import cn from "classnames";
export type BannerState = "success" | "error";

export type BannerProps = {
  state: BannerState;
  message: string;
};

export default function Banner({ state, message }: BannerProps) {
  const className = cn(
    styles.banner,
    state === "error" ? styles.error : styles.success,
  );
  return (
    <div className={className} role="status" aria-live="polite">
      {message}
    </div>
  );
}
