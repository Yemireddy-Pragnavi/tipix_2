# EDPIX on Vercel

Vercel is installed. Deployment configuration is ready; no Vercel deployment has been verified yet.

Import the existing Yemireddy-Pragnavi/tipix_2 repository and use the reviewed fix/class11-learning-pilot branch. Framework Vite, build npm run build, output dist. vercel.json preserves deep links such as /app/tutor and /login.

Required build environment variables:
- VITE_SUPABASE_URL: existing project URL
- VITE_SUPABASE_PUBLISHABLE_KEY: existing public publishable key

Keep GEMINI_API_KEY, GEMINI_MODEL and service-role credentials in Supabase Edge Function secrets, never in Vercel VITE variables. The backend remains the existing Supabase project.

After Vercel assigns the production URL, update Supabase Auth Site URL and appropriate redirect allowlist to that exact URL; keep any currently used URL until migration is verified. Verify login, signup email, recovery, /app/courses direct reload and cloud board save/resume before announcing the Vercel launch. No Vercel deployment is claimed by this document.
