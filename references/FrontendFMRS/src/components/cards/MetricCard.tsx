import { Card, CardContent } from "@/components/ui/Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  className = "",
}: MetricCardProps) {
  return (
    <Card className={`rounded-[5px] shadow-sm w-full h-[120px] ${className}`}>
      <CardContent className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          {icon && <div className="w-4 h-4">{icon}</div>}
          {title}
        </div>
        <div className="text-2xl font-bold">{typeof value === 'number' ? value.toString() : value}</div>
      </CardContent>
    </Card>
  );
}
