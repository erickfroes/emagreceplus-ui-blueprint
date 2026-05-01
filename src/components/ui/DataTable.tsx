import * as React from "react";
import { Card } from "./Card";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T extends { id: string | number }> = {
  columns: Column<T>[];
  rows: T[];
};

export function DataTable<T extends { id: string | number }>({ columns, rows }: DataTableProps<T>) {
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
                <td key={String(column.key)}>{column.render ? column.render(row) : String(row[column.key] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
