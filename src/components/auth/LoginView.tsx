import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";

export function LoginView({ state = "ready" }: { state?: "ready" | "loading" | "empty" | "error" | "forbidden" }) {
  if (state === "loading") return <p>Carregando...</p>;
  if (state === "empty") return <EmptyState title="Sem métodos de login" />;
  if (state === "error") return <EmptyState title="Falha ao carregar login" />;
  if (state === "forbidden") return <EmptyState title="Acesso bloqueado" />;

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <div>
          <CardTitle>Entrar na plataforma</CardTitle>
          <CardDescription>Use seu e-mail e senha para autenticação real via Supabase Auth.</CardDescription>
        </div>
        <Lock className="h-5 w-5 text-primary-700" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Input label="E-mail" type="email" name="email" placeholder="voce@clinica.com" required />
        <Input label="Senha" type="password" name="password" placeholder="••••••••" required />
        <Button type="submit" className="w-full">Entrar</Button>
      </CardContent>
    </Card>
  );
}
