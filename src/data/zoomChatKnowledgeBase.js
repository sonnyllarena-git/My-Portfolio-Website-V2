export const CHAT_CATEGORIES = [
  {
    id: 'pricing',
    label: 'Pricing & Budget',
    keywords: [
      'cost',
      'price',
      'pricing',
      'budget',
      'how much',
      'expensive',
      'affordable',
      'quote',
      'cheap',
    ],
    response: `Pricing depends on your project requirements, scope, and complexity. It could be a small website, mobile app, or enterprise system.

To get an accurate quote, I'd love to understand what type of project it is, your budget range, timeline, and key features you need.

Click here to send me a detailed message about your project requirements, and I'll provide a custom quote within 24 hours.`,
    cta: 'Send project details',
  },
  {
    id: 'timeline',
    label: 'Project Timelines',
    keywords: [
      'timeline',
      'how long',
      'duration',
      'weeks',
      'months',
      'fast',
      'delivery',
      'deadline',
    ],
    response: `Project timelines vary based on complexity: small websites take 2-4 weeks, mobile apps 4-8 weeks, and complex systems 8-12+ weeks.

I focus on quality over speed: planning and design first, then development and testing, then deployment and support.

For a precise timeline, click here to send me your project details.`,
    cta: 'Discuss my timeline',
  },
  {
    id: 'tech',
    label: 'Technology Stack',
    keywords: [
      'technology',
      'tech',
      'language',
      'framework',
      'stack',
      'react',
      'node',
      'python',
      'tools',
    ],
    response: `My technology stack: React and React Native on the frontend, Node.js and Python on the backend, PostgreSQL/SQLite/Firebase for data, and Git/Docker/Figma as tooling — across web, mobile, desktop, and cloud.

I choose the right technology for your project, whether it's a quick MVP or an enterprise-grade system.

Want to discuss what fits your project? Click here to chat with me directly.`,
    cta: 'Discuss the right tech',
  },
  {
    id: 'services',
    label: 'Services & Expertise',
    keywords: [
      'service',
      'services',
      'do you',
      'can you',
      'offer',
      'build',
      'develop',
      'create',
    ],
    response: `I specialize in full stack development, UI/UX design, database design, mobile apps (native and React Native), enterprise systems, and technical consulting.

Whether it's a startup MVP, a business system, or an enterprise application, I build with quality and performance in mind.

Let me know what you need — click here to tell me more about your project.`,
    cta: 'Tell me about your project',
  },
  {
    id: 'process',
    label: 'Process & Workflow',
    keywords: [
      'process',
      'workflow',
      'how do you work',
      'methodology',
      'steps',
      'approach',
    ],
    response: `My process: discovery, planning, design, development, testing, deployment, then ongoing maintenance and support.

I communicate regularly, provide progress updates, and keep you involved every step of the way.

Ready to start? Click here to send me your project details.`,
    cta: 'Get started',
  },
  {
    id: 'availability',
    label: 'Availability & Response Time',
    keywords: [
      'available',
      'availability',
      'when',
      'start',
      'begin',
      'available now',
      'urgent',
      'asap',
    ],
    response: `I'm actively taking new projects — typical response time is within 24 hours, and a project can usually start 1-2 weeks from agreement.

If you have an urgent timeline, let me know your requirements and we can discuss feasibility.

Click here to reach out about your project timeline.`,
    cta: 'Check availability',
  },
  {
    id: 'contact',
    label: 'Contact & Rates',
    keywords: [
      'contact',
      'email',
      'phone',
      'rate',
      'hourly',
      'fixed',
      'payment',
    ],
    response: `I prefer project-based pricing over hourly rates — it's clearer for budgeting and keeps the focus on quality outcomes.

The best way to connect: send a message right here in this chat, or visit my Contact Info app for other ways to reach me. I typically respond within 24 hours.

Let me know how I can help!`,
    cta: 'Go to contact page',
  },
  {
    id: 'portfolio',
    label: 'Portfolio & Past Work',
    keywords: [
      'portfolio',
      'projects',
      'work',
      'examples',
      'case study',
      'past',
      'clients',
    ],
    response: `I've built several production-grade applications, including a restaurant POS system, an offline-capable expense tracker mobile app, a dental clinic practice-management system, and an enterprise employee onboarding platform with real-time syncing.

Each project showcases different technologies and expertise — take a look around this desktop for more.

Interested in seeing how I might help your project? Click here to contact me.`,
    cta: 'Contact me about a project',
  },
]

export const FALLBACK_RESPONSE = `I didn't quite understand your question. Here are some things I can help with:

- Project pricing & quotes
- Timelines & availability
- Technologies & services
- My development process
- How to work with me
- My portfolio & projects

Or, ask me anything else and I'll do my best to help! If I can't answer, I'll connect you directly with Sonny.`

export const SUGGESTED_QUESTIONS = [
  { text: 'How much does a project cost?' },
  { text: "What's your development process?" },
  { text: 'What technologies do you use?' },
]

export const NAME_PROMPT = "Hey! What's your name?"

export function getEmailPrompt(guestName) {
  return `Thanks ${guestName}! What's the best email to reach you?`
}

export const FOLLOW_UPS = {
  pricing: {
    question:
      'Are you looking for a quick estimate, or do you need a detailed proposal?',
    options: [
      'Quick estimate',
      'Detailed proposal',
      'Both would be helpful',
      'Not sure yet',
    ],
  },
  timeline: {
    question:
      'Is this project time-sensitive for you, or do you have a flexible deadline?',
    options: [
      "It's time-sensitive / urgent",
      'I have a flexible deadline',
      'Somewhere in between',
      'Not sure yet',
    ],
  },
  tech: {
    question:
      'Do you already have a preferred tech stack, or would you like my recommendation?',
    options: [
      'I have a preferred stack',
      "I'd like your recommendation",
      'A mix of both',
      'Not sure yet',
    ],
  },
  services: {
    question:
      'Are you looking for a full project, or just specific features/components?',
    options: [
      'A full project',
      'Specific features/components',
      'Not sure yet — need guidance',
      'Just exploring options',
    ],
  },
  process: {
    question:
      'Do you prefer regular updates (weekly), or would monthly summaries work for you?',
    options: [
      'Weekly updates',
      'Monthly summaries',
      'Only major milestones',
      'Not sure yet',
    ],
  },
  availability: {
    question:
      'Are you looking to start immediately, or is there a specific timeline in mind?',
    options: [
      'Start immediately',
      'I have a specific timeline in mind',
      'Within the next few weeks',
      'Just researching for now',
    ],
  },
}

export const AUTO_REPLY_PATTERNS = [
  {
    id: 'thankYou',
    keywords: ['thank', 'thanks', 'thx', 'appreciate', 'grateful'],
    reply: "You're welcome! Is there anything else I can help you with?",
  },
  {
    id: 'affirmation',
    keywords: [
      'ok',
      'okay',
      'alright',
      'good',
      'sounds good',
      'yes',
      'yep',
      'sure',
      'perfect',
      'cool',
      'nice',
    ],
    reply: 'Great! Is there anything else I can help you with?',
  },
  {
    id: 'farewell',
    keywords: [
      'bye',
      'goodbye',
      'see you',
      'talk later',
      'later',
      'gotta go',
      'take care',
    ],
    reply:
      'Thanks for chatting! Feel free to reach out anytime. Have a great day!',
  },
]
