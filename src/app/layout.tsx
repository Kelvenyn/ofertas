import type { Metadata } from "next";
import { Nunito, Inter, Sora, Poppins } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Atividades psicopedagógicas infantis – melhor-pravoce.online",
  description:
    "+250 atividades prontas para atendimentos Psicopedagógicos infantis. Materiais lúdicos, fichas de aplicação e atividades imprimíveis para trabalhar atenção, memória, leitura, escrita e raciocínio lógico com mais praticidade nos atendimentos infantis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${inter.variable} ${sora.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
