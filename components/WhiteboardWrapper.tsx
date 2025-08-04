"use client";

import dynamic from "next/dynamic";

const Whiteboard = dynamic(() => import("./Whiteboard"), { ssr: false });

export default function WhiteboardWrapper({ boardId }: { boardId: string }) {
    return <Whiteboard boardId={boardId} />;
}
