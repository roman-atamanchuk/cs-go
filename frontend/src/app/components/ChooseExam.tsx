import { Link, useParams } from "react-router";
import { ArrowLeft, Zap, Target } from "lucide-react";

export default function ChooseExam() {
  const { examId } = useParams();

  const examNames: Record<string, string> = {
    "data-structures": "Data Structures & Algorithms",
    "web-development": "Web Development Fundamentals",
    "database-systems": "Database Management Systems",
    "software-engineering": "Software Engineering Principles",
    "networking": "Computer Networks",
    "operating-systems": "Operating Systems",
  };

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Link to="/exam-mode" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Choose Exam
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2 text-white tracking-tight">Choose Preparation Mode</h1>
          <p className="text-slate-300">{examId && examNames[examId]}</p>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl p-7 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100">
            <div className="flex items-start gap-5">
              <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-2 text-slate-900 font-medium">Level 1 - Fast Pass Strategy</h2>
                <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                  Focus on high-frequency exam questions that appeared in 75%+ of past papers. Perfect for efficient preparation with short videos and simplified examples.
                </p>
                <Link to={`/study/1/${examId}`}>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium">
                    Start Level 1
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-7 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100">
            <div className="flex items-start gap-5">
              <div className="bg-violet-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-violet-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-2 text-slate-900 font-medium">Level 2 - High Grade Strategy</h2>
                <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                  Advanced topics and deeper learning. Includes difficult questions, longer explanatory videos, and comprehensive coverage for achieving top grades.
                </p>
                <Link to={`/study/2/${examId}`}>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium">
                    Start Level 2
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
