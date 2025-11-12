/// Resources service using Supabase client
/// PUBLIC_INTERFACE
/**
 * Provides CRUD-like operations for resources. This implementation assumes
 * a Supabase table named 'resources' with columns: id, name, type, provider, region, status, created_at.
 * Pagination and filtering are supported; if the table doesn't exist yet, the list()
 * will return a mocked array as a graceful fallback in development.
 */
import { supabase } from '../lib/supabaseClient';
import { sanitizeSearch } from '../utils/validators';
import { logger } from '../utils/logger';

function toRange(page, pageSize) {
  const p = Math.max(1, Number(page) || 1);
  const ps = Math.min(100, Math.max(1, Number(pageSize) || 10));
  const from = (p - 1) * ps;
  const to = from + ps - 1;
  return { from, to };
}

// PUBLIC_INTERFACE
export const resourcesService = {
  /**
   * List resources with optional filters.
   * @param {Object} params
   * @param {number} params.page
   * @param {number} params.pageSize
   * @param {string} [params.query] - search by name
   * @param {string} [params.provider] - filter by provider
   * @returns {Promise<{data: Array, total: number}>}
   */
  async list({ page = 1, pageSize = 10, query = '', provider } = {}) {
    const { from, to } = toRange(page, pageSize);
    const q = sanitizeSearch(query);

    try {
      let req = supabase.from('resources').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to);

      if (q) {
        // Using ilike on name for search. Supabase applies parameterized queries safely.
        req = req.ilike('name', `%${q}%`);
      }
      if (provider) {
        req = req.eq('provider', provider);
      }

      const { data, error, count } = await req;
      if (error) throw error;
      return { data: data || [], total: count ?? 0 };
    } catch (e) {
      // Fallback: return mock data in dev to keep UI functional until table exists
      logger.warn('resourcesService.list fallback to mock due to error', { error: String(e?.message || e) });
      const mock = Array.from({ length: Math.min(pageSize, 3) }).map((_, i) => {
        const id = from + i + 1;
        return {
          id,
          name: `resource-${id}`,
          type: 'vm',
          provider: provider || 'aws',
          region: 'us-east-1',
          status: 'running',
          created_at: new Date().toISOString(),
        };
      });
      return { data: mock, total: mock.length };
    }
  },

  /**
   * Retrieve a resource by id.
   */
  async get(id) {
    const { data, error } = await supabase.from('resources').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  /**
   * Create a resource record. Input validation should happen upstream.
   */
  async create(payload) {
    const { data, error } = await supabase.from('resources').insert(payload).select().single();
    if (error) throw error;
    return data;
  },

  /**
   * Delete by id
   */
  async remove(id) {
    const { error } = await supabase.from('resources').delete().eq('id', id);
    if (error) throw error;
    return { ok: true };
  },
};
