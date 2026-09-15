"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export default function LessonPage() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    api.getNodes().then(setNodes).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedNode) {
      api.getContent(selectedNode).then(setContent).catch(() => setContent(null));
    }
  }, [selectedNode]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Lesson View</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h2 className="font-semibold text-gray-700">Select a node:</h2>
          {nodes.slice(0, 20).map((n) => (
            <button
              key={n.node_id}
              onClick={() => setSelectedNode(n.node_id)}
              className={`block w-full text-left p-3 rounded border transition ${
                selectedNode === n.node_id
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-sm font-medium">{n.node_id}</span>
              <br />
              <span className="text-xs text-gray-500">{n.title}</span>
            </button>
          ))}
        </div>
        <div className="md:col-span-2">
          {selectedNode && content ? (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">{content.title || selectedNode}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Content Summary</h3>
                  <p className="text-sm text-gray-600">
                    Node-level items: {content.node_level_count}<br />
                    Theme-level items: {content.theme_level_count}<br />
                    Class-level items: {content.class_level_count}<br />
                    Total: {content.total_items}
                  </p>
                </div>
                {content.node_level?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Specific Content</h3>
                    <ul className="text-sm space-y-1">
                      {content.node_level.slice(0, 5).map((c: any, i: number) => (
                        <li key={i} className="text-gray-600">
                          {c.section}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-6 text-gray-400">
              Select a node to view its lesson content.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
