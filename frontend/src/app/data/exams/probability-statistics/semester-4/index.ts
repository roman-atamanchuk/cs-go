export type ExamOption = {
  id: string;
  text: string;
};

export type ExamQuestion = {
  id: string;
  topic: string;
  prompt: string;
  options: ExamOption[];
  correctOption: string;
  explanation: string;
  marks: number;
};

export type ExamLecture = {
  id: string;
  title: string;
  duration: string;
  focus: string;
  summary: string;
};

export type SemesterExam = {
  id: string;
  subject: string;
  name: string;
  code: string;
  semester: string;
  pastPaperYear: number;
  duration: string;
  topics: string[];
  intro: string;
  lecture: ExamLecture;
  questions: ExamQuestion[];
};

export const semesterFourProbabilityExam: SemesterExam = {
  id: "semester-4-probability-statistics",
  subject: "Probability and Statistics",
  name: "Probability and Statistics",
  code: "STAT-S4",
  semester: "Semester 4",
  pastPaperYear: 2024,
  duration: "2 hours",
  topics: ["Mean", "Variance", "Conditional Probability", "Binomial Distribution"],
  intro:
    "Only one filled exam folder for now: Probability and Statistics, Semester 4. It contains one lecture and one 2024 past-paper style question set for the presentation.",
  lecture: {
    id: "lecture-1",
    title: "Core Probability and Statistics Review",
    duration: "3 min",
    focus: "Mean, variance, conditional probability, and binomial intuition",
    summary:
      "A short revision lecture that connects the highest-value semester 4 statistics topics and leads directly into the 2024 practice questions.",
  },
  questions: [
    {
      id: "2024-q1",
      topic: "Mean",
      prompt: "Find the mean of the data set 2, 4, 6, 8, 10.",
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "6" },
        { id: "c", text: "7" },
        { id: "d", text: "8" },
      ],
      correctOption: "b",
      explanation: "Add the values to get 30 and divide by 5, so the mean is 6.",
      marks: 10,
    },
    {
      id: "2024-q2",
      topic: "Variance",
      prompt: "If a random variable X has P(X=0)=0.5 and P(X=2)=0.5, what is Var(X)?",
      options: [
        { id: "a", text: "0.5" },
        { id: "b", text: "1" },
        { id: "c", text: "2" },
        { id: "d", text: "4" },
      ],
      correctOption: "b",
      explanation:
        "E(X)=1 and E(X^2)=2, so Var(X)=E(X^2)-[E(X)]^2=2-1=1.",
      marks: 10,
    },
    {
      id: "2024-q3",
      topic: "Conditional Probability",
      prompt: "If P(A and B)=0.2 and P(B)=0.5, what is P(A|B)?",
      options: [
        { id: "a", text: "0.1" },
        { id: "b", text: "0.2" },
        { id: "c", text: "0.4" },
        { id: "d", text: "0.7" },
      ],
      correctOption: "c",
      explanation:
        "Use P(A|B)=P(A and B)/P(B)=0.2/0.5=0.4.",
      marks: 10,
    },
    {
      id: "2024-q4",
      topic: "Binomial Distribution",
      prompt: "For X ~ Bin(4, 0.5), what is P(X=2)?",
      options: [
        { id: "a", text: "0.125" },
        { id: "b", text: "0.25" },
        { id: "c", text: "0.375" },
        { id: "d", text: "0.5" },
      ],
      correctOption: "c",
      explanation:
        "P(X=2)=C(4,2)(0.5)^2(0.5)^2 = 6 x 0.0625 = 0.375.",
      marks: 10,
    },
  ],
};
