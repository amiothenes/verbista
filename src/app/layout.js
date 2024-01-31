import "./globals.css";

export const metadata = {
  title: "Verbista",
  description: "The language learning app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
