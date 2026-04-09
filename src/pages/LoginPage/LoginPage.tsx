import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { login } from "@/services/authApi";
import type { LoginResponse } from "@/types/auth";
import { flushSync } from "react-dom";

import { useAuth } from "@/features/auth/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("password123");
  const [hasError, setHasError] = useState<boolean>(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    login({ email, password })
      .then((response: LoginResponse) => {
        console.log(response);
        const { user } = response;
        flushSync(() => {
          setSession(user);
        });
        navigate("/dashboard");
      })
      .catch((err: unknown) => {
        console.log(err);
        setHasError(true);
      });
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>Use your account to continue.</p>
        </div>
        {hasError && <p className={styles.error}>Invalid email or password.</p>}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.submit} type="submit">
          Sign in
        </button>
      </form>
      <p className={styles.forgotRow}>
        <a className={styles.link} href="#">
          Forgot password?
        </a>
      </p>
      <p className={styles.signupRow}>
        Don&apos;t have an account?{" "}
        <a className={styles.link} href="#">
          Sign up
        </a>
      </p>
    </div>
  );
}
