<div align="center">

# @omadia/plugin-llm-mistral

### Run your omadia agents on Mistral, hosted in the EU.

A signed omadia plugin that adds Mistral as a provider you pick on the admin Providers page. Mistral is hosted in the EU (France), so there is no third-country transfer for the prompt data. Declarative: no runtime code, the model catalog ships in the manifest.

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)
[![Built for omadia](https://img.shields.io/badge/built%20for-omadia-2496ED.svg)](https://github.com/byte5ai/omadia)
[![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[**Main repo**](https://github.com/byte5ai/omadia) · [**Website**](https://omadia.ai) · [**Plugin hub**](https://hub.omadia.ai) · [**Models**](#models) · [**Install**](#install)

🇩🇪 Diese Anleitung gibt es auch [auf Deutsch](./README.de.md).

</div>

---

omadia is a self-hostable agentic OS: compose multi-agent teams from signed plugins, run them on your own machine, and get an auditable trail for every action. This plugin makes Mistral one of the LLM providers those agents can run on. Mistral is hosted in the EU (France), so the prompt data stays in the EU with no third-country transfer. Main repo: [byte5ai/omadia](https://github.com/byte5ai/omadia).

## Models

| Model | Class |
| --- | --- |
| Mistral Large 3 | frontier |
| Mistral Medium 3.5 | balanced |
| Mistral Small 4 | fast |

Agents ask for a class (`fast`, `balanced`, `frontier`). omadia maps the class to the model, so an agent never hard-codes one.

## How it works in omadia

A declarative provider plugin, so it ships no runtime provider code. The omadia kernel reads the `llm_provider` block from `manifest.yaml` (id, base URL, models) when the plugin loads, before any agent activates, and registers it in the provider catalog. Mistral speaks the OpenAI-compatible wire format, so omadia drives it through its built-in OpenAI-compatible adapter. The manifest flags the provider as EU-hosted, so the admin Providers page shows the matching data-protection note.

## Install

1. Install from the [plugin hub](https://hub.omadia.ai) in the omadia admin UI (Store, Upload), or drop the built ZIP in directly.
2. On the admin Providers page, paste your Mistral API key. omadia stores it encrypted in the vault under `provider:mistral/api_key`.
3. Assign Mistral and a model to an agent: the orchestrator, a sub-agent, or the verifier.

## Configuration

| Setup field | Required | Default | Notes |
| --- | :---: | --- | --- |
| `mistral_base_url` | no | `https://api.mistral.ai/v1` | Point at a Mistral-compatible gateway if you route through one. |

The key is set centrally on the Providers page, not per plugin, so the orchestrator reads it from the shared vault scope.

## Build from source

```bash
npm install
npm run build   # tsc, emits dist/
npm test        # validates manifest.yaml against core's invariants
```

`@omadia/plugin-api` and `@omadia/llm-provider` are provided by the omadia host at runtime (optional peer deps). Link them from a local omadia checkout to build. See [byte5ai/omadia](https://github.com/byte5ai/omadia) for the layout.

## License

[MIT](LICENSE), byte5 GmbH