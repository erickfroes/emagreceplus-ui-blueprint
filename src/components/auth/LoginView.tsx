import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { loginScreenMock } from "@/data/mock/auth";

export function LoginView() {
  if (loginScreenMock.state === "loading") return <p>Carregando...</p>;
  if (loginScreenMock.state === "empty") return <EmptyState title="Sem métodos de login" />;
  if (loginScreenMock.state === "error") return <EmptyState title="Falha ao carregar login" />;
  if (loginScreenMock.state === "forbidden") return <EmptyState title="Acesso bloqueado" />;

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <div>
          <CardTitle>{loginScreenMock.title}</CardTitle>
          <CardDescription>{loginScreenMock.subtitle}</CardDescription>
        </div>
        <Lock className="h-5 w-5 text-primary-700" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Input label="E-mail" type="email" placeholder="voce@clinica.com" />
        <Input label="Senha" type="password" placeholder="••••••••" />
        <Button className="w-full">Entrar</Button>
        <div className="grid gap-2">
          {loginScreenMock.providers.map((provider) => (
            <Button key={provider.id} variant="outline" className="w-full justify-start" disabled={!provider.enabled}>
              <Mail className="h-4 w-4" />
              <span>{provider.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
