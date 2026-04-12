/**
 * Server-side access code validation module.
 *
 * SECURITY FIX: All access codes have been removed from the client bundle.
 * Validation now occurs exclusively through Supabase RPC calls.
 * The previous implementation exposed hundreds of valid codes in the JS bundle.
 */

import { supabase } from '../lib/supabase';

export interface ToolkitType {
  SUBORDINATION: 'subordination';
  COLLATERAL_RELEASE: 'collateral_release';
  PAYMENT_ASSISTANCE: 'payment_assistance';
  SBA_7A: 'sba_7a';
  SBA_504: 'sba_504';
  CHANGE_IN_OWNERSHIP: 'change_in_ownership';
  ASSUMPTION: 'assumption';
  RELOCATION: 'relocation';
}

export const TOOLKIT_TYPES = {
  SUBORDINATION: 'SUBORDINATION',
  COLLATERAL_RELEASE: 'COLLATERAL_RELEASE',
  PAYMENT_ASSISTANCE: 'PAYMENT_ASSISTANCE',
  SBA_7A: 'SBA_7A',
  SBA_504: 'SBA_504',
  CHANGE_IN_OWNERSHIP: 'CHANGE_IN_OWNERSHIP',
  ASSUMPTION: 'ASSUMPTION',
  RELOCATION: 'RELOCATION',
};

/**
 * Validates an access code via server-side Supabase RPC.
 * No codes are stored client-side — all validation happens on the backend.
 *
 * Requires a Supabase function `validate_access_code(p_code text, p_toolkit_type text)`
 * that returns { valid: boolean }.
 *
 * Falls back to a Supabase table lookup if the RPC is not yet deployed.
 */
export async function validateAccessCode(code: string, toolkitType: string): Promise<boolean> {
  if (!code || !toolkitType) {
    return false;
  }

  const normalizedCode = code.trim().toUpperCase();

  try {
    // Primary: Use RPC function for validation
    const { data, error } = await supabase.rpc('validate_access_code', {
      p_code: normalizedCode,
      p_toolkit_type: toolkitType,
    });

    if (error) {
      console.error('Code validation RPC error:', error.message);
      // Fallback: Direct table lookup
      return await fallbackValidation(normalizedCode, toolkitType);
    }

    return data?.valid === true || data === true;
  } catch (err) {
    console.error('Code validation failed:', err);
    return await fallbackValidation(normalizedCode, toolkitType);
  }
}

/**
 * Fallback validation using direct Supabase table query.
 * Queries the `access_codes` table for a matching code + toolkit type.
 */
async function fallbackValidation(code: string, toolkitType: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('access_codes')
      .select('id')
      .eq('code_value', code)
      .eq('toolkit_type', toolkitType)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Fallback code validation error:', error.message);
      return false;
    }

    return data !== null;
  } catch {
    return false;
  }
}

/**
 * Synchronous wrapper that returns a Promise — used by components
 * that previously expected synchronous boolean returns.
 * Components should be updated to handle async validation.
 */
export function validateAccessCodeSync(code: string, toolkitType: string): boolean {
  console.warn(
    'validateAccessCodeSync is deprecated. Use validateAccessCode (async) instead.'
  );
  // Return false synchronously — callers should migrate to async
  return false;
}

// --- Route helper functions (unchanged) ---

export function getAccessRoute(toolkitType: string): string {
  switch (toolkitType) {
    case TOOLKIT_TYPES.SUBORDINATION:
      return '/access/subordination';
    case TOOLKIT_TYPES.COLLATERAL_RELEASE:
      return '/access/collateral-release';
    case TOOLKIT_TYPES.PAYMENT_ASSISTANCE:
      return '/access/payment-assistance';
    case TOOLKIT_TYPES.SBA_7A:
      return '/access/sba-7a';
    case TOOLKIT_TYPES.SBA_504:
      return '/access/sba-504';
    case TOOLKIT_TYPES.CHANGE_IN_OWNERSHIP:
      return '/access/change-in-ownership';
    case TOOLKIT_TYPES.ASSUMPTION:
      return '/access/assumption';
    case TOOLKIT_TYPES.RELOCATION:
      return '/access/relocation';
    default:
      return '/';
  }
}

// Sabbi 2.0 Access Control Functions
export function setUnlockedToolkit(toolkitType: string): void {
  try {
    localStorage.setItem('sabbiUnlockedToolkit', JSON.stringify(toolkitType));
  } catch (error) {
    console.error('Failed to save unlocked toolkit to localStorage:', error);
  }
}

export function getUnlockedToolkit(): string | null {
  try {
    const stored = localStorage.getItem('sabbiUnlockedToolkit');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to retrieve unlocked toolkit from localStorage:', error);
    return null;
  }
}

export function clearUnlockedToolkit(): void {
  try {
    localStorage.removeItem('sabbiUnlockedToolkit');
  } catch (error) {
    console.error('Failed to clear unlocked toolkit from localStorage:', error);
  }
}
