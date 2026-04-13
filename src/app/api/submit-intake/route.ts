import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ success: false, error: 'Email not configured' }, { status: 500 });
  }

  const body = await req.json();
  const {
    fullName, email, phone,
    organizationName, role,
    approxParticipants, goal, referralSource,
    timestamp,
  } = body;

  // Sanitize fields to prevent HTML injection in the outbound email
  const esc = (s: unknown) =>
    String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  await resend.emails.send({
    from: 'Rallyfund Intake <onboarding@resend.dev>',
    to: 'rallyfundrally@gmail.com',
    replyTo: email,
    subject: `New Intake: ${fullName} — ${organizationName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#1B3A6B;margin-bottom:4px">New Rallyfund Intake Submission</h2>
        <p style="color:#6B7280;font-size:13px;margin-top:0">${new Date(timestamp).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>

        <h3 style="color:#111827;font-size:14px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Contact</h3>
        <p style="margin:4px 0"><strong>Name:</strong> ${esc(fullName)}</p>
        <p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
        <p style="margin:4px 0"><strong>Phone:</strong> ${esc(phone)}</p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
        <h3 style="color:#111827;font-size:14px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Organization</h3>
        <p style="margin:4px 0"><strong>Name:</strong> ${esc(organizationName)}</p>
        <p style="margin:4px 0"><strong>Role:</strong> ${esc(role)}</p>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
        <h3 style="color:#111827;font-size:14px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Fundraiser Goals</h3>
        <p style="margin:4px 0"><strong>Participants:</strong> ${esc(approxParticipants)}</p>
        <p style="margin:4px 0"><strong>Goal:</strong> $${esc(goal)}</p>
        <p style="margin:4px 0"><strong>Heard about us:</strong> ${esc(referralSource)}</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
