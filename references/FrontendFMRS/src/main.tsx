import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";
import '@fontsource/inter';
import { SidebarProvider } from './context/SidebarContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const queryClient = new QueryClient();  

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);