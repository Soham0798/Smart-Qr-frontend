import { Suspense } from "react";

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="p-6 text-center">Loading booking page…</p>}>
      {children}
    </Suspense>
  );
}
