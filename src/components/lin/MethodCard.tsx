import { methodFor } from "@/lib/lin/methods";

export function MethodCard({ id }: { id: string }) {
  const m = methodFor(id);
  return (
    <div className="space-y-2 text-sm">
      <p className="kicker">How this desk works</p>
      <p className="text-xs">{m.for}</p>
      <ol className="list-decimal space-y-1 pl-4 text-xs">
        {m.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p className="text-xs text-muted">Done when: {m.done}</p>
      <p className="text-xs text-subtle">{m.not}</p>
    </div>
  );
}
