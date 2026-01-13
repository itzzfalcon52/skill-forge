"use server"
import db from "@/lib/db";


import { currentUser } from "@clerk/nextjs/server"

export const  getCurrentUserData=async ()=>{
   try{
    const user=await currentUser();

    const data=await db.user.findUnique({
        where:{
            clerkId:user.id
        },
        include:{
            submissions:true,
            playlists:true,
            solvedProblems:true

        }
    })
    return data;


   }catch(error){
    console.error("Error getting current user data:",error);
    return {success:false,message:"Internal Server Error"}
    
   }


}