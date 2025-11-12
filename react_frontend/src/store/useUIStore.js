import { create } from 'zustand';

/**
 * PUBLIC_INTERFACE
 * UI store to manage global UI state such as theme, sidebar collapse, toasts, and loading banners.
 */
export const useUIStore = create((set) => ({
  theme: 'light',
  sidebarCollapsed: false,
  globalLoading: false,
  banner: null, // { type: 'info' | 'error' | 'success', message: string }

  // PUBLIC_INTERFACE
  setTheme: (theme) => set({ theme }),
  // PUBLIC_INTERFACE
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  // PUBLIC_INTERFACE
  setGlobalLoading: (v) => set({ globalLoading: Boolean(v) }),
  // PUBLIC_INTERFACE
  showBanner: (type, message) => set({ banner: { type, message } }),
  // PUBLIC_INTERFACE
  clearBanner: () => set({ banner: null }),
}));
