# HANDOFF
retrieved: 2026-08-29
path: vendor/kept/_out/
packages: 33/33 PASS, remaining 0
wave: WAVE-501 US AUDIT PASS
next: ANL Grok Build wiring. CoS does not start Grok Build. Do not merge into live gevradio. Do not edit src/ or kits from this handoff.

## Files
- atlas.json — country/place atlas. WAVE-1. 38842 bytes.
- capitals.json — capital points. WAVE-2. 63816 bytes.
- permit-index.json — global permit index. WAVE-3. 1477 bytes.
- packages/_index.json — package inventory rebuilt from disk. 33 kit_on_disk rows, remaining 0, last_audit PACKAGE-TZ PASS. 11074 bytes.
- packages/{iso}.json — per-country kit package (object counts and holes). 33 files. Format is the US stack. Other countries from their own operations, not US AHJs.
- packages/{iso}-permit.json — per-country permit counts and holes. 33 files. Country-native catalogs may be zero.
- packages/{iso}-fill.json — ingest-drop fill record. 12 files: us ca kr gb de br ua fr cn it tw pl. No ng/tr/mx fill.
- 501-links.json — US public-filing graph. iso2 us. nodes 199, edges 215 (fec 186, usaspending 29), holes 17. WAVE-501 PASS. 125973 bytes.
- AUDIT.md — current-wave audit only.
- AUDIT-LOG.md — append-only audit log across waves.
- FEED-AUDIT.md — feed-wave audit of atlas/capitals/permit-index and src-not-touched. 1027 bytes.
- STATUS.md — current wave only.

No kit dumps. No names. No secrets. No host-runbook.
