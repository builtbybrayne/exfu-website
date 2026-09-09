export const marketplace = 'https://github.com/ExFu/exfu-marketplace';
export const installLibrary =
  'claude plugin marketplace add ExFu/exfu-marketplace && claude plugin install exfu-agent-library-solo@exfu-marketplace';
// Public tool families already surfaced in the legacy site, with source destinations preserved.
export const toolFamilies = [
  {
    name: 'Agent Library',
    pkg: 'exfu-agent-library-solo',
    description:
      'Give your agent a place for your context, ongoing work and reusable instructions.',
    detail: 'For people who want their agent to pick up the thread between sessions.',
    href: 'https://github.com/ExFu/agent-library',
  },
  {
    name: 'Planning & delegating',
    pkg: 'exfu-agent-planning-and-delegating',
    description: 'Keep plans and handovers clear enough for the next agent to continue the work.',
    detail: 'For work that spans sessions, projects or more than one model.',
    href: 'https://github.com/ExFu/agent-planning-and-delegating',
  },
  {
    name: 'Plan visualiser',
    pkg: 'exfu-agent-plan-visualiser',
    description: 'See what happened, what changed and why a decision was made.',
    detail: 'For keeping track of agent work as it develops.',
    href: 'https://github.com/ExFu/agent-plan-visualiser',
  },
  {
    name: 'Humane agents',
    pkg: 'exfu-humane-agents',
    description:
      'Make agent reports useful to the human reading them, while keeping the full context.',
    detail: 'For clearer updates, handovers and explanations.',
    href: 'https://github.com/ExFu/humane-agents',
  },
];
