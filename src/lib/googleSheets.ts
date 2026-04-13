import { IntakeFormData } from '@/types';

export async function submitToIntakeSheet(data: IntakeFormData) {
  const response = await fetch('/api/submit-intake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }

  return await response.json();
}
