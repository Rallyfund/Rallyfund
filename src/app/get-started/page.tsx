import { IntakeForm } from '@/components/get-started/IntakeForm';
import { Shield, Sparkles, Clock } from 'lucide-react';

export default function GetStartedPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-gray-50/30">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-white hidden lg:block -z-10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1B3A6B]/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-6 leading-tight">
              Let's launch your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3A6B] to-[#22C55E]">
                biggest fundraiser yet.
              </span>
            </h1>
            <p className="text-lg text-[#6B7280] mb-12">
              Join dozens of schools and organizations that have boosted their fundraising results by switching to Rallyfund. It takes less than 2 minutes to get started.
            </p>

            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-[#1B3A6B]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111827] mb-1">Quick Setup</h4>
                  <p className="text-sm text-[#6B7280]">We'll have your custom fundraising page live and ready to accept donations in less than 24 hours.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-[#22C55E]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111827] mb-1">No Risk, No Costs</h4>
                  <p className="text-sm text-[#6B7280]">Zero upfront fees. No contracts to sign. We handle all the setup while you focus on your cause.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-amber-500">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111827] mb-1">Expert Guidance</h4>
                  <p className="text-sm text-[#6B7280]">Our dedicated support team will provide you with a "Launch Packet" and strategy to maximize your reach.</p>
                </div>
              </div>
            </div>

            {/* Testimonial snippet */}
            <div className="mt-16 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm relative italic text-sm text-[#4B5563]">
              "The setup was seamless. We were worried about switching platforms mid-season, but Rallyfund made it incredibly easy. Best decision we've made."
              <div className="mt-3 font-bold not-italic text-[#111827] flex items-center gap-2">
                <div className="w-6 h-1 bg-[#22C55E] rounded-full" />
                Sarah Jenkins, PTA President
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            {/* Decorative background for form */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#1B3A6B]/10 to-[#22C55E]/10 rounded-[2.5rem] blur-2xl -z-10" />
            <IntakeForm />
          </div>

        </div>
      </div>
    </main>
  );
}
