import { e as createComponent, g as addAttribute, l as renderHead, n as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_Bw4UisD-.mjs';
import 'piccolore';
import 'clsx';
/* empty css                             */
import Database from 'better-sqlite3';
import { join } from 'path';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="nl"> <head><meta charset="UTF-8"><meta name="description" content="ZeeZicht Content Aanlever Tool"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | ZeeZicht</title>${renderHead()}</head> <body class="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen"> <header class="bg-white border-b border-gray-200"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"> <a href="/" class="flex items-center gap-2 group"> <div class="w-8 h-8 rounded bg-brand-blue flex items-center justify-center text-white font-bold text-lg group-hover:bg-brand-blue-dark transition-colors">Z</div> <span class="font-semibold text-lg tracking-tight group-hover:text-brand-blue-dark transition-colors">ZeeZicht</span> </a> <nav class="flex items-center gap-2 sm:gap-6 text-sm font-medium"> <a href="/" class="text-gray-600 hover:text-brand-blue transition-colors px-3 py-2 rounded-md hover:bg-gray-50">Aanleveren</a> <a href="/dashboard" class="text-brand-blue bg-brand-blue-light hover:bg-blue-100 transition-colors px-3 py-2 rounded-md">Dashboard (Edra)</a> </nav> </div> </header> <main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-white border-t border-gray-200 py-6 mt-auto"> <div class="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ZeeZicht. Alle rechten voorbehouden.
</div> </footer> </body></html>`;
}, "/Users/jorikschut/Documents/Projecten-sites/Tools-SAAS/ZeeZicht Content Aanlever Tool/src/layouts/Layout.astro", void 0);

const dbPath = join(process.cwd(), "ideas.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS content_ideas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submitter TEXT NOT NULL,
    idea TEXT NOT NULL,
    hook TEXT,
    visuals TEXT,
    target_url TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export { $$Layout as $, db as d };
