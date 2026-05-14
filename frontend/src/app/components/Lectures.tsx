import { Link } from "react-router";
import { ArrowLeft, Play, BookOpen, Clock } from "lucide-react";
import { lectureCourses } from "../data/lectureLibrary";

export default function Lectures() {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string }> = {
      blue: { bg: "bg-blue-100", icon: "text-blue-600" },
      purple: { bg: "bg-purple-100", icon: "text-purple-600" },
      green: { bg: "bg-green-100", icon: "text-green-600" },
      orange: { bg: "bg-orange-100", icon: "text-orange-600" },
      indigo: { bg: "bg-indigo-100", icon: "text-indigo-600" },
      teal: { bg: "bg-teal-100", icon: "text-teal-600" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="max-w-5xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2 text-white tracking-tight">Video Lectures</h1>
          <p className="text-slate-300">Access comprehensive lecture series for all your courses</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {lectureCourses.map((lecture) => {
            const colors = getColorClasses(lecture.color);

            return (
              <div key={lecture.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <h2 className="text-lg mb-1 text-slate-900 font-medium">{lecture.title}</h2>
                    <p className="text-sm text-slate-500">{lecture.code}</p>
                  </div>
                  <a
                    href={lecture.pdfLink}
                    download="01 Introduction to Probability.pdf"
                    aria-label={`Download PDF for ${lecture.title}`}
                    className={`${colors.bg} w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ml-3 transition-transform hover:scale-105`}
                  >
                    <BookOpen className={`w-5 h-5 ${colors.icon}`} />
                  </a>
                </div>

                <p className="text-slate-600 mb-4 text-sm">Instructor: {lecture.instructor}</p>

                <div className="flex gap-4 mb-5">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">{lecture.videos} videos</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{lecture.duration}</span>
                  </div>
                </div>

                <Link
                  to={`/lectures/${lecture.id}`}
                  className="w-full block bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded-lg transition-colors text-sm font-medium text-center"
                >
                  Watch Lectures
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
