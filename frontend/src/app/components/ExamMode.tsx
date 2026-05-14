import { Link } from "react-router";
import { ArrowLeft, BookOpen, Clock, BarChart } from "lucide-react";

export default function ExamMode() {
  const exams = [
    {
      id: "data-structures",
      name: "Data Structures & Algorithms",
      code: "CS201",
      duration: "3 hours",
      questions: 50,
      color: "blue",
    },
    {
      id: "web-development",
      name: "Web Development Fundamentals",
      code: "WEB101",
      duration: "2.5 hours",
      questions: 40,
      color: "purple",
    },
    {
      id: "database-systems",
      name: "Database Management Systems",
      code: "DB301",
      duration: "3 hours",
      questions: 45,
      color: "green",
    },
    {
      id: "software-engineering",
      name: "Software Engineering Principles",
      code: "SE202",
      duration: "2 hours",
      questions: 35,
      color: "orange",
    },
    {
      id: "networking",
      name: "Computer Networks",
      code: "NET401",
      duration: "3 hours",
      questions: 50,
      color: "indigo",
    },
    {
      id: "operating-systems",
      name: "Operating Systems",
      code: "OS301",
      duration: "2.5 hours",
      questions: 40,
      color: "teal",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; button: string; buttonHover: string }> = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600", button: "bg-blue-600", buttonHover: "hover:bg-blue-700" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", button: "bg-purple-600", buttonHover: "hover:bg-purple-700" },
      green: { bg: "bg-emerald-50", icon: "text-emerald-600", button: "bg-emerald-600", buttonHover: "hover:bg-emerald-700" },
      orange: { bg: "bg-orange-50", icon: "text-orange-600", button: "bg-orange-600", buttonHover: "hover:bg-orange-700" },
      indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", button: "bg-indigo-600", buttonHover: "hover:bg-indigo-700" },
      teal: { bg: "bg-teal-50", icon: "text-teal-600", button: "bg-teal-600", buttonHover: "hover:bg-teal-700" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1595315343110-9b445a960442?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="max-w-5xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2 text-white tracking-tight">Choose Your Exam</h1>
          <p className="text-slate-300">Select the exam you want to prepare for</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {exams.map((exam) => {
            const colors = getColorClasses(exam.color);

            return (
            <div key={exam.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100">
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  <h2 className="text-lg mb-1 text-slate-900 font-medium">{exam.name}</h2>
                  <p className="text-sm text-slate-500">{exam.code}</p>
                </div>
                <div className={`${colors.bg} w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ml-3`}>
                  <BookOpen className={`w-5 h-5 ${colors.icon}`} />
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{exam.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <BarChart className="w-4 h-4" />
                  <span className="text-sm">{exam.questions} Questions</span>
                </div>
              </div>

              <Link to={`/choose-level/${exam.id}`}>
                <button className={`w-full ${colors.button} ${colors.buttonHover} text-white py-2.5 rounded-lg transition-colors text-sm font-medium`}>
                  Select Exam
                </button>
              </Link>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
