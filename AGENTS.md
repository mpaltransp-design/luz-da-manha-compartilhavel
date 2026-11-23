<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Home theme photo cards derive covers from the existing category catalog and delegate selection to the home page, preserving URL filters and VIP access checks.
- Client-only state (favorites, VIP simulation, name, share counts) lives in localStorage via `src/lib/store.ts` (useSyncExternalStore); no backend yet, so the app works offline-first without login.
- The message catalog is static data in `src/lib/messages.ts`; photos and prayer audio are Lovable Assets pointers under `src/assets/`; per-message prayers live in `src/assets/oracoes/<message-id>.mp3.asset.json` and `src/lib/prayers.ts` falls back to the general prayer.
- VIP purchase opens `VITE_HOTMART_CHECKOUT_URL` when set; otherwise it unlocks VIP locally for testing.
- Artwork greetings are defined in `src/lib/artwork.ts` and reused on screen and in canvas exports to keep category salutations consistent.
- Prepare image files before sharing clicks to retain native user activation; WhatsApp URL fallback downloads the attachment separately and never navigates the app iframe.
- Keep prayer recording texts, synthesis settings and the shared background-music mix settings in a versioned manifest; upload only the music-mixed output; render one recording per CLI call and replace asset pointers only after every recording validates, so the catalog uses one consistent voice without partial updates.
