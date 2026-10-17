# EDPIX architecture

Existing React/Vite/TypeScript app and Supabase Auth remain intact. Existing course, practice, mastery, profile, leaderboard and exam data paths are unchanged.

Shared design tokens live in src/edpix-theme.css. Brand changes do not rename stored keys or historical migration identifiers.

The new /app/tutor route uses a validated board model: bounded text cards with stable IDs and coordinates, notes and selected language. It renders text through React, never raw HTML. Undo holds 30 snapshots. Device saves are explicitly labelled and namespaced by account. They are not cloud persistence or assessment results.

Cloud saving is enabled by default after applying supabase/migrations/20261017072326_edpix_private_tutor_boards.sql and passing supabase/tests/edpix_tutor_rls.sql. VITE_TUTOR_CLOUD_ENABLED=false explicitly selects device-only mode. Boards are owned by auth.uid(); quota storage and quota RPC are service-role only. The edpix-tutor Edge Function verifies each JWT with getUser, enforces an atomic 30-request daily quota and calls Gemini using server-side GEMINI_API_KEY and GEMINI_MODEL. Input/output limits apply and malformed output cannot replace the board.

Frontend environment: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY; optional VITE_TUTOR_CLOUD_ENABLED (default true). Edge Function environment: Supabase built-in URL/anon/service-role values; GEMINI_API_KEY and GEMINI_MODEL. Never put a provider/service-role secret into VITE variables.

Remaining validation: real browser login/OTP, rate-limit concurrency, valid/expired JWT and one real provider generation. Ownership restrictions, anonymous denial and the sequential quota boundary passed; the Edge Function is deployed. Full live voice/document tutoring is a later integration and is not simulated here.
