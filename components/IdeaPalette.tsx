"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { useAuth } from "@clerk/nextjs";
import { Plus, Trash2 } from "lucide-react";

export default function IdeaPalette({ boardId }: { boardId: string }) {
    const { userId } = useAuth();
    const [ideas, setIdeas] = useState<any[]>([]);
    const [newIdea, setNewIdea] = useState("");

    // Load ideas
    useEffect(() => {
        if (!userId) return;

        const loadIdeas = async () => {
            const { data, error } = await supabase
                .from("ideas")
                .select("*")
                .eq("user_id", userId)
                .eq("status", "draft")
                .order("created_at", { ascending: false });

            if (!error) setIdeas(data || []);
        };

        loadIdeas();
    }, [userId]);

    // Add new idea
    const handleAdd = async () => {
        if (!newIdea.trim()) return;

        const { data, error } = await supabase.from("ideas").insert({
            content: newIdea,
            user_id: userId,
            board_id: boardId,
        });

        if (!error) {
            setNewIdea("");
            setIdeas((prev) => [data![0], ...prev]);
        }
    };

    // Delete idea
    const handleDelete = async (id: string) => {
        await supabase.from("ideas").delete().eq("id", id);
        setIdeas((prev) => prev.filter((idea) => idea.id !== id));
    };

    return (
        <aside className="w-full md:w-80 p-4 border-l bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">💡 Nápady</h2>

            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="text"
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    placeholder="Nový nápad"
                    className="flex-1 px-3 py-2 border rounded"
                />
                <button onClick={handleAdd} className="bg-blue-600 text-white p-2 rounded">
                    <Plus size={18} />
                </button>
            </div>

            <ul className="space-y-2">
                {ideas.map((idea) => (
                    <li key={idea.id} className="p-2 bg-white rounded shadow flex justify-between items-center">
                        <span className="text-sm text-gray-800">{idea.content}</span>
                        <button onClick={() => handleDelete(idea.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={16} />
                        </button>
                    </li>
                ))}
                {ideas.length === 0 && (
                    <p className="text-sm text-gray-500 italic">Žiadne nápady zatiaľ.</p>
                )}
            </ul>
        </aside>
    );
}
