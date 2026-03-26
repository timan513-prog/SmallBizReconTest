/**
 * SECURITY FIX: Consolidated Supabase configuration.
 * Removed hardcoded project URLs — now reads from environment variables.
 * Legacy URL support maintained for backward compatibility with existing storage assets.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_URL_LEGACY = import.meta.env.VITE_SUPABASE_URL_LEGACY || '';

export { SUPABASE_URL, SUPABASE_URL_LEGACY };

export const getPublicStorageUrl = (bucket: string, path: string) =>
  `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;

export const getLegacyPublicStorageUrl = (bucket: string, path: string) =>
  `${SUPABASE_URL_LEGACY}/storage/v1/object/public/${bucket}/${path}`;
