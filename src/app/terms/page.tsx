export const metadata = {
  title: 'Terms of Service | Rallyfund',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
        <h1 className="text-4xl font-black text-[#111827] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#6B7280] mb-10">Last updated: April 7, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-[#374151]">

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">1. Acceptance of Terms</h2>
            <p>By creating an account or using the Rallyfund platform ("Service"), you agree to these Terms of Service. If you do not agree, do not use the Service. Users must be at least 13 years old.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">2. Description of Service</h2>
            <p>Rallyfund provides an online fundraising platform for school and youth programs. Program leaders create fundraising campaigns; students participate and share donation links; donors make contributions via Stripe.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">3. Fees</h2>
            <p>Rallyfund charges a 10% platform fee on funds raised. Stripe's standard payment processing fees also apply. There are no upfront or setup fees.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">4. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must provide accurate information when creating an account.</li>
              <li>You may not create accounts on behalf of others without authorization.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">5. Program Leader Responsibilities</h2>
            <p>Program leaders who create fundraising campaigns represent that they have authorization from their school or organization to do so. Leaders are responsible for communicating the fundraiser's purpose accurately to students, parents, and donors.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">6. Student Outreach and SMS</h2>
            <p>Students may use the platform to send text messages to contacts they personally add. By adding a contact's phone number, the student represents that the recipient has consented to receive a fundraiser message. Misuse of this feature to send unsolicited messages is prohibited and may result in account termination.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">7. Donations and Payments</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All donations are processed by Stripe and are subject to Stripe's terms.</li>
              <li>Rallyfund does not guarantee that any fundraising goal will be met.</li>
              <li>Refunds, if applicable, are handled on a case-by-case basis. Contact <a href="mailto:hello@rallyfund.com" className="text-[#1B3A6B] underline">hello@rallyfund.com</a>.</li>
              <li>Minimum donation is $5.00 USD.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">8. Prohibited Conduct</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the Service for fraudulent or deceptive fundraising.</li>
              <li>Submitting false information about your organization or purpose.</li>
              <li>Attempting to access another user's account or data.</li>
              <li>Sending spam or unsolicited messages through the platform.</li>
              <li>Using the Service in any way that violates applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">9. Intellectual Property</h2>
            <p>The Rallyfund name, logo, and platform are owned by Rallyfund. You may not reproduce or use them without written permission. You retain ownership of any content you submit (e.g., program names, descriptions).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">10. Disclaimer of Warranties</h2>
            <p>The Service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability or that the Service will be error-free.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">11. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Rallyfund's liability for any claim arising from your use of the Service is limited to the fees you paid to Rallyfund in the 12 months prior to the claim.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">12. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved in courts located in Texas.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">13. Changes to Terms</h2>
            <p>We may update these Terms at any time. We will notify users of material changes via email or platform notice. Continued use of the Service after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">14. Contact</h2>
            <p>Questions? Email us at <a href="mailto:hello@rallyfund.com" className="text-[#1B3A6B] underline">hello@rallyfund.com</a>.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
