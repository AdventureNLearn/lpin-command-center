import { sealInsight } from "@/lib/intel/honesty";
import { useIntel } from "@/lib/intel/store";
import type { LinDesk } from "@/lib/lin/network";
import { useLin } from "@/lib/lin/session";

export function openLinDesk(d: LinDesk) {
  const s = useIntel.getState();
  const topic = useLin.getState().topic;
  s.setDesk({ system: "lin", id: d.id });
  s.setInsight(
    sealInsight({
      id: `lin-${d.id}`,
      title: topic || d.title,
      body: topic
        ? `${d.kicker}: “${topic}”. Add an official link before you treat it as proven.`
        : d.field,
      system: "lin",
      desk: { system: "lin", id: d.id },
      q: topic || undefined,
      source: "Local network · delayed",
    }),
  );
}
