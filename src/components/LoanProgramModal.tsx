import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface LoanProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;

  // Optional: add a "Learn more" action
  learnMoreHref?: string;
  learnMoreLabel?: string;
}

const LoanProgramModal: React.FC<LoanProgramModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  learnMoreHref,
  learnMoreLabel = "Learn more",
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const focusRing =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-flat-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-bg-secondary rounded";

  // ESC, Enter-on-backdrop, scroll lock, focus save/restore
  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => closeBtnRef.current?.focus());

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeys);

    return () => {
      document.removeEventListener("keydown", handleKeys);
      document.body.style.overflow = originalOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  // Focus trap (Tab stays inside modal)
  useEffect(() => {
    if (!isOpen) return;

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (!modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTabTrap);
    return () => document.removeEventListener("keydown", handleTabTrap);
  }, [isOpen]);

  if (!isOpen) return null;

  const titleId = "loan-program-modal-title";
  const descId = "loan-program-modal-description";

  // Backdrop: click closes
  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Backdrop: Enter/Space closes (when backdrop is focused)
  const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onMouseDown={handleBackdropMouseDown}
      tabIndex={-1}
      onKeyDown={handleBackdropKeyDown}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-2xl max-w-lg w-full p-8 relative animate-in zoom-in-95 duration-200 transition-colors"
      >
        {/* Close Button (Top Right) */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 text-gray-400 dark:text-dark-text-muted hover:text-gray-600 dark:hover:text-dark-text-secondary transition-colors ${focusRing}`}
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <div className="pr-8">
          <h2
            id={titleId}
            className="font-orbitron font-bold text-2xl text-gunmetal-gray dark:text-dark-text-primary mb-6 transition-colors duration-300"
          >
            {title}
          </h2>

          <p
            id={descId}
            className="text-gray-700 dark:text-dark-text-secondary font-inter leading-relaxed text-lg mb-8 transition-colors duration-300"
          >
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {learnMoreHref ? (
            <a
              href={learnMoreHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto text-center px-8 py-3 rounded-lg border border-flat-gold text-flat-gold hover:bg-flat-gold hover:text-gunmetal-gray transition-colors duration-300 ${focusRing}`}
            >
              {learnMoreLabel}
              <span className="sr-only"> (opens in new window)</span>
            </a>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className={`w-full sm:w-auto bg-od-green dark:bg-dark-od-green hover:bg-dark-olive-drab dark:hover:bg-dark-olive-drab text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 ${focusRing}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanProgramModal;
