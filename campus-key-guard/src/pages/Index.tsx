import { ShieldCheck, Activity } from "lucide-react";
import CameraFeed from "@/components/CameraFeed";
import DetectionPanel from "@/components/DetectionPanel";
import ActionPanel from "@/components/ActionPanel";
import { useDetectionResult } from "@/hooks/useDetectionResult";

const Index = () => {
  const { result, error } = useDetectionResult("http://localhost:5000/result");

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />

      {/* Header */}
      <header className="relative border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-foreground">SecureGate</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Campus Vehicle ID</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 ring-1 ring-success/20">
              <Activity className="h-3 w-3 text-success" />
              <span className="text-xs font-mono text-success font-medium">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera - takes 2 cols */}
          <div className="lg:col-span-2">
            <CameraFeed src="http://localhost:5000/video" />
          </div>

          {/* Side panels */}
          <div className="space-y-6">
            <DetectionPanel result={result} error={error} />
            <ActionPanel plate={result?.plate} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
