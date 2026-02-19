import { useState } from "react";
import { UserPlus, Clock, XCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ActionPanelProps {
  plate: string | undefined;
}

const ActionPanel = ({ plate }: ActionPanelProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAdd = async (type: "permanent" | "temporary") => {
    if (!plate) {
      toast({ title: "No plate detected", description: "Wait for a vehicle to be detected.", variant: "destructive" });
      return;
    }
    setLoading(type);
    try {
      const owner = type === "permanent" ? "Staff" : "Guest";
      const res = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate, owner, type }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Access Granted", description: `${plate} added as ${type} (${owner}).` });
    } catch {
      toast({ title: "Error", description: "Failed to register vehicle.", variant: "destructive" });
    } finally {
      setLoading(null);
    }
  };

  const handleDeny = () => {
    toast({ title: "Access Denied", description: `Vehicle ${plate || "unknown"} has been denied access.`, variant: "destructive" });
  };

  return (
    <div className="glass-card p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground font-semibold">
          Quick Actions
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={() => handleAdd("permanent")}
          disabled={loading === "permanent"}
          className="btn-action bg-success hover:bg-success/90 text-success-foreground"
        >
          <UserPlus className="h-4 w-4" />
          {loading === "permanent" ? "Adding…" : "Permanent Access"}
        </Button>

        <Button
          onClick={() => handleAdd("temporary")}
          disabled={loading === "temporary"}
          className="btn-action bg-warning hover:bg-warning/90 text-warning-foreground"
        >
          <Clock className="h-4 w-4" />
          {loading === "temporary" ? "Adding…" : "Temporary Access"}
        </Button>

        <Button
          onClick={handleDeny}
          variant="destructive"
          className="btn-action"
        >
          <XCircle className="h-4 w-4" />
          Deny Access
        </Button>
      </div>
    </div>
  );
};

export default ActionPanel;
