import Link from "next/link";
import Header from "../components/Header";

export const metadata = {
  title: "Pagina nao encontrada | RoldanFlix",
};

export default function NotFound() {
  return (
    <div className="App">
      <Header />

      <div>
        <h1>404 - Página não encontrada</h1>
        <p>Opss... Parece que a página que você está procurando não existe.</p>
        <Link href="/">Clique aqui para voltar para a página inicial</Link>
      </div>
    </div>
  );
}
