import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Global Traffic Intelligence</h1>

      <nav>
        <Link to="/map">Map</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
