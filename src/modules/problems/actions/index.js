"use server"
import db from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/actions";
import { currentUser } from "@clerk/nextjs/server";
import { get } from "react-hook-form";
import { currentUserRole } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";

export async function getAllProblems() {
    try {
      const user = await currentUser();
  
      const problems = await db.problem.findMany({
        include: {
          solvedBy: user
            ? {
                where: {
                  user: {
                    clerkId: user.id,
                  },
                },
              }
            : false,
        },
        orderBy: { createdAt: "desc" },
      });
  
      return {
        success: true,
        data: problems, 
      };
    } catch (error) {
      console.error("❌ Error fetching problems:", error);
      return {
        success: false,
        data: [], 
        message: "Failed to fetch problems",
      };
    }
  }
  

export async function getProblemById(problemId){
    try{
        const problem=await db.problem.findUnique({
            where:{id:problemId}
        });

        if(!problem){
            return {success:false,message:"Problem not found"};
        }

        return {success:true,data:problem};

    }catch(error){
        console.error("❌ Error fetching problem by ID:",error);
        return {success:false,message:"Failed to fetch problem"};
    }
}

export async function deleteProblem(problemId){
    try{
        const userRole=await currentUserRole()

        if(userRole!=="ADMIN"){
            return {success:false,message:"Unauthorized"};
        }
        const problem=await db.problem.findUnique({
            where:{id:problemId}
        });

        if(!problem){
            return {success:false,message:"Problem not found"};
        }

        await db.problem.delete({
            where:{id:problemId}
        });

        revalidatePath("/problems")

        return {success:true,message:"Problem deleted successfully"};

    }catch(error){
        console.error("❌ Error deleting problem by ID:",error);
        return {success:false,message:"Failed to delete problem"};
    }
}