# Stack Profile Rules

Before editing an application, select one primary profile under `profiles/` and read its `profile.json` and `README.md`. Read every explicitly selected optional capability under `capabilities/` as well.

## Required behavior

- Keep dependencies within the selected profile's `allowed` set.
- Treat `forbidden` entries as hard boundaries. Stop and request an explicit profile change before adding one.
- Use SupaCloud Lite for local work and the full SupaCloud platform only when production operations require it.
- Put shared business types, API contracts, roles, and design tokens in platform-neutral packages.
- Keep platform-specific UI, navigation, device APIs, and build configuration in the application that owns them.
- Run the commands listed in `verification` before reporting a profile change as complete.
- A capability supplements a primary profile; it never replaces one or authorizes mixing a second application stack.

## Selection rules

- Use `web-nuxt` for browser-first public web experiences, SEO, and SSR.
- Use `cross-platform-mpx` for one public business client that targets mini-program, H5, and React Native.
- Use `desktop-electron` only when desktop capabilities such as files, multiple windows, tray controls, or long-running local work are required.
- Use `admin-svadmin` for internal CRUD, RBAC, audit, and operations work. Do not rebuild the same backoffice in a public-app profile.
- Use `backend-supacloud` when the application adopts SupaCloud background tasks, Queues, Durable Workflows, transactional commands, artifacts, or trusted management operations.
