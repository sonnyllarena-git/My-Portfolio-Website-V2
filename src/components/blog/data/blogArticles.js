import beyondTheBuzzBanner from '../assets/blogs post/Beyond the Buzz/thumbnail.jpg'
import vibeCodingBanner from '../assets/blogs post/Vibe Coding/Vibe Coding Thumbnail.png'

export const blogArticles = {
  'blog-1': {
    title: 'Beyond the Buzz',
    subtitle: 'How AI Is Actually Paying Off for Real Businesses',
    bannerImage: beyondTheBuzzBanner,
    meta: {
      duration: '5 MIN READ',
      created: 'May 25, 2025',
      author: 'Sonny Llarena',
      tags: ['AI', 'Development', 'Analytics'],
    },
    content: [
      {
        type: 'paragraph',
        text: 'Everyone is talking about AI, but there is a big difference between playing around with tech and actually making money from it. Most companies are stuck running tests that never go anywhere because they started with "we need to use AI" instead of fixing an actual problem.',
      },
      {
        type: 'paragraph',
        text: 'When you strip away the hype, AI is just a tool—and like any tool, it only works if you use it for the right job.',
      },
      {
        type: 'heading',
        text: 'How Building AI Apps Is Completely Different',
      },
      {
        type: 'paragraph',
        text: 'Standard software works like a recipe: you give the computer exact, step-by-step instructions, and it follows them every single time.',
      },
      {
        type: 'paragraph',
        text: 'AI does not work that way. Instead of writing fixed rules, you feed a system tons of real-world examples (data) so it can learn patterns and make smart decisions on its own.',
      },
      {
        type: 'paragraph',
        text: "This means you can't just build it and walk away. You have to clean the data before it goes in, keep checking the system's output to make sure it doesn't drift off track, and constantly feed it new information to keep it accurate.",
      },
      {
        type: 'heading',
        text: 'Where Companies Are Seeing Real Results Right Now',
      },
      {
        type: 'list',
        items: [
          {
            lead: 'Customer Service:',
            text: "Today's chatbots don't just rely on basic keyword matching. They connect directly to company files to answer tricky questions smoothly, sending a chat to a human team member only when things get complicated.",
          },
          {
            lead: 'Coding and Development:',
            text: 'Software developers use AI assistants to handle repetitive tasks, clean up code, and catch bugs before anything goes live. It turns hours of tedious work into minutes.',
          },
          {
            lead: 'Forecasting and Planning:',
            text: 'Old-school reports tell you what happened last month. AI models look ahead to predict what will happen next—helping businesses adjust prices automatically or spot customers who might cancel their subscriptions early.',
          },
          {
            lead: 'Scanning Documents:',
            text: 'Instead of humans reading through hundreds of dense legal contracts or medical forms, smart scanners instantly pull out the key facts, saving endless hours of manual reading.',
          },
          {
            lead: 'Visual Inspection:',
            text: 'Cameras powered by smart models inspect items on factory assembly lines faster than any human, while doctors use similar image-scanning tools to spot tiny red flags in medical scans.',
          },
          {
            lead: 'Shipping and Earth Tracking:',
            text: 'Supply chain tools recalculate delivery routes in real time to avoid bad weather or traffic. Satellite imagery tools even analyze farmlands to monitor crop health and track storm damage.',
          },
        ],
      },
      {
        type: 'heading',
        text: "How to Make Sure Your AI Project Doesn't Fail",
      },
      {
        type: 'paragraph',
        text: 'Projects usually flop because of basic management mistakes, not bad technology. If you want real results, keep it simple:',
      },
      {
        type: 'list',
        items: [
          {
            lead: 'Pick one clear goal.',
            text: 'Don\'t try to "do AI." Aim to solve something specific, like answering customer questions 20% faster.',
          },
          {
            lead: 'Clean up your data.',
            text: 'Garbage in, garbage out. If your underlying information is messy or incomplete, the results will be useless.',
          },
          {
            lead: 'Keep a human in the loop.',
            text: 'Smart systems make mistakes, especially with edge cases. Always double-check critical outputs, especially in fields like law, health, or finance.',
          },
          {
            lead: 'Help your team adapt.',
            text: "People often resist tools they don't understand or fear will replace them. Show your team how these tools handle boring tasks so they can focus on higher-value work.",
          },
        ],
      },
    ],
  },
  'blog-2': {
    title: 'Vibe Coding',
    subtitle: 'Are You Still a Developer If AI Writes the Code?',
    bannerImage: vibeCodingBanner,
    meta: {
      duration: '10 MIN READ',
      created: 'August 13, 2025',
      author: 'Sonny Llarena',
      tags: ['AI', 'Development', 'Productivity'],
    },
    content: [
      {
        type: 'paragraph',
        bold: true,
        text: "It's 2 AM, you have an idea for an app, and instead of spending the next three days fighting boilerplate code, you describe what you want to an AI—and a working prototype appears.",
      },
      {
        type: 'paragraph',
        text: 'That moment captures something fundamentally different about how software can be built today. You are not necessarily typing every function, component, query, and configuration file yourself. Instead, you are describing an outcome, reviewing what the AI produces, correcting it, testing it, and continuously steering the project toward what you actually want.',
      },
      {
        type: 'paragraph',
        text: 'This approach has become widely known as **vibe coding**. The phrase sounds casual, almost like coding without rules. But underneath the name is a serious shift in software development: the keyboard is becoming less important, while communication, judgment, architecture, debugging, and product thinking are becoming more important.',
      },
      {
        type: 'heading',
        text: '1. What Exactly Is Vibe Coding?',
      },
      {
        type: 'paragraph',
        text: 'Vibe coding is the practice of using natural language to guide AI coding tools through the development of software. Instead of manually writing every line, you might tell an AI assistant: "Build a React dashboard with a login page, a user management section, filters, and a responsive layout." The AI generates code, you inspect the result, run it, identify what is wrong, and ask for changes.',
      },
      {
        type: 'paragraph',
        text: 'The important part is that vibe coding is not simply pressing a button and receiving a finished application. Real projects still require decisions. What should the application do? Who will use it? What data should it store? How should permissions work? What happens when something fails? What should the interface feel like? AI can help answer some of these questions, but the person building the product remains responsible for making the decisions.',
      },
      {
        type: 'heading',
        text: '2. AI Has Changed What "Writing Code" Means',
      },
      {
        type: 'paragraph',
        text: 'For decades, programming skill was closely associated with the ability to translate a problem into precise instructions a computer could execute. Syntax mattered. Framework knowledge mattered. Knowing the right library or command often meant the difference between being stuck and moving forward.',
      },
      {
        type: 'paragraph',
        text: 'Those skills still matter, but AI changes the amount of manual work required. An AI coding assistant can generate components, write database queries, explain unfamiliar code, create tests, refactor repetitive functions, and help track down bugs. A developer can therefore move from an idea to a prototype much faster than before.',
      },
      {
        type: 'quote',
        text: 'That creates an interesting question: if the AI writes 80 percent of the code, what exactly is the developer doing?',
      },
      {
        type: 'paragraph',
        text: 'The answer is increasingly clear: the developer is becoming the person who defines the problem, directs the solution, evaluates the output, and takes responsibility for the final system.',
      },
      {
        type: 'heading',
        text: "3. The Developer's Job Is Moving Up the Stack",
      },
      {
        type: 'paragraph',
        text: 'Think about what happens when AI handles repetitive implementation work. Time that previously went into typing boilerplate can be spent thinking about architecture. Time spent searching for a syntax error can be spent understanding why the error exists. Time spent building a basic interface can be spent improving the experience for the person who will actually use it.',
      },
      {
        type: 'paragraph',
        text: 'This does not mean low-level knowledge becomes useless. In fact, understanding fundamentals can become even more valuable because AI-generated code is not automatically correct. A developer who understands APIs, databases, authentication, state management, networking, security, and software architecture can recognize problems that a beginner may not even notice.',
      },
      {
        type: 'heading',
        text: '4. The New Skill: Knowing What to Ask For',
      },
      {
        type: 'paragraph',
        text: 'One of the biggest changes brought by AI-assisted development is the importance of communicating requirements clearly. A vague instruction produces a vague solution. A strong instruction provides context, constraints, expected behavior, technical requirements, and examples.',
      },
      {
        type: 'paragraph',
        text: 'This is why prompt engineering and software engineering increasingly overlap. A good AI coding prompt can resemble a technical specification: it explains the existing system, identifies the problem, defines the desired result, and establishes boundaries that the AI should not cross.',
      },
      {
        type: 'list',
        items: [
          {
            lead: 'One practical rule:',
            text: 'never judge AI-generated code only by whether it works—also ask whether it is secure, maintainable, understandable, testable, and appropriate for the project.',
          },
        ],
      },
      {
        type: 'heading',
        text: '5. But What Happens to Beginners?',
      },
      {
        type: 'paragraph',
        text: 'This is where the conversation becomes complicated. AI makes it possible for someone with limited programming experience to build surprisingly sophisticated applications. That is exciting because the barrier to entry is lower. People with ideas but little formal development experience can experiment, prototype, and learn by building.',
      },
      {
        type: 'paragraph',
        text: 'But there is also a trap. If someone accepts everything the AI generates without understanding it, they may create software that works under ideal conditions but falls apart when something unexpected happens. They may not recognize insecure authentication, poor database design, inefficient code, dependency problems, or hidden edge cases.',
      },
      {
        type: 'paragraph',
        text: 'The best approach for beginners is therefore not to avoid AI. It is to use AI as a teacher and collaborator. Ask it to explain the code. Ask why it chose a particular approach. Ask what could go wrong. Then change the code yourself and observe what happens.',
      },
      {
        type: 'heading',
        text: '6. Vibe Coding Does Not Eliminate Engineering',
      },
      {
        type: 'paragraph',
        text: 'There is a difference between producing code and engineering software. Code is one part of a larger system. Engineering includes requirements, architecture, testing, security, reliability, deployment, monitoring, documentation, maintenance, and trade-offs.',
      },
      {
        type: 'paragraph',
        text: 'AI can contribute to nearly every one of those areas, but contribution is not the same as accountability. If an application leaks customer information, crashes during a critical workflow, or makes an incorrect business decision, saying "the AI wrote it" does not solve the problem.',
      },
      {
        type: 'paragraph',
        text: 'That is why human judgment remains central. Someone has to decide what acceptable quality looks like and verify that the system actually meets that standard.',
      },
      {
        type: 'heading',
        text: '7. So, Are You Still a Developer?',
      },
      {
        type: 'quote',
        bold: true,
        text: 'Yes—but the definition of a developer is changing.',
      },
      {
        type: 'paragraph',
        text: 'Being a developer has never truly been about how many characters you can type per minute. It is about solving problems with technology. The ability to manually write every line of an application is a valuable skill, but it is not the only measure of software development ability.',
      },
      {
        type: 'paragraph',
        text: 'A developer who can use AI effectively may produce more software, experiment with more ideas, and spend more time on difficult problems. The tool changes the workflow, but the responsibility for the result remains with the developer.',
      },
      {
        type: 'heading',
        text: '8. The Developer of the Future',
      },
      {
        type: 'paragraph',
        text: 'The strongest developers in an AI-assisted world may not be the people who refuse AI or blindly depend on it. They will likely be the people who know when to use it, when not to use it, and how to verify what it produces.',
      },
      {
        type: 'paragraph',
        text: 'They will understand enough technology to challenge the AI. They will understand enough product thinking to build something useful. They will understand enough communication to describe a problem precisely. And they will understand enough engineering discipline to turn a generated prototype into software that people can actually depend on.',
      },
      {
        type: 'heading',
        text: '9. Vibe Coding Is a New Layer, Not the End of Coding',
      },
      {
        type: 'paragraph',
        text: 'The most useful way to think about vibe coding is not as the death of programming, but as another layer of abstraction. We have already moved through several layers: from machine code to assembly, from assembly to higher-level languages, from manual memory management to managed runtimes, from building everything ourselves to using frameworks and open-source packages.',
      },
      {
        type: 'paragraph',
        text: 'AI-assisted development is another step in that progression. The computer can now help translate human intent into implementation at an unprecedented speed. That does not make technical knowledge irrelevant. It makes the ability to apply that knowledge more powerful.',
      },
      {
        type: 'heading',
        text: '10. The Real Question',
      },
      {
        type: 'quote',
        text: 'So, are you still a developer if AI writes the code?',
      },
      {
        type: 'paragraph',
        text: 'Maybe the better question is: **what can you build when you no longer have to do everything manually?**',
      },
      {
        type: 'paragraph',
        text: 'Vibe coding gives developers a new kind of leverage. A single person can prototype an idea in hours, iterate quickly, learn unfamiliar technologies with an AI tutor beside them, and turn concepts into working software with fewer barriers.',
      },
      {
        type: 'paragraph',
        text: 'But leverage only matters when it is paired with judgment. AI can generate code. It cannot take responsibility for your product. It can suggest an architecture. It cannot understand every consequence of choosing it. It can fix a bug. It cannot always know whether the fix created a larger problem somewhere else.',
      },
      {
        type: 'paragraph',
        bold: true,
        text: 'Vibe coding is not about becoming less of a developer. It is about becoming a different kind of developer—one who spends less time translating every thought into syntax and more time deciding what should be built, why it should be built, and whether it deserves to exist.',
      },
      {
        type: 'paragraph',
        text: 'The keyboard may be changing. The tools are definitely changing. But the person with the idea, the judgment, and the responsibility is still at the center of the process.',
      },
      {
        type: 'quote',
        bold: true,
        text: 'Keep building. Keep questioning the AI. And keep learning enough to know when it is wrong.',
      },
    ],
  },
}
