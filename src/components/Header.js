import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link className="logo" href="/">
        RoldanFlix
      </Link>
      <Link className="favoritos" href="/favoritos">
        Meus Filmes
      </Link>
      <h1>Header</h1>
    </header>
  );
}
