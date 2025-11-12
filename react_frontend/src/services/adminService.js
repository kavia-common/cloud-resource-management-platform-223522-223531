/// Admin service
/// PUBLIC_INTERFACE
import { supabase } from '../lib/supabaseClient';
import { logger } from '../utils/logger';

// PUBLIC_INTERFACE
export const adminService = {
  /** List users (placeholder) */
  async listUsers() {
    try {
      const { data, error } = await supabase.from('users_view').select('*').limit(100);
      if (error) throw error;
      return data || [];
    } catch (e) {
      logger.warn('adminService.listUsers fallback', { error: String(e?.message || e) });
      return [{ id: 'mock-1', email: 'user@example.com', role: 'user', status: 'active' }];
    }
  },
  /** List audit logs (placeholder) */
  async auditLogs() {
    try {
      const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100);
      if (error) throw error;
      return data || [];
    } catch (e) {
      logger.warn('adminService.auditLogs fallback', { error: String(e?.message || e) });
      return [];
    }
  },
  /** Update user role (placeholder) */
  async setUserRole(userId, role) {
    try {
      const { error } = await supabase.from('user_roles').upsert({ user_id: userId, role });
      if (error) throw error;
      return { ok: true };
    } catch (e) {
      logger.warn('adminService.setUserRole failed', { userId, role, error: String(e?.message || e) });
      return { ok: false };
    }
  },
};
