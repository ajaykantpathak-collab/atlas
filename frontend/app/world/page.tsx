"use client";

import { LivingWorld } from "@/components/world/LivingWorld";
import { REAL_REGIONS } from "@/lib/realContent";
import InternalDemoBadge from "@/components/InternalDemoBadge";

export default function WorldPage() {
  return (
    <main className="min-h-screen p-8">
      <InternalDemoBadge what="decorative region map" />
      <h1 className="text-2xl font-bold mb-6 text-center">Living World</h1>
      <LivingWorld regions={REAL_REGIONS} />
    </main>
  );
}
