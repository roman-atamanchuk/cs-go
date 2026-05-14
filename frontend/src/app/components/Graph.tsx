import { Link, useParams, useSearchParams } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function Graph() {
  const { level, examId } = useParams();
  const [searchParams] = useSearchParams();

  const speed = Number(searchParams.get("speed")) || 50;
  const acceleration = Number(searchParams.get("acceleration")) || 30;
  const distance = Number(searchParams.get("distance")) || 100;
  const mass = Number(searchParams.get("mass")) || 75;

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1627556704465-fa360ceb4f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            to={`/study/${level}/${examId}`}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Study
          </Link>
          <div className="text-slate-300 text-sm">Graph Visualization</div>
        </div>

        <div className="bg-white rounded-xl p-7 shadow-md border border-slate-100 mb-5">
          <h1 className="text-2xl mb-6 text-slate-900 font-medium">Interactive Graph</h1>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-8 border border-slate-200 mb-6">
            <div className="relative h-96">
              <svg className="w-full h-full" viewBox="0 0 500 350">
                {/* Axes */}
                <line x1="50" y1="300" x2="450" y2="300" stroke="#94a3b8" strokeWidth="2" />
                <line x1="50" y1="300" x2="50" y2="30" stroke="#94a3b8" strokeWidth="2" />

                {/* Labels */}
                <text x="250" y="335" textAnchor="middle" className="text-sm fill-slate-600">Time (s)</text>
                <text x="25" y="165" textAnchor="middle" transform="rotate(-90 25 165)" className="text-sm fill-slate-600">Distance (m)</text>

                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <g key={i}>
                    <line
                      x1="50"
                      y1={300 - i * 50}
                      x2="450"
                      y2={300 - i * 50}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                    <text x="35" y={305 - i * 50} textAnchor="end" className="text-xs fill-slate-500">
                      {i * 50}
                    </text>
                  </g>
                ))}

                {/* Graph line */}
                <polyline
                  points="50,300 100,250 150,180 200,120 250,80 300,60 350,45 400,35 450,30"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                />

                {/* Data points */}
                {[
                  [50, 300],
                  [100, 250],
                  [150, 180],
                  [200, 120],
                  [250, 80],
                  [300, 60],
                  [350, 45],
                  [400, 35],
                  [450, 30],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="6" fill="#3b82f6" className="hover:r-8 transition-all" />
                ))}

                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Speed</p>
              <p className="text-2xl text-blue-600 font-medium">{speed}</p>
              <p className="text-xs text-slate-500 mt-1">m/s</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Acceleration</p>
              <p className="text-2xl text-emerald-600 font-medium">{acceleration}</p>
              <p className="text-xs text-slate-500 mt-1">m/s²</p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-5 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Distance</p>
              <p className="text-2xl text-violet-600 font-medium">{distance}</p>
              <p className="text-xs text-slate-500 mt-1">m</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Mass</p>
              <p className="text-2xl text-orange-600 font-medium">{mass}</p>
              <p className="text-xs text-slate-500 mt-1">kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-7 shadow-md border border-slate-100">
          <h2 className="text-xl mb-6 text-slate-900 font-medium">Calculated Results</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Time:</span>
                <span className="text-lg text-slate-900 font-medium">{(distance / speed).toFixed(2)} s</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Force:</span>
                <span className="text-lg text-slate-900 font-medium">{(mass * acceleration).toFixed(2)} N</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Kinetic Energy:</span>
                <span className="text-lg text-slate-900 font-medium">{(0.5 * mass * speed * speed).toFixed(2)} J</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200">
                <span className="text-slate-600 text-sm">Momentum:</span>
                <span className="text-lg text-slate-900 font-medium">{(mass * speed).toFixed(2)} kg⋅m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
