/// Notifications service
/// PUBLIC_INTERFACE
import { supabase } from '../lib/supabaseClient';
import { logger } from '../utils/logger';

// PUBLIC_INTERFACE
export const notificationsService = {
  /**
   * List latest notifications for current user.
   */
  async list() {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return { data: data || [] };
    } catch (e) {
      logger.warn('notificationsService.list fallback to mock', { error: String(e?.message || e) });
      return {
        data: [
          { id: 1, title: 'Welcome', desc: 'Thanks for trying the app', read: false, created_at: new Date().toISOString() },
          { id: 2, title: 'Reminder', desc: 'Remember to set up billing', read: true, created_at: new Date().toISOString() },
        ],
      };
    }
  },

  /**
   * Mark a notification as read
   */
  async markRead(id) {
    try {
      const { error } = await supabase.from('notifications').update({ read: true }).eq('id', id);
      if (error) throw error;
      return { ok: true };
    } catch (e) {
      logger.warn('notificationsService.markRead failed', { error: String(e?.message || e), id });
      // soft fail
      return { ok: false };
    }
  },
};
