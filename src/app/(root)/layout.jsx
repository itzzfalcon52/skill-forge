
import { currentUserRole } from "@/modules/auth/actions";
import React from "react";
import Navbar from "@/modules/home/components/Navbar";

const RootLayout = async({ children }) => {
    const userRole = await currentUserRole();
  
 
  return (
    <main className="  flex flex-col min-h-screen max-h-screen ">
      <Navbar userRole={userRole}/>
      <div className="pt-28 flex-1 flex flex-col px-4 pb-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_1px_1px,#a0aec0_1px,transparent_0)] bg-[size:18px_18px] dark:bg-[radial-gradient(circle_at_1px_1px,#2d3748_1px,transparent_0)]" />

    
        {children}
        </div>
    </main>
  );
};

export default RootLayout;
