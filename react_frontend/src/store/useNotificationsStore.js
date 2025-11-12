import { create } from 'zustand';
import { notificationsService } from '../services/notificationsService';
import { logger } from '../utils/logger';

/**
 * PUBLIC_INTERFACE
 * Notifications store: lightweight list holder with load and mark-read actions.
 */
export const useNotificationsStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,
  unreadCount: 0,

  // PUBLIC_INTERFACE
  load: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await notificationsService.list();
      const unread = (data || []).filter((n) => !n.read).length;
      set({ items: data, unreadCount: unread, loading: false });
    } catch (e) {
      set({ loading: false, error: e });
      logger.error('Failed to load notifications', { error: String(e?.message || e) });
    }
  },

  // PUBLIC_INTERFACE
  markRead: async (id) => {
    try {
      await notificationsService.markRead(id);
      const updated = get().items.map((n) => (n.id === id ? { ...n, read: true } : n));
      set({ items: updated, unreadCount: updated.filter((n) => !n.read).length });
    } catch (e) {
      logger.warn('Failed to mark notification as read', { id, error: String(e?.message || e) });
    }
  },
}));
