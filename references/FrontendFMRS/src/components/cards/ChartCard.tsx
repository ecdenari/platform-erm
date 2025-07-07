import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <Card className={`rounded-[5px] shadow-sm h-[300px] ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 h-[240px] overflow-hidden flex items-center justify-center">{children}</CardContent>
    </Card>
  );
}
