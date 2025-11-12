import React from 'react';
import { supabase } from '../lib/supabaseClient';
import { logger } from '../utils/logger';

/**
 * PUBLIC_INTERFACE
 * useRealtime: Generic hook to subscribe to Supabase realtime channels.
 * - Subscribes to database changes on specified tables and events.
 * - Executes provided callbacks for each event (insert, update, delete).
 * - Ensures cleanup on unmount.
 *
 * Security: No secrets are hardcoded. Supabase client uses env from src/config/env.js.
 *
 * @param {Array<{
 *   schema?: string,
 *   table: string,
 *   events?: Array<'INSERT'|'UPDATE'|'DELETE'|'*'>,
 *   filter?: string,
 *   handler: (payload: import('@supabase/supabase-js').RealtimePostgresChangesPayload<any>) => void
 * }>} subscriptions
 * @param {string} [channelName='app-realtime']
 * @returns {{ status: 'idle'|'subscribed'|'error', error: any }}
 */
export function useRealtime(subscriptions = [], channelName = 'app-realtime') {
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      setStatus('idle');
      return;
    }

    // Create a dedicated channel for this hook instance
    const channel = supabase.channel(channelName);

    // Register all subscriptions
    subscriptions.forEach((sub, idx) => {
      const {
        schema = 'public',
        table,
        events = ['*'],
        filter,
        handler,
      } = sub || {};

      if (!table || typeof handler !== 'function') {
        logger.warn('useRealtime: invalid subscription definition', { sub });
        return;
      }

      // Register for each event type
      const evs = Array.isArray(events) && events.length ? events : ['*'];
      evs.forEach((event) => {
        channel.on(
          'postgres_changes',
          {
            event,
            schema,
            table,
            filter, // optional filter like 'user_id=eq.123'
          },
          (payload) => {
            try {
              handler(payload);
            } catch (e) {
              logger.error('useRealtime handler threw an error', {
                table,
                event,
                error: String(e?.message || e),
              });
            }
          }
        );
      });

      logger.debug('useRealtime subscription registered', { idx, schema, table, events: evs, filter: filter || null });
    });

    // Subscribe and manage lifecycle
    const subscription = channel.subscribe((statusChange) => {
      logger.debug('useRealtime channel status', { channelName, status: statusChange });
      if (statusChange === 'SUBSCRIBED') {
        setStatus('subscribed');
      } else if (statusChange === 'CHANNEL_ERROR') {
        setStatus('error');
      }
    });

    return () => {
      try {
        supabase.removeChannel(channel);
        logger.debug('useRealtime channel removed', { channelName });
      } catch (e) {
        logger.warn('useRealtime channel remove failed', { channelName, error: String(e?.message || e) });
      }
    };
    // We intentionally re-subscribe only when subscription definitions change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(subscriptions), channelName]);

  return { status, error };
}

/**
 * PUBLIC_INTERFACE
 * Hook specialized for resources table events.
 * Provides typed payload handling for common events used by the app.
 *
 * @param {Object} opts
 * @param {(rows: any[]) => void} opts.onInsert - called with [newRow]
 * @param {(row: any) => void} opts.onUpdate - called with newRow
 * @param {(row: any) => void} opts.onDelete - called with oldRow
 * @param {string} [opts.filter] - optional PostgREST filter string like 'provider=eq.aws'
 */
export function useResourcesRealtime({ onInsert, onUpdate, onDelete, filter } = {}) {
  return useRealtime(
    [
      {
        table: 'resources',
        events: ['INSERT'],
        filter,
        handler: (payload) => onInsert?.([payload.new]),
      },
      {
        table: 'resources',
        events: ['UPDATE'],
        filter,
        handler: (payload) => onUpdate?.(payload.new),
      },
      {
        table: 'resources',
        events: ['DELETE'],
        filter,
        handler: (payload) => onDelete?.(payload.old),
      },
    ],
    'resources-channel'
  );
}

/**
 * PUBLIC_INTERFACE
 * Hook specialized for notifications table events.
 * @param {Object} opts
 * @param {(rows: any[]) => void} opts.onInsert - with [newRow]
 * @param {(row: any) => void} opts.onUpdate - with newRow
 * @param {(row: any) => void} opts.onDelete - with oldRow
 * @param {string} [opts.filter]
 */
export function useNotificationsRealtime({ onInsert, onUpdate, onDelete, filter } = {}) {
  return useRealtime(
    [
      {
        table: 'notifications',
        events: ['INSERT'],
        filter,
        handler: (payload) => onInsert?.([payload.new]),
      },
      {
        table: 'notifications',
        events: ['UPDATE'],
        filter,
        handler: (payload) => onUpdate?.(payload.new),
      },
      {
        table: 'notifications',
        events: ['DELETE'],
        filter,
        handler: (payload) => onDelete?.(payload.old),
      },
    ],
    'notifications-channel'
  );
}
