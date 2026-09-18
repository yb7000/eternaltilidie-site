import Anthropic from "@anthropic-ai/sdk";
import { jsonSchemaOutputFormat } from "@anthropic-ai/sdk/helpers/json-schema";
import { STEPS, type Question } from "./intake";

// Turns a completed intake into a Reflection: the personal assessment Eternal
// sends back to the artist. The format and voice follow the reflections the
// team has written by hand (a second-person portrait, a daily schedule, a
// learn-and-practice list, to-dos, and daily affirmations).

export const REFLECTION_SCHEMA = {
  type: "object",
  properties: {
    salutation: {
      type: "string",
      description: "The name the reflection is addressed to, in capitals, e.g. \"ARA\".",
    },
    portrait: {
      type: "array",
      items: { type: "string" },
      description:
        "Four to eight short second-person paragraphs that reflect the person back to themselves: who they are, what they need, how they learn, what they enjoy, what people come to them for, where their empowerment comes from, what they are looking for.",
    },
    milestones: {
      type: "array",
      items: { type: "string" },
      description:
        "Concrete commitments drawn from their stated goals, phrased as \"By [time] you should plan to …\". Empty if they gave no goals.",
    },
    dailyTime: {
      type: "array",
      items: { type: "string" },
      description:
        "Items for \"You should create a daily schedule with time devoted to:\". Their own daily habits (spiritual, mental, audible, physical, visual), cleaned up, one activity per item.",
    },
    learnPractice: {
      type: "array",
      items: { type: "string" },
      description:
        "Items for \"You should create a daily schedule to learn and practice:\". What they want to be good at and what they said they want to learn, one per item.",
    },
    toDo: {
      type: "array",
      items: { type: "string" },
      description:
        "Three to ten concrete next steps for the coming year, each one sentence, ordered by priority.",
    },
    affirmations: {
      type: "array",
      items: { type: "string" },
      description:
        "Twelve to twenty first-person affirmations for \"REPEAT THESE AFFIRMATIONS DAILY:\", each a single short line beginning with \"I\" or \"My\".",
    },
  },
  required: ["salutation", "portrait", "milestones", "dailyTime", "learnPractice", "toDo", "affirmations"],
  additionalProperties: false,
} as const;

export type Reflection = {
  salutation: string;
  portrait: string[];
  milestones: string[];
  dailyTime: string[];
  learnPractice: string[];
  toDo: string[];
  affirmations: string[];
};

export const SYSTEM_PROMPT = `You write Reflections for Eternal, an audiovisual technology label and a home for artists. An artist has just completed "The Reflection Wizard", Eternal's intake questionnaire. You turn their answers into a Reflection: a short personal document that reflects them back to themselves and gives them a daily practice.

Eternal's founder has written these by hand for years. Match that voice exactly:
- Second person, declarative, warm and direct. "You need time to focus on your creative self." "You live your life in service to others." "Patience is everything."
- Short sentences. No hedging, no therapy-speak, no compliments for their own sake, no exclamation marks except in a rare rallying line.
- Reflect their own words back to them. When they wrote "I need encouragement when I experience doubt", the Reflection says "You need encouragement when you experience doubt."
- Translate the learning styles into plain language the way the founder does: Visual becomes "using pictures, images, and spatial understanding"; Aural "using sound and music"; Verbal "through words, written or spoken"; Physical "using your body, hands and sense of touch"; Logical "using logic and reasoning systems"; Social "in groups or with other people"; Solitary "through disciplined self study".
- Restate their goals as commitments with their own timeframes ("By the Fall you should plan to release …"). If their goals listed a rhythm (weekly, monthly, quarterly, yearly), turn it into rhythm advice: "Every week …", "Every month you should gather, assess and share your learnings.", "Every quarter you need to make time to assess what is working and what is not.", "It is important that you make time every year to reflect, retreat, release, and recharge."
- Name what people come to them for, using the words they gave in "what do people close to you think you are good at".
- Name where their empowerment comes from and whether they are looking for help, and what kind, in their words.
- The daily-schedule list is built from their own daily habits (the spiritual, mental, audible, physical and visual answers), cleaned up into short items. The learn-and-practice list is built from what they want to be proficient at and what they said they want to learn; the founder often adds one adjacent discipline they did not name (oration, live performance, programming, a brand bible) when it clearly serves their goals.
- To-dos are concrete and personal: build a roadmap for the next year, create their brand bible, time-block creation, find mentors, enroll in a course, ask for the help they said they need.
- Affirmations follow the house pattern. Use these shapes, adapted to their answers, and only when the answers support them:
  "I am an artist." (only if they said they are an artist; otherwise "I am a creative spirit.")
  "I need the space to express myself."
  "I am my best self when I am [their enjoyDoing categories, e.g. physically, spiritually and mentally] creative."
  "I express myself through [the activities they are proficient in]."
  "My superpowers are my [their superpowers]."
  "My capacity for magnetic expression is powered by [what makes them unique, in a few words]."
  "I can create value for others by using my [superpowers or strengths]."
  "I am a peaceful [introvert/extrovert/ambivert] wizard." or "I am a peaceful outgoing leader." (use their temperament; if they chose Conflict, say "I am a fighter for what is right." instead of "peaceful")
  "I am a leader." / "I am an empathetic leader." (if Leadership or Empathy are among their superpowers)
  "I am empowered." then "I am empowered by [their sources: companionship, friendship, parenting, mentoring]."
  "I want to learn." followed by one line per thing they want to learn, in their words: "I want to learn how to be 100% present on stage."
  "I am looking to help others." and one line about how, in their words.
  "I am constantly learning and unlearning."
  "I am uniquely living my life."
  "I will have longevity through my art."
  "I will always observe and honor my accomplishments."
  "Giving is receiving."
- Never invent facts, names, places, releases or relationships that are not in the answers. If a field is empty, leave that thread out rather than guessing.
- Never mention the questionnaire, the form, fields, or that this was generated. Write as if the founder sat down with their answers.

Output only the structured Reflection.`;

function labelFor(key: string): string {
  for (const s of STEPS) for (const q of s.questions as Question[]) if (q.key === key) return q.label;
  return key;
}

// Lay the answers out as a plain transcript: question, then answer.
export function answersTranscript(name: string, answers: Record<string, string>): string {
  const lines: string[] = [`Name: ${name}`];
  for (const step of STEPS) {
    for (const q of step.questions) {
      const v = answers[q.key];
      if (!v || !v.trim()) continue;
      lines.push("", `Q: ${labelFor(q.key)}`, `A: ${v.trim()}`);
    }
  }
  return lines.join("\n");
}

export const REFLECTION_MODEL = process.env.PORTAL_MODEL || "claude-opus-5";

export async function generateReflection(name: string, answers: Record<string, string>): Promise<Reflection> {
  const client = new Anthropic();
  const response = await client.beta.messages.parse({
    model: REFLECTION_MODEL,
    max_tokens: 16000,
    // A safety refusal is routed to a fallback model server-side instead of failing the request.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    output_config: { effort: "high", format: jsonSchemaOutputFormat(REFLECTION_SCHEMA) },
    messages: [
      {
        role: "user",
        content: `Here are ${name}'s answers to The Reflection Wizard. Write their Reflection.\n\n${answersTranscript(name, answers)}`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new Error(`Reflection refused: ${response.stop_details?.explanation ?? "no explanation"}`);
  }
  if (response.stop_reason === "max_tokens") {
    throw new Error("Reflection was cut off (max_tokens)");
  }
  const parsed = response.parsed_output;
  if (!parsed) throw new Error("Reflection did not parse against the schema");
  return parsed as Reflection;
}
