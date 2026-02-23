export default function Loading({ text = "Loading...", fullScreen = true }) {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "h-full"}`}
    >
      <div className="text-center">
        {/* Animated rings loader */}
        <div className="relative inline-block">
          {/* Outer ring */}
          <div className="w-16 h-16 border-2 border-orange-500/20 rounded-full"></div>

          {/* Spinning ring */}
          <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-orange-500 border-r-orange-500 rounded-full animate-spin"></div>

          {/* Inner pulsing ring */}
          <div className="absolute inset-2 w-12 h-12 border-2 border-black/30 rounded-full animate-ping"></div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <p
          className="mt-4 text-orange-500 font-mono text-sm uppercase tracking-widest animate-pulse"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
