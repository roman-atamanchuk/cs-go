import { Link } from "react-router";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";

export default function VolunteerProjects() {
  const projects = [
    {
      id: 1,
      title: "Community Center Website",
      organization: "Local Community Hub",
      description: "Design and develop a welcoming website for a community center to showcase programs, events, and volunteer opportunities.",
      tags: ["Web Development", "UI/UX"],
      impact: "Serves 500+ families",
    },
    {
      id: 2,
      title: "Food Bank Inventory System",
      organization: "Regional Food Bank",
      description: "Create a digital inventory management system to track donations, manage distribution, and generate impact reports.",
      tags: ["Full Stack", "Database"],
      impact: "Helps 2000+ people monthly",
    },
    {
      id: 3,
      title: "Animal Shelter Adoption Portal",
      organization: "City Animal Shelter",
      description: "Build an adoption portal with pet profiles, online applications, and follow-up management to help animals find homes faster.",
      tags: ["Web Development", "Database"],
      impact: "200+ animals rescued yearly",
    },
    {
      id: 4,
      title: "Youth Mentorship Platform",
      organization: "Education Foundation",
      description: "Develop a platform connecting mentors with students, including scheduling, progress tracking, and communication tools.",
      tags: ["Full Stack", "Communication"],
      impact: "Supports 150+ students",
    },
  ];

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
          <h1 className="text-3xl mb-2 text-white tracking-tight">Volunteer Projects</h1>
          <p className="text-slate-300">Make a difference while building your skills and portfolio</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl p-7 shadow-md border border-slate-100 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  <h2 className="text-xl mb-1 text-slate-900 font-medium">{project.title}</h2>
                  <p className="text-sm text-slate-500">{project.organization}</p>
                </div>
                <div className="bg-emerald-50 w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ml-3">
                  <Heart className="w-5 h-5 text-emerald-600" />
                </div>
              </div>

              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex items-center gap-2 mb-5 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                <Heart className="w-4 h-4" />
                <span>{project.impact}</span>
              </div>

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
          ))}
        </div>
      </div>
    </div>
  );
}
