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

export type LectureExperience = {
  slides: LectureSlide[];
  questionBank: QuizQuestion[];
  supportVideos: SupportVideo[];
};

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
