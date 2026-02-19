import { Video } from "lucide-react";

interface CameraFeedProps {
  src: string;
}

const CameraFeed = ({ src }: CameraFeedProps) => {
  return (
    <div className="glass-card-glow relative overflow-hidden aspect-video">
      {/* LIVE badge */}
      <div className="absolute top-4 left-4 z-10 live-badge">
        <span className="live-dot" />
        <span className="font-mono">Live</span>
      </div>

      {/* Timestamp */}
      <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-sm border border-border/50">
        <span className="text-xs font-mono text-muted-foreground">CAM-01</span>
      </div>

      <img
        src={src}
        alt="Live camera feed"
        className="w-full h-full object-cover rounded-xl"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
        }}
      />
      <div className="hidden absolute inset-0 flex items-center justify-center flex-col gap-4 text-muted-foreground">
        <div className="p-4 rounded-full bg-muted/50">
          <Video className="h-10 w-10" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-foreground/70">Camera Feed Unavailable</p>
          <p className="text-xs font-mono text-muted-foreground">Ensure server is running at localhost:5000</p>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
