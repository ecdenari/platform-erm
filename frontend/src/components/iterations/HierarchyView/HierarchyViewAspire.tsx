import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MapPin, FileText, CheckCircle, Clock, DollarSign } from 'lucide-react';

interface WorkTicket {
  id: string;
  ticketNumber: string;
  title: string;
  status: 'Scheduled' | 'In_Progress' | 'Completed' | 'On_Hold';
  estimatedCost: number;
  actualCost: number;
  percentComplete: number;
}

interface Contract {
  id: string;
  contractNumber: string;
  propertyName: string;
  clientName: string;
  status: 'Active' | 'In_Progress' | 'Completed';
  contractValue: number;
  workTickets: WorkTicket[];
}

interface Opportunity {
  id: string;
  name: string;
  propertyName: string;
  stage: 'Lead' | 'Proposal' | 'Negotiation' | 'Closed_Won';
  estimatedValue: number;
  contracts: Contract[];
}

interface Property {
  id: string;
  name: string;
  address: string;
  clientName: string;
  opportunities: Opportunity[];
}

interface HierarchyViewAspireProps {
  property: Property;
  expandedItems?: Set<string>;
  onToggleExpand?: (id: string) => void;
  onSelectItem?: (type: 'property' | 'opportunity' | 'contract' | 'ticket', id: string) => void;
}

const HierarchyViewAspire: React.FC<HierarchyViewAspireProps> = ({
  property,
  expandedItems = new Set(),
  onToggleExpand,
  onSelectItem
}) => {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set(['property']));
  
  const expanded = expandedItems.size > 0 ? expandedItems : internalExpanded;
  const toggleExpand = onToggleExpand || ((id: string) => {
    const newExpanded = new Set(internalExpanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setInternalExpanded(newExpanded);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': case 'Closed_Won': return '#10B981';
      case 'In_Progress': case 'Active': return '#F59E0B';
      case 'Scheduled': case 'Lead': return '#3B82F6';
      case 'On_Hold': case 'Proposal': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': case 'Closed_Won': return <CheckCircle className="h-3 w-3" />;
      case 'In_Progress': case 'Active': return <Clock className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="bg-white rounded-md border border-slate-300 p-4">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Project Hierarchy
      </h3>

      {/* Property Level */}
      <div className="space-y-2">
        <div 
          className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
          onClick={() => onSelectItem?.('property', property.id)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand('property');
            }}
            className="p-0.5 hover:bg-slate-200 rounded"
          >
            {expanded.has('property') ? 
              <ChevronDown className="h-4 w-4 text-slate-600" /> : 
              <ChevronRight className="h-4 w-4 text-slate-600" />
            }
          </button>
          <MapPin className="h-4 w-4 text-slate-600" />
          <div className="flex-1">
            <div className="font-medium text-slate-900">{property.name}</div>
            <div className="text-sm text-slate-600">{property.address}</div>
            <div className="text-xs text-slate-500">{property.clientName}</div>
          </div>
          <div className="text-xs text-slate-500">
            {property.opportunities.length} opportunities
          </div>
        </div>

        {/* Opportunities Level */}
        {expanded.has('property') && (
          <div className="ml-6 space-y-2">
            {property.opportunities.map((opportunity) => (
              <div key={opportunity.id}>
                <div 
                  className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                  onClick={() => onSelectItem?.('opportunity', opportunity.id)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(`opp-${opportunity.id}`);
                    }}
                    className="p-0.5 hover:bg-slate-200 rounded"
                  >
                    {expanded.has(`opp-${opportunity.id}`) ? 
                      <ChevronDown className="h-4 w-4 text-slate-600" /> : 
                      <ChevronRight className="h-4 w-4 text-slate-600" />
                    }
                  </button>
                  <FileText className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{opportunity.name}</div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `${getStatusColor(opportunity.stage)}20`,
                          color: getStatusColor(opportunity.stage)
                        }}
                      >
                        {getStatusIcon(opportunity.stage)}
                        {opportunity.stage.replace('_', ' ')}
                      </div>
                      <span className="text-xs text-slate-600">
                        ${opportunity.estimatedValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {opportunity.contracts.length} contracts
                  </div>
                </div>

                {/* Contracts Level */}
                {expanded.has(`opp-${opportunity.id}`) && (
                  <div className="ml-6 space-y-2">
                    {opportunity.contracts.map((contract) => (
                      <div key={contract.id}>
                        <div 
                          className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                          onClick={() => onSelectItem?.('contract', contract.id)}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(`contract-${contract.id}`);
                            }}
                            className="p-0.5 hover:bg-slate-200 rounded"
                          >
                            {expanded.has(`contract-${contract.id}`) ? 
                              <ChevronDown className="h-4 w-4 text-slate-600" /> : 
                              <ChevronRight className="h-4 w-4 text-slate-600" />
                            }
                          </button>
                          <div 
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: getStatusColor(contract.status) }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400 font-mono">
                                {contract.contractNumber}
                              </span>
                              <span className="font-medium text-slate-900">
                                {contract.propertyName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
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
                              <span className="text-xs text-slate-600 flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                ${contract.contractValue.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">
                            {contract.workTickets.length} tickets
                          </div>
                        </div>

                        {/* Work Tickets Level */}
                        {expanded.has(`contract-${contract.id}`) && (
                          <div className="ml-6 space-y-1">
                            {contract.workTickets.map((ticket) => (
                              <div 
                                key={ticket.id}
                                className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                                onClick={() => onSelectItem?.('ticket', ticket.id)}
                              >
                                <div className="w-2" /> {/* Spacer for alignment */}
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: getStatusColor(ticket.status) }}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400 font-mono">
                                      {ticket.ticketNumber}
                                    </span>
                                    <span className="text-sm font-medium text-slate-900">
                                      {ticket.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium"
                                      style={{ 
                                        backgroundColor: `${getStatusColor(ticket.status)}20`,
                                        color: getStatusColor(ticket.status)
                                      }}
                                    >
                                      {ticket.status.replace('_', ' ')}
                                    </div>
                                    <span className="text-xs text-slate-600">
                                      ${ticket.actualCost > 0 
                                        ? ticket.actualCost.toLocaleString() 
                                        : ticket.estimatedCost.toLocaleString()
                                      }
                                    </span>
                                    {ticket.status === 'In_Progress' && (
                                      <span className="text-xs text-slate-600">
                                        {ticket.percentComplete}% complete
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HierarchyViewAspire;