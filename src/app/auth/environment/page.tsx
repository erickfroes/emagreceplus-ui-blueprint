import { EnvironmentSelectionView } from "@/components/auth/EnvironmentSelectionView";

export default function EnvironmentPage() {
  return (
    <main className="ep-page min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-semibold text-slate-950">Selecionar ambiente</h1>
        <EnvironmentSelectionView />
      </div>
    </main>
  );
}
