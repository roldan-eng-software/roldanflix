import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme-info.css";
function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api.get(`movie/${id}`,{
        params: {
                api_key: "bed02c24cbee0d266218494a6f7486fe",
                language: "pt-BR",
                page: 1,
            }
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/", { replace: true });
          setLoading(false);
        });
      }
      loadFilme();
  }, [id]);

  return (
    <div className="filme-info">
      {loading && <p>Carregando detalhes...</p>}
      {!loading && (
        <div>
          <h1>{filme.title}</h1>
          <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
          <h2>{filme.title}</h2>
          <p>{filme.overview}</p>
          <div className="avaliacao">
            <strong>Avaliação: {filme.vote_average} / 10</strong>
          </div>
          <div className="area-buttons">
            <button className="salvar" onClick={() => {
              const minhaLista = localStorage.getItem("@primeflix");
              let filmesSalvos = JSON.parse(minhaLista) || [];
              const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
              if (hasFilme) {
                alert("Este filme já está na sua lista!");
                return;
              }
              filmesSalvos.push(filme);
              localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
              alert("Filme salvo com sucesso!");
            }}>
              Salvar
            </button>

            <button className="trailer">
              <a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external">
                Trailer
              </a>
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Filme;
