# web-sveltekit

Use this profile for public browser applications that need SvelteKit routing,
SSR, SEO, content routes, or a customer portal.

- This profile owns the browser and SSR surface. It does not replace the
  application backend.
- For VibeUnion applications, keep domain APIs, workers, orchestration, and
  durable side effects in Bun + Elysia / `@supacloud/elysia`, and attach the
  `backend-supacloud` capability.
- Use SvelteKit load functions, form actions, and server routes for
  browser-facing SSR and thin BFF concerns only. Do not move the Elysia
  domain runtime into page components or ad hoc SvelteKit endpoints.
- Use Svelte 5 runes and the existing SvelteKit component conventions. Do not
  introduce a second frontend framework or a second application store.
- Use Tailwind CSS for styling and `@supabase/supabase-js` for browser-facing
  SupaCloud access.
- Keep service-role credentials and privileged writes on server routes or Edge
  Functions.
- Use `@sveltejs/adapter-cloudflare` only when the deployment target is
  Cloudflare; keep deployment-specific code at the application boundary.
