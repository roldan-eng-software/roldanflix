"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function FilmeClient({ id }) {
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadFilme() {
      setLoading(true);

      try {
        const response = await api.get(`movie/${id}`, {
          params: {
            language: "pt-BR",
            page: 1,
          },
        });

        setFilme(response.data);
      } catch {
        console.log("Filme não encontrado");
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
      <header>
        <Link className="logo" href="/">
          RoldanFlix
        </Link>
        <Link className="favoritos" href="/favoritos">
          Meus Filmes
        </Link>
        <h1>Header</h1>
      </header>

      <div className="filme-info">
        {loading && <p>Carregando detalhes...</p>}
        {!loading && (
          <div>
            <h1>{filme.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
              alt={filme.title}
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
