import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

type SoapSectionCardProps = {
  title: string;
  content: string;
  helper?: string;
};

export function SoapSectionCard({ title, content, helper }: SoapSectionCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-slate-700">{content}</p>
      </CardContent>
    </Card>
  );
}
