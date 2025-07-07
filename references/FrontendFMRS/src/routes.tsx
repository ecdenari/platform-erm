import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import AppLayoutWithDualSidebar from "@/layout/AppLayoutWithDualSidebar";
import AuthLayout from "@/layout/AuthLayout";
import LoginPage from "@/auth/LoginPage";
import Dashboard from "@/modules/dashboard";
import Properties from "@/modules/properties";

// Dashboard Module
import DashboardLayout from "@/modules/dashboard/layout";
import DashboardPage from "@/modules/dashboard/index";

// Site Management Module
import SiteManagementLayout from "@/modules/site-management/layout";
import SiteManagementOverview from "@/modules/site-management/pages/overview";
import SiteManagementProperties from "@/modules/site-management/pages/properties";
import SiteReports from "@/modules/site-management/pages/site-reports";
import CustomerReports from "@/modules/site-management/pages/customer-reports";

// Property Detail Module (shared across modules)
import PropertyDetailLayout from "@/modules/properties/PropertyDetailLayout";
import PropertyOverview from "@/modules/properties/tabs/PropertyOverview";
import PropertySiteReports from "@/modules/properties/tabs/PropertySiteReports";
import PropertyCustomerReports from "@/modules/properties/tabs/PropertyCustomerReports";
import PropertyReportSchedule from "@/modules/properties/tabs/PropertyReportSchedule";
import FillSiteReport from "@/modules/properties/pages/fill-site-report";

// Irrigation Module
import IrrigationLayout from "@/modules/irrigation/layout";
import IrrigationOverview from "@/modules/irrigation/pages/overview";
import Controllers from "@/modules/irrigation/pages/controllers";
import PropertiesPage from "@/modules/irrigation/pages/properties";
import Inspection from "@/modules/irrigation/pages/inspection";
import Reports from "@/modules/irrigation/pages/reports";

// Admin Module
import AdminLayout from "@/modules/admin/layout";
import AdminDashboard from "@/modules/admin/pages/index";
import UserManagement from "@/modules/admin/pages/users";
import RoleManagement from "@/modules/admin/pages/roles";
import CompanySettings from "@/modules/admin/pages/company-settings";
import IrrigationAdmin from "@/modules/admin/pages/irrigation-settings";
import SiteManagementAdmin from "@/modules/admin/pages/site-management-settings";

// Site Management Admin Pages
import SiteManagementOverviewAdmin from "@/modules/admin/pages/site-management/index";
import TemplateManagement from "@/modules/admin/pages/site-management/templates";
import TemplateBuilder from "@/modules/admin/pages/site-management/template-builder";

// Profile Module
import ProfileLayout from "@/modules/profile/layout";
import PersonalInformationPage from "@/modules/profile/pages/index";
import SecurityPage from "@/modules/profile/pages/security";
import PreferencesPage from "@/modules/profile/pages/preferences";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ path: "", element: <LoginPage /> }],
  },
  {
    path: "/",
    element: <AppLayoutWithDualSidebar />,
    children: [
      // Default route - redirect to dashboard
      { index: true, element: <Dashboard /> },
      
      // ✅ Dashboard
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [{ index: true, element: <DashboardPage /> }],
      },

      // ✅ Site Management
      {
        path: "site-management",
        element: <SiteManagementLayout />,
        children: [
          { index: true, element: <SiteManagementOverview /> },
          { path: "properties", element: <SiteManagementProperties /> },
          {
            path: "properties/:id",
            element: <PropertyDetailLayout />,
            children: [
              { index: true, element: <PropertyOverview /> },
              { path: "site-reports", element: <PropertySiteReports /> },
              { path: "customer-reports", element: <PropertyCustomerReports /> },
              { path: "schedule", element: <PropertyReportSchedule /> },
            ],
          },
          { path: "properties/:id/site-reports/create/:templateId?", element: <FillSiteReport /> },
          { path: "site-reports", element: <SiteReports /> },
          { path: "customer-reports", element: <CustomerReports /> },
        ],
      },

      // ✅ Irrigation
      {
        path: "irrigation",
        element: <IrrigationLayout />,
        children: [
          { index: true, element: <IrrigationOverview /> },
          { path: "controllers", element: <Controllers /> },
          { path: "properties", element: <PropertiesPage /> },
          { path: "inspection", element: <Inspection /> },
          { path: "reports", element: <Reports /> },
        ],
      },

      // ✅ Admin
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "users", element: <UserManagement /> },
          { path: "roles", element: <RoleManagement /> },
          { path: "company-settings", element: <CompanySettings /> },
          { path: "irrigation", element: <IrrigationAdmin /> },
          
          // Site Management Admin
          { path: "site-management", element: <SiteManagementOverviewAdmin /> },
          { path: "site-management/templates", element: <TemplateManagement /> },
          { path: "site-management/templates/new", element: <TemplateBuilder /> },
          { path: "site-management/templates/:id", element: <TemplateBuilder /> },
          { path: "site-management/templates/:id/edit", element: <TemplateBuilder /> },
        ],
      },

      // ✅ Profile
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <PersonalInformationPage /> },
          { path: "security", element: <SecurityPage /> },
          { path: "preferences", element: <PreferencesPage /> },
        ],
      },
    ],
  },
]);

export default router;
