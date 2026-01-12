"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PlaylistDetailsPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const res = await fetch(`/api/playlists/${id}`);
      const data = await res.json();
      if (data.success) {
        setPlaylist(data.playlist);
      }
      setLoading(false);
    };

    fetchPlaylist();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!playlist) {
    return <p className="text-center">Playlist not found</p>;
  }

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{playlist.name}</h1>
        <p className="text-muted-foreground">{playlist.description}</p>
      </div>

      {playlist.problems.length === 0 ? (
        <p>No problems in this playlist yet.</p>
      ) : (
        <div className="space-y-4">
          {playlist.problems.map((item, index) => (
            <Link key={item.problem.id} href={`/problem/${item.problem.id}`}>
              <Card className="hover:shadow transition cursor-pointer">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">
                      {index + 1}. {item.problem.title}
                    </p>
                  </div>
                  <Badge>{item.problem.difficulty}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
