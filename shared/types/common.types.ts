/**
 * Common types shared between frontend and backend
 * These types should match the C# enums and DTOs in the backend
 */

// Enums that match backend C# enums
export enum PropertyType {
  Residential = 'Residential',
  Commercial = 'Commercial',
  Municipal = 'Municipal',
  HOA = 'HOA',
  Industrial = 'Industrial'
}

export enum PropertyStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Archived = 'Archived'
}

export enum ContactType {
  Primary = 'Primary',
  Billing = 'Billing',
  PropertyManager = 'PropertyManager',
  Tenant = 'Tenant',
  Maintenance = 'Maintenance',
  Emergency = 'Emergency'
}

export enum WorkOrderStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  OnHold = 'OnHold'
}

export enum ServiceType {
  Mowing = 'Mowing',
  Trimming = 'Trimming',
  LeafRemoval = 'LeafRemoval',
  SnowRemoval = 'SnowRemoval',
  Fertilization = 'Fertilization',
  PestControl = 'PestControl',
  Irrigation = 'Irrigation',
  Landscaping = 'Landscaping',
  HardscapeInstall = 'HardscapeInstall',
  TreeCare = 'TreeCare'
}

// Common interfaces used across the system
export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
}

export interface PhoneNumber {
  number: string;
  type: 'Mobile' | 'Office' | 'Home' | 'Fax';
  isPrimary: boolean;
}

export interface DateRange {
  startDate: string | Date;
  endDate: string | Date;
}

export interface Money {
  amount: number;
  currency: 'USD' | 'CAD';
}

export interface AuditFields {
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}

// Base interfaces that all entities should implement
export interface BaseEntity extends AuditFields {
  id: number;
  tenantId: string;
}

export interface SoftDeletable {
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

// Pagination interfaces
export interface PageRequest {
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PageResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

// Multi-tenant context
export interface TenantContext {
  tenantId: string;
  tenantName: string;
  features: string[];
  subscription: {
    plan: 'Basic' | 'Professional' | 'Enterprise';
    expiresAt: string;
  };
}

// File upload
export interface FileMetadata {
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  url?: string;
  thumbnailUrl?: string;
}

// Validation rules (matches backend validation)
export const ValidationRules = {
  phoneNumber: /^\+?1?\d{10,14}$/,
  postalCode: /^\d{5}(-\d{4})?$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  
  // Field lengths matching backend
  maxNameLength: 100,
  maxDescriptionLength: 500,
  maxNotesLength: 2000,
  maxAddressLength: 200,
  maxPhoneLength: 20,
  maxEmailLength: 254
} as const;

// Feature flags
export interface FeatureFlags {
  enableMobileApp: boolean;
  enableAdvancedReporting: boolean;
  enableJobCosting: boolean;
  enableInventoryManagement: boolean;
  enableCrewManagement: boolean;
  enableCustomerPortal: boolean;
  enableOfflineMode: boolean;
}

// Export all types for easy importing
export type * from './property.types';
export type * from './contact.types';
export type * from './workorder.types';