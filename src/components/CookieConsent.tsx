import React, { useEffect, useRef, useState } from "react";
import { X, Shield, Cookie, BarChart3, Target, Settings, Check } from "lucide-react";

// Define the shape of our cookie preferences
interface CookiePreferences {
  strictly_necessary: boolean;
  functional: boolean;
  performance: boolean;
  targeting: boolean;
}

// Define the props for the CookieConsent component
interface CookieConsentProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  onConsentChange?: (preferences: CookiePreferences) => void;
}

const STORAGE_KEY = "cookieConsent";
const CONSENT_VERSION = "1.0";

const CookieConsent: React.FC<CookieConsentProps> = ({
  isOpen,
  onClose,
  onConsentChange,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    strictly_necessary: true,
    functional: false,
    performance: false,
    targeting: false,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const getLocalStorage = () =>
    typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (!isOpen) return;

    try {
      const ls = getLocalStorage();
      const existingConsent = ls?.getItem(STORAGE_KEY);
      if (!existingConsent) return;

      const consentData = JSON.parse(existingConsent);

      if (consentData?.version && consentData.version !== CONSENT_VERSION) return;

      if (consentData?.preferences) {
        setPreferences((prev) => ({
          ...prev,
          ...consentData.preferences,
          strictly_necessary: true,
        }));
      }
    } catch (error) {
      console.error(
        "Failed to load existing cookie preferences from localStorage:",
        error
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
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

    window.addEventListener("keydown", handleFocusTrap);
    return () => window.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen]);

  const savePreferences = (currentPreferences: CookiePreferences) => {
    try {
      const ls = getLocalStorage();
      if (!ls) return;

      const payload = {
        preferences: { ...currentPreferences, strictly_necessary: true },
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
      };

      ls.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to save cookie preferences:", error);
    }
  };

  const closeAndPersist = (prefs: CookiePreferences) => {
    savePreferences(prefs);
    onClose(false);
    setTimeout(() => onConsentChange?.(prefs), 0);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      strictly_necessary: true,
      functional: true,
      performance: true,
      targeting: true,
    };
    closeAndPersist(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyRequired: CookiePreferences = {
      strictly_necessary: true,
      functional: false,
      performance: false,
      targeting: false,
    };
    closeAndPersist(onlyRequired);
  };

  const handleConfirmChoices = () => {
    closeAndPersist({ ...preferences, strictly_necessary: true });
  };

  const setPreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "strictly_necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "strictly_necessary") return;

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleOverlayClick = () => {
    onClose(false);
  };

  const onPanelKeyDown = (e: React.KeyboardEvent, section: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSection(section);
    }
  };

  if (!isOpen) return null;

  const doNotSell = !preferences.targeting;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleOverlayClick();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-dark-bg-secondary rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-6"
      >
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-od-green/5 via-white to-flat-gold/5 dark:from-dark-od-green/10 dark:via-dark-bg-primary dark:to-flat-gold/10 border-b border-gray-200 dark:border-dark-border p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-od-green to-od-green/80 dark:from-dark-od-green dark:to-dark-od-green/80 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-orbitron font-bold text-3xl text-gunmetal-gray dark:text-dark-text-primary mb-1">
                  Cookie Preferences
                </h2>
                <p className="text-sm text-gray-500 dark:text-dark-text-muted font-inter">
                  Manage your privacy settings
                </p>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              onClick={() => onClose(false)}
              className="text-gray-400 dark:text-dark-text-muted hover:text-gunmetal-gray dark:hover:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-all p-2 rounded-lg"
              aria-label="Close cookie preferences"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 dark:text-dark-text-secondary font-inter leading-relaxed">
            Control which cookies we use to enhance your experience. Essential cookies are required for the site to function and cannot be disabled.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {/* Strictly Necessary Cookies */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 dark:from-dark-bg-primary dark:to-dark-bg-primary/50 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm overflow-hidden">
            <div
              role="button"
              tabIndex={0}
              aria-expanded={expandedSection === "necessary"}
              aria-controls="cookie-panel-necessary"
              onClick={() => toggleSection("necessary")}
              onKeyDown={(e) => onPanelKeyDown(e, "necessary")}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50/80 dark:hover:bg-dark-bg-tertiary/50 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-flat-gold/50 focus:ring-inset"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-od-green/10 dark:bg-dark-od-green/20 rounded-lg flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-od-green dark:text-dark-od-green" />
                </div>
                <div className="text-left">
                  <h3 className="font-orbitron font-semibold text-base text-gunmetal-gray dark:text-dark-text-primary mb-0.5">
                    Strictly Necessary Cookies
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                    Always Active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-od-green dark:bg-dark-od-green text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  Required
                </span>
                <div className="w-6 h-6 bg-od-green dark:bg-dark-od-green rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {expandedSection === "necessary" && (
              <div
                id="cookie-panel-necessary"
                className="px-5 pb-5 border-t border-gray-100 dark:border-dark-border/50 bg-gray-50/30 dark:bg-dark-bg-tertiary/30"
              >
                <p className="text-sm text-gray-600 dark:text-dark-text-muted leading-relaxed pt-4">
                  These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.
                </p>
              </div>
            )}
          </div>

          {/* Functional Cookies */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 dark:from-dark-bg-primary dark:to-dark-bg-primary/50 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm overflow-hidden">
            <div
              role="button"
              tabIndex={0}
              aria-expanded={expandedSection === "functional"}
              aria-controls="cookie-panel-functional"
              onClick={() => toggleSection("functional")}
              onKeyDown={(e) => onPanelKeyDown(e, "functional")}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50/80 dark:hover:bg-dark-bg-tertiary/50 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-flat-gold/50 focus:ring-inset"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-steel-blue/10 dark:bg-steel-blue/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-steel-blue dark:text-dark-text-secondary" />
                </div>
                <div className="text-left">
                  <h3 className="font-orbitron font-semibold text-base text-gunmetal-gray dark:text-dark-text-primary mb-0.5">
                    Functional Cookies
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                    Enhance site functionality
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePreference("functional");
                }}
                role="switch"
                aria-checked={preferences.functional}
                aria-label={
                  preferences.functional
                    ? "Disable functional cookies"
                    : "Enable functional cookies"
                }
                type="button"
                className={`relative w-14 h-7 rounded-full transition-all duration-300 shadow-inner ${
                  preferences.functional
                    ? "bg-od-green dark:bg-dark-od-green"
                    : "bg-gray-300 dark:bg-dark-bg-tertiary"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                    preferences.functional ? "left-7" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {expandedSection === "functional" && (
              <div
                id="cookie-panel-functional"
                className="px-5 pb-5 border-t border-gray-100 dark:border-dark-border/50 bg-gray-50/30 dark:bg-dark-bg-tertiary/30"
              >
                <p className="text-sm text-gray-600 dark:text-dark-text-muted leading-relaxed pt-4">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and providing personalized content recommendations.
                </p>
              </div>
            )}
          </div>

          {/* Performance Cookies */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 dark:from-dark-bg-primary dark:to-dark-bg-primary/50 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm overflow-hidden">
            <div
              role="button"
              tabIndex={0}
              aria-expanded={expandedSection === "performance"}
              aria-controls="cookie-panel-performance"
              onClick={() => toggleSection("performance")}
              onKeyDown={(e) => onPanelKeyDown(e, "performance")}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50/80 dark:hover:bg-dark-bg-tertiary/50 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-flat-gold/50 focus:ring-inset"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-flat-gold/10 dark:bg-flat-gold/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-flat-gold" />
                </div>
                <div className="text-left">
                  <h3 className="font-orbitron font-semibold text-base text-gunmetal-gray dark:text-dark-text-primary mb-0.5">
                    Performance Cookies
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                    Help us improve our site
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePreference("performance");
                }}
                role="switch"
                aria-checked={preferences.performance}
                aria-label={
                  preferences.performance
                    ? "Disable performance cookies"
                    : "Enable performance cookies"
                }
                type="button"
                className={`relative w-14 h-7 rounded-full transition-all duration-300 shadow-inner ${
                  preferences.performance
                    ? "bg-od-green dark:bg-dark-od-green"
                    : "bg-gray-300 dark:bg-dark-bg-tertiary"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                    preferences.performance ? "left-7" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {expandedSection === "performance" && (
              <div
                id="cookie-panel-performance"
                className="px-5 pb-5 border-t border-gray-100 dark:border-dark-border/50 bg-gray-50/30 dark:bg-dark-bg-tertiary/30"
              >
                <p className="text-sm text-gray-600 dark:text-dark-text-muted leading-relaxed pt-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our site performance and user experience.
                </p>
              </div>
            )}
          </div>

          {/* Targeting Cookies */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 dark:from-dark-bg-primary dark:to-dark-bg-primary/50 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm overflow-hidden">
            <div
              role="button"
              tabIndex={0}
              aria-expanded={expandedSection === "targeting"}
              aria-controls="cookie-panel-targeting"
              onClick={() => toggleSection("targeting")}
              onKeyDown={(e) => onPanelKeyDown(e, "targeting")}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50/80 dark:hover:bg-dark-bg-tertiary/50 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-flat-gold/50 focus:ring-inset"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-orbitron font-semibold text-base text-gunmetal-gray dark:text-dark-text-primary mb-0.5">
                    Targeting Cookies
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                    Personalized advertising
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePreference("targeting");
                }}
                role="switch"
                aria-checked={preferences.targeting}
                aria-label={
                  preferences.targeting
                    ? "Disable targeting cookies"
                    : "Enable targeting cookies"
                }
                type="button"
                className={`relative w-14 h-7 rounded-full transition-all duration-300 shadow-inner ${
                  preferences.targeting
                    ? "bg-od-green dark:bg-dark-od-green"
                    : "bg-gray-300 dark:bg-dark-bg-tertiary"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                    preferences.targeting ? "left-7" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {expandedSection === "targeting" && (
              <div
                id="cookie-panel-targeting"
                className="px-5 pb-5 border-t border-gray-100 dark:border-dark-border/50 bg-gray-50/30 dark:bg-dark-bg-tertiary/30"
              >
                <p className="text-sm text-gray-600 dark:text-dark-text-muted leading-relaxed pt-4">
                  These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
                </p>
              </div>
            )}
          </div>

          {/* California Rights Section */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 border-2 border-blue-200 dark:border-blue-700/50 rounded-xl p-5 shadow-sm">
            <h4 className="font-orbitron font-semibold text-gunmetal-gray dark:text-dark-text-primary mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              California & State Privacy Rights
            </h4>
            <p className="text-sm text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-4">
              If you are a California resident, you have the right to opt-out of the sale or sharing of your personal information. Use the toggle below to control this preference.
            </p>

            <div className="flex items-center gap-3 bg-white/60 dark:bg-dark-bg-primary/40 p-3 rounded-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreference("targeting", doNotSell);
                }}
                role="switch"
                aria-checked={doNotSell}
                aria-label={
                  doNotSell
                    ? "Do Not Sell or Share is enabled"
                    : "Do Not Sell or Share is disabled"
                }
                type="button"
                className={`relative w-14 h-7 rounded-full transition-all duration-300 shadow-inner flex-shrink-0 ${
                  doNotSell
                    ? "bg-od-green dark:bg-dark-od-green"
                    : "bg-gray-300 dark:bg-dark-bg-tertiary"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                    doNotSell ? "left-7" : "left-0.5"
                  }`}
                />
              </button>

              <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                Do Not Sell or Share My Personal Information
              </span>
            </div>

            <p className="mt-3 text-xs text-gray-500 dark:text-dark-text-muted italic">
              This toggle is synchronized with "Targeting Cookies". Your choice is saved when you confirm your preferences.
            </p>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg-primary dark:to-dark-bg-primary border-t border-gray-200 dark:border-dark-border p-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={handleRejectAll}
              type="button"
              className="flex-1 px-6 py-3.5 border-2 border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text-primary hover:border-gray-400 dark:hover:border-dark-text-muted hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary font-semibold rounded-xl transition-all duration-300"
            >
              Reject All
            </button>

            <button
              onClick={handleAcceptAll}
              type="button"
              className="flex-1 px-6 py-3.5 bg-gray-700 dark:bg-dark-bg-tertiary hover:bg-gray-800 dark:hover:bg-dark-border text-white dark:text-dark-text-primary font-semibold rounded-xl transition-all duration-300 shadow-md"
            >
              Accept All
            </button>

            <button
              onClick={handleConfirmChoices}
              type="button"
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-flat-gold to-flat-gold-dark hover:from-flat-gold-dark hover:to-flat-gold text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Confirm Choices
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400 dark:text-dark-text-muted font-inter">
              Powered by SmallBiz Recon™ • Your privacy matters to us
            </p>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #D4AF37, #B8941F);
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #B8941F, #9A7A1A);
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;