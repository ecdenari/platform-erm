import React from "react";

interface ReportTableRowProps {
  property: string;
  controller: string;
  runtime: number;
}

const ReportTableRow: React.FC<ReportTableRowProps> = ({ property, controller, runtime }) => {
  return (
    <tr>
      <td className="px-4 py-2">{property}</td>
      <td className="px-4 py-2">{controller}</td>
      <td className="px-4 py-2">{runtime} hrs</td>
    </tr>
  );
};

export default ReportTableRow;
