import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Play, BookOpen, Clock } from "lucide-react";
import { lectureCourses } from "../data/lectureLibrary";

export default function Lectures() {
  const [selectedSemester, setSelectedSemester] = useState(4);
  const navigate = useNavigate();

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

        <div className="mb-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              {[1, 2, 3, 4, 5, 7, 8].map((semester) => (
                <button
                  key={semester}
                  type="button"
                  onClick={() => setSelectedSemester(semester)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    selectedSemester === semester
                      ? "bg-white text-slate-900"
                      : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Semester {semester}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {lectureCourses.map((lecture) => {
            const colors = getColorClasses(lecture.color);

            return (
              <div
                key={lecture.id}
                onClick={() => navigate(`/lectures/${lecture.id}/videos/${lecture.videoItems[0]?.id ?? ""}`)}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-slate-100 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <h2 className="text-lg mb-1 text-slate-900 font-medium">{lecture.title}</h2>
                    <p className="text-sm text-slate-500">{lecture.code}</p>
                  </div>
                  <a
                    href={lecture.pdfLink}
                    download={`${lecture.title}.pdf`}
                    aria-label={`Download PDF for ${lecture.title}`}
                    onClick={(event) => event.stopPropagation()}
                    className={`${colors.bg} w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ml-3 transition-transform hover:scale-105`}
                  >
                    <BookOpen className={`w-5 h-5 ${colors.icon}`} />
                  </a>
                </div>

                <p className="text-slate-600 mb-4 text-sm">Instructor: {lecture.instructor}</p>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">{lecture.videos} videos</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{lecture.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
