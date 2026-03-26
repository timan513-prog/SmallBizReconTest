/**
 * Clipboard Utility
 * Robust clipboard operations with modern API and fallbacks
 */

export interface ClipboardResult {
  success: boolean;
  message: string;
  error?: Error;
}

/**
 * Copy text to clipboard using modern Clipboard API with fallback
 * 
 * @param text - Text to copy to clipboard
 * @returns Promise with result status and message
 * 
 * @example
 * const result = await copyToClipboard('Hello World');
 * if (result.success) {
 *   console.log(result.message); // "Copied to clipboard!"
 * }
 */
export const copyToClipboard = async (text: string): Promise<ClipboardResult> => {
  // Validate input
  if (!text || typeof text !== 'string') {
    return {
      success: false,
      message: 'Invalid text provided',
      error: new Error('Text must be a non-empty string')
    };
  }

  // Try modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return {
        success: true,
        message: 'Copied to clipboard!'
      };
    } catch (error) {
      console.warn('Clipboard API failed, trying fallback:', error);
      // Fall through to fallback method
    }
  }

  // Fallback method for older browsers or non-secure contexts
  try {
    return await fallbackCopyToClipboard(text);
  } catch (error) {
    return {
      success: false,
      message: 'Failed to copy to clipboard',
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
};

/**
 * Fallback clipboard copy using execCommand (deprecated but widely supported)
 */
const fallbackCopyToClipboard = async (text: string): Promise<ClipboardResult> => {
  return new Promise((resolve) => {
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.setAttribute('readonly', '');
    
    document.body.appendChild(textarea);
    
    try {
      // Select text
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      
      // Try to copy
      const successful = document.execCommand('copy');
      
      if (successful) {
        resolve({
          success: true,
          message: 'Copied to clipboard!'
        });
      } else {
        resolve({
          success: false,
          message: 'Copy command failed',
          error: new Error('execCommand returned false')
        });
      }
    } catch (error) {
      resolve({
        success: false,
        message: 'Failed to copy to clipboard',
        error: error instanceof Error ? error : new Error(String(error))
      });
    } finally {
      // Clean up
      document.body.removeChild(textarea);
    }
  });
};

/**
 * Check if clipboard API is available
 */
export const isClipboardAvailable = (): boolean => {
  return !!(
    (navigator.clipboard && window.isSecureContext) ||
    document.queryCommandSupported?.('copy')
  );
};

/**
 * Copy text with user feedback callback
 * 
 * @param text - Text to copy
 * @param onSuccess - Callback on success
 * @param onError - Callback on error
 */
export const copyWithFeedback = async (
  text: string,
  onSuccess?: (message: string) => void,
  onError?: (message: string, error?: Error) => void
): Promise<void> => {
  const result = await copyToClipboard(text);
  
  if (result.success) {
    onSuccess?.(result.message);
  } else {
    onError?.(result.message, result.error);
  }
};

/**
 * Copy multiple items with status tracking
 * 
 * @param items - Array of items to copy
 * @returns Array of results for each item
 */
export const copyMultiple = async (
  items: Array<{ id: string; text: string }>
): Promise<Array<{ id: string; result: ClipboardResult }>> => {
  const results = await Promise.all(
    items.map(async (item) => ({
      id: item.id,
      result: await copyToClipboard(item.text)
    }))
  );
  
  return results;
};

/**
 * Format text before copying (useful for structured data)
 * 
 * @param data - Data to format and copy
 * @param formatter - Optional custom formatter
 */
export const copyFormatted = async (
  data: any,
  formatter?: (data: any) => string
): Promise<ClipboardResult> => {
  try {
    const text = formatter ? formatter(data) : JSON.stringify(data, null, 2);
    return await copyToClipboard(text);
  } catch (error) {
    return {
      success: false,
      message: 'Failed to format data',
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
};