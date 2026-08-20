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

### Optional capabilities

Capabilities add cross-cutting constraints without becoming a second application profile. [`backend-supacloud`](./capabilities/backend-supacloud/) defines the architecture, security, migration, Function, worker, and verification rules for applications that use SupaCloud background tasks, Queues, Durable Workflows, transactional commands, immutable artifacts, or trusted management APIs.

### Use with an AI coding agent

1. Select exactly one primary profile for each app.
2. Add only the capabilities the application actually adopts, such as `backend-supacloud`.
3. Give the agent [`AGENTS.md`](./AGENTS.md), the selected `profile.json`, and selected capability documents before it edits code.
4. The agent must not introduce packages listed in `forbidden` without an explicit profile change.
5. Share contracts, types, API boundaries, and design tokens across apps. Do not force UI components across different rendering platforms.
6. Run `npm run check` after changing a profile or capability.

### Repository layout

```text
AGENTS.md                         # Instructions for coding agents
profiles/<id>/profile.json        # Machine-readable stack contract
profiles/<id>/README.md           # Human-readable rationale and operating rules
capabilities/<id>/capability.json # Machine-readable additive capability contract
capabilities/<id>/README.md       # Human-readable capability rules
schemas/stack-profile.schema.json # Contract shape
schemas/stack-capability.schema.json # Capability contract shape
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

### 可选能力

Capability 用于补充跨领域约束，不是第二个应用 Profile。[`backend-supacloud`](./capabilities/backend-supacloud/) 为使用 SupaCloud 后台任务、队列、Durable Workflow、事务命令回执、不可变制品或可信管理 API 的应用定义架构、安全、迁移、Function、Worker 和验证规则。

### 与 AI 编程 Agent 配合

1. 每个应用只能选择一个主 Profile。
2. 只为应用实际采用的能力添加 Capability，例如 `backend-supacloud`。
3. Agent 修改代码前，先提供根目录 [`AGENTS.md`](./AGENTS.md)、对应的 `profile.json` 和已选择的 Capability 文档。
4. 未经明确修改 Profile，Agent 不得引入 `forbidden` 中的依赖。
5. 跨应用共享契约、类型、API 边界和设计令牌，不强行共享不同渲染平台的 UI 组件。
6. 修改 Profile 或 Capability 后运行 `npm run check`。

## License

MIT
