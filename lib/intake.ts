// Intake questionnaire schema for Reflector, the Eternal intake.
//
// Mirrors "The Reflection Wizard", the Airtable form behind reflector.createsafe.io.
// Field keys are the column names of that table (username, name, goals, goalsList,
// MeSocial, …) and the question copy is the field description shown on that form,
// so a submission can be written straight into the same table. Option lists are the
// table's own select choices.

export type Choice = { value: string; label?: string; note?: string };

type Base = { key: string; label: string; hint?: string; required?: boolean };

export type Question =
  | (Base & { kind: "text"; placeholder?: string })
  | (Base & {
      kind: "textarea";
      placeholder?: string;
      // Only shown when the referenced field's value includes one of these.
      showWhen?: { key: string; anyOf: string[] };
    })
  | (Base & { kind: "single"; options: Choice[] })
  | (Base & { kind: "multi"; options: Choice[] })
  | (Base & { kind: "scale"; min: number; max: number; low: string; high: string });

export type Step = { id: string; title: string; kicker: string; intro?: string; questions: Question[] };

const opts = (...values: string[]): Choice[] => values.map((value) => ({ value }));

const ACTIVITIES = opts(
  "Constructing",
  "Debating",
  "Drawing",
  "Math",
  "Performing",
  "Programming",
  "Reading",
  "Research",
  "Speaking",
  "Writing",
  "Other"
);

export const FORM_NAME = "The Reflection Wizard";

export const STEPS: Step[] = [
  {
    id: "goals",
    title: "Goals",
    kicker: "01 · Direction",
    intro: "Where you are headed, and on what clock.",
    questions: [
      {
        kind: "multi",
        key: "goals",
        label: "Do you have goals?",
        hint: "Select each goal milestone that you have considered creating for yourself.",
        options: opts(
          "Weekly",
          "Monthly",
          "Quarterly",
          "Yearly",
          "1 Year",
          "3 Year",
          "5 Year",
          "10 Year",
          "General",
          "I don't have any goals"
        ),
        required: true,
      },
      {
        kind: "textarea",
        key: "goalsList",
        label: "List your goals.",
        hint: "If you selected a goal milestone, list your weekly, monthly, quarterly, 1yr, 3yr, 5yr and 10yr goals under each one.",
        placeholder: "WEEKLY\n…\n\nYEARLY\nThe Desert EP [ 5–7 songs, Fall ]\nMagic Power [ Album, next year ]",
        showWhen: {
          key: "goals",
          anyOf: ["Weekly", "Monthly", "Quarterly", "Yearly", "1 Year", "3 Year", "5 Year", "10 Year", "General"],
        },
      },
    ],
  },
  {
    id: "balance",
    title: "Balance",
    kicker: "02 · Time",
    intro: "What percentage of your time do you need in each of these areas in order to achieve maximum quality of life?",
    questions: [
      {
        kind: "scale",
        key: "MeSocial",
        label: "Me time vs. social time.",
        hint: "1 = complete solitude. 10 = surrounded by or engaged with one or more persons 24/7.",
        min: 1,
        max: 10,
        low: "Me time",
        high: "Social time",
        required: true,
      },
      {
        kind: "scale",
        key: "creativeWork",
        label: "Creative time vs. work time.",
        hint: "1 = time you spend creating for your enjoyment. 10 = time you spend doing things for compensation.",
        min: 1,
        max: 10,
        low: "Creative time",
        high: "Work time",
        required: true,
      },
    ],
  },
  {
    id: "learning",
    title: "Learning",
    kicker: "03 · Growth",
    questions: [
      {
        kind: "multi",
        key: "learningStyle",
        label: "How do you learn best?",
        hint: "Select all that apply.",
        options: [
          { value: "Visual", note: "Spatial. You prefer using pictures, images, and spatial understanding." },
          { value: "Aural", note: "Auditory-musical. You prefer using sound and music." },
          { value: "Verbal", note: "Linguistic. You prefer using words, both in speech and writing." },
          { value: "Physical", note: "Kinesthetic. You prefer using your body, hands and sense of touch." },
          { value: "Logical", note: "Mathematical. You prefer using logic, reasoning and systems." },
          { value: "Social", note: "Interpersonal. You prefer to learn in groups or with other people." },
          { value: "Solitary", note: "Intrapersonal. You prefer to work alone and use self-study." },
        ],
        required: true,
      },
      {
        kind: "single",
        key: "learn",
        label: "Do you want to learn?",
        hint: "Are you looking to expand your expertise?",
        options: opts("Yes", "No", "I don't know", "Give me the space to explain"),
        required: true,
      },
      {
        kind: "textarea",
        key: "learningSpace",
        label: "What is your learning experience?",
        hint: "You may not know the answer to “do you want to learn?”. If you selected “Give me the space to explain,” tell us your thoughts about your experience with learning.",
        placeholder: "I want to learn how to be 100% present on stage.",
        showWhen: { key: "learn", anyOf: ["Yes", "I don't know", "Give me the space to explain"] },
      },
    ],
  },
  {
    id: "enjoy",
    title: "Habits",
    kicker: "04 · Practice",
    questions: [
      {
        kind: "multi",
        key: "enjoyDoing",
        label: "What types of activities do you enjoy doing?",
        hint: "Choose a category of activity that you consistently enjoy engaging in every day, e.g. your daily habits. Skip the categories that don’t apply to you.",
        options: opts("Spiritual", "Mental", "Visual", "Audible", "Physical"),
        required: true,
      },
      {
        kind: "textarea",
        key: "spiritual",
        label: "Your daily spiritual activities.",
        hint: "Use this space to explain what your daily spiritual habits are.",
        placeholder: "Meditation\nEarthing\nAffirmation",
        showWhen: { key: "enjoyDoing", anyOf: ["Spiritual"] },
      },
      {
        kind: "textarea",
        key: "mental",
        label: "Your daily mental activities.",
        hint: "Use this space to explain what your daily mental habits are.",
        placeholder: "Reading\nChess\nJournaling",
        showWhen: { key: "enjoyDoing", anyOf: ["Mental"] },
      },
      {
        kind: "textarea",
        key: "visual",
        label: "Your daily visual activities.",
        hint: "Use this space to explain what your daily visual habits are.",
        placeholder: "Drawing\nDressing\nFilm",
        showWhen: { key: "enjoyDoing", anyOf: ["Visual"] },
      },
      {
        kind: "textarea",
        key: "audible",
        label: "Your daily audible activities.",
        hint: "Use this space to explain what your daily audible habits are.",
        placeholder: "Vocal exercises\nSinging\nDJing",
        showWhen: { key: "enjoyDoing", anyOf: ["Audible"] },
      },
      {
        kind: "textarea",
        key: "physical",
        label: "Your daily physical activities.",
        hint: "Use this space to explain what your daily physical habits are.",
        placeholder: "Running\nYoga\nDance",
        showWhen: { key: "enjoyDoing", anyOf: ["Physical"] },
      },
    ],
  },
  {
    id: "activities",
    title: "Proficiency",
    kicker: "05 · Craft",
    questions: [
      {
        kind: "multi",
        key: "activitiesExhibited",
        label: "What are the activities that you believe you exhibit proficiency in when doing them?",
        hint: "Select all that apply.",
        options: ACTIVITIES,
        required: true,
      },
      {
        kind: "multi",
        key: "exhibitProficiency",
        label: "What are the activities you want to exhibit proficiency doing?",
        hint: "What do you want to be good at?",
        options: ACTIVITIES,
        required: true,
      },
      {
        kind: "textarea",
        key: "peopleThink",
        label: "What do people that are close to you think you are good at?",
        hint: "If you don't know, you better ask somebody.",
        placeholder: "Synthesis, vision, language, play, hype.",
      },
    ],
  },
  {
    id: "characteristics",
    title: "Character",
    kicker: "06 · Identity",
    questions: [
      {
        kind: "single",
        key: "uniqueCharacteristics",
        label: "Do you believe that you are unique?",
        options: opts("Yes", "Yes, I want the space to talk about them", "I don’t have any", "I don’t know"),
        required: true,
      },
      {
        kind: "textarea",
        key: "characteristicSpace",
        label: "What makes you unique?",
        hint: "Explain what you think are your unique mental and moral characteristics.",
        placeholder: "I am an artist / strategist. Fast intellect plus well-developed intuition…",
        showWhen: { key: "uniqueCharacteristics", anyOf: ["Yes", "Yes, I want the space to talk about them"] },
      },
      {
        kind: "multi",
        key: "superPowers",
        label: "Superpowers.",
        hint: "Choose the uncanny supernatural gifts you possess, or people believe that you possess.",
        options: opts(
          "Absorbtion",
          "Accuracy",
          "Adaptability",
          "Adoptivity",
          "Apathy",
          "Detection",
          "Emotion",
          "Empathy",
          "Intuition",
          "Leadership",
          "Logic",
          "Longevity",
          "Lyricality",
          "Manipulation",
          "Memory",
          "Observation",
          "Patience",
          "Persuasion",
          "Secrecy",
          "Trickery",
          "Vision",
          "Vocality",
          "Wizardry",
          "Other"
        ),
        required: true,
      },
    ],
  },
  {
    id: "temperament",
    title: "Temperament",
    kicker: "07 · Energy",
    questions: [
      {
        kind: "single",
        key: "introvertExtrovert",
        label: "Are you an introvert or an extrovert?",
        options: [
          { value: "Introvert" },
          { value: "Extrovert" },
          { value: "Extrointroverted", note: "Extroverted, leaning introvert" },
          { value: "Introextroverted", note: "Introverted, leaning extrovert" },
          { value: "Unsure" },
        ],
        required: true,
      },
      {
        kind: "single",
        key: "peaceConflict",
        label: "Do you enjoy conflict or peace?",
        options: opts("Peace", "Conflict"),
        required: true,
      },
    ],
  },
  {
    id: "empowerment",
    title: "Empowerment",
    kicker: "08 · Support",
    questions: [
      {
        kind: "single",
        key: "empowerment",
        label: "Do you feel empowered?",
        hint: "Do you feel confident in your ability to control your life and claim your rights?",
        options: opts("Yes", "No", "I Don't Know"),
        required: true,
      },
      {
        kind: "single",
        key: "empowered",
        label: "Did you empower yourself?",
        options: opts("Yes", "No"),
        required: true,
      },
      {
        kind: "multi",
        key: "empoweredBy",
        label: "Did someone empower you?",
        hint: "Select all that apply.",
        options: opts("Companionship", "Friendship", "Mentoring", "Parenting", "Other", "No"),
        required: true,
      },
      {
        kind: "textarea",
        key: "talkEmpowerment",
        label: "Talk about empowerment.",
        hint: "What it looked like, who it came from, what it changed.",
        placeholder: "The moment someone believed in me before I did…",
      },
    ],
  },
  {
    id: "help",
    title: "Help",
    kicker: "09 · Community",
    questions: [
      {
        kind: "single",
        key: "helpingOthers",
        label: "Do you enjoy / want to help others?",
        options: opts("Yes", "No"),
        required: true,
      },
      {
        kind: "textarea",
        key: "helpingExamples",
        label: "Explain why and/or how.",
        placeholder: "I love to help others gain clarity about their greatness.",
        showWhen: { key: "helpingOthers", anyOf: ["Yes"] },
      },
      {
        kind: "single",
        key: "helpLooking",
        label: "Are you looking for help?",
        options: opts("Yes", "No"),
        required: true,
      },
      {
        kind: "textarea",
        key: "ifHelp",
        label: "Explain why, how and/or what kind.",
        placeholder: "I need help leveling up my craft as a producer. I need help with distribution…",
        showWhen: { key: "helpLooking", anyOf: ["Yes"] },
      },
    ],
  },
  {
    id: "artist",
    title: "Artist",
    kicker: "10 · One last thing",
    questions: [
      {
        kind: "single",
        key: "artist",
        label: "Are you an artist?",
        options: opts("Yes", "No"),
        required: true,
      },
    ],
  },
];

export type Answers = Record<string, string | string[] | number | undefined>;

export function isVisible(q: Question, answers: Answers): boolean {
  if (q.kind !== "textarea" || !q.showWhen) return true;
  const v = answers[q.showWhen.key];
  const list = Array.isArray(v) ? v : v == null ? [] : [String(v)];
  return q.showWhen.anyOf.some((x) => list.includes(x));
}

export function isAnswered(q: Question, answers: Answers): boolean {
  const v = answers[q.key];
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "number") return true;
  return typeof v === "string" && v.trim().length > 0;
}

export function stepMissing(step: Step, answers: Answers): string[] {
  return step.questions
    .filter((q) => q.required && isVisible(q, answers) && !isAnswered(q, answers))
    .map((q) => q.key);
}

// Flatten answers into the table's shape: multi-selects become comma-joined
// strings (as in the CSV export), scales become numbers as strings.
export function toRecord(answers: Answers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const step of STEPS) {
    for (const q of step.questions) {
      const v = answers[q.key];
      if (v == null || (Array.isArray(v) && v.length === 0) || v === "") continue;
      out[q.key] = Array.isArray(v) ? v.join(",") : String(v);
    }
  }
  return out;
}

// Field kinds by key, so the server can coerce values into Airtable's types.
export const FIELD_KINDS: Record<string, Question["kind"]> = Object.fromEntries(
  STEPS.flatMap((s) => s.questions.map((q) => [q.key, q.kind]))
);
