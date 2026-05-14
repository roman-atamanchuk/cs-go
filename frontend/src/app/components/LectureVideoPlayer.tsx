import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, PlayCircle, RotateCcw } from "lucide-react";
import { getLectureVideo } from "../data/lectureLibrary";
import {
  getShuffledQuizSubset,
  introductionQuestionBank,
  introductionSlides,
  type QuizQuestion,
} from "../data/introductionProbabilityContent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";

export default function LectureVideoPlayer() {
  const { lectureId, videoId } = useParams();
  const { course, video } = getLectureVideo(lectureId, videoId);

  const isIntroductionLecture = video.id === "probability-statistics-video-01";
  const [activeTopSection, setActiveTopSection] = useState<"slides" | "quiz">("slides");
  const [slidesApi, setSlidesApi] = useState<CarouselApi>();

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    getShuffledQuizSubset(12),
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizApi, setQuizApi] = useState<CarouselApi>();

  const quizScore = quizQuestions.filter(
    (question) => selectedAnswers[question.id] === question.correctAnswer,
  ).length;

  function resetQuiz() {
    setSelectedAnswers({});
    setQuizQuestions(getShuffledQuizSubset(12));
    quizApi?.scrollTo(0);
  }

  function loadNewQuizSet() {
    setSelectedAnswers({});
    setQuizQuestions(getShuffledQuizSubset(12));
    quizApi?.scrollTo(0);
  }

  function goToQuestionAfter(currentQuestionIndex: number) {
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    const nextSlideIndex = isLastQuestion ? quizQuestions.length * 2 : currentQuestionIndex * 2 + 2;
    quizApi?.scrollTo(nextSlideIndex);
  }

  function handleAnswer(question: QuizQuestion, questionIndex: number, option: string) {
    setSelectedAnswers((current) => ({
      ...current,
      [question.id]: option,
    }));

    if (option === question.correctAnswer) {
      goToQuestionAfter(questionIndex);
      return;
    }

    quizApi?.scrollTo(questionIndex * 2 + 1);
  }

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)",
        }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link
          to={`/lectures/${course.id}`}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lecture List
        </Link>

        <div className="max-w-4xl mx-auto space-y-6">
          {isIntroductionLecture && (
            <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-sm shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">Learning Mode</p>
                  <h2 className="text-2xl text-white tracking-tight">01 Introduction to Probability</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTopSection("slides")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      activeTopSection === "slides"
                        ? "bg-white text-slate-900"
                        : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    Lecture Slides
                  </button>
                  <button
                    onClick={() => setActiveTopSection("quiz")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      activeTopSection === "quiz"
                        ? "bg-white text-slate-900"
                        : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    Quiz
                  </button>
                </div>
              </div>

              {activeTopSection === "slides" ? (
                <>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">Lecture Slides</p>
                      <h3 className="text-2xl text-white tracking-tight">Quick Revision Slider</h3>
                    </div>
                    <p className="text-sm text-slate-300">{introductionSlides.length} slides</p>
                  </div>

                  <Carousel
                    setApi={setSlidesApi}
                    opts={{ align: "start", loop: false }}
                    className="px-12 sm:px-16"
                  >
                    <CarouselContent>
                      {introductionSlides.map((slide, index) => (
                        <CarouselItem key={slide.id} className="basis-full">
                          <article
                            onClick={() => slidesApi?.scrollNext()}
                            className="min-h-[320px] cursor-pointer rounded-3xl bg-white p-8 shadow-sm flex flex-col justify-between"
                          >
                            <div>
                              <p className="text-sm text-slate-500 mb-4">Slide {index + 1}</p>
                              <h3 className="text-3xl font-semibold text-slate-900 mb-5">{slide.topic}</h3>
                              <p className="text-lg leading-8 text-slate-700">{slide.explanation}</p>
                            </div>

                            <div className="mt-6 rounded-2xl bg-blue-50 px-5 py-4 text-base text-blue-900 leading-7">
                              {slide.example}
                            </div>
                          </article>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                    <CarouselNext className="right-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                  </Carousel>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">Quiz</p>
                      <h3 className="text-2xl text-white tracking-tight">Slide Quiz</h3>
                    </div>
                    <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
                      12 shown from {introductionQuestionBank.length} questions
                    </div>
                  </div>

                  <Carousel
                    setApi={setQuizApi}
                    opts={{ align: "start", loop: false, watchDrag: false }}
                    className="px-12 sm:px-16"
                  >
                    <CarouselContent>
                      {quizQuestions.flatMap((question, index) => {
                        const relatedSlide =
                          introductionSlides.find((slide) => slide.id === question.slideId) ??
                          introductionSlides[0];

                        return [
                          <CarouselItem key={`${question.id}-question`} className="basis-full">
                            <article className="min-h-[360px] rounded-3xl bg-white p-8 shadow-sm flex flex-col justify-between">
                              <div>
                                <p className="text-sm text-slate-500 mb-4">Question {index + 1}</p>
                                <h3 className="text-2xl font-semibold text-slate-900 mb-6">{question.prompt}</h3>

                                <div className="grid gap-3">
                                  {question.options.map((option) => {
                                    const isSelected = selectedAnswers[question.id] === option;

                                    return (
                                      <button
                                        key={option}
                                        onClick={() => handleAnswer(question, index, option)}
                                        className={`rounded-2xl border px-5 py-4 text-left text-base font-medium transition-colors ${
                                          isSelected
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                                        }`}
                                      >
                                        {option}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="mt-6 rounded-2xl bg-slate-100 px-5 py-4 text-sm text-slate-600">
                                Correct answers move to the next quiz slide. Wrong answers open the matching explanation slide.
                              </div>
                            </article>
                          </CarouselItem>,
                          <CarouselItem key={`${question.id}-explanation`} className="basis-full">
                            <article className="min-h-[360px] rounded-3xl bg-white p-8 shadow-sm flex flex-col justify-between">
                              <div>
                                <p className="text-sm text-slate-500 mb-4">Explanation Slide</p>
                                <h3 className="text-3xl font-semibold text-slate-900 mb-5">{relatedSlide.topic}</h3>
                                <p className="text-lg leading-8 text-slate-700 mb-6">{relatedSlide.explanation}</p>

                                <div className="rounded-2xl bg-amber-50 px-5 py-4 text-base text-amber-900 leading-7 mb-4">
                                  Correct answer: {question.correctAnswer}
                                </div>

                                <div className="rounded-2xl bg-blue-50 px-5 py-4 text-base text-blue-900 leading-7">
                                  {relatedSlide.example}
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 mt-6">
                                <button
                                  onClick={() => goToQuestionAfter(index)}
                                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                                >
                                  Next Quiz Slide
                                </button>
                                <div className="text-sm text-slate-500">{question.explanation}</div>
                              </div>
                            </article>
                          </CarouselItem>,
                        ];
                      })}

                      <CarouselItem key="quiz-summary" className="basis-full">
                        <article className="min-h-[360px] rounded-3xl bg-white p-8 shadow-sm flex flex-col justify-between">
                          <div>
                            <p className="text-sm text-slate-500 mb-4">Quiz Summary</p>
                            <h3 className="text-3xl font-semibold text-slate-900 mb-4">Set Complete</h3>
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-900 mb-6">
                              <CheckCircle2 className="w-5 h-5" />
                              Score: {quizScore} / {quizQuestions.length}
                            </div>
                            <p className="text-lg leading-8 text-slate-700">
                              This result is for the current 12-question slide set from the larger 100-question bank.
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mt-6">
                            <button
                              onClick={loadNewQuizSet}
                              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                            >
                              Load New Questions
                            </button>
                            <button
                              onClick={resetQuiz}
                              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
                            >
                              <RotateCcw className="w-4 h-4" />
                              Reset Quiz
                            </button>
                          </div>
                        </article>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="left-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                    <CarouselNext className="right-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                  </Carousel>
                </>
              )}
            </section>
          )}

          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur-sm shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">{course.title}</p>
                <h1 className="text-3xl text-white tracking-tight">{video.title}</h1>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                <PlayCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video relative">
              {video.embedUrl ? (
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={video.image}
                    alt={video.title}
                    className="h-full w-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white">
                      Video link is not connected yet
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
