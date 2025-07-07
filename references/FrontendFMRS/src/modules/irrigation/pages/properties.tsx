import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/layout/PageContainer";
import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/Table";

interface PropertiesListVM {
  id: number;
  propertyID: number;
  propertyName: string;
  isActive: boolean;
  propertyStatusID: number;
  propertyStatusName: string;
  propertyTypeID: number;
  propertyType: string;
  branchID: number;
  branchName: string;
  branchCode: string;
  controllerCount: number;
  faults: number;
  totalInspectionIssues: number;
}

export default function Properties() {
  const [properties, setProperties] = useState<PropertiesListVM[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/Properties/GetIrrigationProperties")
      .then((res) => {
        console.log("API response:", res.data);
        const normalizedData = res.data.map((item: any) => ({
          id: item.Id,
          propertyID: item.PropertyID,
          propertyName: item.PropertyName,
          isActive: item.IsActive,
          propertyStatusID: item.PropertyStatusID,
          propertyStatusName: item.PropertyStatusName,
          propertyTypeID: item.PropertyTypeID,
          propertyType: item.PropertyType,
          branchID: item.BranchID,
          branchName: item.BranchName,
          branchCode: item.BranchCode,
          controllerCount: item.ControllerCount,
          faults: item.Faults,
          totalInspectionIssues: item.TotalInspectionIssues,
        }));
        setProperties(normalizedData);
      })
      .catch((err) => console.error("Error loading properties:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer>
      <PageHeader title="Properties" />

      {loading ? (
        <p className="mt-4 text-sm text-gray-600">Loading properties...</p>
      ) : (
        <div className="overflow-x-auto mt-6 bg-white rounded-md shadow-sm">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property Name</TableCell>
                <TableCell>Controllers</TableCell>
                <TableCell>Faults</TableCell>
                <TableCell>Issues</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.length > 0 ? (
                properties.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <span className="font-medium text-gray-900">
                        {p.propertyName}
                      </span>
                    </TableCell>
                    <TableCell>{p.controllerCount}</TableCell>
                    <TableCell>{p.faults}</TableCell>
                    <TableCell>{p.totalInspectionIssues}</TableCell>
                    <TableCell>
                      <button
                        onClick={() =>
                          navigate(`/irrigation/property/${p.id}/controllers`)
                        }
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View Controllers
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <td colSpan={6}>
                    <div className="w-full py-12 text-center text-sm text-gray-500 bg-gray-50 rounded-md">
                      No properties found.
                    </div>
                  </td>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </PageContainer>
  );
}
