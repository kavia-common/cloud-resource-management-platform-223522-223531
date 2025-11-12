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

  // PUBLIC_INTERFACE
  /**
   * Apply realtime inserted notifications (prepend).
   * @param {Array<any>} rows
   */
  onRealtimeInsert: (rows = []) => {
    if (!Array.isArray(rows) || rows.length === 0) return;
    const { items } = get();
    const map = new Map();
    [...rows, ...items].forEach((n) => map.set(n.id, n));
    const next = Array.from(map.values());
    set({ items: next, unreadCount: next.filter((n) => !n.read).length });
  },

  // PUBLIC_INTERFACE
  /**
   * Apply realtime update for a single notification.
   * @param {any} row
   */
  onRealtimeUpdate: (row) => {
    if (!row || typeof row.id === 'undefined') return;
    const updated = get().items.map((n) => (n.id === row.id ? { ...n, ...row } : n));
    set({ items: updated, unreadCount: updated.filter((n) => !n.read).length });
  },

  // PUBLIC_INTERFACE
  /**
   * Apply realtime delete for a single notification.
   * @param {any} row
   */
  onRealtimeDelete: (row) => {
    if (!row || typeof row.id === 'undefined') return;
    const next = get().items.filter((n) => n.id !== row.id);
    set({ items: next, unreadCount: next.filter((n) => !n.read).length });
  },
}));
