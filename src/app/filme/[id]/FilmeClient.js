"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { getMovieDetails } from "../../../services/tmdb";

export default function FilmeClient({ id }) {
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadFilme() {
      setLoading(true);
      setError("");

      try {
        setFilme(await getMovieDetails(id));
      } catch {
        console.log("Filme não encontrado");
        setError("Filme não encontrado. Redirecionando para a página inicial...");
        router.replace("/");
      } finally {
        setLoading(false);
      }
    }

    loadFilme();
  }, [id, router]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    const filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if (hasFilme) {
      alert("Este filme já está na sua lista!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("Filme salvo com sucesso!");
  }

  return (
    <div className="App">
      <Header />

      <div className="filme-info">
        {loading && <p>Carregando detalhes...</p>}
        {!loading && error && <p className="feedback-message">{error}</p>}
        {!loading && !error && (
          <div>
            <h1>{filme.title}</h1>
            <Image
              src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
              alt={filme.title}
              width={400}
              height={225}
            />
            <h2>{filme.title}</h2>
            <p>{filme.overview}</p>
            <div className="avaliacao">
              <strong>Avaliação: {filme.vote_average} / 10</strong>
            </div>
            <div className="area-buttons">
              <button className="salvar" onClick={salvarFilme}>
                Salvar
              </button>

              <button className="trailer">
                <a
                  href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}
                  target="blank"
                  rel="external"
                >
                  Trailer
                </a>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
