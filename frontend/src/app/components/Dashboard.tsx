import { Link } from "react-router";
import { BookOpen, Briefcase, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const quickLinks = [
    { to: "/student-chat", label: "Student Chat" },
    { to: "/moodle", label: "Moodle" },
    { to: "/outlook", label: "Outlook" },
    { to: "/timetable", label: "Timetable" },
  ];

  const featureCards = [
    {
      title: "Study",
      description:
        "Prepare for your exams with targeted study strategies based on past exam questions",
      primaryLabel: "Exam Mode",
      primaryTo: "/exam-mode",
      secondaryLabel: "Lectures",
      secondaryTo: "/lectures",
      icon: BookOpen,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      primaryButton: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Business Projects",
      description:
        "Build your portfolio by working on real projects for businesses and non-profit organisations",
      primaryLabel: "Explore Projects",
      primaryTo: "/business-projects",
      secondaryLabel: "Volunteer",
      secondaryTo: "/volunteer-projects",
      icon: Briefcase,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      primaryButton: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "Social Activities",
      description:
        "Connect with peers, join clubs, and participate in campus events and networking opportunities",
      primaryLabel: "View Events",
      primaryTo: "/social-activities",
      secondaryLabel: "Join Team",
      secondaryTo: "/join-team",
      icon: Users,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      primaryButton: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      title: "Career Support",
      description:
        "Get career guidance, CV building, interview prep, and job placement assistance",
      primaryLabel: "Get Support",
      primaryTo: "/career-support",
      secondaryLabel: "Placements",
      secondaryTo: "/placement-events",
      icon: TrendingUp,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      primaryButton: "bg-violet-600 hover:bg-violet-700",
    },
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1648737851199-585cfd98c13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/88 backdrop-blur-sm" />
      <div className="max-w-5xl w-full relative z-10">
        <div className="flex justify-between mb-10 flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <button className="px-5 py-2.5 bg-slate-700/80 text-white hover:bg-slate-700 rounded-lg transition-colors backdrop-blur-sm border border-slate-600/50">
                  {link.label}
                </button>
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <Link to="/signin">
              <button className="px-5 py-2.5 border border-white/30 text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl mb-3 text-white tracking-tight">SETU Student Services</h1>
          <p className="text-slate-300 text-lg">Choose your path to success</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {featureCards.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.title} className="group">
                <div className="bg-white rounded-xl p-7 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-slate-100">
                  <div className={`${card.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h2 className="text-xl mb-2 text-slate-900 font-medium">{card.title}</h2>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">{card.description}</p>
                  <div className="flex gap-2">
                    <Link to={card.primaryTo} className="flex-1">
                      <button className={`w-full ${card.primaryButton} text-white py-2.5 rounded-lg transition-colors text-sm font-medium`}>
                        {card.primaryLabel}
                      </button>
                    </Link>
                    <Link to={card.secondaryTo} className="flex-1">
                      <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg transition-colors text-sm font-medium">
                        {card.secondaryLabel}
                      </button>
                    </Link>
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
