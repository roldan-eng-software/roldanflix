"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../services/api";

export default function HomeClient() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
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
