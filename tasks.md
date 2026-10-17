# EDPIX delivery status

## Implemented
- Rebrand visible React screens to EDPIX while preserving database names, auth storage and URLs.
- Owner-supplied plum/lavender/mauve/blush palette, DM Sans/Manrope typography, matching particles and crystal colors.
- Existing routes retained; whiteboard route added with editable cards, coordinates, undo, notes, device save and JSON export.
- Authenticated AI endpoint source with server-only credentials, validated output and daily quota.

## Blocked / not claimed complete
- Supabase SQL endpoint timed out twice on 17 October. New storage/usage schema could not be confirmed/applied. SQL is in supabase/pending. Do not enable VITE_TUTOR_CLOUD_ENABLED until migration, RLS tests and function deployment pass.
- AI credentials GEMINI_API_KEY and GEMINI_MODEL have not been supplied/configured or live-tested. No mock AI response is displayed.
- Full document ingestion, realtime voice, stroke drawing, diagram connectors, synchronized speech/animation, moderation/usage admin and curriculum expansion remain unimplemented.
- Browser QA unavailable in this session. No authenticated end-to-end pass is claimed.
- React #185 was not reproduced. Repeated demo exam submission is now idempotent, but this is not evidence that it caused the reported error.
