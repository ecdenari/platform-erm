import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";

export interface PageTab {
  label: string;
  to: string;
  end?: boolean;
  icon?: LucideIcon;
}

interface PageTabsProps {
  tabs: PageTab[];
  colorScheme?: 'red' | 'green';
}

export default function PageTabs({ tabs, colorScheme = 'red' }: PageTabsProps) {
  const colors = {
    red: {
      active: "text-red-600 border-red-600 bg-red-50/50",
      inactive: "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
    },
    green: {
      active: "text-green-600 border-green-600 bg-green-50/50",
      inactive: "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
    }
  };

  return (
    <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 font-medium border-b-2 rounded-t-lg transition-all ${
              isActive
                ? colors[colorScheme].active
                : colors[colorScheme].inactive + " border-transparent"
            }`
          }
        >
          {tab.icon && <tab.icon className="w-4 h-4" />}
          <span className="whitespace-nowrap">{tab.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
