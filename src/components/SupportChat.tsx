import { useEffect, useRef, useState } from "react";
import { Headset, MessageCircle, Send, X } from "lucide-react";

type Msg = { from: "agent" | "you"; text: string };

const REPLIES = [
  "Thanks — a specialist will pick this up shortly. Which model are you after?",
  "Noted. We can arrange a private viewing this week, weekdays or weekends.",
  "Every car comes with a full history check and a 12-month warranty.",
  "I'll email you the full spec sheet and finance options now.",
];

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "agent", text: "Welcome to Aurum Motors. How can we help today?" },
  ]);
  const turn = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [msgs, open]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setMsgs((m) => [...m, { from: "you", text }]);
    const reply = REPLIES[turn.current % REPLIES.length] ?? "Thanks — a specialist will be with you shortly.";
    turn.current += 1;
    setTimeout(() => setMsgs((m) => [...m, { from: "agent", text: reply }]), 700);
  };

  return (
    <div className="group fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="mb-1 flex h-96 w-80 flex-col overflow-hidden border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <Headset size={18} className="text-primary-foreground" />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary-foreground">
                Support Chat
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close support chat"
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "you" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={
                    m.from === "you"
                      ? "max-w-[80%] bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "max-w-[80%] border border-border bg-muted px-3 py-2 text-sm text-card-foreground"
                  }
                >
                  {m.text}
                </p>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message"
              aria-label="Message"
              className="min-w-0 flex-1 border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              onClick={send}
              aria-label="Send message"
              className="bg-primary p-2 text-primary-foreground hover:opacity-90"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 bg-primary px-4 py-3 text-primary-foreground shadow-2xl transition hover:opacity-90"
      >
        <Headset size={18} />
        <span className="text-[11px] font-semibold uppercase tracking-widest">Support Chat</span>
      </button>

      <button
        onClick={() => setOpen(true)}
        aria-label="Open live chat"
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-xl transition duration-200 hover:bg-primary hover:text-primary-foreground ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
        }`}
      >
        <MessageCircle size={20} />
      </button>
    </div>
  );
}
