import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Add Lesson",
  description: "Elevate page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="bg-black">
        <body>{children}</body>
      </html>
  );
}
