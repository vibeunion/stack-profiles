# desktop-electron

Use this profile only when the product needs desktop capabilities such as filesystem access, multiple windows, tray controls, device integration, or long-running local work.

- Build the renderer with Vite and Vue; do not use Nuxt for the desktop shell.
- Keep Node and Electron APIs in the main process and a narrow preload bridge.
- Do not expose arbitrary IPC, filesystem, shell, or service-role access to the renderer.
- Keep business API calls in a renderer-safe service layer.
