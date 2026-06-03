import "../index.css";

export const metadata = {
  title: "RoldanFlix",
  description: "Aplicacao de filmes RoldanFlix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
