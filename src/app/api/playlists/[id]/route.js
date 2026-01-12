import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), { status: 404 });
    }

    const playlistId = params.id;

    const playlist = await db.playlist.findFirst({
      where: {
        id: playlistId,
        userId: dbUser.id, // 🔒 important security check
      },
      include: {
        problems: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
              },
            },
          },
        },
      },
    });

    if (!playlist) {
      return new Response(JSON.stringify({ success: false, message: "Playlist not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, playlist }), { status: 200 });

  } catch (error) {
    console.error("Error getting playlist:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), { status: 500 });
  }
}
