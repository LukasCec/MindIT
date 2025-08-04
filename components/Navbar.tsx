"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo / Name */}
                    <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
                        MindIT
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/boards" className="text-gray-700 hover:text-blue-600 font-medium">
                            Nástenky
                        </Link>
                        <Link href="/boards/new" className="text-gray-700 hover:text-blue-600 font-medium">
                            Nová nástenka
                        </Link>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="bg-blue-600 text-white px-4 py-1.5 rounded">
                                    Prihlásiť sa
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setOpen(!open)} className="text-gray-700">
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <Link href="/boards" className="block text-gray-700 hover:text-blue-600">
                        Nástenky
                    </Link>
                    <Link href="/boards/new" className="block text-gray-700 hover:text-blue-600">
                        Nová nástenka
                    </Link>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded">
                                Prihlásiť sa
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <div className="mt-2">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SignedIn>
                </div>
            )}
        </nav>
    );
}
