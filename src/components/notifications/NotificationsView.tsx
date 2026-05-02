"use client";

import { useState } from "react";
import { BellRing, Calendar, FileText, MessageSquare, ShieldAlert } from "lucide-react";
import { notificationsMock } from "@/data/mock/notifications.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import type { UiState } from "@/contracts/common";

export function NotificationsView({ state = "default" }: { state?: UiState }) {
  const [activeTab, setActiveTab] = useState("todas");
  if (state === "loading") return <LoadingState title="Carregando notificações" />;
  if (state === "empty") return <EmptyState title="Sem notificações" description="Tudo em dia por enquanto." />;
  if (state === "error") return <ErrorState title="Falha ao carregar notificações" />;
  if (state === "forbidden") return <ForbiddenState title="Acesso negado às notificações" />;

  const items = notificationsMock.default.filter((item) => {
    if (activeTab === "nao-lidas") return item.status === "unread";
    if (activeTab === "criticas") return item.severity === "high";
    if (activeTab === "documentos") return item.category === "documentos";
    if (activeTab === "agenda") return item.category === "agenda";
    if (activeTab === "chat") return item.category === "chat";
    return true;
  });

  return <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
    <section className="space-y-4">
      <Tabs items={[
        { id: "todas", label: "Todas" }, { id: "nao-lidas", label: "Não lidas" }, { id: "criticas", label: "Críticas" }, { id: "documentos", label: "Documentos" }, { id: "agenda", label: "Agenda" }, { id: "chat", label: "Chat" },
      ]} value={activeTab} onChange={setActiveTab} />
      {items.map((item) => <Card key={item.id}>
        <CardContent className="flex items-start justify-between gap-4 p-5">
          <div className="flex gap-3">
            <div className="mt-1 text-primary-700">{item.category === "documentos" ? <FileText className="h-5 w-5" /> : item.category === "agenda" ? <Calendar className="h-5 w-5" /> : item.category === "chat" ? <MessageSquare className="h-5 w-5" /> : <BellRing className="h-5 w-5" />}</div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.body}</p>
              <p className="text-xs text-muted-foreground">{item.severity} • {item.category} • {new Date(item.createdAt).toLocaleString("pt-BR")}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm">{item.actionLabel}</Button>
            <Button size="sm">Marcar como lida</Button>
          </div>
        </CardContent>
      </Card>)}
    </section>
    <Card>
      <CardHeader><CardTitle>Resumo</CardTitle></CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p><strong>Pendentes:</strong> {notificationsMock.default.filter((i) => i.status === "unread").length}</p>
        <p><strong>Críticas:</strong> {notificationsMock.default.filter((i) => i.severity === "high").length}</p>
        <p><strong>Hoje:</strong> {notificationsMock.default.length}</p>
        <p className="rounded-xl bg-primary-50 p-3 text-primary-800"><ShieldAlert className="mr-2 inline h-4 w-4" />Mensagens protegidas em ambiente seguro.</p>
      </CardContent>
    </Card>
  </div>;
}
