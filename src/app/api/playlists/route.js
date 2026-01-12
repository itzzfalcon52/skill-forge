import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function GET(req){
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

        const playlists=await db.playlist.findMany({
            where:{userId:dbUser.id},
            include:{
                problems:{
                    include:{
                        problem:{
                            select:{
                                id:true,
                                title:true,
                                difficulty:true
                            }
                        }
                    }
                }

            },
            orderBy:{createdAt:"desc"}

        })

        return new Response(JSON.stringify({success:true,playlists}),{status:200});
    
       
    }catch(error){
        console.error("Error getting playlist:",error);
        return new Response(JSON.stringify({success:false,message:"Internal Server Error"}),{status:500});
    }

}


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

    const {name,description}=await req.json();

    if(!name){
        return new Response(JSON.stringify({success:false,message:"Name is required"}),{status:400});
    }
    const playlistData=await db.playlist.create({
        data:{
            name,
            description,
            userId:dbUser.id
        }
    })

    return new Response(JSON.stringify({success:true,playlist:playlistData}),{status:201});
}catch(error){
    console.error("Error creating playlist:",error);
    return new Response(JSON.stringify({success:false,message:"Internal Server Error"}),{status:500});
}
}