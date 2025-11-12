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
}));
