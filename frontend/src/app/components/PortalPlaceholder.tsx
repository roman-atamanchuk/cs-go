import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

type PortalPlaceholderProps = {
  title: string;
  description: string;
  badge: string;
};

export default function PortalPlaceholder({
  title,
  description,
  badge,
}: PortalPlaceholderProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1648737851199-585cfd98c13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)",
        }}
      />
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-3xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            {badge}
          </div>
          <h1 className="mb-3 text-3xl tracking-tight text-slate-900">{title}</h1>
          <p className="max-w-2xl text-slate-600">{description}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <h2 className="mb-2 text-slate-900">Frontend Note</h2>
              <p className="text-sm text-slate-600">
                This page is linked from the main Figma dashboard, so the route now works and keeps the same visual style.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-5">
              <h2 className="mb-2 text-slate-900">Next Step</h2>
              <p className="text-sm text-slate-600">
                We can replace this placeholder with the exact Figma design for this page once you want to move past the main screen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
