import "./globals.css";

export const metadata = {
  title: "Kord YT Song Downloader",
  description: "Beautiful YouTube song downloader built with Kord API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
