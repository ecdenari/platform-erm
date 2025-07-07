import React from 'react';

interface TabDefinition {
  id: string;
  label: string;
  count?: number;
}

interface ContractTabsAspireProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  contractNumber: string;
  tabs: TabDefinition[];
}

/**
 * Contract detail tabs following Aspire professional pattern
 * Shows different views of the SAME contract entity
 * 
 * Design References:
 * - Aspire: professional business tabs with entity context
 * - Clean typography hierarchy  
 * - Commercial client appropriate styling
 * 
 * Navigation Hierarchy: Primary Sidebar → SubNav → Page Tabs (this component)
 * Critical: These tabs show different views of the SAME contract, not different entities
 */
const ContractTabsAspire: React.FC<ContractTabsAspireProps> = ({
  activeTab,
  onTabChange,
  contractNumber,
  tabs
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <nav className="flex space-x-6 px-6 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center py-4 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab.id
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }
            `}
          >
            <span className="mr-2 text-xs text-slate-400 font-mono">
              {contractNumber}
            </span>
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ContractTabsAspire;