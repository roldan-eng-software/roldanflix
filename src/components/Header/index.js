import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
        <Link className="logo" to="/">RoldanFlix</Link>
        <Link className="favoritos" to="/favoritos">Meus Filmes</Link>   
      <h1>Header</h1>
    </header>
  );
}

export default Header;