import { create } from 'zustand';
import { resourcesService } from '../services/resourcesService';
import { logger } from '../utils/logger';

/**
 * PUBLIC_INTERFACE
 * Resources store: tracks collection, pagination, filters and loading/error states.
 */
export const useResourcesStore = create((set, get) => ({
  items: [],
  total: 0,
  page: 1,
  pageSize: 10,
  query: '',
  provider: 'all',
  loading: false,
  error: null,

  // PUBLIC_INTERFACE
  setQuery: (q) => set({ query: q, page: 1 }),
  // PUBLIC_INTERFACE
  setProvider: (p) => set({ provider: p, page: 1 }),
  // PUBLIC_INTERFACE
  setPage: (p) => set({ page: p }),
  // PUBLIC_INTERFACE
  setPageSize: (ps) => set({ pageSize: ps, page: 1 }),

  // PUBLIC_INTERFACE
  /**
   * Fetch list from resourcesService with current pagination and filters.
   */
  fetchList: async (overrides = {}) => {
    const { page, pageSize, query, provider } = { ...get(), ...overrides };
    set({ loading: true, error: null });
    try {
      const { data, total } = await resourcesService.list({
        page,
        pageSize,
        query,
        provider: provider === 'all' ? undefined : provider,
      });
      set({ items: data, total, loading: false, page, pageSize, query, provider });
      logger.debug('Resources fetched', { count: data?.length ?? 0, total });
    } catch (err) {
      set({ error: err, loading: false });
      logger.error('Failed to fetch resources', { error: String(err?.message || err) });
    }
  },

  // PUBLIC_INTERFACE
  /**
   * Merge newly inserted resources at the top of list (if within current filter context).
   * @param {Array<any>} rows
   */
  onRealtimeInsert: (rows = []) => {
    if (!Array.isArray(rows) || rows.length === 0) return;
    const { items, provider } = get();
    const filtered = rows.filter((r) => (provider === 'all' ? true : r.provider === provider));
    if (!filtered.length) return;
    // Prepend and ensure uniqueness by id
    const map = new Map();
    [...filtered, ...items].forEach((r) => map.set(r.id, r));
    set({ items: Array.from(map.values()), total: get().total + filtered.length });
  },

  // PUBLIC_INTERFACE
  /**
   * Update an existing resource in place if visible in current page/filter.
   * @param {any} row
   */
  onRealtimeUpdate: (row) => {
    if (!row || typeof row.id === 'undefined') return;
    const { items, provider } = get();
    if (provider !== 'all' && row.provider !== provider) return;
    const updated = items.map((r) => (r.id === row.id ? { ...r, ...row } : r));
    set({ items: updated });
  },

  // PUBLIC_INTERFACE
  /**
   * Remove deleted resource from current list if present.
   * @param {any} row
   */
  onRealtimeDelete: (row) => {
    if (!row || typeof row.id === 'undefined') return;
    const { items } = get();
    const next = items.filter((r) => r.id !== row.id);
    if (next.length !== items.length) {
      set({ items: next, total: Math.max(0, get().total - 1) });
    }
  },
}));
