import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { WhyRallyfund } from '@/components/landing/WhyRallyfund';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { Testimonials } from '@/components/landing/Testimonials';
import { FinalCTA } from '@/components/landing/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <WhyRallyfund />
      <FeaturesGrid />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
