const kpiData = [
  { label: "Toplam Harcama", value: "₺48.230", delta: "+12%", deltaPositive: true, sub: "Bu ay" },
  { label: "Ortalama CTR", value: "3.84%", delta: "+0.3pp", deltaPositive: true, sub: "Tüm hesaplar" },
  { label: "Ortalama CPC", value: "₺2,14", delta: "-8%", deltaPositive: true, sub: "Tüm hesaplar" },
  { label: "ROAS", value: "4.2x", delta: "-0.4x", deltaPositive: false, sub: "Son 30 gün" },
];

const campaigns = [
  { name: "Yaz Koleksiyonu — Meta", status: "PAUSED", spend: "₺12.400", ctr: "4.1%", cpc: "₺1,80" },
  { name: "Google Search — Marka", status: "LIVE", spend: "₺8.750", ctr: "6.2%", cpc: "₺0,94" },
  { name: "Retargeting — Meta", status: "PAUSED", spend: "₺5.200", ctr: "2.8%", cpc: "₺2,60" },
  { name: "YouTube Awareness", status: "PENDING", spend: "₺0", ctr: "—", cpc: "—" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  PAUSED: { bg: "rgba(107,114,128,0.15)", color: "#9BA3B2" },
  LIVE: { bg: "rgba(14,159,110,0.15)", color: "#0E9F6E" },
  PENDING: { bg: "rgba(199,119,0,0.15)", color: "#C77700" },
  DRAFT: { bg: "rgba(107,114,128,0.1)", color: "#5C6375" },
};

export default function Dashboard() {
  return (
    <div style={{ maxWidth: "1200px" }}>
      {/* Page header */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: "4px 0 0" }}>
          Son 30 gün · Tüm hesaplar
        </p>
      </div>

      {/* KPI tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {kpiData.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              backgroundColor: "var(--color-surface-1)",
              border: "1px solid var(--color-border)",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--color-text-muted)",
                marginBottom: "8px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {kpi.label}
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {kpi.value}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: kpi.deltaPositive ? "var(--color-positive)" : "var(--color-error)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {kpi.delta}
              </span>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                {kpi.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns table */}
      <div
        style={{
          backgroundColor: "var(--color-surface-1)",
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Kampanyalar
          </h2>
          <button
            style={{
              padding: "6px 14px",
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Yeni Kampanya
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              {["Kampanya", "Durum", "Harcama", "CTR", "CPC"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 20px",
                    textAlign: h === "Kampanya" || h === "Durum" ? "left" : "right",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => {
              const s = statusStyle[c.status] ?? statusStyle.DRAFT;
              return (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < campaigns.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <td style={{ padding: "14px 20px", fontSize: "14px", color: "var(--color-text-primary)", fontWeight: 500 }}>
                    {c.name}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        backgroundColor: s.bg,
                        color: s.color,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {c.status === "LIVE" && <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-positive)", display: "inline-block" }} />}
                      {c.status}
                    </span>
                  </td>
                  {[c.spend, c.ctr, c.cpc].map((v, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "14px 20px",
                        textAlign: "right",
                        fontSize: "14px",
                        fontFamily: "var(--font-mono)",
                        fontVariantNumeric: "tabular-nums",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
