# @omadia/plugin-llm-mistral

Adds Mistral models (flagship Mistral Large 3) as an LLM you can assign to any agent in omadia. Mistral is hosted in the EU (France), so there is no third-country transfer for the prompt data.

omadia is a self-hostable agentic OS: you build, run, and audit multi-agent AI teams from signed plugins, and you bring your own LLM key. Main repo: [byte5ai/omadia](https://github.com/byte5ai/omadia). This plugin makes Mistral one of the providers an operator can pick on the admin Providers page.

## Models

| Model | Class |
|-------|-------|
| Mistral Large 3 | frontier |
| Mistral Medium 3.5 | balanced |
| Mistral Small 4 | fast |

Agents request a class (`fast` / `balanced` / `frontier`). omadia resolves the class to the concrete model.

## How it works in omadia

This is a declarative provider, so it ships no runtime provider code. The `llm_provider` block in `manifest.yaml` (id, base URL, models, EU-hosting policy) is read by the omadia kernel when the plugin loads, before any agent activates, and registered into the kernel's provider catalog. Mistral uses the OpenAI-compatible Chat Completions API, so omadia's built-in OpenAI-compatible adapter drives the calls. The manifest flags the provider as EU-hosted, so the admin Providers page shows the matching data-protection note.

## Install

Install from the omadia hub at [hub.omadia.ai](https://hub.omadia.ai) (omadia admin, plugins, install), or upload the built ZIP directly.

After install:

1. On the admin Providers page, paste your Mistral API key. It is stored encrypted under `provider:mistral/api_key`.
2. Assign Mistral and a model to an agent.

## Configuration

| Setup field | Required | Default | Notes |
|-------------|:--------:|---------|-------|
| `mistral_base_url` | no | `https://api.mistral.ai/v1` | Override for a Mistral-compatible gateway. |

The API key is set centrally on the Providers page, not as a per-plugin secret.

## Build from source

```bash
npm install
npm run build   # tsc, emits dist/
npm test        # validates manifest.yaml against core's invariants
```

The plugin compiles against omadia workspace packages (`@omadia/plugin-api`, `@omadia/llm-provider`), declared as optional peer deps. Link them from a local omadia checkout before building. See [byte5ai/omadia](https://github.com/byte5ai/omadia).

## License

MIT, byte5 GmbH
