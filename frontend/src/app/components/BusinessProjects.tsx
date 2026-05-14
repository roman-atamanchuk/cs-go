import { Link } from "react-router";
import { ArrowLeft, ExternalLink, Globe, Calendar, Database, Briefcase } from "lucide-react";

export default function BusinessProjects() {
  const projects = [
    {
      id: 1,
      title: "Salon Website Development",
      business: "Beauty & Wellness Salon",
      description: "Create a modern, responsive website with service listings, gallery, and contact information for a local beauty salon.",
      tags: ["Web Development", "UI/UX"],
      icon: Globe,
      color: "blue",
    },
    {
      id: 2,
      title: "Online Booking System",
      business: "Healthcare Clinic",
      description: "Build an appointment booking system with calendar integration, email notifications, and patient management features.",
      tags: ["Full Stack", "Database"],
      icon: Calendar,
      color: "purple",
    },
    {
      id: 3,
      title: "Customer Database System",
      business: "Retail Store",
      description: "Design and implement a customer relationship database with purchase history tracking and analytics dashboard.",
      tags: ["Database", "Analytics"],
      icon: Database,
      color: "green",
    },
    {
      id: 4,
      title: "CRM Setup",
      business: "Marketing Agency",
      description: "Configure and customize a CRM system to manage client relationships, track leads, and automate follow-up communications.",
      tags: ["CRM", "Automation"],
      icon: Briefcase,
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string }> = {
      blue: { bg: "bg-blue-100", icon: "text-blue-600" },
      purple: { bg: "bg-purple-100", icon: "text-purple-600" },
      green: { bg: "bg-green-100", icon: "text-green-600" },
      orange: { bg: "bg-orange-100", icon: "text-orange-600" },
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
          <h1 className="text-3xl mb-2 text-white tracking-tight">Small Business Projects</h1>
          <p className="text-slate-300">Real-world assignments that build your portfolio and help local businesses</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => {
            const colors = getColorClasses(project.color);
            const Icon = project.icon;

            return (
            <div key={project.id} className="bg-white rounded-xl p-7 shadow-md border border-slate-100 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  <h2 className="text-xl mb-1 text-slate-900 font-medium">{project.title}</h2>
                  <p className="text-sm text-slate-500">{project.business}</p>
                </div>
                <div className={`${colors.bg} w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ml-3`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
              </div>

              <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded-lg transition-colors text-sm font-medium">
                View Project
              </button>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
