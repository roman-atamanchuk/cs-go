import { Link } from "react-router";
import { Search, Send, Circle } from "lucide-react";

const mockUsers = [
  { name: "Aisling Murphy", status: "Online", course: "CS Year 2" },
  { name: "Liam O'Connor", status: "Online", course: "CS Year 4" },
  { name: "Niamh Walsh", status: "Away", course: "Software Dev" },
  { name: "Cian Byrne", status: "Online", course: "Data Analytics" },
  { name: "Emma Doyle", status: "Offline", course: "CS Year 1" },
  { name: "Conor Keane", status: "Online", course: "Cybersecurity" },
  { name: "Saoirse Ryan", status: "Away", course: "CS Year 3" },
];

const mockMessages = [
  { from: "Aisling Murphy", text: "Hi team, are we meeting for Probability revision at 6pm?" },
  { from: "You", text: "Yes, let's do it. I can share the exam-mode slides." },
  { from: "Liam O'Connor", text: "Great. I will bring Q2 Poisson examples too." },
  { from: "Niamh Walsh", text: "Can someone post the 2023 paper link in chat?" },
  { from: "You", text: "Sure, I’ll upload it in 2 minutes." },
];

function statusColor(status: string) {
  if (status === "Online") return "text-emerald-400";
  if (status === "Away") return "text-amber-400";
  return "text-slate-500";
}

export default function StudentChat() {
  return (
    <div className="min-h-screen relative px-6 py-5">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1648737851199-585cfd98c13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)' }}
      />
      <div className="absolute inset-0 bg-slate-900/88 backdrop-blur-sm" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white transition-colors mb-4">
          Back
        </Link>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-950/50 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_320px] min-h-[78vh]">
          <section className="p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-slate-700/60">
            <div className="mb-5">
              <h1 className="text-3xl text-white font-semibold tracking-tight">Student Chat</h1>
              <p className="text-slate-300 mt-1">Mock local chat for student collaboration</p>
            </div>

            <div className="rounded-xl border border-slate-700/60 bg-slate-900/55 p-4 space-y-3 h-[58vh] overflow-y-auto">
              {mockMessages.map((message, index) => {
                const mine = message.from === "You";
                return (
                  <div key={`${message.from}-${index}`} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[84%] rounded-xl px-4 py-3 ${
                        mine ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-100 border border-slate-700/70"
                      }`}
                    >
                      <p className={`text-xs mb-1 ${mine ? "text-indigo-100" : "text-slate-400"}`}>{message.from}</p>
                      <p>{message.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2 flex items-center gap-2">
              <input
                readOnly
                value="Type message... (mock page)"
                className="bg-transparent text-slate-300 w-full outline-none"
                aria-label="Chat input mock"
              />
              <button
                type="button"
                className="w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center text-white"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </section>

          <aside className="p-5 lg:p-6 bg-slate-950/65">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-semibold">Users</h2>
              <span className="text-xs text-slate-300 px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
                {mockUsers.length}
              </span>
            </div>

            <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2 flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                readOnly
                value="Search users... (mock)"
                className="bg-transparent text-slate-400 text-sm w-full outline-none"
                aria-label="Search users mock"
              />
            </div>

            <div className="space-y-2 max-h-[62vh] overflow-y-auto pr-1">
              {mockUsers.map((user) => (
                <div
                  key={user.name}
                  className="rounded-xl border border-slate-700/60 bg-slate-900/80 px-3 py-3 hover:border-slate-500/80 transition-colors"
                >
                  <p className="text-white font-medium leading-tight">{user.name}</p>
                  <p className="text-slate-400 text-sm mt-1">{user.course}</p>
                  <div className={`mt-2 flex items-center gap-1 text-xs ${statusColor(user.status)}`}>
                    <Circle className="w-3 h-3 fill-current" />
                    <span>{user.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
