# EDPIX delivery status

## Implemented
- Rebrand visible React screens to EDPIX while preserving database names, auth storage and URLs.
- Owner-supplied plum/lavender/mauve/blush palette, DM Sans/Manrope typography, matching particles and crystal colors.
- Existing routes retained; whiteboard route added with editable cards, coordinates, undo, notes, cloud save/resume, legacy device-draft recovery and JSON export.
- Authenticated AI endpoint source with server-only credentials, validated output and daily quota.

## Backend repair
- Supabase was INACTIVE, causing auth outages. Restored the project; health/settings now return HTTP 200, email signup enabled with confirmation required.
- Applied cloud board/usage migration, passed ownership and quota SQL tests and deployed authenticated tutor endpoint. Cloud board saving is now enabled.

## Blocked / not claimed complete
- Mail delivery and actual user login remain unverified end-to-end; no user password or OTP is available in this test environment.
- AI credentials GEMINI_API_KEY and GEMINI_MODEL have not been supplied/configured or live-tested. No mock AI response is displayed.
- Full document ingestion, realtime voice, stroke drawing, diagram connectors, synchronized speech/animation, moderation/usage admin and curriculum expansion remain unimplemented.
- Browser QA unavailable in this session. No authenticated end-to-end pass is claimed.
- React #185 was not reproduced. Repeated demo exam submission is now idempotent, but this is not evidence that it caused the reported error.
