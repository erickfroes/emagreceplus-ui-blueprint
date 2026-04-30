import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export function Modal({ title, children, footer, className }: { title: string; children: React.ReactNode; footer?: React.ReactNode; className?: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className={cn("w-full max-w-3xl rounded-3xl bg-white shadow-modal", className)}>
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200" type="button">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer ? <div className="border-t border-border p-6">{footer}</div> : null}
      </div>
    </div>
  );
}
