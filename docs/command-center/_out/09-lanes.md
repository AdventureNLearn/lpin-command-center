# Lanes panel (in-app spec)

**Product:** LPIN · **Tree:** `sandbox/work/groks-eye-view-next` · **D-272**  
Collision-sense **on**. Agent cap **off** (ops may spawn; glass never says agents).  
Public HUD: **Lanes**, not agents / swarm / seats. Kernel: `src/lib/lin/protocol.ts`.

## Now vs this panel

`research <topic>` already opens Network and stores a device-local topic. Desks attach URL+quote. `collisionsFromSources` exists; **no Lanes panel, no arm/run, no collision list on glass.**

## Surface

One drawer section (or Network subpanel) titled **Lanes**. Commands: `open lanes` · `arm lanes` · `run lanes`. Globe stays up. No new homepage. No iframe.

Requires a current topic (`useLin.topic`). Empty topic → idle rows, no run.

## Ten sense lanes

| Lane (HUD) | Desk |
|------------|------|
| Statute | legal |
| Rule | regulatory |
| Feed | technical |
| Stack | jurisdictional |
| Field | operational |
| Infra | engineering |
| Money | commerce |
| Roster | governance |
| Fifty | fifty |
| Cells | opencells |

State per lane: `idle` → `armed` → `done`. Arm = selected for this topic. Run = open that desk against the same topic (notes + attach stay on the desk). Done = that desk has ≥1 valid source **or** operator marks done. Parallel arm is allowed (cap lifted). Isolated pulls; Coordinator still one writer per `src/` file.

Controls: Arm / Disarm per row · **Run armed** · **Arm all** / **Clear arms**. Running does not mint Supported.

## Collision list

After any attach, list `collisionsFromSources(sources)` for this topic:

- Same URL (trim, lower) in **≥2 desks**
- Same quote (trim, lower, first 80 chars, length ≥12) in **≥2 desks**

Each hit: kind, key, lane/desk ids, hint **“Association, not Supported.”** Collision is a flag, not a merge, not a score. Human final call. Quote without URL stays not Supported (`sourceValid`).

## Public copy

Say LPIN. Say lanes. Kickers stay desk labels (Legal, Regulatory, …). Do not print agent, swarm, skill brands, or the 15-seat roster on the HUD, cards, or X.

## Done-when

Topic named → arm ≥1 lane → run opens that desk → attach URL+quote → collision list updates live → same URL/quote on two desks shows Association, not Supported.
