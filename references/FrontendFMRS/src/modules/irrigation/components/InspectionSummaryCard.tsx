import { Card, CardContent } from "@/components/ui/Card";

interface InspectionSummaryCardProps {
  draft: number;
  complete: number;
  className?: string;
}

export default function InspectionSummaryCard({ draft, complete, className = "" }: InspectionSummaryCardProps) {
  return (
    <Card className={`rounded-[5px] shadow-sm w-full h-[120px] ${className}`}>
      <CardContent className="p-4 h-full flex flex-col justify-between items-start">
        <div className="text-xs text-muted-foreground mb-2">Inspections</div>
        <div className="flex flex-col gap-1 mt-auto text-sm">
          <div className="text-muted-foreground">Draft: <span className="font-bold text-foreground">{draft}</span></div>
          <div className="text-muted-foreground">Complete: <span className="font-bold text-foreground">{complete}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}
