export const metadata = {
  title: 'Privacy Policy | Rallyfund',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
        <h1 className="text-4xl font-black text-[#111827] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#6B7280] mb-10">Last updated: April 7, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-[#374151]">

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">1. Who We Are</h2>
            <p>Rallyfund ("we," "us," or "our") operates a fundraising platform for school and youth programs. Our contact email is <a href="mailto:hello@rallyfund.com" className="text-[#1B3A6B] underline">hello@rallyfund.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Program leaders / coaches:</strong> Name, email address, phone number, and organization name submitted via our intake or account registration forms.</li>
              <li><strong>Students (fundraiser participants):</strong> First and last name, email address, and fundraising progress. Students must be 13 or older to create an account.</li>
              <li><strong>Donor contacts:</strong> Names, email addresses, and phone numbers entered by students to facilitate outreach. This information is stored solely to help students send donation requests.</li>
              <li><strong>Donors:</strong> Payment information is processed directly by Stripe. We store only the donor's name and donation amount.</li>
              <li><strong>Usage data:</strong> Standard server logs and analytics (IP address, browser type, pages visited).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate and improve the Rallyfund platform.</li>
              <li>To contact program leaders about their fundraiser setup and support.</li>
              <li>To display fundraising progress to program participants.</li>
              <li>To process donations via Stripe.</li>
              <li>We do <strong>not</strong> sell your personal information to third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">4. Children's Privacy (COPPA)</h2>
            <p>Our platform is intended for users 13 and older. We do not knowingly collect personal information from children under 13 without verifiable parental consent. If you believe a child under 13 has provided us personal information, please contact us at <a href="mailto:hello@rallyfund.com" className="text-[#1B3A6B] underline">hello@rallyfund.com</a> and we will delete it promptly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">5. Student Data (FERPA)</h2>
            <p>We act as a service provider to educational institutions. Student data we process on behalf of a school is subject to FERPA where applicable. We do not use student data for advertising and do not share it outside the platform without authorization from the institution.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">6. SMS Communications</h2>
            <p>Students may use Rallyfund to send text messages to contacts they have personally added. By adding a phone number, the student confirms that the contact has agreed to receive a fundraiser message. Rallyfund does not send automated or bulk SMS messages. Message and data rates may apply. Contacts may opt out by replying STOP to any message.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">7. Data Storage and Security</h2>
            <p>Data is stored in Supabase (PostgreSQL), which encrypts data at rest and in transit. Payment processing is handled entirely by Stripe and subject to PCI-DSS compliance. We do not store full payment card details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">8. Third-Party Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase</strong> — database and authentication</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Resend</strong> — transactional email</li>
            </ul>
            <p className="mt-2">Each service has its own privacy policy and acts as a data processor under our direction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">9. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:hello@rallyfund.com" className="text-[#1B3A6B] underline">hello@rallyfund.com</a>. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">10. Changes to This Policy</h2>
            <p>We may update this policy periodically. We will notify users of material changes by email or by posting a notice on our site. Continued use of Rallyfund after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111827] mb-3">11. Contact Us</h2>
            <p>Questions about this policy? Email us at <a href="mailto:hello@rallyfund.com" className="text-[#1B3A6B] underline">hello@rallyfund.com</a>.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
