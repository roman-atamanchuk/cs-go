import { Link } from "react-router";
import { ArrowLeft, FileText, Video, Users, Briefcase } from "lucide-react";

export default function CareerSupport() {
  const services = [
    {
      id: 1,
      title: "CV/Resume Building",
      description: "Get professional help crafting a compelling CV that stands out to employers",
      icon: FileText,
      color: "blue",
      duration: "1-2 hours",
    },
    {
      id: 2,
      title: "Mock Interviews",
      description: "Practice with industry professionals and receive constructive feedback",
      icon: Video,
      color: "purple",
      duration: "45 minutes",
    },
    {
      id: 3,
      title: "Career Counseling",
      description: "One-on-one sessions to explore career paths and set professional goals",
      icon: Users,
      color: "green",
      duration: "1 hour",
    },
    {
      id: 4,
      title: "Job Placement",
      description: "Access exclusive job opportunities and internship programs",
      icon: Briefcase,
      color: "orange",
      duration: "Ongoing",
    },
  ];

  const upcomingEvents = [
    {
      title: "Tech Career Fair 2026",
      date: "April 25, 2026",
      companies: "50+ Companies",
    },
    {
      title: "LinkedIn Workshop",
      date: "April 22, 2026",
      companies: "Career Services",
    },
    {
      title: "Salary Negotiation Seminar",
      date: "April 28, 2026",
      companies: "HR Experts",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string }> = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600" },
      green: { bg: "bg-emerald-50", icon: "text-emerald-600" },
      orange: { bg: "bg-orange-50", icon: "text-orange-600" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1666790676906-0295230c121d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2 text-white tracking-tight">Career Support</h1>
          <p className="text-slate-300">Your journey to professional success starts here</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {services.map((service) => {
            const colors = getColorClasses(service.color);
            const Icon = service.icon;

            return (
              <div key={service.id} className="bg-white rounded-xl p-7 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`${colors.bg} w-11 h-11 rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg mb-2 text-slate-900 font-medium">{service.title}</h2>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded-lg transition-colors text-sm font-medium">
                  Book Session
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-7 shadow-md border border-slate-100">
          <h2 className="text-xl mb-6 text-slate-900 font-medium">Upcoming Career Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div>
                  <h3 className="text-base text-slate-900 mb-1 font-medium">{event.title}</h3>
                  <p className="text-sm text-slate-600">{event.companies}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 mb-2">{event.date}</p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors font-medium">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
