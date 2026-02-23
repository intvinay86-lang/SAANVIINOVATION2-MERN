export default function GlobeLoader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[400px]">
      <div className="text-center">
        {/* Animated globe loader */}
        <div className="relative inline-block">
          {/* Rotating rings - simulating globe */}
          <div className="relative w-24 h-24">
            {/* Horizontal ring */}
            <div
              className="absolute inset-0 border-2 border-orange-500/40 rounded-full animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>

            {/* Vertical ring 1 */}
            <div
              className="absolute inset-0 border-2 border-orange-500/30 rounded-full animate-spin"
              style={{ animationDuration: "2s", transform: "rotateY(60deg)" }}
            ></div>

            {/* Vertical ring 2 */}
            <div
              className="absolute inset-0 border-2 border-black/20 rounded-full animate-spin"
              style={{
                animationDuration: "2.5s",
                transform: "rotateY(-60deg)",
              }}
            ></div>

            {/* Center sphere */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-black/10 rounded-full animate-pulse border border-orange-500/40"></div>
            </div>

            {/* Orbiting dots */}
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "4s" }}
            >
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full -translate-x-1/2"></div>
            </div>
            <div
              className="absolute inset-0 animate-spin"
              style={{
                animationDuration: "3.5s",
                animationDirection: "reverse",
              }}
            >
              <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-black rounded-full -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <p
          className="mt-4 text-orange-500 font-mono text-xs uppercase tracking-widest animate-pulse"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
