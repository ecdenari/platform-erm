import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, CheckCircle, Target, BarChart3 } from 'lucide-react';

interface CostVariance {
  category: string;
  estimated: number;
  actual: number;
  variance: number;
  variancePercentage: number;
}

interface WorkTicketCost {
  ticketNumber: string;
  title: string;
  status: 'Scheduled' | 'In_Progress' | 'Completed';
  estimatedCost: number;
  actualCost: number;
  estimatedHours: number;
  actualHours: number;
  variance: number;
  variancePercentage: number;
}

interface ContractSummary {
  contractNumber: string;
  propertyName: string;
  estimatedTotal: number;
  actualTotal: number;
  variance: number;
  variancePercentage: number;
  percentComplete: number;
  workTickets: WorkTicketCost[];
  costBreakdown: CostVariance[];
}

interface CostTrackingDashboardAspireProps {
  contract: ContractSummary;
  onDrillDown?: (ticketId: string) => void;
}

/**
 * Cost Tracking Dashboard - Aspire professional pattern
 * Comprehensive cost analysis from work tickets rolling up to contract level
 * 
 * Design References:
 * - Aspire: detailed cost breakdown and variance analysis
 * - Professional business intelligence presentation
 * - Commercial client transparency and accountability
 * 
 * Key Features:
 * - Multi-level cost rollup (Items → Tickets → Contract)
 * - Real-time variance tracking
 * - Profitability analysis
 * - Performance indicators
 */
const CostTrackingDashboardAspire: React.FC<CostTrackingDashboardAspireProps> = ({
  contract,
  onDrillDown
}) => {
  const [selectedView, setSelectedView] = useState<'summary' | 'tickets' | 'categories'>('summary');

  const getVarianceColor = (variancePercentage: number) => {
    if (variancePercentage <= -10) return 'text-red-600';
    if (variancePercentage <= -5) return 'text-orange-600';
    if (variancePercentage <= 5) return 'text-green-600';
    if (variancePercentage <= 10) return 'text-orange-600';
    return 'text-red-600';
  };

  const getVarianceBgColor = (variancePercentage: number) => {
    if (variancePercentage <= -10) return 'bg-red-50 border-red-200';
    if (variancePercentage <= -5) return 'bg-orange-50 border-orange-200';
    if (variancePercentage <= 5) return 'bg-green-50 border-green-200';
    if (variancePercentage <= 10) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const getVarianceIcon = (variancePercentage: number) => {
    if (variancePercentage > 0) return <TrendingUp className="h-4 w-4" />;
    if (variancePercentage < 0) return <TrendingDown className="h-4 w-4" />;
    return <Target className="h-4 w-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const completedTickets = contract.workTickets.filter(t => t.status === 'Completed');
  const inProgressTickets = contract.workTickets.filter(t => t.status === 'In_Progress');
  const scheduledTickets = contract.workTickets.filter(t => t.status === 'Scheduled');

  return (
    <div className="bg-white rounded-md border border-slate-300">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Cost Tracking Dashboard</h2>
            <p className="text-sm text-slate-600">
              Contract {contract.contractNumber} - {contract.propertyName}
            </p>
          </div>
          <div className="flex gap-1 bg-slate-100 rounded-md p-1">
            <button
              onClick={() => setSelectedView('summary')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                selectedView === 'summary' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setSelectedView('tickets')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                selectedView === 'tickets' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Work Tickets
            </button>
            <button
              onClick={() => setSelectedView('categories')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                selectedView === 'categories' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Categories
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Contract Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Contract Value</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(contract.estimatedTotal)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-slate-400" />
            </div>
          </div>

          <div className="bg-slate-50 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Actual Cost</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(contract.actualTotal)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-slate-400" />
            </div>
          </div>

          <div className={`rounded-md p-4 border ${getVarianceBgColor(contract.variancePercentage)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Variance</p>
                <p className={`text-2xl font-bold ${getVarianceColor(contract.variancePercentage)}`}>
                  {formatCurrency(Math.abs(contract.variance))}
                </p>
                <p className={`text-xs ${getVarianceColor(contract.variancePercentage)}`}>
                  {contract.variance > 0 ? 'Over' : 'Under'} Budget ({Math.abs(contract.variancePercentage).toFixed(1)}%)
                </p>
              </div>
              <div className={getVarianceColor(contract.variancePercentage)}>
                {getVarianceIcon(contract.variancePercentage)}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Progress</p>
                <p className="text-2xl font-bold text-slate-900">
                  {contract.percentComplete}%
                </p>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${contract.percentComplete}%` }}
                  />
                </div>
              </div>
              <Target className="h-8 w-8 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Summary View */}
        {selectedView === 'summary' && (
          <div className="space-y-6">
            {/* Work Ticket Status Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-sm text-green-800">Completed Tickets</p>
                    <p className="text-xl font-bold text-green-900">{completedTickets.length}</p>
                    <p className="text-xs text-green-700">
                      {formatCurrency(completedTickets.reduce((sum, t) => sum + t.actualCost, 0))} actual cost
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-800">In Progress</p>
                    <p className="text-xl font-bold text-blue-900">{inProgressTickets.length}</p>
                    <p className="text-xs text-blue-700">
                      {formatCurrency(inProgressTickets.reduce((sum, t) => sum + t.actualCost, 0))} actual cost
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-slate-600" />
                  <div>
                    <p className="text-sm text-slate-700">Scheduled</p>
                    <p className="text-xl font-bold text-slate-900">{scheduledTickets.length}</p>
                    <p className="text-xs text-slate-600">
                      {formatCurrency(scheduledTickets.reduce((sum, t) => sum + t.estimatedCost, 0))} estimated cost
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Variances */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Significant Variances</h3>
              <div className="space-y-2">
                {contract.workTickets
                  .filter(ticket => Math.abs(ticket.variancePercentage) > 10)
                  .sort((a, b) => Math.abs(b.variancePercentage) - Math.abs(a.variancePercentage))
                  .slice(0, 5)
                  .map((ticket) => (
                    <div 
                      key={ticket.ticketNumber}
                      className={`p-3 rounded-md border ${getVarianceBgColor(ticket.variancePercentage)} cursor-pointer hover:shadow-sm transition-shadow`}
                      onClick={() => onDrillDown?.(ticket.ticketNumber)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-slate-900">{ticket.ticketNumber}</div>
                          <div className="text-sm text-slate-600">{ticket.title}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${getVarianceColor(ticket.variancePercentage)}`}>
                            {ticket.variance > 0 ? '+' : ''}{formatCurrency(ticket.variance)}
                          </div>
                          <div className={`text-sm ${getVarianceColor(ticket.variancePercentage)}`}>
                            {ticket.variancePercentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Work Tickets View */}
        {selectedView === 'tickets' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase">
                    Ticket
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-700 uppercase">
                    Estimated
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-700 uppercase">
                    Actual
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-700 uppercase">
                    Variance
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-700 uppercase">
                    Hours
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {contract.workTickets.map((ticket) => (
                  <tr 
                    key={ticket.ticketNumber}
                    className="hover:bg-slate-50 cursor-pointer"
                    onClick={() => onDrillDown?.(ticket.ticketNumber)}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-slate-900">{ticket.ticketNumber}</div>
                        <div className="text-sm text-slate-600 truncate max-w-xs">{ticket.title}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ticket.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'In_Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-900">
                      {formatCurrency(ticket.estimatedCost)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-900">
                      {ticket.actualCost > 0 ? formatCurrency(ticket.actualCost) : '-'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {ticket.actualCost > 0 ? (
                        <div className={`text-sm font-medium ${getVarianceColor(ticket.variancePercentage)}`}>
                          {ticket.variance > 0 ? '+' : ''}{formatCurrency(ticket.variance)}
                          <div className="text-xs">
                            ({ticket.variancePercentage.toFixed(1)}%)
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-900">
                      <div>
                        {ticket.actualHours > 0 ? ticket.actualHours.toFixed(1) : ticket.estimatedHours.toFixed(1)}h
                      </div>
                      {ticket.actualHours > 0 && (
                        <div className="text-xs text-slate-500">
                          est. {ticket.estimatedHours.toFixed(1)}h
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Categories View */}
        {selectedView === 'categories' && (
          <div className="space-y-4">
            {contract.costBreakdown.map((category) => (
              <div key={category.category} className="bg-slate-50 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-slate-900">{category.category}</h4>
                  <div className={`text-sm font-medium ${getVarianceColor(category.variancePercentage)}`}>
                    {category.variance > 0 ? '+' : ''}{formatCurrency(category.variance)} 
                    ({category.variancePercentage.toFixed(1)}%)
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Estimated</p>
                    <p className="font-medium text-slate-900">{formatCurrency(category.estimated)}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Actual</p>
                    <p className="font-medium text-slate-900">{formatCurrency(category.actual)}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Variance</p>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          category.variance > 0 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ 
                          width: `${Math.min(Math.abs(category.variancePercentage), 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CostTrackingDashboardAspire;