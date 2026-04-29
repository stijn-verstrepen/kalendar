export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-[--color-background]"
      style={{ backgroundImage: "url(/grain.svg)", backgroundRepeat: "repeat" }}
    >
      <div className="min-h-screen bg-[--color-background]/80">{children}</div>
    </div>
  );
}
