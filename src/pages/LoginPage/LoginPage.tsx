import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./LoginPage.module.css";

import useLogin from "@/hooks/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("password123");

  const { mutate: login, error } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>Use your account to continue.</p>
        </div>
        {error && <p className={styles.error}>Invalid email or password.</p>}
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
