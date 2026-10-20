import { Metadata } from 'next';
import { Agent } from '@gitroom/frontend/components/agents/agent';
import { AgentChat } from '@gitroom/frontend/components/agents/agent.chat';
export const metadata: Metadata = {
  title: 'PulseSocial — AI Agent Chat',
  description: 'AI-assisted social media automation and copilot agent.',
};
export default async function Page() {
  return (
    <AgentChat />
  );
}
