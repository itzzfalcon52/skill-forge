"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import ModeToggle from "@/components/ui/mode-toggle";

const Navbar = ({ userRole }) => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
           
            <span className="font-bold text-2xl tracking-widest text-amber-300">
              SkillForge
            </span>
          </Link>

          <div className="flex gap-x-4">
            <Link href="/problems">Problems</Link>
            <Link href="/about">About</Link>
            <Link href="/profile">Profile</Link>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            <SignedIn>
              {userRole === "ADMIN" && (
                <Link href="/create-problem">
                  <Button variant="outline">Create Problem</Button>
                </Link>
              )}
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-amber-400">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
