import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import WhiteboardWrapper from "@/components/WhiteboardWrapper";
import IdeaPalette from "@/components/IdeaPalette";

export default async function BoardDetail({ params }: { params: { id: string } }) {
    const { userId } = await auth();
    const boardId = params.id;

    if (!userId) return notFound();

    const { data: board, error } = await supabase
        .from("boards")
        .select("*")
        .eq("id", boardId)
        .eq("user_id", userId)
        .single();

    if (!board || error) return notFound();

    return (
        <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <h1 className="text-2xl font-bold mb-4">{board.title}</h1>
                <WhiteboardWrapper boardId={boardId} />
            </div>
            <IdeaPalette boardId={boardId} />
        </div>
    );
}
