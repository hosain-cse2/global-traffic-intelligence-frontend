/** Align field names with your Node API (e.g. `username` instead of `email`). */
export type LoginCredentials = {
  email: string;
  password: string;
};

/**
 * Mirrors your server `User` model. JSON responses use ISO strings for dates.
 * `passwordHash` is server-only and must not appear in API payloads — omitted here.
 */
export type User = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Typical login JSON body when the session is established via httpOnly cookies
 * (no access/refresh tokens in the response body).
 */
export type LoginResponse = {
  user: User;
};
