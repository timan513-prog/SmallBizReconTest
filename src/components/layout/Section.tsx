import { ReactNode } from 'react';

interface SectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const Section = ({ icon, title, children }: SectionProps) => (
  <div style={{
    position: "relative",
    overflow: "hidden",
    background: "var(--bg-card)",
    backdropFilter: "var(--glass-blur)",
    WebkitBackdropFilter: "var(--glass-blur)",
    border: "1px solid var(--border-primary)",
    borderRadius: 20,
    padding: "32px 28px",
    transition: "all 0.4s ease",
    animation: "cardReveal 0.6s ease-out both",
  }}>
    <div style={{ display: "flex", alignItems: "start", gap: 16, marginBottom: 20 }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: "var(--badge-bg)",
        border: "1px solid var(--badge-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--accent-green)",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: 24,
        fontWeight: 400,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h2>
    </div>
    <div style={{
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--text-secondary)",
      lineHeight: 1.75,
    }}>
      {children}
    </div>
  </div>
);
