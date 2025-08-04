// app/boards/page.tsx
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import CreateBoardForm from "@/components/CreateBoardForm";
import Link from "next/link";


export default async function BoardsPage() {
    const { userId } = await auth(); // <- async!

    if (!userId) {
        return <div className="p-4">Neprihlásený používateľ</div>;
    }

    const { data: boards, error } = await supabase
        .from("boards")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Chyba pri načítaní násteniek: {error.message}
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Moje nástenky</h1>
            {boards.length === 0 ? (
                <p>Nemáš žiadne nástenky.</p>
            ) : (
                <ul className="list-disc list-inside">
                    {boards.map((board) => (
                        <li key={board.id}>{board.title}</li>
                    ))}
                </ul>
            )}

            <Link
                href={`/boards/1`}
                className="block p-4 bg-white border rounded shadow hover:bg-gray-50"
            >
                <p className="text-xl font-bold">Board1</p>
            </Link>

        </div>
    );

}
