import { Metadata } from 'next';
import { Agent } from '@gitroom/frontend/components/agents/agent';
export const metadata: Metadata = {
  title: 'PulseSocial — AI Social Agents & Copilot',
  description: 'AI-assisted content generation and social automation agents.',
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Agent>{children}</Agent>;
}
