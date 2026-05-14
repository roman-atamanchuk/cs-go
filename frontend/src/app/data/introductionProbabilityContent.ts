export type LectureSlide = {
  id: string;
  topic: string;
  explanation: string;
  example: string;
  extraExamples: string[];
};

export type QuizQuestion = {
  id: string;
  slideId: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type SupportVideo = {
  id: string;
  number: number;
  title: string;
  duration: string;
  sourceLabel: string;
  sourceUrl: string;
  embedUrl?: string;
};

function rotateOptions(options: string[], amount: number) {
  const offset = amount % options.length;
  return options.slice(offset).concat(options.slice(0, offset));
}

function buildLectureQuestionBank(slides: LectureSlide[], prefix: string) {
  function buildTopicOptions(correctIndex: number) {
    const picks = [
      slides[correctIndex].topic,
      slides[(correctIndex + 2) % slides.length].topic,
      slides[(correctIndex + 4) % slides.length].topic,
      slides[(correctIndex + 6) % slides.length].topic,
    ];
    return rotateOptions(picks, correctIndex % picks.length);
  }

  function buildExplanationOptions(correctIndex: number) {
    const picks = [
      slides[correctIndex].explanation,
      slides[(correctIndex + 2) % slides.length].explanation,
      slides[(correctIndex + 4) % slides.length].explanation,
      slides[(correctIndex + 6) % slides.length].explanation,
    ];
    return rotateOptions(picks, (correctIndex + 1) % picks.length);
  }

  function buildExampleOptions(correctIndex: number) {
    const picks = [
      slides[correctIndex].example,
      slides[(correctIndex + 1) % slides.length].example,
      slides[(correctIndex + 3) % slides.length].example,
      slides[(correctIndex + 5) % slides.length].example,
    ];
    return rotateOptions(picks, (correctIndex + 2) % picks.length);
  }

  return slides.flatMap((slide, index) => [
    {
      id: `${prefix}-${slide.id}-topic`,
      slideId: slide.id,
      prompt: `Which topic matches this idea: "${slide.explanation}"?`,
      options: buildTopicOptions(index),
      correctAnswer: slide.topic,
      explanation: `${slide.topic} is correct because that explanation comes directly from this slide.`,
    },
    {
      id: `${prefix}-${slide.id}-example`,
      slideId: slide.id,
      prompt: `Choose the best example of "${slide.topic}".`,
      options: buildExampleOptions(index),
      correctAnswer: slide.example,
      explanation: `The lecture example for "${slide.topic}" is: ${slide.example}`,
    },
    {
      id: `${prefix}-${slide.id}-definition`,
      slideId: slide.id,
      prompt: `Which explanation best fits "${slide.topic}"?`,
      options: buildExplanationOptions(index),
      correctAnswer: slide.explanation,
      explanation: `The correct definition for "${slide.topic}" is: ${slide.explanation}`,
    },
    {
      id: `${prefix}-${slide.id}-statement`,
      slideId: slide.id,
      prompt: `Which statement about "${slide.topic}" is correct?`,
      options: rotateOptions(
        [
          slide.explanation,
          slides[(index + 2) % slides.length].explanation,
          slides[(index + 4) % slides.length].explanation,
          slides[(index + 6) % slides.length].explanation,
        ],
        index % 4,
      ),
      correctAnswer: slide.explanation,
      explanation: `"${slide.topic}" is best described by: ${slide.explanation}`,
    },
  ]);
}

export function getShuffledQuizSubsetFromBank(questionBank: QuizQuestion[], count: number) {
  const shuffled = [...questionBank];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = shuffled[index];
    shuffled[index] = shuffled[swapIndex];
    shuffled[swapIndex] = temp;
  }

  return shuffled.slice(0, count);
}

export const introductionSupportVideos: SupportVideo[] = [
  {
    id: "support-1",
    number: 1,
    title: "Probability explained",
    duration: "8:17",
    sourceLabel: "Khan Academy YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=uzkc-qNVoOk&list=PLC58778F28211FA19&index=1",
    embedUrl: "https://www.youtube.com/embed/uzkc-qNVoOk",
  },
  {
    id: "support-2",
    number: 2,
    title: "Probability and sample spaces",
    duration: "Playlist video 2",
    sourceLabel: "Khan Academy YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=obZzOq_wSCg&list=PLC58778F28211FA19&index=2",
    embedUrl: "https://www.youtube.com/embed/obZzOq_wSCg",
  },
  {
    id: "support-3",
    number: 3,
    title: "Probability examples",
    duration: "Playlist video 3",
    sourceLabel: "Khan Academy YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=QE2uR6Z-NcU&list=PLC58778F28211FA19&index=3",
    embedUrl: "https://www.youtube.com/embed/QE2uR6Z-NcU",
  },
  {
    id: "support-4",
    number: 4,
    title: "Complementary events",
    duration: "Duration not confirmed",
    sourceLabel: "Khan Academy",
    sourceUrl:
      "https://www.khanacademy.org/math/class-12-bridge/x09646558c1ff0797%3Aadvanced-counting/x09646558c1ff0797%3Aprobability/v/complementary-events",
  },
  {
    id: "support-5",
    number: 5,
    title: "Mutually exclusive and exhaustive events",
    duration: "9:27",
    sourceLabel: "Khan Academy",
    sourceUrl:
      "https://www.khanacademy.org/math/ka-math-class-11/x0419e5b3b578592a%3Aprobability-ncert-new/x0419e5b3b578592a%3Aalgebra-of-events/v/mutually-exclusive-and-exhaustive-events",
  },
];

export const introductionSlides: LectureSlide[] = [
  {
    id: "uncertainty",
    topic: "Uncertainty",
    explanation: "Probability helps us measure how likely an uncertain event is.",
    example: "Example: Will it rain tomorrow?",
    extraExamples: [
      "Example: Will the next bus arrive in 5 minutes?",
    ],
  },
  {
    id: "quantifying",
    topic: "Quantifying Probability",
    explanation: "The same chance can be written as a fraction, decimal, or percentage.",
    example: "Example: 1/6 = 0.167 = 16.7%",
    extraExamples: [
      "Example: 1/2 = 0.5 = 50%",
    ],
  },
  {
    id: "odds",
    topic: "Odds",
    explanation: "Odds compare favourable cases to unfavourable cases.",
    example: "Example: Getting a 3 on a die has odds 1 to 5.",
    extraExamples: [
      "Example: 1 head vs 1 tail gives odds 1 to 1.",
    ],
  },
  {
    id: "classical",
    topic: "Classical Probability",
    explanation: "Use this when all outcomes are equally favoured.",
    example: "Example: P(rolling a 3) = 1/6",
    extraExamples: [
      "Example: P(heads on a fair coin) = 1/2",
    ],
  },
  {
    id: "empirical",
    topic: "Empirical Probability",
    explanation: "Estimate probability from observed sample results.",
    example: "Example: 12 heads in 20 flips gives 12/20 = 0.6",
    extraExamples: [
      "Example: 7 rainy days in 10 days gives 0.7",
    ],
  },
  {
    id: "relative-frequency",
    topic: "Relative Frequency",
    explanation: "As the sample gets larger, the estimate becomes more reliable.",
    example: "Example: More coin flips usually move closer to 50/50.",
    extraExamples: [
      "Example: 10 flips can be uneven, 1,000 flips are usually closer to half heads.",
    ],
  },
  {
    id: "subjective",
    topic: "Subjective Probability",
    explanation: "Sometimes probability is a reasoned personal judgement.",
    example: "Example: A doctor estimates a treatment has 90% success.",
    extraExamples: [
      "Example: A coach believes a team has a strong chance to win.",
    ],
  },
  {
    id: "counting",
    topic: "Counting",
    explanation: "In classical probability, we count favourable outcomes and total outcomes.",
    example: "Example: Favourable / total",
    extraExamples: [
      "Example: 2 red marbles out of 5 gives 2/5.",
    ],
  },
  {
    id: "sample-space",
    topic: "Sample Space",
    explanation:
      "The sample space is the set of all possible outcomes. For a coin, each flip has 2 outcomes: H or T, so the number of possible outcomes doubles with each new flip.",
    example: "Example: One coin flip -> {H, T}",
    extraExamples: [
      "Example: Die roll -> {1, 2, 3, 4, 5, 6}",
      "Example: 1 flip -> 2^1 = 2, 2 flips -> 2^2 = 4, 3 flips -> 2^3 = 8, so in general n flips -> 2^n outcomes.",
    ],
  },
  {
    id: "event",
    topic: "Event",
    explanation: "An event is one outcome or a group of outcomes.",
    example: "Example: Odd on a die -> {1, 3, 5}",
    extraExamples: [
      "Example: Rolling more than 4 -> {5, 6}",
    ],
  },
  {
    id: "union-intersection",
    topic: "Union and Intersection",
    explanation: "Union means A or B or both. Intersection means A and B together.",
    example: "Example: A = odd, B = 4 or less, then A ∩ B = {1, 3}",
    extraExamples: [
      "Example: A ∪ B = {1, 2, 3, 4, 5}",
    ],
  },
  {
    id: "complement",
    topic: "Complement",
    explanation: "The complement of A means A does not happen.",
    example: "Example: Not even -> {1, 3, 5}",
    extraExamples: [
      "Example: Not heads means tails.",
    ],
  },
  {
    id: "omega-null",
    topic: "Omega and Null Event",
    explanation: "Omega is the whole sample space. Phi is the null event with no outcomes.",
    example: "Example: Omega for a die is {1, 2, 3, 4, 5, 6}",
    extraExamples: [
      "Example: Phi = {} means impossible event.",
    ],
  },
  {
    id: "exclusive-exhaustive",
    topic: "Mutually Exclusive and Exhaustive",
    explanation: "Exclusive events cannot happen together; exhaustive events cover all outcomes.",
    example: "Example: Heads and tails are mutually exclusive and exhaustive for one fair coin.",
    extraExamples: [
      "Example: Rolling odd and even cannot happen together.",
    ],
  },
  {
    id: "probability-models",
    topic: "Probability Models",
    explanation: "A probability model is a mathematical way to represent how outcomes are distributed.",
    example: "Example: Births spread evenly through 12 months gives probability 3/12 for Jan-Mar.",
    extraExamples: [
      "Example: A model can be useful even if it is not perfectly exact.",
    ],
  },
  {
    id: "equivalence",
    topic: "Equivalence of Approaches",
    explanation: "Classical, empirical, and subjective approaches can sometimes describe the same probability.",
    example: "Example: A fair die can be justified by symmetry, experiment, or belief.",
    extraExamples: [
      "Example: Different methods can still lead to the same probability value.",
    ],
  },
];

function buildTopicOptions(correctIndex: number) {
  const picks = [
    introductionSlides[correctIndex].topic,
    introductionSlides[(correctIndex + 2) % introductionSlides.length].topic,
    introductionSlides[(correctIndex + 5) % introductionSlides.length].topic,
    introductionSlides[(correctIndex + 8) % introductionSlides.length].topic,
  ];
  return rotateOptions(picks, correctIndex % picks.length);
}

function buildExplanationOptions(correctIndex: number) {
  const picks = [
    introductionSlides[correctIndex].explanation,
    introductionSlides[(correctIndex + 3) % introductionSlides.length].explanation,
    introductionSlides[(correctIndex + 6) % introductionSlides.length].explanation,
    introductionSlides[(correctIndex + 9) % introductionSlides.length].explanation,
  ];
  return rotateOptions(picks, correctIndex % picks.length);
}

function buildExampleOptions(correctIndex: number) {
  const picks = [
    introductionSlides[correctIndex].example,
    introductionSlides[(correctIndex + 1) % introductionSlides.length].example,
    introductionSlides[(correctIndex + 4) % introductionSlides.length].example,
    introductionSlides[(correctIndex + 7) % introductionSlides.length].example,
  ];
  return rotateOptions(picks, correctIndex % picks.length);
}

const generatedSlideQuestions: QuizQuestion[] = introductionSlides.flatMap((slide, index) => [
  {
    id: `${slide.id}-concept-from-explanation`,
    slideId: slide.id,
    prompt: `Which topic fits this idea: "${slide.explanation}"?`,
    options: buildTopicOptions(index),
    correctAnswer: slide.topic,
    explanation: `${slide.topic} is the correct topic because the slide explanation matches that idea directly.`,
  },
  {
    id: `${slide.id}-concept-from-example`,
    slideId: slide.id,
    prompt: `Which topic matches this example: "${slide.example}"?`,
    options: buildTopicOptions(index),
    correctAnswer: slide.topic,
    explanation: `${slide.example} is the example attached to the topic "${slide.topic}".`,
  },
  {
    id: `${slide.id}-explanation-pick`,
    slideId: slide.id,
    prompt: `Which explanation best matches "${slide.topic}"?`,
    options: buildExplanationOptions(index),
    correctAnswer: slide.explanation,
    explanation: `The correct explanation for "${slide.topic}" is: ${slide.explanation}`,
  },
  {
    id: `${slide.id}-example-pick`,
    slideId: slide.id,
    prompt: `Choose the best example of "${slide.topic}".`,
    options: buildExampleOptions(index),
    correctAnswer: slide.example,
    explanation: `The correct example for "${slide.topic}" is: ${slide.example}`,
  },
  {
    id: `${slide.id}-correct-statement`,
    slideId: slide.id,
    prompt: `Which statement about "${slide.topic}" is correct?`,
    options: rotateOptions(
      [
        slide.explanation,
        introductionSlides[(index + 2) % introductionSlides.length].explanation,
        introductionSlides[(index + 5) % introductionSlides.length].explanation,
        introductionSlides[(index + 8) % introductionSlides.length].explanation,
      ],
      (index + 1) % 4,
    ),
    correctAnswer: slide.explanation,
    explanation: `"${slide.topic}" is best described by: ${slide.explanation}`,
  },
]);

type ManualQuizQuestion = Omit<QuizQuestion, "slideId">;

const manualLectureQuestions: ManualQuizQuestion[] = [
  {
    id: "manual-01",
    prompt: "What does probability mainly help us quantify?",
    options: ["Uncertainty", "Certainty", "Speed"],
    correctAnswer: "Uncertainty",
    explanation: "The lecture begins by explaining that probability is a mechanism for quantifying uncertainty.",
  },
  {
    id: "manual-02",
    prompt: "Which everyday question is an example of uncertainty?",
    options: ["Will the file server crash in the next three days?", "What is 2 + 2?", "How many sides does a die have?"],
    correctAnswer: "Will the file server crash in the next three days?",
    explanation: "The PDF lists uncertain future events such as whether a file server will crash.",
  },
  {
    id: "manual-03",
    prompt: "If the probability of an event is 1/6, which decimal is correct?",
    options: ["0.167", "0.600", "0.500"],
    correctAnswer: "0.167",
    explanation: "The lecture converts 1/6 into the decimal 0.167.",
  },
  {
    id: "manual-04",
    prompt: "If the probability is 1/6, which percentage is closest?",
    options: ["16.7%", "60%", "50%"],
    correctAnswer: "16.7%",
    explanation: "The lecture shows 1/6 as about 16.7 percent.",
  },
  {
    id: "manual-05",
    prompt: "How is probability usually written in this module?",
    options: ["As a proportion between 0 and 1", "As a negative number", "Only as whole numbers"],
    correctAnswer: "As a proportion between 0 and 1",
    explanation: "The lecture says proportion notation is usually used and must lie in the interval [0, 1].",
  },
  {
    id: "manual-06",
    prompt: "On a fair die, how many favourable outcomes are there for rolling a 3?",
    options: ["1", "3", "6"],
    correctAnswer: "1",
    explanation: "Only one face on a fair die shows 3.",
  },
  {
    id: "manual-07",
    prompt: "On a fair die, how many unfavourable outcomes are there for rolling a 3?",
    options: ["5", "3", "1"],
    correctAnswer: "5",
    explanation: "The other five faces are not 3, so there are five unfavourable outcomes.",
  },
  {
    id: "manual-08",
    prompt: "What are the odds in favour of getting a 3 on a fair die?",
    options: ["1 to 5", "1 to 6", "5 to 1"],
    correctAnswer: "1 to 5",
    explanation: "There is 1 favourable way and 5 unfavourable ways, so the odds in favour are 1 to 5.",
  },
  {
    id: "manual-09",
    prompt: "If you roll a fair die 15 times, about how many 3s would you expect on average?",
    options: ["2.5", "5", "7.5"],
    correctAnswer: "2.5",
    explanation: "The lecture example uses 15 x (1/6) = 2.5 expected favourable results.",
  },
  {
    id: "manual-10",
    prompt: "Classical probability works best when outcomes are:",
    options: ["Equally favoured", "Already observed", "Completely impossible"],
    correctAnswer: "Equally favoured",
    explanation: "The classical approach relies on the outcomes being equally favoured.",
  },
  {
    id: "manual-11",
    prompt: "Which situation from the lecture best fits classical probability?",
    options: ["The first lotto ball from 45 numbers", "The first letter of a surname in a phone book", "A doctor's one-off treatment estimate"],
    correctAnswer: "The first lotto ball from 45 numbers",
    explanation: "The lecture uses the lotto ball example because the outcomes are equally favoured.",
  },
  {
    id: "manual-12",
    prompt: "Why is the phone-book surname example not a classical probability case?",
    options: ["The letters are not equally favoured", "There are too many letters", "The sample space is empty"],
    correctAnswer: "The letters are not equally favoured",
    explanation: "Letters like M or O are more likely than X or Z, so the outcomes are not equally favoured.",
  },
  {
    id: "manual-13",
    prompt: "What ratio is used in an empirical probability estimate?",
    options: ["n/N", "N/n", "n x N"],
    correctAnswer: "n/N",
    explanation: "The lecture defines empirical probability as the proportion n divided by N.",
  },
  {
    id: "manual-14",
    prompt: "If 18 out of 30 sampled outcomes meet a condition, what is the empirical probability?",
    options: ["0.6", "0.3", "0.18"],
    correctAnswer: "0.6",
    explanation: "Empirical probability is n/N, so 18/30 = 0.6.",
  },
  {
    id: "manual-15",
    prompt: "What happens to confidence in an empirical estimate when sample size increases?",
    options: ["It usually increases", "It always becomes zero", "It becomes impossible to measure"],
    correctAnswer: "It usually increases",
    explanation: "The lecture says confidence in the estimate increases with N, the sample size.",
  },
  {
    id: "manual-16",
    prompt: "Relative frequency probability is obtained in the limiting case of:",
    options: ["Sampling the entire population", "Ignoring the sample", "Using only one observation"],
    correctAnswer: "Sampling the entire population",
    explanation: "The lecture states that in the limiting case, sampling the whole population gives relative frequency probability.",
  },
  {
    id: "manual-17",
    prompt: "Which topic explains why many coin flips should move closer to 50/50?",
    options: ["Relative Frequency", "Null Event", "Odds"],
    correctAnswer: "Relative Frequency",
    explanation: "Relative frequency is the idea that observed proportions become more stable as the sample grows.",
  },
  {
    id: "manual-18",
    prompt: "Which of these is a one-off event best suited to subjective probability?",
    options: ["A bookmaker estimating a horse race", "Rolling a fair die", "Drawing one card from a standard deck"],
    correctAnswer: "A bookmaker estimating a horse race",
    explanation: "The lecture uses bookmaker and doctor examples for subjective probability because they are one-off judgments.",
  },
  {
    id: "manual-19",
    prompt: "Subjective probability represents a person's:",
    options: ["Degree of belief", "Height", "Exact count of outcomes"],
    correctAnswer: "Degree of belief",
    explanation: "The lecture describes subjective probability as a personal degree of belief.",
  },
  {
    id: "manual-20",
    prompt: "What is the main warning given before assigning probabilities?",
    options: ["Do not assume outcomes are equally likely without reason", "Always use decimals only", "Never use examples"],
    correctAnswer: "Do not assume outcomes are equally likely without reason",
    explanation: "The PDF warns that wrongly assuming equally likely outcomes is a common error.",
  },
  {
    id: "manual-21",
    prompt: "In classical probability, what formula is used?",
    options: ["Favourable outcomes divided by total outcomes", "Total outcomes divided by favourable outcomes", "Observed outcomes divided by impossible outcomes"],
    correctAnswer: "Favourable outcomes divided by total outcomes",
    explanation: "Classical probability is the ratio of favourable outcomes to total outcomes.",
  },
  {
    id: "manual-22",
    prompt: "Which topic says we may use a mathematical model such as a PDF or PMF?",
    options: ["Probability Models", "Subjective Probability", "Null Event"],
    correctAnswer: "Probability Models",
    explanation: "The lecture introduces probability models as an alternative to direct counting.",
  },
  {
    id: "manual-23",
    prompt: "What is a random phenomenon?",
    options: ["A process with uncertain outcomes", "A finished calculation", "A guaranteed event"],
    correctAnswer: "A process with uncertain outcomes",
    explanation: "The die roll example is described as a random phenomenon because the outcome is uncertain.",
  },
  {
    id: "manual-24",
    prompt: "Each execution of a random phenomenon is called a:",
    options: ["Trial or experiment", "Complement", "Model only"],
    correctAnswer: "Trial or experiment",
    explanation: "The terminology section defines each execution as a trial or experiment.",
  },
  {
    id: "manual-25",
    prompt: "The result of a trial is called an:",
    options: ["Outcome", "Odds table", "Axiom"],
    correctAnswer: "Outcome",
    explanation: "Each trial or experiment results in an outcome.",
  },
  {
    id: "manual-26",
    prompt: "Which set is the sample space for one fair die roll?",
    options: ["{1, 2, 3, 4, 5, 6}", "{3}", "{odd}"],
    correctAnswer: "{1, 2, 3, 4, 5, 6}",
    explanation: "The sample space contains all possible outcomes for the experiment.",
  },
  {
    id: "manual-27",
    prompt: "An event containing one outcome is called:",
    options: ["A simple event", "A null event", "A collective event"],
    correctAnswer: "A simple event",
    explanation: "The lecture says a simple event consists of one outcome only.",
  },
  {
    id: "manual-28",
    prompt: "An event containing more than one outcome is called:",
    options: ["A compound event", "A null event", "An impossible event"],
    correctAnswer: "A compound event",
    explanation: "If an event has more than one outcome, it is compound.",
  },
  {
    id: "manual-29",
    prompt: "If A is the odd-number event on a die, which set matches A?",
    options: ["{1, 3, 5}", "{2, 4, 6}", "{1, 2, 3}"],
    correctAnswer: "{1, 3, 5}",
    explanation: "The odd outcomes on a die are 1, 3, and 5.",
  },
  {
    id: "manual-30",
    prompt: "If A is odd and B is 4 or less on a die, what is A intersect B?",
    options: ["{1, 3}", "{1, 2, 3, 4, 5}", "{5, 6}"],
    correctAnswer: "{1, 3}",
    explanation: "The common outcomes are 1 and 3, so A intersect B is {1, 3}.",
  },
  {
    id: "manual-31",
    prompt: "If A is odd and B is 4 or less on a die, what is A union B?",
    options: ["{1, 2, 3, 4, 5}", "{1, 3}", "{2, 4, 6}"],
    correctAnswer: "{1, 2, 3, 4, 5}",
    explanation: "A union B includes outcomes in A or B or both: 1, 2, 3, 4, 5.",
  },
  {
    id: "manual-32",
    prompt: "What symbol is used for the entire sample space in the lecture?",
    options: ["Omega", "Phi", "Pi"],
    correctAnswer: "Omega",
    explanation: "The notes use Omega to denote the entire sample space.",
  },
  {
    id: "manual-33",
    prompt: "What symbol is used for the null event in the lecture?",
    options: ["Phi", "Omega", "Theta"],
    correctAnswer: "Phi",
    explanation: "The notes use Phi to denote the null event, the event with no outcomes.",
  },
  {
    id: "manual-34",
    prompt: "If A = {1, 3, 5} on a die, what is the complement of A?",
    options: ["{2, 4, 6}", "{1, 2, 3}", "{4, 5, 6}"],
    correctAnswer: "{2, 4, 6}",
    explanation: "The complement contains all die outcomes not in A.",
  },
  {
    id: "manual-35",
    prompt: "What is the complement of the event 'at least 3' on a die?",
    options: ["At most 2", "At most 3", "Exactly 3"],
    correctAnswer: "At most 2",
    explanation: "The lecture specifically warns that the complement of at least 3 is at most 2, not 3.",
  },
  {
    id: "manual-36",
    prompt: "Two events are mutually exclusive when:",
    options: ["They cannot both occur together", "They are always equal", "They contain every outcome"],
    correctAnswer: "They cannot both occur together",
    explanation: "Mutually exclusive, or disjoint, events have no common outcomes.",
  },
  {
    id: "manual-37",
    prompt: "Two events are collectively exhaustive when:",
    options: ["Their union is the whole sample space", "Their intersection is empty", "They each contain one outcome"],
    correctAnswer: "Their union is the whole sample space",
    explanation: "Collectively exhaustive events cover all possible outcomes together.",
  },
  {
    id: "manual-38",
    prompt: "For one fair coin flip, which pair is both mutually exclusive and exhaustive?",
    options: ["Heads and tails", "Heads and heads", "Heads and not certain"],
    correctAnswer: "Heads and tails",
    explanation: "Heads and tails cannot happen together, and together they cover all outcomes of one flip.",
  },
  {
    id: "manual-39",
    prompt: "Which topic from the lecture is most useful for card-hand and die-roll counting questions?",
    options: ["Counting", "Subjective Probability", "Null Event"],
    correctAnswer: "Counting",
    explanation: "The lecture says classical probability calculations often reduce to counting favourable and total outcomes.",
  },
  {
    id: "manual-40",
    prompt: "Which short formula best matches the counting slide?",
    options: ["Favourable / total", "Sample / model", "Event / complement"],
    correctAnswer: "Favourable / total",
    explanation: "The counting slide summarizes classical probability with favourable outcomes divided by total outcomes.",
  },
];

function getManualSlideId(questionId: string) {
  const number = Number(questionId.replace("manual-", ""));

  if (number <= 2) return "uncertainty";
  if (number <= 5) return "quantifying";
  if (number <= 8) return "odds";
  if (number <= 12) return "classical";
  if (number <= 15) return "empirical";
  if (number <= 17) return "relative-frequency";
  if (number <= 19) return "subjective";
  if (number <= 22) return "counting";
  if (number <= 26) return "sample-space";
  if (number <= 31) return "event";
  if (number <= 35) return "complement";
  return "exclusive-exhaustive";
}

export const introductionQuestionBank: QuizQuestion[] = [
  ...buildLectureQuestionBank(introductionSlides, "intro"),
  ...manualLectureQuestions.map((question) => ({
    ...question,
    slideId: getManualSlideId(question.id),
  })),
];

export const probabilityRulesSupportVideos: SupportVideo[] = [
  {
    id: "rules-support-1",
    number: 1,
    title: "Complementary events",
    duration: "Duration not confirmed",
    sourceLabel: "Khan Academy",
    sourceUrl:
      "https://www.khanacademy.org/math/class-12-bridge/x09646558c1ff0797%3Aadvanced-counting/x09646558c1ff0797%3Aprobability/v/complementary-events",
  },
  {
    id: "rules-support-2",
    number: 2,
    title: "Mutually exclusive events",
    duration: "8:10",
    sourceLabel: "Khan Academy",
    sourceUrl:
      "https://www.khanacademy.org/math/grade-7-math-snc-aligned/xf9992e17a4bae62e%3Aprobability/xf9992e17a4bae62e%3Amutually-exclusive-and-equally-likely-events/v/mutually-exclusive-events-ur",
  },
  {
    id: "rules-support-3",
    number: 3,
    title: "Mutually exclusive and exhaustive events",
    duration: "9:27",
    sourceLabel: "Khan Academy",
    sourceUrl:
      "https://www.khanacademy.org/math/ka-math-class-11/x0419e5b3b578592a%3Aprobability-ncert-new/x0419e5b3b578592a%3Aalgebra-of-events/v/mutually-exclusive-and-exhaustive-events",
  },
  {
    id: "rules-support-4",
    number: 4,
    title: "Probability and sample spaces",
    duration: "Playlist video 2",
    sourceLabel: "Khan Academy YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=obZzOq_wSCg&list=PLC58778F28211FA19&index=2",
    embedUrl: "https://www.youtube.com/embed/obZzOq_wSCg",
  },
  {
    id: "rules-support-5",
    number: 5,
    title: "Probability examples",
    duration: "Playlist video 3",
    sourceLabel: "Khan Academy YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=QE2uR6Z-NcU&list=PLC58778F28211FA19&index=3",
    embedUrl: "https://www.youtube.com/embed/QE2uR6Z-NcU",
  },
];

export const probabilityRulesSlides: LectureSlide[] = [
  {
    id: "rules-notation",
    topic: "Probability Rules Notation",
    explanation: "This lecture uses Roman letters such as A, B, and C for events, and Pr(A) for the probability of event A.",
    example: "Example: If A is the event of passing an exam, then Pr(A) is the probability of passing.",
    extraExamples: [
      "Example: A, B, and C can each stand for different events in the same experiment.",
    ],
  },
  {
    id: "de-morgan-basic",
    topic: "De Morgan's Laws",
    explanation: "De Morgan's laws convert complements of unions and intersections into equivalent event statements.",
    example: "Example: not (A or B) = not A and not B",
    extraExamples: [
      "Example: not (A and B) = not A or not B",
    ],
  },
  {
    id: "de-morgan-application",
    topic: "De Morgan in an Applied Example",
    explanation: "De Morgan's laws can be read in plain language using real situations such as data retention across devices.",
    example: "Example: If data is not on the hard drive or memory stick, then it is not on the hard drive and not on the memory stick.",
    extraExamples: [
      "Example: Use a Venn diagram to see why the two statements represent the same event.",
    ],
  },
  {
    id: "de-morgan-venn",
    topic: "Venn Diagram Interpretation",
    explanation: "Venn diagrams help demonstrate event identities by showing the same shaded region in two different ways.",
    example: "Example: Drill, battery, and corded drill events can be combined to represent 'I can drill a hole'.",
    extraExamples: [
      "Example: Pizza delivery events can also be rewritten and interpreted using the same law.",
    ],
  },
  {
    id: "probability-range",
    topic: "Probability Range",
    explanation: "For any event E, the probability must lie between 0 and 1 inclusive.",
    example: "Example: 0 ≤ Pr(E) ≤ 1",
    extraExamples: [
      "Example: Pr(E) = 0 means almost surely impossible and Pr(E) = 1 means almost surely certain.",
      "Example: The notes also mention unusual infinite cases where probability 0 events can still occur.",
    ],
  },
  {
    id: "complement-rule",
    topic: "Complement Law",
    explanation: "The probability that an event does not happen is 1 minus the probability that it does happen.",
    example: "Example: Pr(not E) = 1 - Pr(E)",
    extraExamples: [
      "Example: Pr(E) + Pr(not E) = 1",
    ],
  },
  {
    id: "complement-cards",
    topic: "Complement Law with Cards",
    explanation: "Sometimes it is easier to calculate the complement event first, especially when the target event is awkward.",
    example: "Example: Getting at least one club in 5 cards can be solved by first finding the probability of getting no clubs.",
    extraExamples: [
      "Example: 'Not at least one club' is the same as 'no clubs'.",
    ],
  },
  {
    id: "addition-rule",
    topic: "Addition Law",
    explanation: "To find the probability of A or B, add the probabilities and subtract the overlap once.",
    example: "Example: Pr(A ∪ B) = Pr(A) + Pr(B) - Pr(A ∩ B)",
    extraExamples: [
      "Example: The overlap A ∩ B must be subtracted because it is counted twice in Pr(A) + Pr(B).",
    ],
  },
  {
    id: "addition-die",
    topic: "Addition Law on a Die",
    explanation: "The addition law can be applied directly once the two events and their overlap are identified.",
    example: "Example: A = odd, B = at most 4, so A ∩ B = {1, 3}",
    extraExamples: [
      "Example: A ∪ B contains outcomes that are odd, at most 4, or both.",
    ],
  },
  {
    id: "simple-addition",
    topic: "Simple Addition Law",
    explanation: "If A and B are disjoint, then there is no overlap and the addition law simplifies.",
    example: "Example: If A and B are mutually exclusive, Pr(A ∪ B) = Pr(A) + Pr(B)",
    extraExamples: [
      "Example: Odd and even on one die roll are disjoint events.",
    ],
  },
  {
    id: "total-probability",
    topic: "Law of Total Probability",
    explanation: "If a population is split into mutually exclusive and collectively exhaustive parts, the total probability can be found by summing across those parts.",
    example: "Example: Pr(A) = Pr(A ∩ C) + Pr(A ∩ E) + Pr(A ∩ N)",
    extraExamples: [
      "Example: Current smoker, ex-smoker, and never smoker form a complete partition of the population.",
    ],
  },
  {
    id: "total-partition",
    topic: "A Useful Partition Identity",
    explanation: "For any event B, the pair B and not B form a complete partition, so any event A can be split across them.",
    example: "Example: Pr(A) = Pr(A ∩ B) + Pr(A ∩ B')",
    extraExamples: [
      "Example: This is a special case of the total law of probability.",
    ],
  },
  {
    id: "table-counting",
    topic: "Worked Table Example",
    explanation: "A grouped results table can be solved by direct counting when the total and favourable counts are known.",
    example: "Example: Pass probability = (48 + 49 + 63) / 200 = 0.8",
    extraExamples: [
      "Example: The engineering, science, and business pass counts add to 160 out of 200.",
    ],
  },
  {
    id: "table-total-law",
    topic: "Same Table via Total Law",
    explanation: "The same table result can be obtained again using the total law of probability across the school groups.",
    example: "Example: Overall pass rate = pass in engineering + pass in science + pass in business",
    extraExamples: [
      "Example: The lecture asks you to show that this also gives 0.8.",
    ],
  },
  {
    id: "unemployment-example",
    topic: "Adding Across Male and Female",
    explanation: "If unemployment is split into male and female parts, the overall unemployment rate is the sum of those two disjoint probabilities.",
    example: "Example: 11% unemployed males + 8% unemployed females = 19% unemployed overall",
    extraExamples: [
      "Example: Let G = unemployed and M = male, then the same result can be written in probability notation.",
    ],
  },
  {
    id: "conditional-probability",
    topic: "Conditional Probability",
    explanation: "Conditional probability updates a probability after extra information about the case is known.",
    example: "Example: Pr(I | S) = 0.08 means illness probability given the person is a smoker.",
    extraExamples: [
      "Example: The overall illness rate may be 0.03, but it rises to 0.08 among smokers.",
      "Example: The condition after the bar changes the reference group.",
    ],
  },
  {
    id: "order-warning",
    topic: "Pr(A | B) Is Not Pr(B | A)",
    explanation: "Changing the order in a conditional probability changes the meaning completely.",
    example: "Example: The percentage of smokers with asthma is not the same as the percentage of asthma sufferers who smoke.",
    extraExamples: [
      "Example: Pr(Incarcerated | Male) can be tiny while Pr(Male | Incarcerated) can be very large.",
    ],
  },
  {
    id: "table-conditions",
    topic: "Reading Conditional Probabilities from a Table",
    explanation: "A cross-tab lets you interpret expressions like B | M, M | B, or not M | D carefully and separately.",
    example: "Example: B | M means bus given male, while M | B means male given bus.",
    extraExamples: [
      "Example: The two conditions use different denominators and answer different questions.",
    ],
  },
];

export const probabilityRulesQuestionBank: QuizQuestion[] = buildLectureQuestionBank(
  probabilityRulesSlides,
  "rules",
);
