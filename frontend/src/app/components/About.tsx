import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import aboutText from "../../imports/about.txt?raw";

type SectionEntry = { type: "paragraph" | "bullet"; text: string };

type AboutSection = {
  title: string;
  entries: SectionEntry[];
};

function formatSections(raw: string): AboutSection[] {
  const normalized = raw
    .replaceAll("\uFFFC", "")
    .split("\n")
    .map((line) => line.trimEnd());

  const sections: AboutSection[] = [];
  let currentSection: AboutSection | null = null;

  for (const line of normalized) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed === "⸻" || trimmed === "---") continue;

    const isHeading = !trimmed.endsWith(".") && !trimmed.endsWith(",");
    if (isHeading) {
      currentSection = { title: trimmed, entries: [] };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection) {
      currentSection = { title: "Overview", entries: [] };
      sections.push(currentSection);
    }

    if (trimmed.startsWith("* ")) {
      currentSection.entries.push({ type: "bullet", text: trimmed.slice(2) });
    } else {
      currentSection.entries.push({ type: "paragraph", text: trimmed });
    }
  }

  return sections;
}

export default function About() {
  const sections = formatSections(aboutText);

  return (
    <div className="relative min-h-screen p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-sm" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(56,189,248,0.14),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(99,102,241,0.12),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.46),rgba(2,6,23,0.68))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1650px]">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-100 transition-colors hover:bg-white/20 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-6 rounded-3xl border border-slate-300/15 bg-[#0b1226]/90 px-6 py-7 shadow-[0_28px_80px_rgba(2,6,23,0.65)] sm:px-9">
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-300">About Platform</p>
          <h1 className="mb-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">CS-GO</h1>
          <p className="max-w-4xl text-lg leading-8 text-slate-200/95">
            Student-industry platform for practical software development, project experience, and AI-supported learning.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[310px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-300/15 bg-[#111827]/88 p-6 shadow-[0_18px_48px_rgba(2,6,23,0.55)] xl:sticky xl:top-6 xl:h-fit">
            <h2 className="mb-4 text-lg font-semibold text-white">Quick Focus</h2>
            <div className="space-y-3 text-sm text-slate-200/95">
              <p>Connect students with real projects from small organizations.</p>
              <p>Build portfolios, teamwork, and career-readiness before graduation.</p>
              <p>Add AI-powered revision tools for faster practical learning.</p>
            </div>
          </aside>

          <div className="grid gap-5 xl:grid-cols-2">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-3xl border border-slate-300/12 bg-[#111827]/88 p-6 shadow-[0_16px_44px_rgba(2,6,23,0.5)]"
              >
                <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white">{section.title}</h3>
                <div className="space-y-3">
                  {section.entries.map((entry, index) => {
                    if (entry.type === "bullet") {
                      return (
                        <p key={`${section.title}-bullet-${index}`} className="pl-4 text-base leading-7 text-slate-200/95">
                          • {entry.text}
                        </p>
                      );
                    }

                    return (
                      <p key={`${section.title}-paragraph-${index}`} className="text-base leading-7 text-slate-200/95">
                        {entry.text}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
            {sections.length % 2 !== 0 ? <div className="hidden xl:block" /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
