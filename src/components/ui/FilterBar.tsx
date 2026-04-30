import * as React from "react";
import { Card } from "./Card";
import { cn } from "@/lib/cn";

export function FilterBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Card className={cn("mb-6 grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-5", className)}>{children}</Card>;
}
