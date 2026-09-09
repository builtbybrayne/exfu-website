export interface Answers {
  needs: string[];
  obstacles: string[];
  stages: string[];
}
export interface Recommendation {
  title: string;
  why: string;
  steps: { title: string; text: string }[];
  offers: { name: string; text: string; href: string }[];
  pacing: string;
  question: string;
}
export const needNames: Record<string, string> = {
  business: 'AI across my business',
  project: 'A specific project',
  personal: 'My own workload',
};
export function recommend({ needs, obstacles, stages }: Answers): Recommendation {
  const business = needs.includes('business'),
    project = needs.includes('project'),
    personal = needs.includes('personal');
  const caseNeeded = obstacles.includes('Making the case to others');
  const uncertain = obstacles.includes('Knowing where to start');
  const adoption = obstacles.includes('Making it work day to day');
  const building = obstacles.includes('Time or experience to build it');
  const exploring = stages.includes('Exploring what is possible');
  const ready = stages.includes('Ready to bring in help');
  const trying = stages.includes('Already trying things');
  const steps: Recommendation['steps'] = [];
  let title: string, why: string;
  if (caseNeeded && (business || project)) {
    title = 'Make one opportunity easy to assess.';
    why =
      'You need backing from other people as well as progress on the work. A small, testable proposal gives them something concrete to decide on.';
    steps.push({
      title: 'Write a one-page case',
      text: 'Name the business outcome, who benefits, what the first experiment would cost in time and tools, and what evidence would justify continuing.',
    });
  } else if (uncertain || exploring) {
    title =
      personal && !business && !project
        ? 'Choose one workstream to make easier.'
        : 'Find one worthwhile experiment.';
    why =
      'You are still choosing where to focus. A small comparison of real opportunities will help you choose a useful first step before committing to a build.';
    steps.push({
      title: 'Compare three real opportunities',
      text:
        personal && !business
          ? 'List three recurring tasks you keep putting off. Note what information each needs, what a good result looks like and how easily you could check the output.'
          : 'List three pieces of valuable work that are under-resourced today. Compare the likely benefit, available context and effort needed to test each one.',
    });
  } else if (adoption) {
    title = 'Make one existing workflow reliable.';
    why =
      'Your sticking point is using this day to day. It is worth finding where the current workflow breaks before adding another tool or agent.';
    steps.push({
      title: 'Walk through one real attempt',
      text: 'Follow a recent task from start to finish. Mark where context was missing, someone had to intervene, or an output could not be trusted. Choose one point to improve.',
    });
  } else {
    title =
      personal && !business && !project
        ? 'Set up one agent around a real task.'
        : 'Turn the idea into a bounded pilot.';
    why =
      'You have enough direction to start shaping a practical piece of work. Define its boundaries and how you will check the result before expanding it.';
    steps.push({
      title: 'Give the first task clear boundaries',
      text: 'Write down its input, expected output, tools it can use, and which actions need your approval. Choose a task whose result you can check yourself.',
    });
  }
  if (building)
    steps.push({
      title: 'Remove one build uncertainty',
      text: 'List the systems and information the work needs. Test the hardest connection or data-access assumption with a small example before scoping the whole implementation.',
    });
  if (adoption && !steps.some((s) => s.title.includes('Walk through')))
    steps.push({
      title: 'Try it with the person who will use it',
      text: 'Use one real task together. Notice where they need a clearer interface, a visible approval step or better context. Change that before rolling it out further.',
    });
  if (caseNeeded && !(business || project))
    steps.push({
      title: 'Make the request specific',
      text: 'If someone else needs to approve access or a subscription, show them the task, the information involved and the boundaries you propose.',
    });
  if (personal && (business || project))
    steps.push({
      title: 'Keep two tracks distinct',
      text: 'Use your own workload as a small learning ground. Give company work its own goal, permissions and owner, so a helpful personal setup is not mistaken for a finished team rollout.',
    });
  steps.push({
    title: trying ? 'Compare against what happens today' : 'Decide what would count as useful',
    text: 'Keep one before-and-after example. Check the quality of the result, the review effort and whether the work actually gets used. Use that evidence to choose the next step.',
  });
  const offers: Recommendation['offers'] = [];
  if (business)
    offers.push({
      name: 'Fractional AI support',
      text: 'For ongoing opportunity assessment, leadership backing and delivery alongside your team.',
      href: '/fractional-support/',
    });
  if (project)
    offers.push({
      name: 'A defined project',
      text: 'For testing or delivering one opportunity with a scope and a clear decision at the end.',
      href: '/fractional-support/#what-we-can-do',
    });
  if (personal)
    offers.push({
      name: 'Personal AI support',
      text: 'For setting up an agent with you around your own context and recurring work.',
      href: '/personal-support/',
    });
  const pacing =
    ready && exploring
      ? 'Being ready for help does not mean the solution has to be decided. A short discovery piece can be the first engagement.'
      : stages.length > 1
        ? 'Different parts of your work may be at different stages. Start with the least understood assumption in the first task you choose.'
        : trying
          ? 'Start with something you have already tried. A real example is more useful than a fresh list of possibilities.'
          : ready
            ? 'You can use the steps above as a brief when you bring someone in. Agree the scope before committing to ongoing work.'
            : 'You can do the first step yourself. You do not need to choose a package or commit to an engagement to make progress.';
  const question =
    personal && !business && !project
      ? 'Which recurring task would feel meaningfully easier if I had the right context and a draft to respond to?'
      : 'What valuable work is not happening today, and what is the smallest experiment that would show whether an agent can help?';
  return { title, why, steps, offers, pacing, question };
}
