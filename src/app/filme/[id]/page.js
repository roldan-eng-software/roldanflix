import FilmeClient from "./FilmeClient";

export const metadata = {
  title: "Detalhes do Filme | RoldanFlix",
};

export default async function FilmePage({ params }) {
  const { id } = await params;

  return <FilmeClient id={id} />;
}
