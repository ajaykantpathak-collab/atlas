/**
 * useEnrichmentData — Client-side hook for loading Class 6-8 enrichment data.
 *
 * Fetches nodes from /api/c68/nodes and converts them to simulation-ready props
 * using the SimulationPropsMapper.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { EnrichmentNode } from '../game-engine/EnrichmentParser';
import { enrichNodeToSimProps, type SimulationProps } from '../c68/SimulationPropsMapper';

// ─── Types ────────────────────────────────────────────────────

export interface NodeSummary {
  nodeId: string;
  title: string;
  subject: string;
  classLevel: number;
  cognitiveLevel: string;
  masteryCriteria: string;
}

// ─── Hook: Load all nodes for a class/subject ─────────────────

export function useNodes(classLevel: number | null, subject: string | null) {
  const [nodes, setNodes] = useState<NodeSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!classLevel || !subject) {
      setNodes([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/c68/nodes?class=${classLevel}&subject=${subject}`)
      .then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const summaries: NodeSummary[] = (data.nodes || []).map((n: EnrichmentNode) => ({
          nodeId: n.nodeId,
          title: n.title,
          subject: n.subject,
          classLevel: n.classLevel,
          cognitiveLevel: n.cognitiveLevel,
          masteryCriteria: n.masteryCriteria,
        }));
        setNodes(summaries);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        setNodes([]);
      });
  }, [classLevel, subject]);

  return { nodes, loading, error };
}

// ─── Hook: Load a single node with full enrichment data ───────

export function useNodeDetails(nodeId: string | null) {
  const [simProps, setSimProps] = useState<SimulationProps | null>(null);
  const [rawNode, setRawNode] = useState<EnrichmentNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNode = useCallback((id: string) => {
    setLoading(true);
    setError(null);

    fetch(`/api/c68/nodes?nodeId=${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.node) {
          throw new Error('Node not found');
        }
        const node = data.node as EnrichmentNode;
        setRawNode(node);
        setSimProps(enrichNodeToSimProps(node));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        setSimProps(null);
        setRawNode(null);
      });
  }, []);

  useEffect(() => {
    if (nodeId) {
      loadNode(nodeId);
    } else {
      setSimProps(null);
      setRawNode(null);
    }
  }, [nodeId, loadNode]);

  return { simProps, rawNode, loading, error };
}
