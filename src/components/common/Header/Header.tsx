import { Link } from "react-router-dom";
import "./Header.module.css";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/map">Map</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
