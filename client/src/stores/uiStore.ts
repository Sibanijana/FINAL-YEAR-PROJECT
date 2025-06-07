
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  currentTheme: 'light' | 'dark';
  notifications: Notification[];
  isNewRoutineFormOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setNewRoutineFormOpen: (open: boolean) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      currentTheme: 'light',
      notifications: [],
      isNewRoutineFormOpen: false,

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      setTheme: (theme) => {
        set({ currentTheme: theme });
        
        // Apply theme to document immediately
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      },

      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: crypto.randomUUID(),
        };
        
        set((state) => ({
          notifications: [...state.notifications, notification],
        }));

        // Auto remove notification after duration
        if (notification.duration) {
          setTimeout(() => {
            get().removeNotification(notification.id);
          }, notification.duration);
        }
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      setNewRoutineFormOpen: (open) => {
        set({ isNewRoutineFormOpen: open });
      },
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
