export default function YTSongDownloaderPage() {
  "use client";
  const { useEffect, useMemo, useRef, useState } = require("react");
  const { motion, AnimatePresence } = require("framer-motion");
  const { Download, Music2, Search, Waves, Lock, Sparkles } = require("lucide-react");

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: Math.random() * 2 + 1,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const bars = useMemo(() => Array.from({ length: 24 }), []);

  const handleFetch = async () => {
    if (!joined) return;
    setLoading(true);
    setProgress(0);
    setResult(null);

    const timer = setInterval(() => {
      setProgress((p) => (p < 92 ? p + 8 : p));
    }, 180);

    try {
      const res = await fetch(`https://api.kord.live/api/yt-song?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
      setProgress(100);
    } catch (e) {
      console.error(e);
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white relative">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Music2 className="w-9 h-9" /> YT Song Downloader
              </h1>
              <p className="text-white/70 mt-2">Beautiful glassmorphism UI • live particles • waveform animations</p>
            </div>
            <div className="text-right text-sm text-white/70">
              <p className="font-semibold flex items-center gap-2 justify-end"><Sparkles className="w-4 h-4" /> Developer Namespace</p>
              <p>Built by ADUNICH</p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-4">
            <input
              value={url}
              onChange={(e:any) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here"
              className="w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              onClick={handleFetch}
              className="rounded-2xl px-6 py-4 bg-cyan-500 hover:bg-cyan-400 transition font-semibold flex items-center gap-2"
            >
              <Search className="w-5 h-5" /> Fetch Song
            </button>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm text-white/70">Animated waveform</p>
            <div className="flex items-end gap-1 h-16">
              {bars.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [10, 50, 18, 60, 12] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.05 }}
                  className="w-2 rounded-full bg-white/70"
                />
              ))}
            </div>
          </div>

          {!joined && (
            <div className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-400/10 p-5">
              <p className="font-semibold flex items-center gap-2"><Lock className="w-4 h-4" /> t.me/elindleeupdates</p>
              <p className="text-sm text-white/70 mt-1">Join the Telegram community before downloading.</p>
              <button onClick={() => setJoined(true)} className="mt-4 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20">I Joined, Continue</button>
            </div>
          )}

          <AnimatePresence>
            {(loading || progress > 0) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8">
                <div className="flex justify-between text-sm mb-2 text-white/70">
                  <span>Live download progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full bg-cyan-400" animate={{ width: `${progress}%` }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-white/10 border border-white/20 p-5 backdrop-blur-xl">
                <h2 className="font-bold text-xl">Song Details</h2>
                <pre className="text-xs mt-3 whitespace-pre-wrap text-white/80">{JSON.stringify(result, null, 2)}</pre>
              </div>
              <div className="rounded-3xl bg-white/10 border border-white/20 p-5 flex flex-col justify-center">
                <button className="rounded-2xl py-4 bg-emerald-500 hover:bg-emerald-400 font-semibold flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Audio
                </button>
                <p className="text-xs text-white/60 mt-3">Hook this button to the returned download URL from the API response.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
