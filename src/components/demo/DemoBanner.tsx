import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-semibold">
            You&apos;re viewing a <strong>demo</strong> of the Rallyfund Advisor Portal. All data is simulated.
          </p>
        </div>
        <Link
          href="/get-started"
          className="flex-shrink-0 flex items-center gap-1.5 bg-white text-orange-600 font-bold text-sm px-4 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
          id="demo-banner-cta"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
