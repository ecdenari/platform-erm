import React from 'react';
import { enterpriseTokens } from '../../../styles/enterpriseTokens';
import { Clock, DollarSign, User, Calendar, CheckCircle, AlertTriangle, MapPin } from 'lucide-react';

interface WorkTicketData {
  id: string;
  ticketNumber: string;
  title: string;
  contractNumber: string;
  propertyName: string;
  status: 'Scheduled' | 'Ready_To_Start' | 'In_Progress' | 'Completed' | 'On_Hold' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  scheduledDate?: string;
  estimatedHours: number;
  actualHours: number;
  estimatedCost: number;
  actualCost: number;
  assignedCrew?: string;
  percentComplete: number;
  serviceCategory: string;
}

interface WorkTicketCardAspireProps {
  ticket: WorkTicketData;
  onClick?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  showContractContext?: boolean;
}

const WorkTicketCardAspire: React.FC<WorkTicketCardAspireProps> = ({
  ticket,
  onClick,
  onStart,
  onComplete,
  showContractContext = true
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return '#3B82F6';
      case 'Ready_To_Start': return '#10B981';
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
      case 'Completed': return <CheckCircle className="h-3 w-3" />;
      case 'On_Hold': case 'Cancelled': return <AlertTriangle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const canStart = ticket.status === 'Scheduled' || ticket.status === 'Ready_To_Start';
  const canComplete = ticket.status === 'In_Progress';
  const isCompleted = ticket.status === 'Completed';

  return (
    <div 
      className="bg-white rounded-md border border-slate-300 p-3 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {/* Status bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: getStatusColor(ticket.status) }}
      />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-400 font-mono">
              {ticket.ticketNumber}
            </span>
            {showContractContext && (
              <span className="text-xs text-slate-500">
                {ticket.contractNumber}
              </span>
            )}
            <div 
              className="px-1.5 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: `${getPriorityColor(ticket.priority)}20`,
                color: getPriorityColor(ticket.priority)
              }}
            >
              {ticket.priority}
            </div>
          </div>
          <h4 className="text-sm font-semibold text-slate-900 truncate">
            {ticket.title}
          </h4>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <MapPin className="h-3 w-3" />
            {ticket.propertyName}
          </div>
        </div>
        
        <div 
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
          style={{ 
            backgroundColor: `${getStatusColor(ticket.status)}20`,
            color: getStatusColor(ticket.status)
          }}
        >
          {getStatusIcon(ticket.status)}
          {ticket.status.replace('_', ' ')}
        </div>
      </div>

      {/* Service category badge */}
      <div className="mb-2">
        <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded">
          {ticket.serviceCategory}
        </span>
      </div>

      {/* Progress bar (if in progress) */}
      {ticket.status === 'In_Progress' && (
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-600">Progress</span>
            <span className="text-xs font-medium text-slate-900">
              {ticket.percentComplete}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${ticket.percentComplete}%`,
                backgroundColor: getStatusColor(ticket.status)
              }}
            />
          </div>
        </div>
      )}

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div className="flex items-center gap-1 text-slate-600">
          <Clock className="h-3 w-3" />
          <span>
            {ticket.actualHours > 0 ? ticket.actualHours : ticket.estimatedHours}h
            {ticket.actualHours > 0 && ` / ${ticket.estimatedHours}h`}
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-600">
          <DollarSign className="h-3 w-3" />
          <span>
            ${ticket.actualCost > 0 
              ? ticket.actualCost.toLocaleString() 
              : ticket.estimatedCost.toLocaleString()
            }
          </span>
        </div>
        {ticket.scheduledDate && (
          <div className="flex items-center gap-1 text-slate-600">
            <Calendar className="h-3 w-3" />
            <span>{new Date(ticket.scheduledDate).toLocaleDateString()}</span>
          </div>
        )}
        {ticket.assignedCrew && (
          <div className="flex items-center gap-1 text-slate-600">
            <User className="h-3 w-3" />
            <span className="truncate">{ticket.assignedCrew}</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-1 pt-2 border-t border-slate-200">
        {canStart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStart?.();
            }}
            className="flex-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded hover:bg-green-100 transition-colors"
          >
            Start Work
          </button>
        )}
        {canComplete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete?.();
            }}
            className="flex-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
          >
            Complete
          </button>
        )}
        {isCompleted && (
          <div className="flex-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded text-center">
            ✓ Completed
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle view details
          }}
          className="px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default WorkTicketCardAspire;