import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CirclePercent,
  Coins,
  Dices,
  Download,
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
  getShuffledQuizSubsetFromBank,
  introductionQuestionBank,
  introductionSlides,
  introductionSupportVideos,
  probabilityRulesQuestionBank,
  probabilityRulesSlides,
  probabilityRulesSupportVideos,
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

function normalizeSlideId(slideId: string) {
  if (slideId.startsWith("de-morgan")) return "de-morgan";
  if (slideId === "rules-notation" || slideId === "probability-range") return "quantifying";
  if (slideId === "complement-cards") return "complement";
  if (slideId === "addition-die") return "union-intersection";
  if (slideId === "simple-addition") return "exclusive-exhaustive";
  if (
    slideId === "total-partition" ||
    slideId === "table-total-law" ||
    slideId === "unemployment-example"
  ) {
    return "total-probability";
  }
  if (slideId === "table-counting") return "counting";
  if (slideId === "table-conditions") return "event";
  return slideId;
}

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
        { label: "Two flips outcomes", value: "HH, HT, TH, TT" },
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
    "de-morgan": {
      icon: GitBranch,
      title: "Logic Switch",
      accent: "from-pink-100 via-white to-rose-100",
      badges: ["not(A or B)", "not A and not B", "Venn"],
      stats: [
        { label: "Rule 1", value: "(A ∪ B)' = A' ∩ B'" },
        { label: "Rule 2", value: "(A ∩ B)' = A' ∪ B'" },
      ],
    },
    "total-probability": {
      icon: Sigma,
      title: "Add Across Parts",
      accent: "from-cyan-100 via-white to-sky-100",
      badges: ["partition", "sum parts", "whole event"],
      stats: [
        { label: "Idea", value: "split + add" },
        { label: "Rule", value: "P(A)=Σ parts" },
      ],
    },
    "conditional-probability": {
      icon: Target,
      title: "Given That...",
      accent: "from-yellow-100 via-white to-amber-100",
      badges: ["given", "new info", "smokers"],
      stats: [
        { label: "Notation", value: "P(A|B)" },
        { label: "Meaning", value: "A given B" },
      ],
    },
    "order-warning": {
      icon: FileQuestion,
      title: "Direction Matters",
      accent: "from-orange-100 via-white to-red-100",
      badges: ["A|B", "B|A", "not equal"],
      stats: [
        { label: "Left", value: "A given B" },
        { label: "Right", value: "B given A" },
      ],
    },
  } as const;

  const visualKey = normalizeSlideId(slideId) as keyof typeof visualMap;
  const visual = visualMap[visualKey] ?? visualMap.uncertainty;
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

function getSlideCueStyles(slideId: string) {
  const cueStyles = {
    uncertainty: {
      chip: "bg-indigo-50 text-indigo-700 border-indigo-200",
      example: "border-indigo-200 bg-indigo-50 text-indigo-950",
      exampleLabel: "text-indigo-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    quantifying: {
      chip: "bg-sky-50 text-sky-700 border-sky-200",
      example: "border-sky-200 bg-sky-50 text-sky-950",
      exampleLabel: "text-sky-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    odds: {
      chip: "bg-amber-50 text-amber-700 border-amber-200",
      example: "border-amber-200 bg-amber-50 text-amber-950",
      exampleLabel: "text-amber-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    classical: {
      chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
      example: "border-emerald-200 bg-emerald-50 text-emerald-950",
      exampleLabel: "text-emerald-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    empirical: {
      chip: "bg-teal-50 text-teal-700 border-teal-200",
      example: "border-teal-200 bg-teal-50 text-teal-950",
      exampleLabel: "text-teal-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "relative-frequency": {
      chip: "bg-violet-50 text-violet-700 border-violet-200",
      example: "border-violet-200 bg-violet-50 text-violet-950",
      exampleLabel: "text-violet-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    subjective: {
      chip: "bg-rose-50 text-rose-700 border-rose-200",
      example: "border-rose-200 bg-rose-50 text-rose-950",
      exampleLabel: "text-rose-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    counting: {
      chip: "bg-slate-100 text-slate-700 border-slate-200",
      example: "border-slate-300 bg-slate-100 text-slate-950",
      exampleLabel: "text-slate-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "sample-space": {
      chip: "bg-blue-50 text-blue-700 border-blue-200",
      example: "border-blue-200 bg-blue-50 text-blue-950",
      exampleLabel: "text-blue-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    event: {
      chip: "bg-cyan-50 text-cyan-700 border-cyan-200",
      example: "border-cyan-200 bg-cyan-50 text-cyan-950",
      exampleLabel: "text-cyan-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    complement: {
      chip: "bg-orange-50 text-orange-700 border-orange-200",
      example: "border-orange-200 bg-orange-50 text-orange-950",
      exampleLabel: "text-orange-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "exclusive-exhaustive": {
      chip: "bg-lime-50 text-lime-700 border-lime-200",
      example: "border-lime-200 bg-lime-50 text-lime-950",
      exampleLabel: "text-lime-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "union-intersection": {
      chip: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
      example: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-950",
      exampleLabel: "text-fuchsia-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "omega-null": {
      chip: "bg-indigo-50 text-indigo-700 border-indigo-200",
      example: "border-indigo-200 bg-indigo-50 text-indigo-950",
      exampleLabel: "text-indigo-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "probability-models": {
      chip: "bg-green-50 text-green-700 border-green-200",
      example: "border-green-200 bg-green-50 text-green-950",
      exampleLabel: "text-green-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    equivalence: {
      chip: "bg-purple-50 text-purple-700 border-purple-200",
      example: "border-purple-200 bg-purple-50 text-purple-950",
      exampleLabel: "text-purple-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "de-morgan": {
      chip: "bg-rose-50 text-rose-700 border-rose-200",
      example: "border-rose-200 bg-rose-50 text-rose-950",
      exampleLabel: "text-rose-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "total-probability": {
      chip: "bg-sky-50 text-sky-700 border-sky-200",
      example: "border-sky-200 bg-sky-50 text-sky-950",
      exampleLabel: "text-sky-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "conditional-probability": {
      chip: "bg-amber-50 text-amber-700 border-amber-200",
      example: "border-amber-200 bg-amber-50 text-amber-950",
      exampleLabel: "text-amber-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
    "order-warning": {
      chip: "bg-orange-50 text-orange-700 border-orange-200",
      example: "border-orange-200 bg-orange-50 text-orange-950",
      exampleLabel: "text-orange-700",
      extra: "border-slate-200 bg-white text-slate-700",
    },
  } as const;

  const cueKey = normalizeSlideId(slideId) as keyof typeof cueStyles;
  return cueStyles[cueKey] ?? cueStyles.uncertainty;
}

function getLectureExperience(videoId: string) {
  if (videoId === "probability-statistics-video-01") {
    return {
      slides: introductionSlides,
      questionBank: introductionQuestionBank,
      supportVideos: introductionSupportVideos,
    };
  }

  if (videoId === "probability-statistics-video-02") {
    return {
      slides: probabilityRulesSlides,
      questionBank: probabilityRulesQuestionBank,
      supportVideos: probabilityRulesSupportVideos,
    };
  }

  return undefined;
}

export default function LectureVideoPlayer() {
  const { lectureId, videoId } = useParams();
  const { course, video } = getLectureVideo(lectureId, videoId);
  const lectureExperience = getLectureExperience(video.id);
  const lectureSlides = lectureExperience?.slides ?? [];
  const lectureQuestionBank = lectureExperience?.questionBank ?? [];
  const lectureSupportVideos = lectureExperience?.supportVideos ?? [];

  const [activeLectureSection, setActiveLectureSection] = useState<"Probability lectures" | "Statistics lectures">(
    video.section === "Statistics lectures" ? "Statistics lectures" : "Probability lectures",
  );
  const lectureSidebarItems = course.videoItems.filter((item) => item.section === activeLectureSection);
  const activeLectureIndex = lectureSidebarItems.findIndex((item) => item.id === video.id);
  const [activeTopSection, setActiveTopSection] = useState<"slides" | "quiz" | "videos">("slides");
  const [slidesApi, setSlidesApi] = useState<CarouselApi>();
  const [activeLectureSlide, setActiveLectureSlide] = useState(1);
  const [activeSupportVideo, setActiveSupportVideo] = useState(0);

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    getShuffledQuizSubsetFromBank(lectureQuestionBank, 12),
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizApi, setQuizApi] = useState<CarouselApi>();

  const quizScore = quizQuestions.filter(
    (question) => selectedAnswers[question.id] === question.correctAnswer,
  ).length;
  const selectedSupportVideo = lectureSupportVideos[activeSupportVideo] ?? lectureSupportVideos[0];

  function resetQuiz() {
    setSelectedAnswers({});
    setQuizQuestions(getShuffledQuizSubsetFromBank(lectureQuestionBank, 12));
    quizApi?.scrollTo(0);
  }

  function loadNewQuizSet() {
    setSelectedAnswers({});
    setQuizQuestions(getShuffledQuizSubsetFromBank(lectureQuestionBank, 12));
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

  useEffect(() => {
    setActiveLectureSection(
      video.section === "Statistics lectures" ? "Statistics lectures" : "Probability lectures",
    );
  }, [video.section]);

  useEffect(() => {
    setActiveTopSection("slides");
    setActiveSupportVideo(0);
    setSelectedAnswers({});
    setActiveLectureSlide(1);
    setQuizQuestions(getShuffledQuizSubsetFromBank(lectureQuestionBank, 12));
    quizApi?.scrollTo(0);
    slidesApi?.scrollTo(0);
  }, [video.id]);

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

      <div className="relative z-10 w-full">
        <div className="w-full space-y-6">
          {lectureExperience && (
            <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-sm shadow-2xl">
              <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="min-w-0">
                  <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex items-start gap-4">
                      <Link
                        to="/lectures"
                        className="mt-0.5 inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </Link>

                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
                          >
                            Learning Mode
                          </button>
                          <Link
                            to="/exam-mode"
                            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                          >
                            Exam Mode
                          </Link>
                        </div>
                        <h2 className="text-2xl text-white tracking-tight">{video.title}</h2>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 xl:justify-end">
                      <a
                        href={video.pdfLink ?? course.pdfLink}
                        download={`${video.title}.pdf`}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </span>
                      </a>
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
                  </div>

                  {activeTopSection === "slides" ? (
                    <>
                      <div className="mb-5 flex items-center justify-end gap-4">
                        <p className="text-sm text-slate-300">
                          {activeLectureSlide}/{lectureSlides.length}
                        </p>
                      </div>

                      <Carousel
                        key={`${video.id}-slides`}
                        setApi={handleSlidesApi}
                        opts={{ align: "start", loop: false }}
                        className="px-12 sm:px-16"
                      >
                        <CarouselContent>
                          {lectureSlides.map((slide, index) => (
                            <CarouselItem key={slide.id} className="basis-full">
                              {(() => {
                                const cueStyles = getSlideCueStyles(slide.id);

                                return (
                                  <article
                                    onClick={() => slidesApi?.scrollNext()}
                                    className="mx-auto flex w-full max-w-3xl cursor-pointer flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm"
                                  >
                                    <div>
                                      <h3 className="mb-5 text-3xl font-semibold text-slate-900">{slide.topic}</h3>
                                      <p className="text-lg leading-8 text-slate-800">{slide.explanation}</p>
                                    </div>

                                    <div className="mt-4 space-y-4">
                                      <SlideVisual slideId={slide.id} />
                                      <div
                                        className={`rounded-2xl border-l-4 px-5 py-4 leading-7 ${cueStyles.example}`}
                                      >
                                        <p
                                          className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${cueStyles.exampleLabel}`}
                                        >
                                          Key example
                                        </p>
                                        <p className="text-base font-medium">{slide.example}</p>
                                      </div>
                                      {slide.extraExamples.map((example) => (
                                        <div
                                          key={example}
                                          className={`rounded-2xl border px-5 py-4 text-base leading-7 ${cueStyles.extra}`}
                                        >
                                          {example}
                                        </div>
                                      ))}
                                    </div>
                                  </article>
                                );
                              })()}
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
                          12 shown from {lectureQuestionBank.length} questions
                        </div>
                      </div>

                      <Carousel
                        key={`${video.id}-quiz`}
                        setApi={setQuizApi}
                        opts={{ align: "start", loop: false, watchDrag: false }}
                        className="px-12 sm:px-16"
                      >
                        <CarouselContent>
                          {quizQuestions.flatMap((question, index) => {
                            const relatedSlide =
                              lectureSlides.find((slide) => slide.id === question.slideId) ??
                              lectureSlides[0];

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
                          {activeSupportVideo + 1}/{lectureSupportVideos.length}
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
                      <h3 className="text-xl text-white tracking-tight">{activeLectureSection}</h3>
                    </div>
                    <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-slate-200">
                      {lectureSidebarItems.length} items
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveLectureSection("Probability lectures")}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        activeLectureSection === "Probability lectures"
                          ? "bg-white text-slate-900"
                          : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Probability
                    </button>
                    <button
                      onClick={() => setActiveLectureSection("Statistics lectures")}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        activeLectureSection === "Statistics lectures"
                          ? "bg-white text-slate-900"
                          : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Statistics
                    </button>
                  </div>

                  <div className="space-y-3 xl:max-h-[650px] xl:overflow-y-auto xl:pr-1">
                    {lectureSidebarItems.map((lectureItem, index) => {
                      const isActive = activeLectureIndex === index;
                      const hasLecturePage = Boolean(getLectureExperience(lectureItem.id));
                      const itemClasses = `flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors ${
                        isActive ? "border-white/40 bg-white/15" : "border-white/10 bg-black/20 hover:bg-white/10"
                      }`;

                      const itemContent = (
                        <>
                          <div className="flex h-16 w-24 shrink-0 flex-col justify-between rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-3 text-white">
                            <span className="text-xs font-medium text-slate-300">Lecture {index + 1}</span>
                            <span className="text-sm font-semibold">
                              {lectureItem.title.split(" ").slice(0, 2).join(" ")}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-3 text-sm font-semibold text-white">{lectureItem.title}</p>
                            <p className="mt-2 text-xs text-slate-300">
                              {hasLecturePage ? "Slides, quiz, and videos available" : "Video link will be added"}
                            </p>
                          </div>
                        </>
                      );

                      return hasLecturePage ? (
                        <Link
                          key={lectureItem.id}
                          to={`/lectures/${course.id}/videos/${lectureItem.id}`}
                          className={itemClasses}
                        >
                          {itemContent}
                        </Link>
                      ) : (
                        <div key={lectureItem.id} className={itemClasses}>
                          {itemContent}
                        </div>
                      );
                    })}
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
