/**
 * Message Queue System
 * Manages sequential message delivery with delays and priorities
 */

export interface QueuedMessage {
  id: string;
  text: string;
  sender: 'user' | 'sabbi' | 'system';
  delay?: number;
  priority?: number;
  onDelivered?: () => void;
}

export type MessageDeliveryCallback = (message: Omit<QueuedMessage, 'delay' | 'priority' | 'onDelivered'>) => void;

/**
 * Message Queue Manager
 * Handles sequential message delivery with configurable delays
 */
export class MessageQueue {
  private queue: QueuedMessage[] = [];
  private isProcessing: boolean = false;
  private defaultDelay: number = 450;
  private messageIdCounter: number = 0;

  constructor(
    private deliverCallback: MessageDeliveryCallback,
    defaultDelay?: number
  ) {
    if (defaultDelay !== undefined) {
      this.defaultDelay = defaultDelay;
    }
  }

  /**
   * Add message to queue
   * 
   * @param message - Message to queue
   * @returns Message ID
   */
  enqueue(message: Omit<QueuedMessage, 'id'>): string {
    const id = `msg_${++this.messageIdCounter}_${Date.now()}`;
    
    const queuedMessage: QueuedMessage = {
      id,
      ...message,
      delay: message.delay ?? this.defaultDelay,
      priority: message.priority ?? 0
    };

    this.queue.push(queuedMessage);
    
    // Sort by priority (higher priority first)
    this.queue.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

    // Start processing if not already running
    if (!this.isProcessing) {
      this.processQueue();
    }

    return id;
  }

  /**
   * Add multiple messages to queue
   * 
   * @param messages - Array of messages to queue
   * @returns Array of message IDs
   */
  enqueueMultiple(messages: Array<Omit<QueuedMessage, 'id'>>): string[] {
    return messages.map(msg => this.enqueue(msg));
  }

  /**
   * Add message with high priority (delivered next)
   * 
   * @param message - Message to queue
   * @returns Message ID
   */
  enqueuePriority(message: Omit<QueuedMessage, 'id' | 'priority'>): string {
    return this.enqueue({ ...message, priority: 100 });
  }

  /**
   * Process queue sequentially
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const message = this.queue.shift();
      
      if (!message) break;

      // Wait for delay
      if (message.delay && message.delay > 0) {
        await this.delay(message.delay);
      }

      // Deliver message
      this.deliverCallback({
        id: message.id,
        text: message.text,
        sender: message.sender
      });

      // Call onDelivered callback
      message.onDelivered?.();
    }

    this.isProcessing = false;
  }

  /**
   * Clear all queued messages
   */
  clear(): void {
    this.queue = [];
  }

  /**
   * Get queue length
   */
  getLength(): number {
    return this.queue.length;
  }

  /**
   * Check if queue is processing
   */
  isActive(): boolean {
    return this.isProcessing;
  }

  /**
   * Remove specific message from queue
   * 
   * @param id - Message ID to remove
   * @returns True if message was removed
   */
  remove(id: string): boolean {
    const index = this.queue.findIndex(msg => msg.id === id);
    if (index !== -1) {
      this.queue.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Pause queue processing
   */
  pause(): void {
    this.isProcessing = false;
  }

  /**
   * Resume queue processing
   */
  resume(): void {
    if (!this.isProcessing && this.queue.length > 0) {
      this.processQueue();
    }
  }

  /**
   * Helper to create delay promise
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Set default delay for messages
   */
  setDefaultDelay(ms: number): void {
    this.defaultDelay = ms;
  }

  /**
   * Get default delay
   */
  getDefaultDelay(): number {
    return this.defaultDelay;
  }
}

/**
 * Create a message queue instance
 * 
 * @param deliverCallback - Callback to deliver messages
 * @param defaultDelay - Default delay between messages (ms)
 * @returns MessageQueue instance
 */
export const createMessageQueue = (
  deliverCallback: MessageDeliveryCallback,
  defaultDelay?: number
): MessageQueue => {
  return new MessageQueue(deliverCallback, defaultDelay);
};

/**
 * Batch message helper
 * Groups messages and delivers them with appropriate delays
 */
export class MessageBatch {
  private messages: Array<Omit<QueuedMessage, 'id'>> = [];

  /**
   * Add message to batch
   */
  add(text: string, sender: 'user' | 'sabbi' | 'system', delay?: number): this {
    this.messages.push({ text, sender, delay });
    return this;
  }

  /**
   * Add system message to batch
   */
  system(text: string, delay?: number): this {
    return this.add(text, 'system', delay);
  }

  /**
   * Add Sabbi message to batch
   */
  sabbi(text: string, delay?: number): this {
    return this.add(text, 'sabbi', delay);
  }

  /**
   * Get all messages in batch
   */
  getMessages(): Array<Omit<QueuedMessage, 'id'>> {
    return [...this.messages];
  }

  /**
   * Clear batch
   */
  clear(): void {
    this.messages = [];
  }

  /**
   * Get batch size
   */
  size(): number {
    return this.messages.length;
  }
}

/**
 * Create a message batch
 */
export const createMessageBatch = (): MessageBatch => {
  return new MessageBatch();
};