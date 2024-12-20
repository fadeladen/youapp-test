export default function InterestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`bg-gradient min-h-screen text-white`}>{children}</div>;
}
