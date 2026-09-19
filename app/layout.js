import "./globals.css";

export const metadata = {
  title: "CyberX Store | Digital Gaming",
  description: "Brawl Stars, CS2, Clash Royale va raqamli xizmatlar do'koni",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },  
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}