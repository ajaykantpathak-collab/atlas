'use client';

import dynamic from 'next/dynamic';

const LivingParticleOrganism = dynamic(
  () => import('@/components/premium/LivingParticleOrganism'),
  { ssr: false }
);

export default function OrganismPage() {
  return <LivingParticleOrganism />;
}
