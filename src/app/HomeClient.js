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

  useEffect(() => {
    async function loadFilmes() {
      setLoading(true);
      setError("");

      try {
        setFilmes(await getNowPlayingMovies());
      } catch {
        setFilmes([]);
        setError("Não foi possível carregar os filmes agora.");
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, []);

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
      </div>
    </div>
  );
}
