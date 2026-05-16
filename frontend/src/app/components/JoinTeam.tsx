import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, Users, Trophy, Code, Music, Palette, Dumbbell, ChevronLeft, ChevronRight } from "lucide-react";

type Team = {
  id: number;
  name: string;
  category: string;
  members: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
};

function TeamSlider({
  title,
  teams,
  getColorClasses,
}: {
  title: string;
  teams: Team[];
  getColorClasses: (color: string) => { bg: string; icon: string; badge: string };
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    if (current <= 0) {
      emblaApi.scrollTo(teams.length - 1);
      return;
    }
    emblaApi.scrollPrev();
  }, [emblaApi, teams.length]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    if (current >= teams.length - 1) {
      emblaApi.scrollTo(0);
      return;
    }
    emblaApi.scrollNext();
  }, [emblaApi, teams.length]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-medium tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="w-9 h-9 rounded-lg border border-slate-600/70 bg-slate-800/65 text-slate-200 hover:text-white hover:bg-slate-700/80 transition-colors flex items-center justify-center"
            aria-label={`Previous slide in ${title}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="w-9 h-9 rounded-lg border border-slate-600/70 bg-slate-800/65 text-slate-200 hover:text-white hover:bg-slate-700/80 transition-colors flex items-center justify-center"
            aria-label={`Next slide in ${title}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-300 px-2 py-1 rounded-full bg-slate-700/60 border border-slate-600/60">
            {activeIndex + 1}/{teams.length}
          </span>
        </div>
      </div>

      <div
        className="overflow-hidden cursor-pointer"
        ref={emblaRef}
        onClick={scrollNext}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            scrollNext();
          }
        }}
        aria-label={`${title} slider`}
      >
        <div className="flex gap-5">
          {teams.map((team) => {
            const colors = getColorClasses(team.color);
            const Icon = team.icon;

            return (
              <div key={team.id} className="min-w-0 shrink-0 grow-0 basis-full">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${colors.bg} w-11 h-11 rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-xs ${colors.badge}`}>
                      {team.category}
                    </span>
                  </div>

                  <h3 className="text-lg mb-2 text-slate-900 font-medium">{team.name}</h3>
                  <p className="text-slate-600 mb-5 text-sm leading-relaxed">{team.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{team.members} members</span>
                    </div>
                    <button
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors text-sm font-medium"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Join Team
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function JoinTeam() {
  const teams = [
    {
      id: 1,
      name: "Programming Club",
      category: "Technology",
      members: 45,
      icon: Code,
      color: "blue",
      description: "Build projects, participate in hackathons, and learn new programming skills together.",
    },
    {
      id: 2,
      name: "Sports Teams",
      category: "Athletics",
      members: 80,
      icon: Trophy,
      color: "orange",
      description: "Join football, basketball, volleyball, and other competitive sports teams.",
    },
    {
      id: 3,
      name: "Music Society",
      category: "Arts",
      members: 32,
      icon: Music,
      color: "purple",
      description: "Share your musical talents, learn instruments, and perform at campus events.",
    },
    {
      id: 4,
      name: "Design Collective",
      category: "Creative",
      members: 28,
      icon: Palette,
      color: "pink",
      description: "Collaborate on design projects, participate in workshops, and showcase your creativity.",
    },
    {
      id: 5,
      name: "Fitness Group",
      category: "Wellness",
      members: 56,
      icon: Dumbbell,
      color: "green",
      description: "Stay active with group workouts, yoga sessions, and wellness challenges.",
    },
    {
      id: 6,
      name: "Student Council",
      category: "Leadership",
      members: 15,
      icon: Users,
      color: "indigo",
      description: "Represent students, organize events, and make a difference in campus life.",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; badge: string }> = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
      orange: { bg: "bg-orange-50", icon: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
      pink: { bg: "bg-pink-50", icon: "text-pink-600", badge: "bg-pink-100 text-pink-700" },
      green: { bg: "bg-emerald-50", icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
      indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700" },
    };
    return colors[color] || colors.blue;
  };

  const sliderGroups = [
    { title: "Code & Competition", teams: teams.slice(0, 2) },
    { title: "Creative Campus", teams: teams.slice(2, 4) },
    { title: "Wellness & Leadership", teams: teams.slice(4, 6) },
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
          <h1 className="text-3xl mb-2 text-white tracking-tight">Join a Team</h1>
          <p className="text-slate-300">Find your community and connect with like-minded students</p>
        </div>

        <div className="space-y-7">
          {sliderGroups.map((group) => (
            <TeamSlider
              key={group.title}
              title={group.title}
              teams={group.teams}
              getColorClasses={getColorClasses}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
