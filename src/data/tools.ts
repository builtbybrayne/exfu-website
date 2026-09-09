export const marketplace = 'https://github.com/ExFu/exfu-marketplace';
export const installLibrary =
  'claude plugin marketplace add ExFu/exfu-marketplace && claude plugin install exfu-agent-library-solo@exfu-marketplace';
// Public tool families already surfaced in the legacy site, with source destinations preserved.
export const toolFamilies = [
  {
    name: 'Agent Library',
    pkg: 'exfu-agent-library-solo',
    setupTitle: 'Give your library a home.',
    preparation:
      'Create an ExFu Library folder somewhere you can find it again. Start a fresh Claude session with access to that folder.',
    setupPrompt:
      'I\u2019ve installed the ExFu Agent Library. Help me get set up using the ExFu setup skill. Ask where my library should live, then walk me through it one step at a time.',
    setupNote:
      'Bring one real task. Start with the context you need for that task and add more as you go. Return to the same library folder next time.',
    description:
      'Give your agent a place for your context, ongoing work and reusable instructions.',
    detail: 'For people who want their agent to pick up the thread between sessions.',
    href: 'https://github.com/ExFu/agent-library',
  },
  {
    name: 'Planning & delegating',
    pkg: 'exfu-agent-planning-and-delegating',
    setupTitle: 'Start with a piece of work.',
    preparation:
      'Open a project folder in Claude Code. Choose one piece of work you want to plan; you do not need to decide the whole project at once.',
    setupPrompt:
      'I\u2019ve installed ExFu Planning & Delegating. Read the plugin\u2019s planning setup guidance, check what is already in this project, and help me initialise it around one real piece of work. Explain any choices before changing existing plans.',
    setupNote:
      'Planning can be useful on its own. If you want delegation between models, ask Claude to check the extra tools and accounts required before setting that up.',
    description: 'Keep plans and handovers clear enough for the next agent to continue the work.',
    detail: 'For work that spans sessions, projects or more than one model.',
    href: 'https://github.com/ExFu/agent-planning-and-delegating',
  },
  {
    name: 'Plan visualiser',
    pkg: 'exfu-agent-plan-visualiser',
    setupTitle: 'Give the project a decision record.',
    preparation:
      'Open the project in Claude Code. The visualiser works with Git history and needs Python 3; ask Claude to check those prerequisites first.',
    setupPrompt:
      'I\u2019ve installed the ExFu Agent Plan Visualiser. Check this project and the plugin\u2019s setup instructions, explain any prerequisites, then help me initialise tracking and open the plan view. Preserve any existing planning record.',
    setupNote:
      'Use the record to see what changed and why. Ask Claude to explain how future work will be captured before you start relying on it.',
    description: 'See what happened, what changed and why a decision was made.',
    detail: 'For keeping track of agent work as it develops.',
    href: 'https://github.com/ExFu/agent-plan-visualiser',
  },
  {
    name: 'Humane agents',
    pkg: 'exfu-humane-agents',
    setupTitle: 'Start with something you need to read.',
    preparation:
      'Begin a fresh Claude session and bring a report, handover or explanation you would like to make more useful.',
    setupPrompt:
      'I\u2019ve installed ExFu Humane Agents. Use its reporting guidance to help with my next response. Ask who will read it and what they need to understand or decide.',
    setupNote:
      'Tell Claude who the reader is and how much context they have. You can ask for a clear human account while retaining the detailed record.',
    description:
      'Make agent reports useful to the human reading them, while keeping the full context.',
    detail: 'For clearer updates, handovers and explanations.',
    href: 'https://github.com/ExFu/humane-agents',
  },
];
