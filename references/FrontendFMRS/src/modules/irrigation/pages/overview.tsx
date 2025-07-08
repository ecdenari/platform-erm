import PageContainer from "@/layout/PageContainer";
import PageHeader from "@/components/PageHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import MetricCard from "@/components/cards/MetricCard";
import ChartCard from "@/components/cards/ChartCard";
import InspectionSummaryCard from "@/modules/irrigation/components/InspectionSummaryCard";
import ReportTableRow from "@/modules/irrigation/components/ReportTableRow";

import { Droplet, MapPin, AlertCircle, Clock } from "lucide-react";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

interface MonthlySummary {
  month: string;
  count: number;
}

interface Report {
  property: string;
  controller: string;
  runtime: number;
}

export default function Irrigation() {
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [controllersCount, setControllersCount] = useState(0);
  const [faultyZones, setFaultyZones] = useState(0);
  const [weeklyRuntime, setWeeklyRuntime] = useState(0);
  const [inspectionSummary, setInspectionSummary] = useState({ draft: 0, complete: 0 });

  const [monthlyInspectionsData, setMonthlyInspectionsData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [weeklyRuntimeData, setWeeklyRuntimeData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [recentReports, setRecentReports] = useState<Report[]>([]);

  useEffect(() => {
    axios.get("/api/Properties/GetPropertiesList").then((response) => {
      setPropertiesCount(response.data.length);
    });

    axios.get("/api/Controllers/GetControllerList").then((response) => {
      setControllersCount(response.data.length);
    });

    axios.get("/api/Reports/Recent").then((response) => {
      setRecentReports(Array.isArray(response.data) ? response.data : []);
    });

    axios.get("/api/Inspections/MonthlySummary").then((response) => {
      const data: MonthlySummary[] = response.data;
      setMonthlyInspectionsData({
        labels: data.map((item) => item.month),
        datasets: [
          {
            label: "Inspections",
            data: data.map((item) => item.count),
            backgroundColor: "#4CAF50",
          },
        ],
      });
    });

    setWeeklyRuntimeData({
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Runtime",
          data: [10, 20, 30, 40],
          backgroundColor: "#FF9800",
        },
      ],
    });

    axios.get("/api/Inspections/Summary").then((response) => {
      const data = response.data;
      setInspectionSummary({ draft: data.draft || 0, complete: data.complete || 0 });
    });
  }, []);

  return (
    <PageContainer>
      <PageHeader title="Irrigation Overview" />

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricCard title="Properties" value={propertiesCount} icon={<MapPin className="w-4 h-4" />} />
        <MetricCard title="Controllers" value={controllersCount} icon={<Droplet className="w-4 h-4" />} />
        <MetricCard title="Faulty Zones" value={faultyZones} icon={<AlertCircle className="w-4 h-4" />} />
        <MetricCard title="Weekly Runtime" value={`${weeklyRuntime} hrs`} icon={<Clock className="w-4 h-4" />} />
        <InspectionSummaryCard draft={inspectionSummary.draft} complete={inspectionSummary.complete} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-6">
        <ChartCard title="Monthly Inspections">
          <Bar
            data={monthlyInspectionsData}
            options={{
              layout: { padding: { top: 20 } },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </ChartCard>
        <ChartCard title="Weekly Runtime">
          <Bar
            data={weeklyRuntimeData}
            options={{
              layout: { padding: { top: 20 } },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </ChartCard>
      </div>

      {/* Recent Reports - No Card, improved border styling */}
      <section className="mt-6 rounded-md border border-gray-200 bg-white">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-700">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white text-gray-500">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200">Property</th>
                <th className="py-3 px-4 border-b border-gray-200">Controller</th>
                <th className="py-3 px-4 border-b border-gray-200">Runtime</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.length > 0 ? (
                recentReports.map((report, index) => (
                  <ReportTableRow
                    key={index}
                    property={report.property}
                    controller={report.controller}
                    runtime={report.runtime}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-muted-foreground">
                    No reports available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </PageContainer>
  );
}
