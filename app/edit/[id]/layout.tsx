import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Edit",
  description: "Edit page",
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
