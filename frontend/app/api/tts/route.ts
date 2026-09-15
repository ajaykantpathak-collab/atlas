/**
 * TTS Proxy API Route
 *
 * Proxies text-to-speech requests to Google Translate TTS (free, natural voices).
 * Avoids CORS issues when calling from the browser.
 *
 * Usage: /api/tts?text=Hello&lang=en
 * Returns: audio/mpeg MP3
 */

import { NextRequest, NextResponse } from 'next/server';

const CACHE = new Map<string, Buffer>();
const MAX_CACHE = 200;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const lang = searchParams.get('lang') || 'en';

  if (!text) {
    return NextResponse.json({ error: 'Missing text parameter' }, { status: 400 });
  }

  // Limit text length (Google TTS has ~200 char limit)
  const truncated = text.substring(0, 200);

  // Check cache
  const cacheKey = `${lang}:${truncated}`;
  if (CACHE.has(cacheKey)) {
    const cached = CACHE.get(cacheKey)!;
    return new NextResponse(new Uint8Array(cached), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': cached.length.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  try {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(truncated)}&tl=${lang}&client=tw-ob`;

    const response = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://translate.google.com/',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `TTS service returned ${response.status}` }, { status: 502 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Cache the result
    if (CACHE.size >= MAX_CACHE) {
      const firstKey = CACHE.keys().next().value;
      if (firstKey) CACHE.delete(firstKey);
    }
    CACHE.set(cacheKey, buffer);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('TTS proxy error:', error);
    return NextResponse.json({ error: 'TTS service unavailable' }, { status: 503 });
  }
}
