"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function FavoritosClient() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    const filtroFilmes = filmes.filter((item) => item.id !== id);

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
  }

  return (
    <div className="App">
      <Header />

      <div className="meus-filmes">
        <h1>Meus Filmes</h1>

        {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

        <ul>
          {filmes.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.title}</span>
                <div>
                  <Link href={`/filme/${item.id}`}>Ver detalhes</Link>
                  <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
