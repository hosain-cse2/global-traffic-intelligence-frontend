import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorFallback from "@/shared/components/ErrorBoundary/ErrorFallback";

function toError(routeError: unknown): Error | null {
  if (routeError instanceof Error) return routeError;
  if (isRouteErrorResponse(routeError)) {
    const message =
      typeof routeError.data === "string"
        ? routeError.data
        : routeError.statusText || `Request failed (${routeError.status})`;
    return new Error(message);
  }
  return null;
}

export default function RouteErrorPage() {
  const routeError = useRouteError();
  console.error("[RouteError]", routeError);

  return <ErrorFallback error={toError(routeError)} />;
}
