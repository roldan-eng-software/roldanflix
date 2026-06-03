"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getNowPlayingMovies } from "../services/tmdb";

export default function HomeClient() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      try {
        setFilmes(await getNowPlayingMovies());
      } catch {
        setFilmes([]);
      }
    }

    loadFilmes();
  }, []);

  return (
    <div className="App">
      <Header />

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
                <Link href={`/filme/${filme.id}`}>Ver Detalhes</Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
