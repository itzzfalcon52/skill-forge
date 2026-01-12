"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Loader2, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function MyPlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await fetch("/api/playlists");
      const data = await res.json();
      if (data.success) {
        setPlaylists(data.playlists);
      }
      setLoading(false);
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] w-full">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">📂 My Playlists</h1>
        <p className="text-muted-foreground mt-1">
          Your curated problem collections
        </p>
      </div>

      {playlists.length === 0 ? (
        <p className="text-muted-foreground">You haven’t created any playlists yet.</p>
      ) : (
        <div className="space-y-4">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/my-playlists/${playlist.id}`}>
                <Card
                  className="
                    w-full p-5 flex items-center justify-between
                    hover:shadow-lg hover:-translate-y-[1px]
                    transition-all cursor-pointer
                  "
                >
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-muted">
                      <Folder className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        {playlist.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {playlist.description || "No description"}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <Badge variant="secondary" className="text-sm">
                    {playlist.problems.length} problems
                  </Badge>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
