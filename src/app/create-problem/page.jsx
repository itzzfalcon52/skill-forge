import { Button } from '@/components/ui/button';
import { currentUserRole } from '@/modules/auth/actions';
import { currentUser } from '@clerk/nextjs/server'
import { ArrowLeft } from 'lucide-react';
import {redirect} from 'next/navigation';
import CreateProblemForm from '@/modules/problems/components/CreateProblemForm';

import Link from 'next/link';
import React from 'react'
import ModeToggle from '@/components/ui/mode-toggle';

async function CreateProblemPage() {
    const user=await currentUser();
    const userRole=await currentUserRole();
    if(userRole!=='ADMIN'){
        redirect('/');
    }
  return (
    <section className='flex flex-col items-center justify-center mx-4 my-4 '>
        <div className='flex flex-row justify-between w-full items-center'>
            <Link href={"/"}>
            <Button variant={"outline"} size={"icon" }>
                <ArrowLeft className='size-4'></ArrowLeft>

            </Button>
            </Link>
            <h1 className='text-3xl font-bold text-amber-400'>Welcome {user?.firstName}! Create a Problem</h1>
            <ModeToggle/>

           

        </div>
        <CreateProblemForm/>
    </section>
  )
}

export default CreateProblemPage
