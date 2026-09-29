'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WelcomeScreen } from '../../components/onboarding/WelcomeScreen';

export default function WelcomePage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  const handleStart = (studentName: string, classLevel: number) => {
    // Save student info to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('atlas_student_name', studentName);
      localStorage.setItem('atlas_student_class', String(classLevel));
    }
    setStarted(true);
    router.push(`/play?class=${classLevel}`);
  };

  if (started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gold-100">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🚀</div>
          <p className="text-xl font-bold text-gold-600">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  return <WelcomeScreen onStart={handleStart} />;
}
