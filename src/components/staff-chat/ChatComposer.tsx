import { Button } from "@/components/ui/Button";

export function ChatComposer() {
  return <div className="mt-4 flex gap-2"><input className="w-full rounded-xl border border-border px-3 py-2 text-sm" placeholder="Digite uma mensagem (simulado)" /><Button>Enviar</Button></div>;
}
