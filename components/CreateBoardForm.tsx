"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase-browser";

export default function CreateBoardForm() {
    const [title, setTitle] = useState("");
    const router = useRouter();
    const { userId } = useAuth();

    const handleCreate = async () => {
        if (!title || !userId) return;

        const { error } = await supabase.from("boards").insert({
            title,
            user_id: userId,
        });

        if (!error) {
            setTitle("");
            router.refresh();
        } else {
            alert("Chyba pri vytváraní nástenky: " + error.message);
        }
    };

    return (
        <div className="mt-6">
            <input
                className="border px-3 py-2 rounded mr-2"
                placeholder="Názov nástenky"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleCreate}
            >
                Vytvoriť
            </button>
        </div>
    );
}
