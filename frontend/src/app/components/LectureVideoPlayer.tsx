import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CirclePercent,
  Coins,
  Dices,
  FileQuestion,
  Gauge,
  GitBranch,
  PlayCircle,
  RotateCcw,
  Scale,
  Shapes,
  ShieldQuestion,
  Sigma,
  Sparkles,
  Target,
} from "lucide-react";
import { getLectureVideo } from "../data/lectureLibrary";
import {
  getShuffledQuizSubset,
  introductionQuestionBank,
  introductionSlides,
  introductionSupportVideos,
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

function SlideVisual({ slideId }: { slideId: string }) {
  const visualMap = {
    uncertainty: {
      icon: ShieldQuestion,
      title: "Uncertain Event",
      accent: "from-indigo-100 via-white to-sky-100",
      badges: ["Weather", "Bus time", "Coin flip"],
      stats: [
        { label: "Known?", value: "No" },
        { label: "Chance", value: "?" },
      ],
    },
    quantifying: {
      icon: CirclePercent,
      title: "Same Chance, 3 Forms",
      accent: "from-blue-100 via-white to-cyan-100",
      badges: ["1/2", "0.5", "50%"],
      stats: [
        { label: "Fraction", value: "1/6" },
        { label: "Percent", value: "16.7%" },
      ],
    },
    odds: {
      icon: Dices,
      title: "Odds Panel",
      accent: "from-amber-100 via-white to-orange-100",
      badges: ["1 favourable", "5 not favourable"],
      stats: [
        { label: "Odds", value: "1:5" },
        { label: "Die", value: "3" },
      ],
    },
    classical: {
      icon: Target,
      title: "Equally Likely",
      accent: "from-emerald-100 via-white to-lime-100",
      badges: ["Fair coin", "Fair die", "Cards"],
      stats: [
        { label: "Rule", value: "fav/total" },
        { label: "Example", value: "1/6" },
      ],
    },
    empirical: {
      icon: Gauge,
      title: "Observed Results",
      accent: "from-teal-100 via-white to-emerald-100",
      badges: ["Sample", "Count", "Estimate"],
      stats: [
        { label: "Heads", value: "12/20" },
        { label: "Value", value: "0.6" },
      ],
    },
    "relative-frequency": {
      icon: GitBranch,
      title: "Large Samples",
      accent: "from-violet-100 via-white to-fuchsia-100",
      badges: ["10 flips", "100 flips", "1000 flips"],
      stats: [
        { label: "Trend", value: "stabilises" },
        { label: "Closer to", value: "50/50" },
      ],
    },
    subjective: {
      icon: Sparkles,
      title: "Personal Judgement",
      accent: "from-rose-100 via-white to-pink-100",
      badges: ["Doctor", "Coach", "Investor"],
      stats: [
        { label: "Belief", value: "90%" },
        { label: "Type", value: "one-off" },
      ],
    },
    counting: {
      icon: Sigma,
      title: "Count Outcomes",
      accent: "from-slate-100 via-white to-zinc-100",
      badges: ["Favourable", "Total", "Ratio"],
      stats: [
        { label: "Formula", value: "n/N" },
        { label: "Goal", value: "probability" },
      ],
    },
    "sample-space": {
      icon: Shapes,
      title: "Possible Outcomes",
      accent: "from-sky-100 via-white to-blue-100",
      badges: ["H", "T", "{1..6}"],
      stats: [
        { label: "Coin", value: "{H,T}" },
        { label: "Two flips", value: "4" },
      ],
    },
    event: {
      icon: FileQuestion,
      title: "Event as a Set",
      accent: "from-cyan-100 via-white to-teal-100",
      badges: ["Odd", "Even", "> 4"],
      stats: [
        { label: "Odd", value: "{1,3,5}" },
        { label: "Simple?", value: "1 or many" },
      ],
    },
    complement: {
      icon: Coins,
      title: "Opposite Event",
      accent: "from-orange-100 via-white to-amber-100",
      badges: ["Not even", "Not heads", "Not > 4"],
      stats: [
        { label: "Heads'", value: "tails" },
        { label: "A'", value: "not A" },
      ],
    },
    "exclusive-exhaustive": {
      icon: Scale,
      title: "Exclusive vs Exhaustive",
      accent: "from-lime-100 via-white to-green-100",
      badges: ["Cannot overlap", "Cover all", "Odd/Even"],
      stats: [
        { label: "Exclusive", value: "yes/no" },
        { label: "Exhaustive", value: "all" },
      ],
    },
  } as const;

  const visual = visualMap[slideId as keyof typeof visualMap] ?? visualMap.uncertainty;
  const Icon = visual.icon;

  return (
    <div className={`rounded-3xl border border-slate-200 bg-gradient-to-br ${visual.accent} p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-2">Visual summary</p>
          <h4 className="text-xl font-semibold text-slate-900">{visual.title}</h4>
        </div>
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-slate-900 shadow-sm">
          <Icon className="h-7 w-7" />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {visual.badges.map((badge) => (
          <div
            key={badge}
            className="rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            {badge}
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {visual.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white/80 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-1">{stat.label}</p>
            <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LectureVideoPlayer() {
  const { lectureId, videoId } = useParams();
  const { course, video } = getLectureVideo(lectureId, videoId);

  const isIntroductionLecture = video.id === "probability-statistics-video-01";
  const [activeTopSection, setActiveTopSection] = useState<"slides" | "quiz" | "videos">("slides");
  const [slidesApi, setSlidesApi] = useState<CarouselApi>();
  const [activeLectureSlide, setActiveLectureSlide] = useState(1);
  const [activeSupportVideo, setActiveSupportVideo] = useState(0);

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    getShuffledQuizSubset(12),
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizApi, setQuizApi] = useState<CarouselApi>();

  const quizScore = quizQuestions.filter(
    (question) => selectedAnswers[question.id] === question.correctAnswer,
  ).length;
  const selectedSupportVideo = isIntroductionLecture
    ? introductionSupportVideos[activeSupportVideo] ?? introductionSupportVideos[0]
    : undefined;

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

  function handleSlidesApi(api?: CarouselApi) {
    setSlidesApi(api);

    if (!api) return;

    const updateActiveSlide = () => {
      setActiveLectureSlide(api.selectedScrollSnap() + 1);
    };

    updateActiveSlide();
    api.on("select", updateActiveSlide);
    api.on("reInit", updateActiveSlide);
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

        <div className="max-w-6xl mx-auto space-y-6">
          {isIntroductionLecture && (
            <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-sm shadow-2xl">
              <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="min-w-0">
                  <div className="mb-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">Learning Mode</p>
                    <h2 className="text-2xl text-white tracking-tight">01 Introduction to Probability</h2>
                  </div>

                  <div className="mb-6 flex flex-wrap items-center gap-3">
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
                    <button
                      onClick={() => setActiveTopSection("videos")}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activeTopSection === "videos"
                          ? "bg-white text-slate-900"
                          : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Videos
                    </button>
                  </div>

                  {activeTopSection === "slides" ? (
                    <>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">Lecture Slides</p>
                          <h3 className="text-2xl text-white tracking-tight">Quick Revision Slider</h3>
                        </div>
                        <p className="text-sm text-slate-300">
                          {activeLectureSlide}/{introductionSlides.length}
                        </p>
                      </div>

                      <Carousel
                        setApi={handleSlidesApi}
                        opts={{ align: "start", loop: false }}
                        className="px-12 sm:px-16"
                      >
                        <CarouselContent>
                          {introductionSlides.map((slide, index) => (
                            <CarouselItem key={slide.id} className="basis-full">
                              <article
                                onClick={() => slidesApi?.scrollNext()}
                                className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm"
                              >
                                <div>
                                  <p className="text-sm text-slate-500 mb-4">Slide {index + 1}</p>
                                  <h3 className="text-3xl font-semibold text-slate-900 mb-5">{slide.topic}</h3>
                                  <p className="text-lg leading-8 text-slate-700">{slide.explanation}</p>
                                </div>

                                <div className="mt-6 space-y-4">
                                  <SlideVisual slideId={slide.id} />
                                  <div className="rounded-2xl bg-blue-50 px-5 py-4 text-base text-blue-900 leading-7">
                                    {slide.example}
                                  </div>
                                  {slide.extraExamples.map((example) => (
                                    <div
                                      key={example}
                                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-700 leading-7"
                                    >
                                      {example}
                                    </div>
                                  ))}
                                </div>
                              </article>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                        <CarouselNext className="right-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                      </Carousel>
                    </>
                  ) : activeTopSection === "quiz" ? (
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
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">Videos</p>
                          <h3 className="text-2xl text-white tracking-tight">Recommended Video Set</h3>
                        </div>
                        <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
                          {activeSupportVideo + 1}/{introductionSupportVideos.length}
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video relative">
                        {selectedSupportVideo?.embedUrl ? (
                          <iframe
                            src={selectedSupportVideo.embedUrl}
                            title={selectedSupportVideo.title}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        ) : selectedSupportVideo ? (
                          <div className="h-full w-full bg-slate-950 text-white p-8 flex flex-col justify-between">
                            <div>
                              <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-3">
                                Video {selectedSupportVideo.number}
                              </p>
                              <h2 className="text-2xl font-semibold mb-4">{selectedSupportVideo.title}</h2>
                              <p className="text-slate-300 leading-7 max-w-2xl">
                                This lesson is part of your recommended study list. Open it from the source below
                                to continue with the matching topic.
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              <a
                                href={selectedSupportVideo.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                              >
                                Open {selectedSupportVideo.sourceLabel}
                              </a>
                              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200">
                                Duration: {selectedSupportVideo.duration}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center p-6">
                            <div className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white">
                              Video is not connected yet
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <aside className="self-start rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm xl:h-[760px] xl:overflow-hidden">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">Lecture List</p>
                      <h3 className="text-xl text-white tracking-tight">Probability Videos</h3>
                    </div>
                    <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-slate-200">
                      {introductionSupportVideos.length} items
                    </div>
                  </div>

                  <div className="space-y-3 xl:max-h-[650px] xl:overflow-y-auto xl:pr-1">
                    {introductionSupportVideos.map((supportVideo, index) => (
                      <button
                        key={supportVideo.id}
                        onClick={() => {
                          setActiveSupportVideo(index);
                          setActiveTopSection("videos");
                        }}
                        className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors ${
                          activeSupportVideo === index && activeTopSection === "videos"
                            ? "border-white/40 bg-white/15"
                            : "border-white/10 bg-black/20 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex h-16 w-24 shrink-0 flex-col justify-between rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-3 text-white">
                          <span className="text-xs font-medium text-slate-300">Video {supportVideo.number}</span>
                          <span className="text-sm font-semibold">{supportVideo.duration}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold text-white">{supportVideo.title}</p>
                          <p className="mt-2 text-xs text-slate-300">{supportVideo.sourceLabel}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </aside>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
