import { Link, useParams } from "react-router";
import { ArrowLeft, FileText, PlayCircle } from "lucide-react";
import { getLectureVideo } from "../data/lectureLibrary";

export default function LectureVideoPlayer() {
  const { lectureId, videoId } = useParams();
  const { course, video } = getLectureVideo(lectureId, videoId);

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
          to={`/lectures/${course.id}`}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lecture List
        </Link>

        <div className="grid xl:grid-cols-[1.6fr_0.8fr] gap-6">
          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur-sm shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-200 mb-2">{course.title}</p>
                <h1 className="text-3xl text-white tracking-tight">{video.title}</h1>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                <PlayCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video relative">
              {video.embedUrl ? (
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={video.image}
                    alt={video.title}
                    className="h-full w-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white">
                      Video link is not connected yet
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          <aside className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl">
            <h2 className="text-xl text-slate-900 font-semibold mb-4">Resources</h2>
            <div className="space-y-3">
              <a
                href={course.pdfLink}
                download="01 Introduction to Probability.pdf"
                className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-slate-900 transition-colors hover:bg-slate-200"
              >
                <span className="inline-flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Download PDF lecture
                </span>
              </a>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-slate-700">
              The lecture list stays lightweight. Only the selected lecture page loads a video, and the player supports the
              YouTube full-screen button directly inside the embedded video.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
