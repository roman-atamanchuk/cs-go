import { Link } from "react-router";
import { ArrowLeft, Calendar, Building2, Users, MapPin, Briefcase } from "lucide-react";

export default function PlacementEvents() {
  const events = [
    {
      id: 1,
      title: "Tech Career Fair 2026",
      date: "April 25, 2026",
      time: "9:00 AM - 5:00 PM",
      location: "Main Hall",
      companies: 50,
      type: "Career Fair",
      positions: "200+ positions",
      color: "blue",
      icon: Briefcase,
    },
    {
      id: 2,
      title: "Google Campus Recruitment",
      date: "April 28, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Room 301",
      companies: 1,
      type: "On-Campus Interview",
      positions: "Software Engineer roles",
      color: "red",
      icon: Users,
    },
    {
      id: 3,
      title: "Startup Hiring Drive",
      date: "May 2, 2026",
      time: "11:00 AM - 3:00 PM",
      location: "Innovation Center",
      companies: 15,
      type: "Hiring Drive",
      positions: "Multiple roles",
      color: "purple",
      icon: Building2,
    },
    {
      id: 4,
      title: "Banking & Finance Recruitment",
      date: "May 5, 2026",
      time: "9:00 AM - 2:00 PM",
      location: "Conference Hall",
      companies: 12,
      type: "Sector-Specific",
      positions: "Analyst positions",
      color: "green",
      icon: Briefcase,
    },
    {
      id: 5,
      title: "Microsoft Interview Sessions",
      date: "May 8, 2026",
      time: "9:00 AM - 6:00 PM",
      location: "Room 205",
      companies: 1,
      type: "On-Campus Interview",
      positions: "Engineering & PM roles",
      color: "cyan",
      icon: Users,
    },
    {
      id: 6,
      title: "Summer Internship Fair",
      date: "May 12, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Sports Complex",
      companies: 35,
      type: "Internship Fair",
      positions: "150+ internships",
      color: "orange",
      icon: Calendar,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; badge: string }> = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
      red: { bg: "bg-red-50", icon: "text-red-600", badge: "bg-red-100 text-red-700" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
      green: { bg: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
      cyan: { bg: "bg-cyan-50", icon: "text-cyan-600", badge: "bg-cyan-100 text-cyan-700" },
      orange: { bg: "bg-orange-50", icon: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
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
          <h1 className="text-3xl mb-2 text-white tracking-tight">Placement Events</h1>
          <p className="text-slate-300">Register for upcoming career fairs and campus recruitment drives</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {events.map((event) => {
            const colors = getColorClasses(event.color);
            const Icon = event.icon;

            return (
              <div key={event.id} className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100`}>
                <div className="flex items-start gap-4 mb-5">
                  <div className={`${colors.bg} w-11 h-11 rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h2 className="text-lg text-slate-900 flex-1 font-medium">{event.title}</h2>
                      <span className={`px-2.5 py-1 rounded-md text-xs ${colors.badge} shrink-0 ml-2`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{event.companies} {event.companies === 1 ? 'Company' : 'Companies'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.positions}</span>
                  </div>
                </div>

                <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium">
                  Register Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
