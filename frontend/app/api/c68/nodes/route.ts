/**
 * API route: /api/c68/nodes
 *
 * Returns all Class 6-8 enrichment nodes from the CISCE .marker files.
 * Runs server-side via C68DataLoader (which uses fs to read D:\cisce).
 *
 * Query params:
 *   ?class=6       — filter by class level
 *   ?subject=physics — filter by subject
 *   ?nodeId=c6_phy_001 — get a single node by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadAllNodes, getNodesByClass, getNodesByClassSubject, getNodeById, getClassInfo } from '../../../../lib/c68/C68DataLoader';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const classLevel = params.get('class');
    const subject = params.get('subject');
    const nodeId = params.get('nodeId');

    // Single node lookup
    if (nodeId) {
      const node = getNodeById(nodeId);
      if (!node) {
        return NextResponse.json({ error: 'Node not found' }, { status: 404 });
      }
      return NextResponse.json({ node });
    }

    // Class + subject filter
    if (classLevel && subject) {
      const nodes = getNodesByClassSubject(parseInt(classLevel, 10), subject);
      return NextResponse.json({ nodes, count: nodes.length });
    }

    // Class only
    if (classLevel) {
      const nodes = getNodesByClass(parseInt(classLevel, 10));
      return NextResponse.json({ nodes, count: nodes.length });
    }

    // All nodes
    const nodes = loadAllNodes();
    return NextResponse.json({ nodes, count: nodes.length });
  } catch (err) {
    console.error('[API /c68/nodes] Error:', err);
    return NextResponse.json(
      { error: 'Failed to load enrichment data', details: String(err) },
      { status: 500 }
    );
  }
}
