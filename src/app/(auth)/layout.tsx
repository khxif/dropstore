export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center w-full h-[90vh] justify-center">
      {children}
    </main>
  );
}