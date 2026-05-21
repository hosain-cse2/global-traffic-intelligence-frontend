import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "@/assets/logo.png";
import { useAuth } from "@/features/auth/AuthContext";
import AvatarMenu from "../AvatarMenu/AvatarMenu";

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
            <AvatarMenu />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
