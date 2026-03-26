import React from "react";
import { ShoppingCart, ExternalLink, Loader2 } from "lucide-react";

interface PurchaseButtonProps {
  checkoutUrl: string;
  productName: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;

  // Premium add-ons
  loading?: boolean;
  priceLabel?: string; // example: "$27" or "$27.00"
  showExternalIcon?: boolean;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  checkoutUrl,
  productName,
  className = "",
  children,
  disabled = false,

  loading = false,
  priceLabel,
  showExternalIcon = true,
}) => {
  const focusRing =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-flat-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-bg-secondary rounded-lg";

  // Premium hover behavior (works with or without btn-primary)
  const premiumMotion =
    "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-xl active:translate-y-0 active:shadow-md";

  const baseButton =
    className || "btn-primary"; // keep your existing system

  const isDisabled = disabled || !checkoutUrl;

  // Disabled / loading state: render <button> (not a dead <a>)
  if (isDisabled || loading) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`inline-flex items-center justify-center gap-2 ${baseButton} ${focusRing} ${premiumMotion} opacity-60 cursor-not-allowed`}
        title={loading ? "Opening checkout..." : "Checkout link not available"}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}

        <span className="inline-flex items-center gap-2">
          {children || (loading ? "Loading..." : "Purchase Now")}

          {priceLabel ? (
            <span className="ml-1 inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white border border-white/20">
              {priceLabel}
            </span>
          ) : null}
        </span>
      </button>
    );
  }

  return (
    <a
      href={checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 ${baseButton} ${focusRing} ${premiumMotion}`}
      aria-label={`Purchase ${productName} (opens in new tab)`}
    >
      <ShoppingCart className="w-4 h-4" />

      <span className="inline-flex items-center gap-2">
        {children || "Purchase Now"}

        {priceLabel ? (
          <span className="ml-1 inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold text-white border border-white/20">
            {priceLabel}
          </span>
        ) : null}
      </span>

      {showExternalIcon ? <ExternalLink className="w-3 h-3" /> : null}
      <span className="sr-only">(opens in new tab)</span>
    </a>
  );
};

export default PurchaseButton;
