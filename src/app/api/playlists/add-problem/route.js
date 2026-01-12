import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";
export async function POST(req){
    try{
        const user= await currentUser();
        if(!user){
            return new Response(JSON.stringify({success:false,message:"Unauthorized"}),{status:401});
        }
        const dbUser=await db.user.findUnique({
            where:{clerkId:user.id}
        })
        if(!dbUser){
            return new Response(JSON.stringify({success:false,message:"User not found"}),{status:404});
        }

        const {playlistId,problemId}=await req.json();

        if(!playlistId||!problemId){
            return new Response(JSON.stringify({success:false,message:"Playlist ID and Problem ID are required"}),{status:400});
        }

        const playlist=await db.playlist.findFirst({
            where:{id:playlistId,userId:dbUser.id}
        })

        if(!playlist){
            return new Response(JSON.stringify({success:false,message:"Playlist not found"}),{status:404});
        }

        const problemInPlaylist=await db.problemInPlaylist.create({
            data:{
                playlistId,
                problemId
            }
        })

        return new Response(JSON.stringify({success:true,problemInPlaylist}),{status:200});






    }catch(error){
        console.error("Error adding problem to playlist:",error);
        return new Response(JSON.stringify({success:false,message:"Internal Server Error"}),{status:500});
    }

}