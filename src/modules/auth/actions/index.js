"use server"
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";



export async function onBoardUser(){
    try{

        const user=await currentUser();
        if(!user){
            return {success:false,message:"User not found"}
        }
       const {id,firstName,lastName,emailAddresses,imageUrl}=user;

       const newUser=await db.user.upsert({  //upsert means if user doesnt exist then create that user,if he exists,then update it
        where:{clerkId:id},
        update:{
            firstName:firstName||null,
            lastName:lastName||null,
            email:emailAddresses[0]?.emailAddress||"",
            imageUrl: typeof imageUrl === "string" ? imageUrl : null
        },
        create:{
            clerkId:id,
            firstName:firstName||null,
            lastName:lastName||null,
            email:emailAddresses[0]?.emailAddress||null,
            imageUrl: typeof imageUrl === "string" ? imageUrl : null
        }
       })

       return({
        success:true,
        user:newUser,
        message:"User onboarded successfully"
       })
    }catch(err){
        console.error("Error onboarding user:",err);
        return({success:false,message:"Internal server error"})

    }
}

export const currentUserRole = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return { success: false, error: "No authenticated user found" };
        }

        const { id } = user;

        const userRole = await db.user.findUnique({
            where: {
                clerkId: id
            },
            select: {
                role: true
            }
        }); 

        return userRole.role;
    } catch (error) {
        console.error("❌ Error fetching user role:", error);
        return { success: false, error: "Failed to fetch user role" };
    }
};

export const getCurrentUser = async () => {
    const user=await currentUser();
    const dbUser=await db.user.findUnique({
        where:{clerkId:user.id},
        select:{id:true}
        
    })
    return dbUser;
}
