import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";
import type { User } from "@/features/auth/AuthContext";
import styles from "./AvatarMenu.module.css";
import useLogout from "@/hooks/useLogout";

function initialsForUser(user: User): string {
  const first = user.firstName?.trim();
  const last = user.lastName?.trim();
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
  if (first) return first.slice(0, 2).toUpperCase();
  const local = user.email.split("@")[0] ?? user.email;
  return local.slice(0, 2).toUpperCase();
}

function displayName(user: User): string {
  const first = user.firstName?.trim();
  const last = user.lastName?.trim();
  if (first && last) return `${first} ${last}`;
  if (first) return first;
  return user.email.split("@")[0] ?? user.email;
}

function IconDashboard() {
  return (
    <svg
      className={styles.menuIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function IconSignOut() {
  return (
    <svg
      className={styles.menuIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export default function AvatarMenu() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const { mutateAsync: logout } = useLogout();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      const el = wrapRef.current;
      if (el && !el.contains(e.target as Node)) close();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const handleSignOut = async () => {
    close();
    await logout();
  };

  if (!user) return null;

  const initials = initialsForUser(user);
  const name = displayName(user);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.avatar} aria-hidden>
          {initials}
        </span>
        <span
          className={`${styles.chevron} ${open ? styles.chevronUp : ""}`}
          aria-hidden
        />
      </button>

      <div
        className={`${styles.dropdownShell} ${open ? styles.dropdownShellOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.dropdownInner}>
          <div className={styles.dropdown} role="menu">
            <div className={styles.head}>
              <div className={styles.headRow}>
                <span className={styles.avatarLarge} aria-hidden>
                  {initials}
                </span>
                <div className={styles.headText}>
                  <div className={styles.displayName}>{name}</div>
                  <div className={styles.email}>{user.email}</div>
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <Link
                to="/dashboard"
                role="menuitem"
                className={styles.menuLink}
                onClick={close}
                tabIndex={open ? 0 : -1}
              >
                <IconDashboard />
                Dashboard
              </Link>
              <div className={styles.divider} />
              <button
                type="button"
                role="menuitem"
                className={`${styles.menuLink} ${styles.signOut}`}
                tabIndex={open ? 0 : -1}
                onClick={() => void handleSignOut()}
              >
                <IconSignOut />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
