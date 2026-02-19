import { Shield, ShieldCheck, ShieldX, ShieldAlert, Fingerprint } from "lucide-react";

interface DetectionResult {
  plate: string;
  status: string;
  confidence?: number;
}

interface DetectionPanelProps {
  result: DetectionResult | null;
  error: string | null;
}

const DetectionPanel = ({ result, error }: DetectionPanelProps) => {
  const getStatusConfig = () => {
    if (error || !result) {
      return {
        icon: Shield,
        label: "Waiting",
        color: "text-muted-foreground",
        bg: "bg-muted/50",
        ring: "ring-muted",
      };
    }

    const s = result.status?.toLowerCase();

    if (s === "authorized" || s === "permanent") {
      return {
        icon: ShieldCheck,
        label: "Authorized",
        color: "text-success",
        bg: "bg-success/10",
        ring: "ring-success/30",
      };
    }

    if (s === "temporary") {
      return {
        icon: ShieldAlert,
        label: "Temporary",
        color: "text-warning",
        bg: "bg-warning/10",
        ring: "ring-warning/30",
      };
    }

    if (s === "denied" || s === "unknown") {
      return {
        icon: ShieldX,
        label: "Unauthorized",
        color: "text-destructive",
        bg: "bg-destructive/10",
        ring: "ring-destructive/30",
      };
    }

    return {
      icon: Shield,
      label: result.status,
      color: "text-muted-foreground",
      bg: "bg-muted/50",
      ring: "ring-muted",
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Fingerprint className="h-4 w-4 text-primary" />
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground font-semibold">
          Detection Result
        </h2>
      </div>

      <div className="space-y-5">
        {/* Plate display */}
        <div className="p-4 rounded-lg bg-background/50 border border-border/50">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-mono">
            License Plate
          </p>
          <p className="text-3xl font-mono font-bold tracking-[0.15em] text-foreground">
            {result?.plate || "———"}
          </p>
        </div>

        {/* Status badge */}
        <div
          className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg ring-1 ${config.bg} ${config.ring}`}
        >
          <Icon className={`h-5 w-5 ${config.color}`} />
          <span
            className={`text-sm font-semibold font-mono uppercase tracking-wide ${config.color}`}
          >
            {config.label}
          </span>
        </div>

        {/* Confidence */}
        {result?.confidence !== undefined && (
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5 font-mono">
              Confidence
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
              <span className="text-sm font-mono font-medium text-foreground">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
          <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
          <p className="text-xs text-destructive font-mono">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DetectionPanel;
