import { render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

import Banner from "./Banner";
import styles from "./Banner.module.css";

afterEach(() => {
  cleanup();
});

describe("Banner", () => {
  it("should render successfully", () => {
    render(<Banner state="success" message="Test Banner" />);
    expect(screen.getByText("Test Banner")).toBeInTheDocument();
  });

  it("should render with the proper class names for success state", () => {
    render(<Banner state="success" message="Test Banner" />);
    expect(screen.getByRole("status")).toHaveClass(styles.success);
  });

  it("should render with the proper class names for error state", () => {
    render(<Banner state="error" message="Test Banner" />);
    expect(screen.getByRole("status")).toHaveClass(styles.error);
  });

  it("should render with accessible attributes", () => {
    render(<Banner state="success" message="Test Banner" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("status")).toHaveAttribute("role", "status");
  });
});
