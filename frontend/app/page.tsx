import { redirect } from 'next/navigation';

/**
 * The front door is Lumen Lab — the GPGPU cosmos.
 * The previous Atlas landing is archived at app/_archive/atlas-landing/.
 */
export default function Home() {
  redirect('/lumen');
}
