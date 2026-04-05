"use client";

import { useEffect, useState } from "react";

export default function ForceJoinModal() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold">Join Our Socials</h2>
        <p className="text-zinc-400 mt-2">
          Join before using the downloader
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="https://t.me/elindleeupdates"
            target="_blank"
            className="bg-cyan-500 py-3 rounded-xl"
          >
            Join Telegram
          </a>

          <button
            onClick={() => setOpen(false)}
            className="bg-purple-600 py-3 rounded-xl"
          >
            I Joined
          </button>
        </div>
      </div>
    </div>
  );
}
