import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Lesson",
  description: "Lesson page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="flex items-center justify-center bg-black">
        <body>{children}</body>
      </html>
  );
}
