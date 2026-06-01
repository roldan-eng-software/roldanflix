import { Link } from "react-router-dom";
import "./erro.css";

function Erro() {
    return (
        <div>
            <h1>404 - Página não encontrada</h1>
                <p>Opss... Parece que a página que você está procurando não existe.</p>
            <Link to="/">Clique aqui para voltar para a página inicial</Link>
        </div>
    );
}

export default Erro;