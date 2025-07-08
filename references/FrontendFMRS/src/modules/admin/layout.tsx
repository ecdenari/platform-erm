import { Outlet } from "react-router-dom";
import PageTabs from "@/components/PageTabs";
import { Shield, Users, UserCheck, Droplets, MapPin, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const adminTabs = [
  { label: "Dashboard", to: "/admin", end: true, icon: Shield },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Roles", to: "/admin/roles", icon: UserCheck },
  { label: "Irrigation", to: "/admin/irrigation", icon: Droplets },
  { label: "Site Management", to: "/admin/site-management", icon: MapPin },
  { label: "Company Settings", to: "/admin/company-settings", icon: Settings },
];

export default function AdminLayout() {
  const { user, isPlatformAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
                  <p className="text-sm text-slate-600">Platform administration and management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isPlatformAdmin() && (
                <div className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                  Platform Admin
                </div>
              )}
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-slate-500">{user?.role}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Tabs */}
        <div className="px-6">
          <PageTabs tabs={adminTabs} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <Outlet />
      </div>
    </div>
  );
}
