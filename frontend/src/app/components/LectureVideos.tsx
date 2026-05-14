import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, BookOpen, Clock, Play } from "lucide-react";
import { getLectureCourse } from "../data/lectureLibrary";

export default function LectureVideos() {
  const { lectureId } = useParams();
  const course = getLectureCourse(lectureId);
  const videoSections = course.videoItems.reduce(
    (groups, video) => {
      const section = video.section ?? "Lecture Videos";
      if (!groups[section]) {
        groups[section] = [];
      }
      groups[section].push(video);
      return groups;
    },
    {} as Record<string, typeof course.videoItems>,
  );
  const [activeSection, setActiveSection] = useState<"Probability lectures" | "Statistics lectures">(
    "Probability lectures",
  );
  const activeVideos = videoSections[activeSection] ?? [];

  return (
    <div className="min-h-screen relative p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)",
        }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link
          to="/lectures"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lectures
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl mb-2 text-white tracking-tight">{course.title}</h1>
            <p className="text-slate-300 mb-3">{course.code}</p>
            <p className="text-slate-300">Instructor: {course.instructor}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveSection("Probability lectures")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === "Probability lectures"
                    ? "bg-white text-slate-900"
                    : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Probability
              </button>
              <button
                onClick={() => setActiveSection("Statistics lectures")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === "Statistics lectures"
                    ? "bg-white text-slate-900"
                    : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Statistics
              </button>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-slate-100 backdrop-blur-sm">
              <Play className="w-4 h-4" />
              <span className="text-sm">{course.videos} videos</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-slate-100 backdrop-blur-sm">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{course.duration}</span>
            </div>
          </div>
        </div>

        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl text-white tracking-tight">{activeSection}</h2>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-slate-300">{activeVideos.length} items</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeVideos.map((video, index) => (
              <article
                key={video.id}
                className={`min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg flex flex-col transition-transform ${
                  video.watchUrl ? "hover:-translate-y-1" : ""
                }`}
              >
                <div className="relative h-48 bg-slate-200 shrink-0">
                  {video.watchUrl ? (
                    <Link to={`/lectures/${course.id}/videos/${video.id}`} className="block h-full">
                      <img
                        src={video.image}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/15" />
                      <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm">
                        <Play className="w-4 h-4 ml-0.5" />
                      </div>
                    </Link>
                  ) : (
                    <>
                      <img
                        src={video.image}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/15" />
                      <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm">
                        <Play className="w-4 h-4 ml-0.5" />
                      </div>
                    </>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      <BookOpen className="w-3.5 h-3.5" />
                      Lecture {index + 1}
                    </div>
                    <a
                      href={course.pdfLink}
                      download="01 Introduction to Probability.pdf"
                      aria-label={`Download PDF for ${video.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      <BookOpen className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    {video.watchUrl ? (
                      <Link
                        to={`/lectures/${course.id}/videos/${video.id}`}
                        className="text-base text-slate-900 font-semibold leading-snug hover:text-blue-700 transition-colors"
                      >
                        {video.title}
                      </Link>
                    ) : (
                      <>
                        <h3 className="text-base text-slate-900 font-semibold leading-snug">
                          {video.title}
                        </h3>
                        <p className="text-sm text-slate-500">Video link will be added here.</p>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
