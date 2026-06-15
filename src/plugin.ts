/**
 * @omadia/plugin-llm-mistral — entry point.
 *
 * Mistral is an OpenAI-compatible provider, so it needs NO runtime provider
 * code: the kernel reads the `llm_provider` block from this plugin's
 * `manifest.yaml` at manifest-load time and registers Mistral (id, baseURL,
 * models) into the kernel-owned `LlmProviderCatalog` BEFORE any plugin
 * activates. That ordering is what lets the orchestrator resolve a Mistral
 * provider at its own activation regardless of plugin load order.
 *
 * `activate()` therefore only performs an optional sanity log — the provider is
 * already live by the time we get here. The operator supplies the API key via
 * the admin Providers page (vault key `provider:mistral/api_key`).
 */
import type { PluginContext } from '@omadia/plugin-api';

export interface MistralPluginHandle {
  close(): Promise<void>;
}

export async function activate(
  ctx: PluginContext,
): Promise<MistralPluginHandle> {
  ctx.log(
    '[plugin-llm-mistral] active — Mistral provider declared in manifest; ' +
      'set the API key on the admin Providers page (provider:mistral/api_key).',
  );
  return {
    async close(): Promise<void> {
      ctx.log('[plugin-llm-mistral] deactivating');
    },
  };
}
