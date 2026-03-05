import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </Link>
      <nav className={styles.nav}>
        <Link
          to="/map"
          className={
            location.pathname === "/" || location.pathname === "/map"
              ? styles.active
              : undefined
          }
        >
          Map
        </Link>
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard" ? styles.active : undefined
          }
        >
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;
