# backend-supacloud

Attach this capability to an application that uses SupaCloud beyond the normal data-client boundary: background tasks, Queues, Durable Workflows, transactional commands, immutable artifacts, or trusted platform management.

It is an optional backend capability, not a primary application profile. Select exactly one primary profile under `profiles/`, then declare the capability in the consuming application's stack manifest or agent context:

```json
{
  "primaryProfile": "web-sveltekit",
  "capabilities": ["backend-supacloud"]
}
```

The capability defines portable architecture and security boundaries. Product-specific directory names, business domains, state machines, data retention, and deployment targets remain in the application repository.

For a public SvelteKit application, this capability keeps the backend boundary
explicit: SvelteKit owns the browser/SSR surface, while Bun + Elysia /
`@supacloud/elysia` owns domain APIs, workers, orchestration, and durable
side effects.

For detailed platform contracts, consult the SupaCloud documentation for Background Functions, Durable Workflows, and Application Platform Primitives.
