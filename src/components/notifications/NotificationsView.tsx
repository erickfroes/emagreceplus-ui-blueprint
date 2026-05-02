"use client";

import { useState } from "react";
import { notificationsMock } from "@/data/mock/notifications.mock";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ForbiddenState } from "@/components/ui/ForbiddenState";
import type { UiState } from "@/contracts/common";
import { NotificationTabs } from "./NotificationTabs";
import { NotificationCard } from "./NotificationCard";
import { NotificationSummaryPanel } from "./NotificationSummaryPanel";

export function NotificationsView({ state = "default" }: { state?: UiState }) {
  const [activeTab, setActiveTab] = useState("todas");
  if (state === "loading") return <LoadingState title="Carregando notificações" />;
  if (state === "empty") return <EmptyState title="Sem notificações" description="Tudo em dia por enquanto." />;
  if (state === "error") return <ErrorState title="Falha ao carregar notificações" />;
  if (state === "forbidden") return <ForbiddenState title="Acesso negado às notificações" />;

  const items = notificationsMock.default.filter((item) => {
    if (activeTab === "nao-lidas") return item.status === "unread";
    if (activeTab === "criticas") return item.severity === "critical";
    if (activeTab === "documentos") return item.category === "documentos";
    if (activeTab === "agenda") return item.category === "agenda";
    if (activeTab === "chat") return item.category === "chat";
    return true;
  });

  return <div className="grid gap-6 xl:grid-cols-[1fr_280px]"><section className="space-y-4"><NotificationTabs value={activeTab} onChange={setActiveTab} />{items.map((item) => <NotificationCard key={item.id} item={item} />)}</section><NotificationSummaryPanel items={notificationsMock.default} /></div>;
}
