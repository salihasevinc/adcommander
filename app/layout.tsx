import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdCommander",
  description: "Reklam operasyonları için komuta merkezi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <EnvBanner />
          <div style={{ display: "flex", flex: 1 }}>
            <Sidebar />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Topbar />
              <main
                style={{
                  flex: 1,
                  padding: "24px",
                  backgroundColor: "var(--color-surface-0)",
                }}
              >
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

function EnvBanner() {
  const isLive = process.env.NODE_ENV === "production";
  return (
    <div
      style={{
        backgroundColor: isLive ? "var(--color-error)" : "var(--color-warning)",
        color: "#fff",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        padding: "4px 0",
        fontFamily: "var(--font-mono)",
      }}
    >
      {isLive
        ? "⚡ LIVE — Gerçek reklam API'si aktif"
        : "🧪 SANDBOX — Test ortamı · Canlı reklam API'sine yazılmaz"}
    </div>
  );
}

function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: "▦", href: "/" },
    { label: "Hesaplar", icon: "◈", href: "/accounts" },
    { label: "Kampanyalar", icon: "◉", href: "/campaigns" },
    { label: "Kreatifler", icon: "◧", href: "/creatives" },
    { label: "Raporlar", icon: "▤", href: "/reports" },
  ];

  return (
    <nav
      style={{
        width: "248px",
        minHeight: "100%",
        backgroundColor: "var(--color-surface-1)",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        padding: "16px 0",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "0 20px 20px",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--color-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          AdCommander
        </span>
      </div>

      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            borderRadius: "6px",
            margin: "1px 8px",
          }}
        >
          <span style={{ fontSize: "16px", opacity: 0.7 }}>{item.icon}</span>
          {item.label}
        </a>
      ))}

      <div
        style={{
          marginTop: "auto",
          padding: "16px 20px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
          v0.1.0-alpha
        </span>
      </div>
    </nav>
  );
}

function Topbar() {
  return (
    <header
      style={{
        height: "56px",
        backgroundColor: "var(--color-surface-1)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "12px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 12px",
          backgroundColor: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--color-text-primary)",
        }}
      >
        <span
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            backgroundColor: "var(--color-primary)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          A
        </span>
        Ajans Seç
        <span style={{ color: "var(--color-text-muted)", fontSize: "10px" }}>▼</span>
      </div>

      <div style={{ flex: 1 }} />

      <kbd
        style={{
          padding: "4px 8px",
          backgroundColor: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
          borderRadius: "6px",
          fontSize: "11px",
          color: "var(--color-text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        ⌘K
      </kbd>

      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "var(--color-surface-3)",
          border: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: "var(--color-text-secondary)",
          cursor: "pointer",
        }}
      >
        U
      </div>
    </header>
  );
}
