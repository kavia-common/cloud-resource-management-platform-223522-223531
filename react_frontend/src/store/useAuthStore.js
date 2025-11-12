import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

/**
 * Zustand store for Supabase authentication state and actions.
 * Keeps track of the current session and user, and provides convenience auth methods.
 *
 * PUBLIC_INTERFACE
 */
export const useAuthStore = create((set, get) => ({
  // State
  initialized: false,
  loading: true,
  session: null,
  user: null,
  error: null,

  // PUBLIC_INTERFACE
  /**
   * Initialize auth listeners and fetch current session.
   * Should be called once at app bootstrap.
   */
  init: async () => {
    // Fetch current session
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        // eslint-disable-next-line no-console
        console.warn('supabase.auth.getSession error:', error.message);
      }
      const session = data?.session ?? null;
      set({
        session,
        user: session?.user ?? null,
        loading: false,
        initialized: true,
        error: null,
      });
    } catch (e) {
      set({ error: e, loading: false, initialized: true });
    }

    // Listen to changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session: session ?? null,
        user: session?.user ?? null,
        loading: false,
        error: null,
      });
    });

    // Return unsubscribe for caller if needed
    return () => authListener?.subscription?.unsubscribe?.();
  },

  // PUBLIC_INTERFACE
  /**
   * Sign in with email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{data:any, error:any}>}
   */
  signInWithPassword: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) set({ error });
    set({ loading: false, session: data?.session ?? null, user: data?.user ?? data?.session?.user ?? null });
    return { data, error };
  },

  // PUBLIC_INTERFACE
  /**
   * Sign up with email and password, sending email verification link.
   * @param {string} email
   * @param {string} password
   * @param {string} emailRedirectTo - URL to redirect after confirmation (SITE_URL from env recommended)
   * @param {object} userMetadata - optional metadata to store on user
   * @returns {Promise<{data:any, error:any}>}
   */
  signUpWithEmail: async (email, password, emailRedirectTo, userMetadata = {}) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
        data: userMetadata,
      },
    });
    if (error) set({ error });
    set({ loading: false });
    return { data, error };
  },

  // PUBLIC_INTERFACE
  /**
   * Send password reset email.
   * @param {string} email
   * @param {string} emailRedirectTo - URL to redirect back to reset page
   */
  resetPasswordForEmail: async (email, emailRedirectTo) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: emailRedirectTo,
    });
    if (error) set({ error });
    set({ loading: false });
    return { data, error };
  },

  // PUBLIC_INTERFACE
  /**
   * Update the user's password (after recovery link redirect).
   * @param {string} newPassword
   */
  updateUserPassword: async (newPassword) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) set({ error });
    set({ loading: false, user: data?.user ?? get().user });
    return { data, error };
  },

  // PUBLIC_INTERFACE
  /**
   * Sign out current user.
   */
  signOut: async () => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signOut();
    if (error) set({ error });
    set({ loading: false, session: null, user: null });
    return { error };
  },
}));
