import { useState, useEffect} from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      setLoading(true);
      const response = await api.get("movie/now_playing",{
        params: {
                language: "pt-BR",
                page: 1,
            }
        });
        //console.log(response.data.results.slice(0,10));
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadFilmes();

  }, []);

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
            </article>
          );
        })}
      </div>
      
    </div>
  );
}

export default Home;
