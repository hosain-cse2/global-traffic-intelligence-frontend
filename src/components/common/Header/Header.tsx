import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "@/assets/logo.png";
import { useAuth } from "@/features/auth/AuthContext";
import type { User } from "@/features/auth/AuthContext";

function initialsForUser(user: User): string {
  const first = user.firstName?.trim();
  const last = user.lastName?.trim();
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
  if (first) return first.slice(0, 2).toUpperCase();
  const local = user.email.split("@")[0] ?? user.email;
  return local.slice(0, 2).toUpperCase();
}

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </Link>
      <div className={styles.right}>
        <nav className={styles.nav}>
          <Link
            to="/map"
            className={
              location.pathname === "/" || location.pathname === "/map"
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Map
          </Link>
          <Link
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Dashboard
          </Link>
        </nav>
        {user ? (
          <div className={styles.userArea}>
            <div
              className={styles.avatar}
              title={user.email}
              aria-label={`Signed in as ${user.email}`}
            >
              {initialsForUser(user)}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
