import Link from "next/link";

export const metadata = {
  title: "Pagina nao encontrada | RoldanFlix",
};

export default function NotFound() {
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

      <div>
        <h1>404 - Página não encontrada</h1>
        <p>Opss... Parece que a página que você está procurando não existe.</p>
        <Link href="/">Clique aqui para voltar para a página inicial</Link>
      </div>
    </div>
  );
}
