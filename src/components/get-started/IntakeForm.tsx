'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IntakeFormData } from '@/types';
import { CheckCircle2, Loader2, Send, School, Users, Target, AlertCircle } from 'lucide-react';
import { submitToIntakeSheet } from '@/lib/googleSheets';

export function IntakeForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [consented, setConsented] = useState(false);
  const [formData, setFormData] = useState<Partial<IntakeFormData>>({
    fullName: '',
    email: '',
    phone: '',
    organizationName: '',
    role: '',
    approxParticipants: '',
    goal: '',
    referralSource: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitToIntakeSheet(formData as IntakeFormData);
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or email us at hello@rallyfund.com.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  if (success) {
    return (
      <Card className="text-center py-16 px-8 border-2 border-[#22C55E]/20 bg-white">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#22C55E]">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-[#111827] mb-4">Request Received!</h2>
        <p className="text-[#6B7280] max-w-md mx-auto mb-8 text-lg">
          Thanks for your interest in Rallyfund. One of our fundraising specialists will reach out to you within 24 hours to help you get started.
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline">Send Another Request</Button>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden shadow-2xl border-gray-100">
      <div className="bg-[#1B3A6B] p-6 text-white text-center">
        <h3 className="text-xl font-extrabold">Rallyfund Intake Form</h3>
        <p className="text-white/70 text-sm mt-1">Tell us a bit about your organization</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Section 1: Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#1B3A6B]" />
            <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Contact Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Full Name" 
              name="fullName" 
              required 
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
            <Input 
              label="Email Address" 
              type="email" 
              name="email" 
              required 
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <Input 
            label="Phone Number" 
            name="phone" 
            required 
            placeholder="(555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Section 2: Organization Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <School className="w-4 h-4 text-[#1B3A6B]" />
            <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Organization Details</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Organization Name" 
              name="organizationName" 
              required 
              placeholder="East High School Band"
              value={formData.organizationName}
              onChange={handleChange}
            />
            <Input 
              label="Your Role" 
              name="role" 
              required 
              placeholder="Band Director / Parent Lead"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Section 3: Fundraiser Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-[#1B3A6B]" />
            <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Fundraiser Goals</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label="Estimated Participants" 
              name="approxParticipants"
              required
              options={[
                { label: 'Less than 25', value: '<25' },
                { label: '25 - 50', value: '25-50' },
                { label: '51 - 100', value: '51-100' },
                { label: '100+', value: '100+' },
              ]}
              value={formData.approxParticipants}
              onChange={handleChange}
            />
            <Input 
              label="Estimated Fundraising Goal ($)" 
              name="goal" 
              placeholder="e.g. 10000"
              value={formData.goal}
              onChange={handleChange}
            />
          </div>
          <Select 
            label="How did you hear about us?" 
            name="referralSource"
            options={[
              { label: 'Google Search', value: 'google' },
              { label: 'Social Media', value: 'social' },
              { label: 'Referral/Word of Mouth', value: 'referral' },
              { label: 'Email Marketing', value: 'email' },
              { label: 'Other', value: 'other' },
            ]}
            value={formData.referralSource}
            onChange={handleChange}
          />
        </div>

        {/* Privacy consent */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[#1B3A6B] flex-shrink-0"
          />
          <span className="text-xs text-[#6B7280] leading-relaxed">
            I agree to Rallyfund's{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1B3A6B] underline">Privacy Policy</a>
            {' '}and{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#1B3A6B] underline">Terms of Service</a>.
            {' '}I consent to Rallyfund contacting me at the email and phone number provided to discuss fundraising services.
          </span>
        </label>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
        <Button
          fullWidth
          size="lg"
          type="submit"
          disabled={loading || !consented}
          className="flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Request Launch Packet
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
        <p className="text-[10px] text-center text-[#6B7280] uppercase tracking-widest font-bold">
          No obligation. No setup fees. Expert guidance.
        </p>
      </form>
    </Card>
  );
}
