# @omadia/plugin-llm-mistral

Adds **Mistral** as an admin-selectable LLM provider for [omadia](https://github.com/byte5ai/omadia). Mistral exposes an OpenAI-compatible Chat Completions API, so this is a **declarative provider plugin**: the provider and its models are described in `manifest.yaml` and registered by the omadia kernel at load time — there is no runtime provider code to maintain. Mistral is **EU-hosted (France)**, which matters for data-protection / compliance requirements.

> Requires omadia core with the LLM-provider-plugin seam (the manifest-driven
> `LlmProviderCatalog`). Older cores ignore the `llm_provider` manifest block.

## Models

| Model | Class | Context | Max output | Vision |
|-------|-------|--------:|-----------:|:------:|
| `mistral-large-latest` (Mistral Large 3) | frontier | 128,000 | 8,192 | yes |
| `mistral-medium-latest` (Mistral Medium 3.5) | balanced | 128,000 | 8,192 | yes |
| `mistral-small-latest` (Mistral Small 4) | fast | 128,000 | 8,192 | no |

One model per class, so no `class_default` is required.

## Install

1. Build the plugin: `npm install && npm run build` (produces `dist/plugin.js`).
2. Package `manifest.yaml` + `dist/` and install it into omadia (admin → install plugin, or via the registry).
3. On the admin **Providers** page, set the Mistral API key — it is stored in the vault under `provider:mistral/api_key` (same mechanism as the built-in OpenAI provider).
4. Assign Mistral (and a model) to a plugin such as the orchestrator on the Providers page.

## Configuration

| Setup field | Required | Default | Notes |
|-------------|:--------:|---------|-------|
| `mistral_base_url` | no | `https://api.mistral.ai/v1` | Override only if you front Mistral with a gateway. |

The API key is **not** a per-plugin setup secret — it is set centrally on the Providers page so the orchestrator (which reads the key from its own vault scope) can see it.

## Wire format

Mistral is OpenAI-compatible and needs **no quirks declaration**:

- It uses the legacy `max_tokens` field — exactly what core's OpenAI-compatible adapter emits by default for a non-`openai` provider id. No field remap needed.
- Standard `tool_choice` / `parallel_tool_calls` semantics, standard HTTP error signalling — nothing to override.

## Development

```bash
npm install
npm run typecheck   # tsc --noEmit (needs the omadia core contract built)
npm test            # validates the manifest + model invariants
npm run build
```
