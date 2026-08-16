# cross-platform-mpx

Use this profile for one public business client that targets WeChat mini-program, H5, and React Native.

- Use Mpx and Mpx2RN for pages, business state, and platform adapters.
- Use UnoCSS. Do not add Tailwind CSS, Nuxt UI, Capacitor, or Electron.
- Use `supabase-mp-js` instead of importing `@supabase/supabase-js` directly in application runtime code.
- Keep selectors simple and use platform-specific conditional compilation only for narrow incompatibilities.
- Send write operations through RPC, Edge Functions, or another trusted server command. Do not rely on default PostgREST PATCH behavior in the WeChat adapter.
- Treat mpx-cube-ui as a mini-program and H5 layer; verify React Native compatibility before adopting a component in shared UI.
