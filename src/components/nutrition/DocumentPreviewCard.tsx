import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function DocumentPreviewCard({
  title,
  subtitle,
  sections,
}: {
  title: string;
  subtitle: string;
  sections: { heading: string; lines: string[] }[];
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Preview documental visual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border border-border bg-slate-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{subtitle}</p>
          <div className="space-y-4">
            {sections.map((section) => (
              <section key={section.heading} className="rounded-xl border border-border bg-white p-4">
                <h4 className="mb-2 text-sm font-semibold text-slate-900">{section.heading}</h4>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {section.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
