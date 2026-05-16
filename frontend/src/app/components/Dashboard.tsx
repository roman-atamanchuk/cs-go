import { Link } from "react-router";
import { BookOpen, Briefcase, Users, TrendingUp } from "lucide-react";
import logoImage from "../../imports/logo1-transparent.png";

export default function Dashboard() {
  const quickLinks = [
    { to: "/student-chat", label: "Student Chat" },
    { to: "/moodle", label: "Moodle" },
    { to: "/outlook", label: "Outlook" },
    { to: "/timetable", label: "Timetable" },
    { to: "/about", label: "About" },
  ];

  const featureCards = [
    {
      title: "Study",
      description:
        "Prepare for your exams with targeted study strategies based on past exam questions",
      to: "/lectures",
      icon: BookOpen,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Business Projects",
      description:
        "Build your portfolio by working on real projects for businesses and non-profit organisations",
      to: "/volunteer-projects",
      icon: Briefcase,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Social Activities",
      description:
        "Connect with peers, join clubs, and participate in campus events and networking opportunities",
      to: "/join-team",
      icon: Users,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Career Support",
      description:
        "Get career guidance, CV building, interview prep, and job placement assistance",
      to: "/placement-events",
      icon: TrendingUp,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="min-h-screen relative flex items-start justify-center p-6 pt-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1648737851199-585cfd98c13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/88 backdrop-blur-sm" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-950/55 via-slate-950/25 to-transparent blur-sm" />
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
          <p
            className="font-handwritten text-slate-200 text-3xl md:text-4xl mb-2 text-left tracking-wide"
            style={{ textShadow: "0 2px 10px rgba(15, 23, 42, 0.35)" }}
          >
            ...Where Students and Businesses Grow Together
          </p>
          <div className="mb-4 flex justify-center">
            <img
              src={logoImage}
              alt="CS-GO logo"
              className="w-full max-w-[180px] h-auto object-contain"
            />
          </div>
          <p className="text-slate-300 text-lg">Computer Science Growth &amp; Opportunities</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {featureCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link key={card.title} to={card.to} className="group block">
                <div className="bg-white rounded-xl p-7 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-slate-100 cursor-pointer">
                  <div className={`${card.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h2 className="text-xl mb-2 text-slate-900 font-medium group-hover:text-slate-950">{card.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
