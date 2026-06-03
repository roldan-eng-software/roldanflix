"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getNowPlayingMovies } from "../services/tmdb";

export default function HomeClient() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadFilmes() {
      setLoading(true);
      setError("");

      try {
        setFilmes(await getNowPlayingMovies({ page }));
      } catch {
        setFilmes([]);
        setError("Não foi possível carregar os filmes agora.");
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, [page]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToFirstPage() {
    scrollToTop();
    setPage(1);
  }

  function goToNextPage() {
    scrollToTop();
    setPage((currentPage) => currentPage + 1);
  }

  return (
    <div className="App">
      <Header />

      <div className="container">
        {loading && <p className="loading">Carregando filmes...</p>}
        {!loading && error && <p className="feedback-message">{error}</p>}
        {!loading && !error && filmes.length === 0 && (
          <p className="feedback-message">Nenhum filme encontrado.</p>
        )}

        <div className="lista-filmes">
          {filmes.map((filme) => {
            return (
              <article key={filme.id}>
                <strong>{filme.title}</strong>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  alt={filme.title}
                  width={900}
                  height={340}
                />
                <Link href={`/filme/${filme.id}`}>Ver Detalhes</Link>
              </article>
            );
          })}
        </div>

        {!loading && !error && filmes.length > 0 && (
          <nav className="pagination" aria-label="Navegação de páginas">
            <button type="button" onClick={goToFirstPage} disabled={page === 1}>
              Primeira página
            </button>
            <span>Página {page}</span>
            <button type="button" onClick={goToNextPage}>
              Próxima página
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
