/// Billing service
/// PUBLIC_INTERFACE
import { supabase } from '../lib/supabaseClient';
import { logger } from '../utils/logger';

// PUBLIC_INTERFACE
export const billingService = {
  /** Get monthly summary (placeholder) */
  async monthlySummary() {
    try {
      const { data, error } = await supabase.rpc('get_monthly_billing_summary'); // prefer function
      if (error) throw error;
      return data;
    } catch (e) {
      logger.warn('billingService.monthlySummary fallback', { error: String(e?.message || e) });
      return { current: null, projected: null, savings: null };
    }
  },
  /** List invoices (placeholder) */
  async invoices() {
    try {
      const { data, error } = await supabase.from('invoices').select('*').order('date', { ascending: false }).limit(20);
      if (error) throw error;
      return data || [];
    } catch (e) {
      logger.warn('billingService.invoices fallback', { error: String(e?.message || e) });
      return [];
    }
  },
};
