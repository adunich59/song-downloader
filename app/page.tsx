"use client";

import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import ForceJoinModal from "@/components/ForceJoinModal";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [url, setUrl] = useState("");
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchSong = async () => {
    if (!url) return alert("Enter YouTube URL");

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.kord.live/api/yt-song?url=${encodeURIComponent(url)}`
      );
      const data = await res.json();
      setSong(data);
    } catch (err) {
      alert("Failed to fetch song");
    }
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <ParticleBackground />
      <ForceJoinModal />

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Kord YT Song Downloader
        </h1>

        <p className="mt-4 text-zinc-300 text-center max-w-xl">
          Download high-quality YouTube songs instantly with beautiful modern UI.
        </p>

        <div className="mt-10 w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-4 shadow-2xl">
          <input
            type="text"
            placeholder="Paste YouTube link..."
            className="w-full bg-transparent outline-none text-lg px-4 py-3"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={fetchSong}
            className="mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-all"
          >
            {loading ? "Fetching..." : "Download Song"}
          </button>
        </div>

        {song && (
          <div className="mt-8 w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6">
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-full rounded-2xl"
            />
            <h2 className="text-2xl font-bold mt-4">{song.title}</h2>

            <a
              href={song.download}
              target="_blank"
              className="inline-block mt-4 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600"
            >
              Download MP3
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
