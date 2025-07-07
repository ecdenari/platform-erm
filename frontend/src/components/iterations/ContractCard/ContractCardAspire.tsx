import React from 'react';
import { enterpriseTokens } from '../../../styles/enterpriseTokens';
import { Calendar, DollarSign, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';

interface ContractData {
  id: string;
  contractNumber: string;
  propertyName: string;
  clientName: string;
  status: 'Active' | 'In_Progress' | 'Completed' | 'On_Hold' | 'Cancelled';
  startDate: string;
  completionDate?: string;
  contractValue: number;
  percentComplete: number;
  workTicketCount: number;
  completedTickets: number;
  assignedTeams: number;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
}

interface ContractCardAspireProps {
  contract: ContractData;
  onClick?: () => void;
  onEdit?: () => void;
  onViewTickets?: () => void;
}

const ContractCardAspire: React.FC<ContractCardAspireProps> = ({
  contract,
  onClick,
  onEdit,
  onViewTickets
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#3B82F6';
      case 'In_Progress': return '#F59E0B';
      case 'Completed': return '#10B981';
      case 'On_Hold': return '#8B5CF6';
      case 'Cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return '#10B981';
      case 'Medium': return '#F59E0B';
      case 'High': return '#EF4444';
      case 'Urgent': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'On_Hold': case 'Cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className="bg-white rounded-md border border-slate-300 p-4 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {/* Status bar - Aspire pattern */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: getStatusColor(contract.status) }}
      />
      
      {/* Header with contract number and status */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-400 font-mono">
              {contract.contractNumber}
            </span>
            <div 
              className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
              style={{ 
                backgroundColor: `${getStatusColor(contract.status)}20`,
                color: getStatusColor(contract.status)
              }}
            >
              {getStatusIcon(contract.status)}
              {contract.status.replace('_', ' ')}
            </div>
          </div>
          <h3 className="text-base font-semibold text-slate-900 truncate">
            {contract.propertyName}
          </h3>
          <p className="text-sm text-slate-600">
            {contract.clientName}
          </p>
        </div>
        
        <div className="text-right">
          <div 
            className="px-2 py-1 rounded text-xs font-medium mb-1"
            style={{
              backgroundColor: `${getPriorityColor(contract.priority)}20`,
              color: getPriorityColor(contract.priority)
            }}
          >
            {contract.priority}
          </div>
          <div className="text-lg font-bold text-slate-900">
            ${contract.contractValue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-600">Progress</span>
          <span className="text-xs font-medium text-slate-900">
            {contract.percentComplete}%
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${contract.percentComplete}%`,
              backgroundColor: getStatusColor(contract.status)
            }}
          />
        </div>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-3 gap-3 text-sm mb-3">
        <div className="text-center">
          <div className="text-slate-500 text-xs">Work Tickets</div>
          <div className="font-medium text-slate-900">
            {contract.completedTickets}/{contract.workTicketCount}
          </div>
        </div>
        <div className="text-center">
          <div className="text-slate-500 text-xs">Teams</div>
          <div className="font-medium text-slate-900 flex items-center justify-center gap-1">
            <Users className="h-3 w-3" />
            {contract.assignedTeams}
          </div>
        </div>
        <div className="text-center">
          <div className="text-slate-500 text-xs">Start Date</div>
          <div className="font-medium text-slate-900 flex items-center justify-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(contract.startDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-2 border-t border-slate-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewTickets?.();
          }}
          className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
        >
          View Tickets
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ContractCardAspire;