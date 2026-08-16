# VibeUnion Stack Profiles

[English](#english) | [中文](#中文)

---

<a id="english"></a>

## English

AI-readable technology choices for VibeUnion applications. A profile fixes the stack, package boundaries, backend integration, and minimum verification for one application surface.

This repository is not a collection of product Skills. Individual products own their own Skills, such as SupaCloud deployment or svadmin administration. Stack Profiles answer a different question: **which technologies may an AI use for this application, and what must it not mix in?**

### Choose a profile

| Application surface | Profile | Fixed stack |
| --- | --- | --- |
| Public web, SEO, content, customer portal | [`web-nuxt`](./profiles/web-nuxt/) | Nuxt, Vue, TypeScript, Tailwind CSS, Nuxt UI |
| WeChat mini-program, H5, iOS, Android | [`cross-platform-mpx`](./profiles/cross-platform-mpx/) | Mpx, Mpx2RN, TypeScript, UnoCSS, mpx-cube-ui, supabase-mp-js |
| Operator desktop tool | [`desktop-electron`](./profiles/desktop-electron/) | Electron, Vite, Vue, TypeScript, Tailwind CSS |
| Internal operations and backoffice | [`admin-svadmin`](./profiles/admin-svadmin/) | svadmin, Svelte, TypeScript, SupaCloud adapter |

All profiles use SupaCloud Lite for local work where applicable and the full SupaCloud platform for managed production infrastructure.

### Use with an AI coding agent

1. Select exactly one primary profile for each app.
2. Give the agent [`AGENTS.md`](./AGENTS.md) and the selected `profile.json` before it edits code.
3. The agent must not introduce packages listed in `forbidden` without an explicit profile change.
4. Share contracts, types, API boundaries, and design tokens across apps. Do not force UI components across different rendering platforms.
5. Run `npm run check` after changing a profile.

### Repository layout

```text
AGENTS.md                         # Instructions for coding agents
profiles/<id>/profile.json        # Machine-readable stack contract
profiles/<id>/README.md           # Human-readable rationale and operating rules
schemas/stack-profile.schema.json # Contract shape
scripts/check-profiles.mjs        # Dependency-free consistency check
```

---

<a id="中文"></a>

## 中文

面向 VibeUnion 应用的 AI 可读取技术选型规范。每个 Profile 固定一个应用端的技术栈、包边界、后端接入方式和最低验收要求。

本仓库不是产品 Skill 的集合。SupaCloud、svadmin 等产品仍各自维护自己的 Skill；Stack Profile 解决的是另一个问题：**AI 在这个应用里可以使用哪些技术，又不能混入哪些技术。**

### 选择 Profile

| 应用端 | Profile | 固定技术栈 |
| --- | --- | --- |
| 官网、SEO、内容页、用户门户 | [`web-nuxt`](./profiles/web-nuxt/) | Nuxt、Vue、TypeScript、Tailwind CSS、Nuxt UI |
| 微信小程序、H5、iOS、Android | [`cross-platform-mpx`](./profiles/cross-platform-mpx/) | Mpx、Mpx2RN、TypeScript、UnoCSS、mpx-cube-ui、supabase-mp-js |
| 运营桌面工具 | [`desktop-electron`](./profiles/desktop-electron/) | Electron、Vite、Vue、TypeScript、Tailwind CSS |
| 内部运营与后台 | [`admin-svadmin`](./profiles/admin-svadmin/) | svadmin、Svelte、TypeScript、SupaCloud 适配器 |

各 Profile 在适用时使用 SupaCloud Lite 进行本地开发，并使用完整 SupaCloud 平台承载受管生产基础设施。

### 与 AI 编程 Agent 配合

1. 每个应用只能选择一个主 Profile。
2. Agent 修改代码前，先提供根目录 [`AGENTS.md`](./AGENTS.md) 和对应的 `profile.json`。
3. 未经明确修改 Profile，Agent 不得引入 `forbidden` 中的依赖。
4. 跨应用共享契约、类型、API 边界和设计令牌，不强行共享不同渲染平台的 UI 组件。
5. 修改 Profile 后运行 `npm run check`。

## License

MIT
