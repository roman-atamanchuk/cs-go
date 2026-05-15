import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, FileText, Play } from "lucide-react";
import { getPastExamFileUrl } from "../data/lectureApi";

export default function Study() {
  const { level, examId } = useParams();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [progress] = useState(45);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentVideo, setCurrentVideo] = useState(1);
  const [viewMode, setViewMode] = useState<"video" | "simulation">("video");
  const [speed, setSpeed] = useState(50);
  const [acceleration, setAcceleration] = useState(30);
  const [distance, setDistance] = useState(100);
  const [mass, setMass] = useState(75);

  const years = [2022, 2023, 2024, 2025];
  const pastExamFiles: Record<string, Partial<Record<number, { paper?: string; solutions?: string }>>> = {
    "probability-statistics": {
      2022: { paper: "2022-paper.doc" },
      2023: { paper: "2023-paper.docx", solutions: "2023-solutions.docx" },
      2024: { paper: "2024-paper.docx", solutions: "2024-solutions.docx" },
      2025: { paper: "2025-paper.docx" },
    },
  };
  const totalQuestions = 12;
  const totalVideos = 4;
  const selectedYearFiles = examId ? pastExamFiles[examId]?.[selectedYear] : undefined;
  const paperUrl =
    examId && selectedYearFiles?.paper ? getPastExamFileUrl(examId, selectedYearFiles.paper) : null;
  const solutionsUrl =
    examId && selectedYearFiles?.solutions ? getPastExamFileUrl(examId, selectedYearFiles.solutions) : null;

  const question = {
    text: "What is the time complexity of binary search algorithm?",
    options: [
      { id: "a", text: "O(n)" },
      { id: "b", text: "O(log n)" },
      { id: "c", text: "O(n²)" },
      { id: "d", text: "O(1)" },
    ],
  };

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1627556704465-fa360ceb4f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/lectures" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-sm">Exam Year:</span>
            <div className="flex gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
                    selectedYear === year
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700/80 text-slate-300 hover:bg-slate-700 border border-slate-600/50"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            <div className="ml-2 flex gap-2">
              {paperUrl ? (
                <a
                  href={paperUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
                >
                  <FileText className="w-4 h-4" />
                  Paper
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium text-slate-400">
                  <FileText className="w-4 h-4" />
                  No paper
                </span>
              )}

              {solutionsUrl ? (
                <a
                  href={solutionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200"
                >
                  <FileText className="w-4 h-4" />
                  Solutions
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium text-slate-400">
                  <FileText className="w-4 h-4" />
                  No solutions
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("video")}
                  className={`px-5 py-2 rounded-lg transition-colors text-sm font-medium ${
                    viewMode === "video"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Video Tutorial
                </button>
                <button
                  onClick={() => setViewMode("simulation")}
                  className={`px-5 py-2 rounded-lg transition-colors text-sm font-medium ${
                    viewMode === "simulation"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Go to Simulation
                </button>
              </div>
              {viewMode === "video" && (
                <div className="flex gap-2">
                  {Array.from({ length: totalVideos }, (_, i) => i + 1).map((videoNum) => (
                    <button
                      key={videoNum}
                      onClick={() => setCurrentVideo(videoNum)}
                      className={`w-9 h-9 rounded-lg transition-colors text-sm font-medium ${
                        currentVideo === videoNum
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {videoNum}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {viewMode === "video" ? (
              <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <button className="relative bg-white/90 hover:bg-white rounded-full w-16 h-16 flex items-center justify-center transition-all hover:scale-105">
                  <Play className="w-7 h-7 text-slate-800 ml-1" />
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden border border-slate-200">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <h3 className="text-xl mb-2 text-slate-900 font-medium">Interactive Simulation</h3>
                  <p className="text-slate-600 text-sm">Visual demonstration of the algorithm in action</p>
                </div>
              </div>
            )}
          </div>

{viewMode === "video" ? (
            <>
              <div className="bg-white rounded-xl p-7 shadow-md border border-slate-100">
                <h2 className="text-xl mb-5 text-slate-900 font-medium">Example Question</h2>

                <div className="mb-5">
                  <p className="text-base text-slate-700">{question.text}</p>
                </div>

                <div className="space-y-2.5 mb-6">
                  {question.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedAnswer(option.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedAnswer === option.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedAnswer === option.id
                            ? "border-blue-500 bg-blue-500"
                            : "border-slate-300"
                        }`}>
                          {selectedAnswer === option.id && (
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                          )}
                        </span>
                        <span className="text-slate-700 text-sm">{option.id.toUpperCase()}. {option.text}</span>
                      </span>
                    </button>
                  ))}
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium">
                  Next Question
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                <h3 className="text-base text-slate-700 mb-4 font-medium">Question Navigator</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((qNum) => (
                    <button
                      key={qNum}
                      onClick={() => setCurrentQuestion(qNum)}
                      className={`w-11 h-11 rounded-lg transition-all text-sm font-medium ${
                        currentQuestion === qNum
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {qNum}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base text-slate-700 font-medium">Progress</h3>
                  <span className="text-blue-600 text-sm font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl p-7 shadow-md border border-slate-100">
                <h2 className="text-xl mb-5 text-slate-900 font-medium">Simulation Parameters</h2>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-slate-700 text-sm">Speed</label>
                      <span className="text-blue-600 text-sm font-medium">{speed} m/s</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-slate-700 text-sm">Acceleration</label>
                      <span className="text-blue-600 text-sm font-medium">{acceleration} m/s²</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={acceleration}
                      onChange={(e) => setAcceleration(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-slate-700 text-sm">Distance</label>
                      <span className="text-blue-600 text-sm font-medium">{distance} m</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={distance}
                      onChange={(e) => setDistance(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-slate-700 text-sm">Mass</label>
                      <span className="text-blue-600 text-sm font-medium">{mass} kg</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150"
                      value={mass}
                      onChange={(e) => setMass(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                  <h3 className="text-lg mb-4 text-slate-900 font-medium">Graph Preview</h3>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-6 border border-slate-200 mb-4">
                    <svg className="w-full h-48" viewBox="0 0 300 200">
                      <line x1="30" y1="170" x2="270" y2="170" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="30" y1="170" x2="30" y2="20" stroke="#94a3b8" strokeWidth="2" />

                      <polyline
                        points={(() => {
                          const points = [];
                          const maxHeight = 150;
                          const scale = (speed + acceleration) / 150;
                          for (let i = 0; i < 7; i++) {
                            const x = 30 + i * 40;
                            const y = 170 - (i * i * scale * (maxHeight / 36));
                            points.push(`${x},${Math.max(20, Math.min(170, y))}`);
                          }
                          return points.join(' ');
                        })()}
                        fill="none"
                        stroke="url(#miniGradient)"
                        strokeWidth="3"
                      />

                      {(() => {
                        const circles = [];
                        const maxHeight = 150;
                        const scale = (speed + acceleration) / 150;
                        for (let i = 0; i < 7; i++) {
                          const x = 30 + i * 40;
                          const y = 170 - (i * i * scale * (maxHeight / 36));
                          circles.push(
                            <circle key={i} cx={x} cy={Math.max(20, Math.min(170, y))} r="4" fill="#3b82f6" />
                          );
                        }
                        return circles;
                      })()}

                      <defs>
                        <linearGradient id="miniGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <button
                    onClick={() => navigate(`/graph/${level}/${examId}?speed=${speed}&acceleration=${acceleration}&distance=${distance}&mass=${mass}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <span>View Full Graph</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
                  <h3 className="text-lg mb-4 text-slate-900 font-medium">Output Data</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600 text-sm">Time:</span>
                      <span className="text-slate-800 text-sm font-medium">{(distance / speed).toFixed(2)} s</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600 text-sm">Force:</span>
                      <span className="text-slate-800 text-sm font-medium">{(mass * acceleration).toFixed(2)} N</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600 text-sm">Energy:</span>
                      <span className="text-slate-800 text-sm font-medium">{(0.5 * mass * speed * speed).toFixed(2)} J</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 text-sm">Momentum:</span>
                      <span className="text-slate-800 text-sm font-medium">{(mass * speed).toFixed(2)} kg⋅m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
