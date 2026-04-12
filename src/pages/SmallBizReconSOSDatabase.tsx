import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, ExternalLink, MapPin, Building, ArrowLeft, ChevronDown, ChevronUp, CircleHelp as HelpCircle, RotateCcw, Save, DollarSign, X, Sun, Moon } from 'lucide-react';

interface SosDataItem {
  state: string;
  url: string;
  region: string;
  services: string[];
  feeBased: boolean;
  filingMethod?: string;
  processingTime?: string;
  formTypes?: string[];
}

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const THEMES: Record<string, Record<string, string>> = {
  dark: {
    "--bg-primary": "#181c14",
    "--bg-secondary": "rgba(30, 34, 26, 0.6)",
    "--bg-card": "rgba(30, 34, 26, 0.6)",
    "--bg-card-hover": "rgba(36, 42, 30, 0.7)",
    "--bg-hero": "linear-gradient(180deg, rgba(50,62,38,0.7) 0%, rgba(24,28,20,0.98) 100%)",
    "--border-primary": "rgba(154, 184, 122, 0.1)",
    "--border-hover": "rgba(154, 184, 122, 0.25)",
    "--text-primary": "#e8ede2",
    "--text-secondary": "#8a9480",
    "--text-muted": "#5a6450",
    "--accent-green": "#9ab87a",
    "--accent-gold": "#c8a84e",
    "--glass-blur": "blur(24px)",
    "--shadow-card": "0 4px 32px rgba(0,0,0,0.2)",
    "--shadow-card-hover": "0 24px 64px rgba(0,0,0,0.35)",
    "--grid-opacity": "0.03",
    "--particle-opacity": "0.15",
    "--overlay-green": "rgba(74,120,54,0.08)",
  },
  light: {
    "--bg-primary": "#f5f3ee",
    "--bg-secondary": "rgba(255, 255, 255, 0.7)",
    "--bg-card": "rgba(255, 255, 255, 0.75)",
    "--bg-card-hover": "rgba(255, 255, 255, 0.9)",
    "--bg-hero": "linear-gradient(180deg, #3d5a2a 0%, #2a3d1e 100%)",
    "--border-primary": "rgba(74, 120, 54, 0.12)",
    "--border-hover": "rgba(74, 120, 54, 0.25)",
    "--text-primary": "#1a2e12",
    "--text-secondary": "#5a6b52",
    "--text-muted": "#8a9680",
    "--accent-green": "#4A7836",
    "--accent-gold": "#9a7a28",
    "--glass-blur": "blur(20px)",
    "--shadow-card": "0 4px 24px rgba(0,0,0,0.06)",
    "--shadow-card-hover": "0 20px 48px rgba(0,0,0,0.1)",
    "--grid-opacity": "0.04",
    "--particle-opacity": "0.1",
    "--overlay-green": "rgba(74,120,54,0.04)",
  },
};

function GridOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: "var(--grid-opacity)" as any }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="sosGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sosGrid)" />
      </svg>
    </div>
  );
}

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${1.5 + Math.random() * 2.5}px`,
          height: `${1.5 + Math.random() * 2.5}px`,
          borderRadius: "50%",
          background: `rgba(154, 184, 122, var(--particle-opacity))`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pFloat ${9 + Math.random() * 14}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -12}s`,
        }} />
      ))}
    </div>
  );
}

const StateCard: React.FC<{
  item: SosDataItem;
  index: number;
  onDetail: (item: SosDataItem) => void;
  isMobile?: boolean;
}> = ({ item, index, onDetail, isMobile = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        animation: `fadeSlideIn 0.5s ease-out ${index * 0.03}s both`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onDetail(item)}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #4b5842 0%, #4a5240 50%, #2a2f26 100%)",
          border: `2px solid ${hovered ? "#ffd700" : "rgba(212,175,55,0.3)"}`,
          borderRadius: 0,
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,237,78,0.3), inset 0 0 60px rgba(212,175,55,0.1)"
            : "0 20px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(212,175,55,0.05)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: isMobile ? 340 : 360,
        }}
      >
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60%",
          height: "140%",
          background: "linear-gradient(135deg, transparent 0%, rgba(212,175,55,0.12) 50%, transparent 100%)",
          transform: "rotate(-15deg)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: isMobile ? 120 : 150,
          height: isMobile ? 120 : 150,
          background: "radial-gradient(circle, rgba(255,237,78,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          opacity: hovered ? 0.6 : 0.3,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative",
          zIndex: 1,
          padding: isMobile ? 16 : 20,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}>
          <div style={{ marginBottom: isMobile ? 12 : 14, transform: "skewX(-2deg)" }}>
            <div style={{
              display: "inline-block",
              background: "#d4af37",
              color: "#1a1d17",
              fontFamily: "'Teko', 'DM Sans', sans-serif",
              fontSize: isMobile ? 11 : 12,
              fontWeight: 700,
              letterSpacing: isMobile ? 2 : 3,
              textTransform: "uppercase" as const,
              padding: isMobile ? "4px 12px 3px" : "5px 14px 3px",
              clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
              marginBottom: 8,
            }}>
              {item.region}
            </div>

            <h3 style={{
              fontFamily: "'Orbitron', 'DM Sans', sans-serif",
              fontSize: isMobile
                ? (item.state.length > 12 ? 20 : 24)
                : (item.state.length > 12 ? 24 : 28),
              fontWeight: 900,
              color: "#ffed4e",
              textTransform: "uppercase" as const,
              letterSpacing: isMobile ? 1.5 : 2,
              lineHeight: 0.95,
              textShadow: "0 0 10px rgba(255,237,78,0.8), 0 0 20px rgba(255,237,78,0.6), 3px 3px 0 rgba(0,0,0,0.3)",
            }}>
              {item.state}
            </h3>
          </div>

          <div style={{
            background: "rgba(0,0,0,0.4)",
            borderLeft: "4px solid #d4af37",
            padding: isMobile ? "10px 12px" : "12px 14px",
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
            marginBottom: isMobile ? 10 : 12,
          }}>
            <div style={{
              fontFamily: "'Teko', 'DM Sans', sans-serif",
              fontSize: isMobile ? 10 : 11,
              fontWeight: 700,
              color: "#ffd700",
              textTransform: "uppercase" as const,
              letterSpacing: isMobile ? 2 : 2.5,
              marginBottom: 6,
            }}>
              Services
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: isMobile ? 6 : 7 }}>
              {item.services.map((s) => (
                <span key={s} style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)",
                  border: "1px solid #d4af37",
                  color: "#ffd700",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 600,
                  padding: isMobile ? "4px 8px" : "5px 10px",
                  clipPath: "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: isMobile ? 6 : 8,
            flex: 1,
          }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
              padding: isMobile ? "8px 10px" : "10px 12px",
              clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            }}>
              <div style={{ fontFamily: "'Teko', sans-serif", fontSize: isMobile ? 9 : 10, fontWeight: 600, color: "#d4af37", textTransform: "uppercase" as const, letterSpacing: isMobile ? 1.5 : 2, marginBottom: 3 }}>
                Fee Status
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#e8e8e0", lineHeight: 1.3 }}>
                {item.feeBased ? "Fee-based" : "Free"}
              </div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
              padding: isMobile ? "8px 10px" : "10px 12px",
              clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            }}>
              <div style={{ fontFamily: "'Teko', sans-serif", fontSize: isMobile ? 9 : 10, fontWeight: 600, color: "#d4af37", textTransform: "uppercase" as const, letterSpacing: isMobile ? 1.5 : 2, marginBottom: 3 }}>
                Filing Method
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#e8e8e0", lineHeight: 1.3 }}>
                {item.filingMethod ? item.filingMethod.charAt(0).toUpperCase() + item.filingMethod.slice(1) : "N/A"}
              </div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
              padding: isMobile ? "8px 10px" : "10px 12px",
              clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            }}>
              <div style={{ fontFamily: "'Teko', sans-serif", fontSize: isMobile ? 9 : 10, fontWeight: 600, color: "#d4af37", textTransform: "uppercase" as const, letterSpacing: isMobile ? 1.5 : 2, marginBottom: 3 }}>
                Processing
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#e8e8e0", lineHeight: 1.3 }}>
                {item.processingTime || "Standard"}
              </div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
              padding: isMobile ? "8px 10px" : "10px 12px",
              clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            }}>
              <div style={{ fontFamily: "'Teko', sans-serif", fontSize: isMobile ? 9 : 10, fontWeight: 600, color: "#d4af37", textTransform: "uppercase" as const, letterSpacing: isMobile ? 1.5 : 2, marginBottom: 3 }}>
                Form Types
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#e8e8e0", lineHeight: 1.3 }}>
                {item.formTypes?.join(", ") || "UCC-1"}
              </div>
            </div>
          </div>

          <div style={{ marginTop: isMobile ? 12 : 14 }}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center" as const,
                background: "linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #d4af37 100%)",
                backgroundSize: "200% 100%",
                color: "#1a1d17",
                fontFamily: "'Orbitron', 'DM Sans', sans-serif",
                fontSize: isMobile ? 11 : 12,
                fontWeight: 700,
                textTransform: "uppercase" as const,
                letterSpacing: isMobile ? 2 : 2.5,
                padding: isMobile ? "12px 16px" : "14px 20px",
                border: isMobile ? "2px solid #1a1d17" : "3px solid #1a1d17",
                outline: "2px solid #ffd700",
                outlineOffset: -6,
                textDecoration: "none",
                clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                boxShadow: "0 10px 30px rgba(212,175,55,0.5), inset 0 -4px 8px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              Access Portal
            </a>
          </div>
        </div>

        <div style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: isMobile ? 50 : 60,
          height: isMobile ? 50 : 60,
          background: "linear-gradient(135deg, transparent 50%, rgba(255,237,78,0.1) 50%)",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}>
          <div style={{
            position: "absolute",
            bottom: isMobile ? 6 : 7,
            right: isMobile ? 6 : 7,
            width: isMobile ? 20 : 24,
            height: 2,
            background: "#ffd700",
            boxShadow: "0 0 10px #ffed4e",
          }} />
          <div style={{
            position: "absolute",
            bottom: isMobile ? 6 : 7,
            right: isMobile ? 6 : 7,
            width: 2,
            height: isMobile ? 20 : 24,
            background: "#ffd700",
            boxShadow: "0 0 10px #ffed4e",
          }} />
        </div>
      </div>
    </div>
  );
};

const StateDetailModal: React.FC<{
  stateData: SosDataItem | null;
  onClose: () => void;
}> = ({ stateData, onClose }) => {
  if (!stateData) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 16,
        backdropFilter: "blur(8px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${stateData.state} details`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "linear-gradient(135deg, #2a2f26 0%, #1a1d17 100%)",
        border: "2px solid rgba(212,175,55,0.4)",
        borderRadius: 20,
        maxWidth: 640,
        width: "100%",
        padding: 32,
        position: "relative",
        boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.15)",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            color: "#e8e8e0",
            cursor: "pointer",
            padding: 8,
            display: "flex",
            transition: "all 0.3s ease",
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: "inline-block",
            background: "#d4af37",
            color: "#1a1d17",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase" as const,
            padding: "4px 12px",
            marginBottom: 12,
          }}>
            {stateData.region}
          </div>
          <h2 style={{
            fontFamily: "'Orbitron', 'DM Sans', sans-serif",
            fontSize: 32,
            fontWeight: 900,
            color: "#ffed4e",
            textTransform: "uppercase" as const,
            letterSpacing: 4,
            textShadow: "0 0 10px rgba(255,237,78,0.6)",
          }}>
            {stateData.state}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, color: "#e8e8e0" }}>
          {[
            { label: "Services", value: stateData.services.join(", ") },
            { label: "Fee Status", value: stateData.feeBased ? "Fee-based" : "Free" },
            { label: "Filing Method", value: stateData.filingMethod ? stateData.filingMethod.charAt(0).toUpperCase() + stateData.filingMethod.slice(1) : "N/A" },
            { label: "Processing Time", value: stateData.processingTime || "Standard" },
            { label: "Form Types", value: stateData.formTypes?.join(", ") || "UCC-1" },
          ].map((row) => (
            <div key={row.label} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: 8,
            }}>
              <span style={{ color: "#d4af37", fontWeight: 600, fontSize: 13 }}>{row.label}</span>
              <span style={{ fontSize: 14 }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <a
            href={stateData.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px 20px",
              background: "linear-gradient(135deg, #d4af37 0%, #ffd700 100%)",
              color: "#1a1d17",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              border: "none",
              borderRadius: 8,
            }}
          >
            <ExternalLink size={16} />
            Visit Portal
          </a>
          <button
            onClick={onClose}
            style={{
              padding: "14px 24px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              color: "#e8e8e0",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const SmallBizReconSOSDatabase: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";
  const vars = THEMES[theme];

  const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('sosdb2_searchTerm') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedRegion, setSelectedRegion] = useState<string>(localStorage.getItem('sosdb2_selectedRegion') || 'all');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    JSON.parse(localStorage.getItem('sosdb2_selectedServices') || '[]')
  );
  const [selectedFilingMethod, setSelectedFilingMethod] = useState<string>(
    localStorage.getItem('sosdb2_selectedFilingMethod') || 'all'
  );
  const [selectedFormType, setSelectedFormType] = useState<string>(
    localStorage.getItem('sosdb2_selectedFormType') || 'all'
  );
  const [freeOnly, setFreeOnly] = useState<boolean>(localStorage.getItem('sosdb2_freeOnly') === 'true');
  const [sortKey, setSortKey] = useState<string>(localStorage.getItem('sosdb2_sortKey') || 'state');
  const [sortAsc, setSortAsc] = useState<boolean>(localStorage.getItem('sosdb2_sortAsc') !== 'false');
  const [loading, setLoading] = useState<boolean>(true);
  const [recentStates, setRecentStates] = useState<string[]>(
    JSON.parse(localStorage.getItem('sosdb2_recentStates') || '[]')
  );
  const [savedFilters, setSavedFilters] = useState<any[]>(
    JSON.parse(localStorage.getItem('sosdb2_savedFilters') || '[]')
  );
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedStateForDetail, setSelectedStateForDetail] = useState<SosDataItem | null>(null);

  const [draggedFilterIndex, setDraggedFilterIndex] = useState<number | null>(null);
  const [hoveredFilterIndex, setHoveredFilterIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => { clearTimeout(timer); window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(() => {
    localStorage.setItem('sosdb2_searchTerm', searchTerm);
    localStorage.setItem('sosdb2_selectedRegion', selectedRegion);
    localStorage.setItem('sosdb2_selectedServices', JSON.stringify(selectedServices));
    localStorage.setItem('sosdb2_selectedFilingMethod', selectedFilingMethod);
    localStorage.setItem('sosdb2_selectedFormType', selectedFormType);
    localStorage.setItem('sosdb2_freeOnly', freeOnly.toString());
    localStorage.setItem('sosdb2_sortKey', sortKey);
    localStorage.setItem('sosdb2_sortAsc', sortAsc.toString());
  }, [searchTerm, selectedRegion, selectedServices, selectedFilingMethod, selectedFormType, freeOnly, sortKey, sortAsc]);

  const sosData: SosDataItem[] = [
    { state: 'Alabama', url: 'https://www.sos.alabama.gov/government-records/ucc-records', region: 'Southeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Alaska', url: 'https://dnr.alaska.gov/ssd/recoff/ucc', region: 'West', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'mail', processingTime: '5-7 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Arizona', url: 'https://apps.azsos.gov/apps/ucc/search/', region: 'Southwest', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Arkansas', url: 'https://portal.arkansas.gov/service/ar-ucc-search/', region: 'South', services: ['UCC', 'Business Search'], feeBased: true, processingTime: '2-3 Business Days', formTypes: ['UCC-1'] },
    { state: 'California', url: 'https://bizfileonline.sos.ca.gov/search/ucc', region: 'West', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '3-5 Business Days', formTypes: ['UCC-1', 'UCC-3', 'UCC-5'] },
    { state: 'Colorado', url: 'https://www.sos.state.co.us/ucc/pages/home.xhtml', region: 'West', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1'] },
    { state: 'Connecticut', url: 'https://service.ct.gov/business/s/onlineenquiry?language=en_US', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'mail', processingTime: '7-10 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Delaware', url: 'https://corp.delaware.gov/uccsearch/', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, processingTime: '1 Business Day', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Florida', url: 'https://floridaucc.com/search?text=&searchOptionType=OrganizationDebtorName&searchOptionSubOption=FiledCompactDebtorNameList&searchCategory=Exact', region: 'Southeast', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1', 'UCC-3', 'UCC-5'] },
    { state: 'Georgia', url: 'https://search.gsccca.org/UCC_Search/', region: 'Southeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1'] },
    { state: 'Hawaii', url: 'https://dlnr.hawaii.gov/boc/main/forms/', region: 'West', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'mail', processingTime: '5-7 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Idaho', url: 'https://sosbiz.idaho.gov/search/ucc', region: 'West', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1'] },
    { state: 'Illinois', url: 'https://apps.ilsos.gov/uccsearch/', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, processingTime: '3-5 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Indiana', url: 'https://inbiz.in.gov/business-filings/ucc', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Iowa', url: 'https://filings.sos.iowa.gov/UCCSearch/UCC', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Kansas', url: 'https://sos.ks.gov/general-services/ucc-filing-information.html', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Kentucky', url: 'https://www.sos.ky.gov/bus/UCC/Pages/Online-Services.aspx', region: 'South', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Louisiana', url: 'https://www.sos.la.gov/businessservices/uniformcommercialcode/HowToSearchForFinancingStatements/Pages/default.aspx', region: 'South', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'mail', processingTime: '3-5 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Maine', url: 'https://www.maine.gov/sos/corporations-commissions/uniform-commercial-code/search-for-a-uniform-commercial-code-filing', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'mail', processingTime: '7-10 Business Days', formTypes: ['UCC-1'] },
    { state: 'Maryland', url: 'https://egov.maryland.gov/SDAT/UCCFiling/MainMenu.aspx', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Massachusetts', url: 'https://www.sec.state.ma.us/divisions/corporations/filing-by-subject/ucc/corporations-uniform-commercial-code.htm', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1'] },
    { state: 'Michigan', url: 'https://www.michigan.gov/sos/industry-services/ucc', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Minnesota', url: 'https://mblsportal.sos.mn.gov/Secured/SearchUCC', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, processingTime: '2-4 Business Days', formTypes: ['UCC-1'] },
    { state: 'Mississippi', url: 'https://www.sos.ms.gov/business-services/ucc-search', region: 'South', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Missouri', url: 'https://www.sos.mo.gov/ucc', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Montana', url: 'https://biz.sosmt.gov/search/ucc', region: 'West', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Nebraska', url: 'https://sos.nebraska.gov/business-services/uccefs-search-and-filing-center', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Nevada', url: 'https://esos.nv.gov/HelpFiles/UCC11-InformationRequestSearchCo.html', region: 'West', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'New Hampshire', url: 'https://www.sos.nh.gov/ucc', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: '1 Business Day', formTypes: ['UCC-1'] },
    { state: 'New Jersey', url: 'https://www.njportal.com/ucc/', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'New Mexico', url: 'https://enterprise.sos.nm.gov/search/ucc', region: 'Southwest', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1'] },
    { state: 'New York', url: 'https://appext20.dos.ny.gov/pls/ucc_public/web_search.inhouse_search', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '3-5 Business Days', formTypes: ['UCC-1', 'UCC-3', 'UCC-5'] },
    { state: 'North Carolina', url: 'https://www.sosnc.gov/online_services/search/by_title/_uniform_commercial_code', region: 'Southeast', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1'] },
    { state: 'North Dakota', url: 'https://cis.sos.nd.gov/', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Ohio', url: 'https://ucc.ohiosos.gov/dashboard', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: '1-3 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Oklahoma', url: 'https://www.okcc.online/', region: 'South', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Oregon', url: 'https://sos.oregon.gov/business/Pages/ucc.aspx', region: 'West', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Pennsylvania', url: 'https://file.dos.pa.gov/search/ucc', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Rhode Island', url: 'https://business.sos.ri.gov/corpweb/uccsearch/uccsearch.aspx', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'South Carolina', url: 'https://sos.sc.gov/online-filings/uniform-commercial-code/ucc-file-and-search-online', region: 'Southeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1'] },
    { state: 'South Dakota', url: 'https://sdsos.gov/business-services/uniform-commercial-code/uccdefault.aspx', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Tennessee', url: 'https://tncab.tnsos.gov/ucc-debtor-search', region: 'South', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Texas', url: 'https://www.sos.state.tx.us/corp/sosda/index.shtml', region: 'South', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '3-5 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Utah', url: 'https://corporations.utah.gov/uniform-commercial-code/', region: 'West', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Vermont', url: 'https://sos.vermont.gov/business-services/ucc-liens/', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'mail', processingTime: '7-10 Business Days', formTypes: ['UCC-1'] },
    { state: 'Virginia', url: 'https://cis.scc.virginia.gov/UCCOnlineSearch/UCCSearch', region: 'Southeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Washington', url: 'https://dol.wa.gov/professional-licenses/uniform-commercial-code-ucc/ucc-online-filing-and-searches', region: 'West', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1'] },
    { state: 'West Virginia', url: 'https://apps.wv.gov/sos/ucc/', region: 'South', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1', 'UCC-3'] },
    { state: 'Wisconsin', url: 'https://dfi.wi.gov/Pages/BusinessServices/UCC/SearchLienFilings.aspx', region: 'Midwest', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '1-2 Business Days', formTypes: ['UCC-1'] },
    { state: 'Wyoming', url: 'https://sos.wyo.gov/business/', region: 'West', services: ['UCC', 'Business Search'], feeBased: false, filingMethod: 'online', processingTime: 'Instant', formTypes: ['UCC-1'] },
    { state: 'Washington D.C.', url: 'https://otr.cfo.dc.gov/page/recorder-deeds', region: 'Northeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '2-3 Business Days', formTypes: ['UCC-1'] },
    { state: 'Puerto Rico', url: 'https://www.estado.pr.gov/en/home', region: 'Southeast', services: ['UCC', 'Business Search'], feeBased: true, filingMethod: 'online', processingTime: '3-5 Business Days', formTypes: ['UCC-1', 'UCC-3'] }
  ];

  const regions = useMemo(() => ['all', ...Array.from(new Set(sosData.map((i) => i.region))).sort()], [sosData]);
  const services = useMemo(() => Array.from(new Set(sosData.flatMap((i) => i.services))).sort(), [sosData]);
  const filingMethods = useMemo(
    () => ['all', ...Array.from(new Set(sosData.map((i) => i.filingMethod).filter(Boolean) as string[])).sort()],
    [sosData]
  );
  const formTypes = useMemo(
    () => ['all', ...Array.from(new Set(sosData.flatMap((i) => i.formTypes || []))).sort()],
    [sosData]
  );

  const filteredData = useMemo(() => {
    return sosData
      .filter((item) => {
        const matchesSearch = item.state.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
        const matchesServices = selectedServices.length === 0 || selectedServices.some((s) => item.services.includes(s));
        const matchesFree = !freeOnly || !item.feeBased;
        const matchesFilingMethod = selectedFilingMethod === 'all' || item.filingMethod === selectedFilingMethod;
        const matchesFormType = selectedFormType === 'all' || (item.formTypes && item.formTypes.includes(selectedFormType));
        return matchesSearch && matchesRegion && matchesServices && matchesFree && matchesFilingMethod && matchesFormType;
      })
      .sort((a, b) => {
        let aVal: any = (a as any)[sortKey];
        let bVal: any = (b as any)[sortKey];
        if (sortKey === 'feeBased') { aVal = a.feeBased ? 1 : 0; bVal = b.feeBased ? 1 : 0; }
        if (sortKey === 'processingTime') { aVal = a.processingTime || ''; bVal = b.processingTime || ''; }
        if (typeof aVal === 'string' && typeof bVal === 'string') return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [sosData, debouncedSearchTerm, selectedRegion, selectedServices, freeOnly, selectedFilingMethod, selectedFormType, sortKey, sortAsc]);

  const isMobile = windowWidth < 768;
  const freeCount = filteredData.filter((i) => !i.feeBased).length;
  const paidCount = filteredData.filter((i) => i.feeBased).length;

  const activeFilters = useMemo(() => {
    const filters: { type: string; value: string; label: string }[] = [];
    if (searchTerm) filters.push({ type: 'searchTerm', value: searchTerm, label: `Search: "${searchTerm}"` });
    if (selectedRegion !== 'all') filters.push({ type: 'region', value: selectedRegion, label: `Region: ${selectedRegion}` });
    selectedServices.forEach((service) => filters.push({ type: 'service', value: service, label: `Service: ${service}` }));
    if (selectedFilingMethod !== 'all') filters.push({ type: 'filingMethod', value: selectedFilingMethod, label: `Filing: ${selectedFilingMethod}` });
    if (selectedFormType !== 'all') filters.push({ type: 'formType', value: selectedFormType, label: `Form: ${selectedFormType}` });
    if (freeOnly) filters.push({ type: 'freeOnly', value: 'true', label: 'Cost: Free Only' });
    return filters;
  }, [searchTerm, selectedRegion, selectedServices, selectedFilingMethod, selectedFormType, freeOnly]);

  const handleServiceToggle = useCallback((service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm(''); setSelectedRegion('all'); setSelectedServices([]); setSelectedFilingMethod('all');
    setSelectedFormType('all'); setFreeOnly(false); setSortKey('state'); setSortAsc(true);
  }, []);

  const handleRemoveActiveFilter = useCallback((type: string, value: string) => {
    if (type === 'searchTerm') setSearchTerm('');
    if (type === 'region') setSelectedRegion('all');
    if (type === 'service') setSelectedServices((prev) => prev.filter((s) => s !== value));
    if (type === 'filingMethod') setSelectedFilingMethod('all');
    if (type === 'formType') setSelectedFormType('all');
    if (type === 'freeOnly') setFreeOnly(false);
  }, []);

  const handleExportJSON = useCallback(() => {
    const dataStr = JSON.stringify(filteredData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'sos_database2_export.json');
    linkElement.click();
  }, [filteredData]);

  const handleSaveFilter = useCallback(() => {
    const filterName = prompt('Enter a name for this filter:');
    if (!filterName) return;
    const newFilter = { name: filterName, searchTerm, selectedRegion, selectedServices, selectedFilingMethod, selectedFormType, freeOnly, sortKey, sortAsc, timestamp: new Date().toISOString() };
    const updated = [...savedFilters, newFilter];
    setSavedFilters(updated);
    localStorage.setItem('sosdb2_savedFilters', JSON.stringify(updated));
  }, [savedFilters, searchTerm, selectedRegion, selectedServices, selectedFilingMethod, selectedFormType, freeOnly, sortKey, sortAsc]);

  const handleLoadFilter = useCallback((filter: any) => {
    setSearchTerm(filter.searchTerm || ''); setSelectedRegion(filter.selectedRegion || 'all');
    setSelectedServices(filter.selectedServices || []); setSelectedFilingMethod(filter.selectedFilingMethod || 'all');
    setSelectedFormType(filter.selectedFormType || 'all'); setFreeOnly(Boolean(filter.freeOnly));
    setSortKey(filter.sortKey || 'state'); setSortAsc(filter.sortAsc !== false);
  }, []);

  const handleVisit = useCallback((stateName: string) => {
    setRecentStates((prev) => {
      const updated = [stateName, ...prev.filter((s) => s !== stateName)].slice(0, 5);
      localStorage.setItem('sosdb2_recentStates', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const openStateDetail = useCallback((stateData: SosDataItem) => {
    setSelectedStateForDetail(stateData);
    handleVisit(stateData.state);
  }, [handleVisit]);

  const closeStateDetail = useCallback(() => setSelectedStateForDetail(null), []);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragItem.current = index; e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index)); setDraggedFilterIndex(index);
  }, []);
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault(); dragOverItem.current = index; setHoveredFilterIndex(index);
  }, []);
  const handleDragOver = useCallback((e: React.DragEvent<HTMLButtonElement>) => { e.preventDefault(); }, []);
  const handleDrop = useCallback(() => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const next = [...savedFilters]; const [moved] = next.splice(dragItem.current, 1);
    next.splice(dragOverItem.current, 0, moved); setSavedFilters(next);
    localStorage.setItem('sosdb2_savedFilters', JSON.stringify(next));
    setDraggedFilterIndex(null); setHoveredFilterIndex(null); dragItem.current = null; dragOverItem.current = null;
  }, [savedFilters]);
  const handleDragEnd = useCallback(() => {
    setDraggedFilterIndex(null); setHoveredFilterIndex(null); dragItem.current = null; dragOverItem.current = null;
  }, []);

  const cssVarString = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n");

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid var(--border-primary)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontSize: 14,
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "all 0.3s ease",
    appearance: "auto" as any,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: 8,
    fontFamily: "var(--font-body)",
    textTransform: "uppercase",
    letterSpacing: 1,
  };

  const actionBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid var(--border-primary)",
    background: "transparent",
    color: "var(--text-secondary)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "var(--font-body)",
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#181c14",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, border: "3px solid rgba(212,175,55,0.3)",
            borderTopColor: "#d4af37", borderRadius: "50%",
            animation: "spin 1s linear infinite", margin: "0 auto 16px",
          }} />
          <p style={{ color: "#e8ede2", fontFamily: "'DM Sans', sans-serif" }}>Loading SOS Database...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        :root {
          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body: 'DM Sans', sans-serif;
          ${cssVarString}
        }
        @keyframes pFloat {
          0%, 100% { transform: translate(0,0) scale(1); opacity:0.3; }
          25% { transform: translate(12px,-18px) scale(1.15); opacity:0.6; }
          50% { transform: translate(-8px,-30px) scale(0.85); opacity:0.2; }
          75% { transform: translate(16px,-12px) scale(1.08); opacity:0.5; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing:border-box; }
        .sos-page {
          min-height:100vh;
          font-family: var(--font-body);
          background: var(--bg-primary);
          color: var(--text-primary);
          overflow-x: hidden;
          position: relative;
          transition: background 0.5s ease, color 0.4s ease;
        }
        .sos-page::before {
          content:'';
          position:fixed; inset:0;
          background:
            radial-gradient(ellipse 70% 50% at 30% 0%, var(--overlay-green), transparent),
            radial-gradient(ellipse 50% 40% at 70% 100%, rgba(200,168,78,0.04), transparent);
          pointer-events:none; z-index:0;
          transition: background 0.5s ease;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 32px !important; }
          .hero-inner { padding: 40px 20px 56px !important; }
        }
      `}</style>

      <div className="sos-page">
        <GridOverlay />
        <Particles />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-hero)",
            borderBottom: "1px solid var(--border-primary)",
            animation: "fadeSlideUp 0.7s ease-out both",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)", width: 320, height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,120,54,0.12) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            <div className="hero-inner" style={{
              maxWidth: 1200, margin: "0 auto", padding: "48px 32px 72px",
              position: "relative", zIndex: 1,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 56 }}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "none", border: "none", color: "#c8e0b4",
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                    fontFamily: "var(--font-body)", transition: "all 0.3s ease",
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to Last
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 12,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#c8e0b4", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "var(--font-body)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  {isDark ? "Light" : "Dark"}
                </button>
              </div>

              <div style={{
                width: 68, height: 68, borderRadius: 20,
                background: "linear-gradient(135deg, rgba(200,168,78,0.2), rgba(200,168,78,0.08))",
                border: "1px solid rgba(200,168,78,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <Building size={30} color="#c8a84e" strokeWidth={1.5} />
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--font-display)", fontSize: 50, fontWeight: 400,
                textAlign: "center", color: "#e8ede2", lineHeight: 1.12,
                letterSpacing: "-0.02em", marginBottom: 16,
              }}>
                Secretary of State{" "}
                <span style={{ fontStyle: "italic", color: "#c8a84e" }}>Database 1.0</span>
              </h1>

              <p style={{
                textAlign: "center", fontSize: 16,
                color: "rgba(232,237,226,0.6)", lineHeight: 1.75,
                maxWidth: 600, margin: "0 auto 32px",
              }}>
                Enhanced visual tile layout with advanced filtering for UCC and business search resources across all 50 states plus DC and Puerto Rico.
              </p>

              <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 16, padding: "12px 20px",
                  backdropFilter: "blur(8px)",
                }}>
                  <Search size={20} style={{ color: "#EDEDED" }} />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search states..."
                    style={{
                      width: "100%", background: "transparent",
                      outline: "none", border: "none", color: "#EDEDED",
                      fontSize: 15, fontFamily: "var(--font-body)",
                    }}
                  />
                </div>

                <div style={{
                  display: "flex", flexWrap: "wrap", gap: 8,
                  justifyContent: "center", marginTop: 16,
                }}>
                  <span style={{
                    padding: "5px 14px", borderRadius: 100, fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)", color: "#EDEDED",
                    fontFamily: "var(--font-body)",
                  }}>
                    {filteredData.length} States
                  </span>
                  <span style={{
                    padding: "5px 14px", borderRadius: 100, fontSize: 12,
                    border: "1px solid rgba(200,168,78,0.3)",
                    background: "rgba(200,168,78,0.1)", color: "#c8a84e",
                    fontFamily: "var(--font-body)",
                  }}>
                    {freeCount} Free
                  </span>
                  <span style={{
                    padding: "5px 14px", borderRadius: 100, fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)", color: "#EDEDED",
                    fontFamily: "var(--font-body)",
                  }}>
                    {paidCount} Fee-based
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 24px 80px" }}>
            <div style={{
              background: "var(--bg-card)",
              backdropFilter: "var(--glass-blur)",
              borderRadius: 20,
              border: "1px solid var(--border-primary)",
              padding: 28,
              marginBottom: 40,
              boxShadow: "var(--shadow-card)",
              animation: "fadeSlideUp 0.7s ease-out 0.1s both",
            }}>
              {activeFilters.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {activeFilters.map((filter, idx) => (
                    <span key={`${filter.type}-${filter.value}-${idx}`} style={{
                      display: "inline-flex", alignItems: "center",
                      padding: "4px 12px", borderRadius: 100,
                      fontSize: 12, fontWeight: 600,
                      background: "rgba(200,168,78,0.15)",
                      border: "1px solid rgba(200,168,78,0.3)",
                      color: "#c8a84e", fontFamily: "var(--font-body)",
                    }}>
                      {filter.label}
                      <button
                        onClick={() => handleRemoveActiveFilter(filter.type, filter.value)}
                        style={{
                          marginLeft: 8, background: "none", border: "none",
                          color: "#c8a84e", cursor: "pointer", padding: 0,
                          display: "flex",
                        }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {isMobile && (
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between", padding: "12px 16px",
                    borderRadius: 12, border: "1px solid var(--border-primary)",
                    background: "var(--bg-secondary)", color: "var(--text-primary)",
                    cursor: "pointer", marginBottom: 16, fontFamily: "var(--font-body)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Filter size={16} /> Filters & Sort
                  </span>
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}

              <div style={{ display: isMobile && !showFilters ? "none" : "block" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
                  gap: 20, marginBottom: 20,
                }}>
                  <div>
                    <label style={labelStyle}>Region</label>
                    <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} style={selectStyle}>
                      {regions.map((r) => <option key={r} value={r}>{r === 'all' ? 'All Regions' : r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Filing Method</label>
                    <select value={selectedFilingMethod} onChange={(e) => setSelectedFilingMethod(e.target.value)} style={selectStyle}>
                      {filingMethods.map((m) => <option key={m} value={m}>{m === 'all' ? 'All Methods' : m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Form Type</label>
                    <select value={selectedFormType} onChange={(e) => setSelectedFormType(e.target.value)} style={selectStyle}>
                      {formTypes.map((t) => <option key={t} value={t}>{t === 'all' ? 'All Form Types' : t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Sort By</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} style={{ ...selectStyle, flex: 1 }}>
                        <option value="state">State</option>
                        <option value="region">Region</option>
                        <option value="feeBased">Fee</option>
                        <option value="processingTime">Processing</option>
                      </select>
                      <button onClick={() => setSortAsc((v) => !v)} style={actionBtnStyle} title={sortAsc ? 'Ascending' : 'Descending'}>
                        {sortAsc ? '↑' : '↓'}
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
                    <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} style={{ accentColor: "#c8a84e" }} />
                    Free Only
                  </label>

                  <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <button onClick={handleClearFilters} style={actionBtnStyle} title="Clear all filters"><RotateCcw size={16} /></button>
                    <button onClick={handleExportJSON} style={actionBtnStyle} title="Export JSON"><Download size={16} /></button>
                    <button onClick={handleSaveFilter} style={actionBtnStyle} title="Save filter"><Save size={16} /></button>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        style={{
                          padding: "6px 16px", borderRadius: 100, fontSize: 13,
                          fontWeight: 600, cursor: "pointer",
                          fontFamily: "var(--font-body)",
                          border: isSelected ? "1px solid #c8a84e" : "1px solid var(--border-primary)",
                          background: isSelected ? "rgba(200,168,78,0.2)" : "transparent",
                          color: isSelected ? "#c8a84e" : "var(--text-secondary)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{
                borderTop: "1px solid var(--border-primary)",
                paddingTop: 16, marginTop: 16,
                fontSize: 13, color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}>
                Showing {filteredData.length} of {sosData.length} states, {freeCount} free, {paidCount} fee-based
              </div>
            </div>

            <div style={{ display: "flex", gap: 32 }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                  gap: isMobile ? 20 : 24,
                }}>
                  {filteredData.map((item, index) => (
                    <StateCard
                      key={item.state}
                      item={item}
                      index={index}
                      onDetail={openStateDetail}
                      isMobile={isMobile}
                    />
                  ))}
                </div>

                {filteredData.length === 0 && (
                  <div style={{
                    textAlign: "center", padding: "80px 20px",
                    color: "var(--text-muted)",
                  }}>
                    <MapPin size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
                    <p style={{ fontSize: 18, fontFamily: "var(--font-display)" }}>No states match your filters</p>
                    <p style={{ fontSize: 14, marginTop: 8 }}>Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>

              {!isMobile && (
                <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{
                    background: "var(--bg-card)", backdropFilter: "var(--glass-blur)",
                    borderRadius: 20, border: "1px solid var(--border-primary)",
                    padding: 24, boxShadow: "var(--shadow-card)",
                    animation: "fadeSlideUp 0.7s ease-out 0.2s both",
                  }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--text-primary)", marginBottom: 16 }}>
                      Regional Overview
                    </h3>
                    <div style={{
                      height: 140, borderRadius: 12,
                      border: "2px dashed var(--border-primary)",
                      background: "var(--bg-secondary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ textAlign: "center" }}>
                        <MapPin size={24} style={{ margin: "0 auto 8px", color: "var(--text-muted)" }} />
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Map Coming Soon</p>
                      </div>
                    </div>

                    <h4 style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginTop: 20, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                      Fee Distribution
                    </h4>
                    <div style={{
                      height: 80, borderRadius: 12,
                      border: "2px dashed var(--border-primary)",
                      background: "var(--bg-secondary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{ textAlign: "center" }}>
                        <DollarSign size={18} style={{ margin: "0 auto 4px", color: "var(--text-muted)" }} />
                        <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Chart Coming Soon</p>
                      </div>
                    </div>
                  </div>

                  {recentStates.length > 0 && (
                    <div style={{
                      background: "var(--bg-card)", backdropFilter: "var(--glass-blur)",
                      borderRadius: 20, border: "1px solid var(--border-primary)",
                      padding: 24, boxShadow: "var(--shadow-card)",
                      animation: "fadeSlideUp 0.7s ease-out 0.3s both",
                    }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--text-primary)", marginBottom: 12 }}>
                        Recently Viewed
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {recentStates.map((state, idx) => (
                          <div key={`${state}-${idx}`} style={{
                            fontSize: 13, padding: "8px 12px", borderRadius: 8,
                            color: "var(--text-secondary)",
                            transition: "all 0.3s ease",
                            cursor: "default",
                          }}>
                            {state}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {savedFilters.length > 0 && (
                    <div style={{
                      background: "var(--bg-card)", backdropFilter: "var(--glass-blur)",
                      borderRadius: 20, border: "1px solid var(--border-primary)",
                      padding: 24, boxShadow: "var(--shadow-card)",
                      animation: "fadeSlideUp 0.7s ease-out 0.4s both",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--text-primary)" }}>
                          Saved Filters
                        </h3>
                        <button onClick={handleSaveFilter} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}>
                          <Save size={14} />
                        </button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {savedFilters.map((filter, index) => (
                          <button
                            key={`${filter.name}-${index}`}
                            onClick={() => handleLoadFilter(filter)}
                            style={{
                              width: "100%", textAlign: "left" as const,
                              fontSize: 13, padding: "8px 12px", borderRadius: 8,
                              color: "var(--text-secondary)", background: "transparent",
                              border: draggedFilterIndex === index ? "1px solid #c8a84e" : "1px solid transparent",
                              opacity: draggedFilterIndex === index ? 0.5 : 1,
                              cursor: "pointer", fontFamily: "var(--font-body)",
                              transition: "all 0.3s ease",
                            }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={(e) => handleDragEnter(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                          >
                            {filter.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        style={{
          position: "fixed", bottom: 24, right: 24, padding: 16,
          borderRadius: "50%", border: "none",
          background: "linear-gradient(135deg, #d4af37, #ffd700)",
          color: "#1a1d17", cursor: "pointer",
          boxShadow: "0 8px 32px rgba(212,175,55,0.4)",
          transition: "all 0.3s ease", zIndex: 40,
        }}
        title="Need Help? (Coming Soon)"
      >
        <HelpCircle size={24} />
      </button>

      <StateDetailModal stateData={selectedStateForDetail} onClose={closeStateDetail} />
    </>
  );
};

export default SmallBizReconSOSDatabase;
