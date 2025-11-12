/// Monitoring service
/// PUBLIC_INTERFACE
import { supabase } from '../lib/supabaseClient';
import { logger } from '../utils/logger';

// PUBLIC_INTERFACE
export const monitoringService = {
  /** Fetch metrics (placeholder) */
  async metrics() {
    try {
      const { data, error } = await supabase.from('metrics').select('*').order('timestamp', { ascending: false }).limit(100);
      if (error) throw error;
      return data || [];
    } catch (e) {
      logger.warn('monitoringService.metrics fallback', { error: String(e?.message || e) });
      return [];
    }
  },
  /** Fetch recent alerts (placeholder) */
  async alerts() {
    try {
      const { data, error } = await supabase.from('alerts').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) throw error;
      return data || [];
    } catch (e) {
      logger.warn('monitoringService.alerts fallback', { error: String(e?.message || e) });
      return [];
    }
  },
};
