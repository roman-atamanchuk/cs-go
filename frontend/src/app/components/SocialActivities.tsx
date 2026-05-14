import { Link } from "react-router";
import { ArrowLeft, Calendar, Users, Music, Coffee } from "lucide-react";

export default function SocialActivities() {
  const activities = [
    {
      id: 1,
      title: "Tech Club Weekly Meetup",
      type: "Club",
      date: "Every Thursday",
      time: "6:00 PM",
      location: "Room 301",
      participants: 25,
      icon: Users,
      color: "blue",
    },
    {
      id: 2,
      title: "Coding Hackathon 2026",
      type: "Event",
      date: "May 15, 2026",
      time: "9:00 AM",
      location: "Main Hall",
      participants: 150,
      icon: Calendar,
      color: "purple",
    },
    {
      id: 3,
      title: "Music & Arts Society",
      type: "Club",
      date: "Every Tuesday",
      time: "5:00 PM",
      location: "Art Studio",
      participants: 18,
      icon: Music,
      color: "green",
    },
    {
      id: 4,
      title: "Coffee & Networking",
      type: "Social",
      date: "Every Friday",
      time: "3:00 PM",
      location: "Campus Cafe",
      participants: 30,
      icon: Coffee,
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; badge: string }> = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
      green: { bg: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
      orange: { bg: "bg-orange-50", icon: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="max-w-5xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl mb-2 text-white tracking-tight">Social Activities</h1>
          <p className="text-slate-300">Connect, collaborate, and grow with your peers</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {activities.map((activity) => {
            const colors = getColorClasses(activity.color);
            const Icon = activity.icon;

            return (
              <div key={activity.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${colors.bg} w-11 h-11 rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs ${colors.badge}`}>
                    {activity.type}
                  </span>
                </div>

                <h2 className="text-lg mb-4 text-slate-900 font-medium">{activity.title}</h2>

                <div className="space-y-2 mb-5 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{activity.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{activity.participants} participants</span>
                  </div>
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors text-sm font-medium">
                    Join
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
