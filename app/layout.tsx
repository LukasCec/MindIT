// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body>
            <header className="p-4 border-b flex justify-end gap-4">
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
            {children}
            </body>
            </html>
        </ClerkProvider>
    );
}
