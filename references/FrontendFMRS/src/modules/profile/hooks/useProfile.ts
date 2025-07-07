// Re-export profile-related hooks from centralized API hooks
export { 
  useUpdateProfile,
  useChangePassword,
  type UpdateProfilePayload,
  type ChangePasswordPayload
} from '@/hooks/api/useAuth'