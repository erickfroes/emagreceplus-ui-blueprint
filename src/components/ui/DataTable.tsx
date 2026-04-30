import * as React from "react";
import { Card } from "./Card";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

export function DataTable<T extends { id: string | number }>({ columns, rows }: { columns: Column<T>[]; rows: T[] }) {
  return (
    <Card className="overflow-hidden">
      <table className="ep-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/70">
              {columns.map((column) => (
                <td key={String(column.key)}>{column.render ? column.render(row) : String((row as any)[column.key] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
