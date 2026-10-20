import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'PulseSocial — AI Social Agents & Copilot',
  description: 'AI-assisted caption generation, social content planning, and automated workflow agents.',
};

export default async function Page() {
  return redirect('/agents/new');
}
