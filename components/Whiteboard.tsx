"use client";

import React, { useCallback } from "react";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background,
    type Node,
    type Edge,
    type Connection,
} from "reactflow";
import "reactflow/dist/style.css";

export default function Whiteboard({ boardId }: { boardId: string }) {
    const initialNodes: Node[] = [
        {
            id: "1",
            data: { label: "Začiatok" },
            position: { x: 250, y: 100 },
            type: "default",
        },
    ];

    const initialEdges: Edge[] = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection: Connection) => {
        setEdges((eds) => addEdge(connection, eds));
    }, []);

    return (
        <div style={{ width: "100%", height: "80vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}
