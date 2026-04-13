# CLAUDE.md — Rallyfund Compliance Rules

## DO NOT generate code that:
- Sends SMS or text messages without explicit user consent flow
- Collects personal information from users under 13 without COPPA-compliant parental consent
- Stores student education records or data covered by FERPA
- Processes payments without Stripe's standard security practices
- Accesses device contact lists or phone address books directly
- Stores phone numbers or personal data without encryption at rest
- Sends marketing communications without opt-out/unsubscribe mechanisms

## CURRENT PHASE: Marketing Website Only
- No backend auth system yet
- No payment processing yet
- No SMS/messaging functionality yet
- No student data collection yet
- Only collect program leader contact info via intake form
- Intake form data goes to Google Sheets only (no database yet)

## FUTURE PHASES (do not build yet):
- Phase 2: Supabase backend + auth (student & advisor accounts)
- Phase 3: Stripe payment integration
- Phase 4: Twilio SMS (requires legal review first)
