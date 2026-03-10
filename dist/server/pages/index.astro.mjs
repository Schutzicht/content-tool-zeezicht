import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_Bw4UisD-.mjs';
import 'piccolore';
import { d as db, $ as $$Layout } from '../chunks/db_DGQiucG3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let successMessage = "";
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const submitter = data.get("submitter");
      const idea = data.get("idea");
      const hook = data.get("hook");
      const visuals = data.get("visuals");
      const targetUrl = data.get("targetUrl");
      if (!submitter || !idea) {
        throw new Error("Naam en idee zijn verplicht.");
      }
      const stmt = db.prepare(`
      INSERT INTO content_ideas (submitter, idea, hook, visuals, target_url)
      VALUES (?, ?, ?, ?, ?)
    `);
      stmt.run(submitter, idea, hook || null, visuals || null, targetUrl || null);
      successMessage = "Jouw idee is succesvol ingediend! Edra neemt het vanaf hier over.";
    } catch (error) {
      errorMessage = error.message || "Er is een fout opgetreden bij het indienen.";
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Content Idee Aanleveren" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl mx-auto"> <div class="mb-8 text-center"> <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">Content Idee Aanleveren</h1> <p class="text-gray-600">Geef je LinkedIn post ideeën door voor je persoonlijke profiel, gekoppeld aan ZeeZicht.</p> </div> ${successMessage && renderTemplate`<div class="mb-6 p-4 rounded-md bg-green-50 border border-green-200 text-green-800 flex items-start gap-3"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-0.5 text-green-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg> <p class="font-medium">${successMessage}</p> </div>`} ${errorMessage && renderTemplate`<div class="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 flex items-start gap-3"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-0.5 text-red-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg> <p class="font-medium">${errorMessage}</p> </div>`} <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"> <form method="POST" class="p-6 sm:p-8 space-y-6"> <div> <label for="submitter" class="block text-sm font-semibold text-gray-700 mb-1">Wie ben je? *</label> <select id="submitter" name="submitter" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue-light focus:ring-opacity-50 py-2.5 px-3 border bg-white"> <option value="" disabled selected>Selecteer je naam</option> <option value="Jorian">Jorian</option> <option value="Ruben">Ruben</option> <option value="Jorik">Jorik</option> </select> </div> <div> <label for="idea" class="block text-sm font-semibold text-gray-700 mb-1">Wat is je content idee? *</label> <p class="text-xs text-gray-500 mb-2">Omschrijf kort waar de post over moet gaan.</p> <textarea id="idea" name="idea" required rows="4" class="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue-light focus:ring-opacity-50 border p-3" placeholder="Bijv. Een post over de nieuwe lancering van project X..."></textarea> </div> <div> <label for="hook" class="block text-sm font-semibold text-gray-700 mb-1">Haakje (Optioneel)</label> <p class="text-xs text-gray-500 mb-2">Aan welke actualiteit, nieuwsartikel of evenement kunnen we dit koppelen?</p> <input type="text" id="hook" name="hook" class="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue-light focus:ring-opacity-50 py-2.5 px-3 border" placeholder="Bijv. Artikel op nu.nl over de Zeeuwse huizenmarkt"> </div> <div> <label for="visuals" class="block text-sm font-semibold text-gray-700 mb-1">Visuals / Afbeeldingen weergave (Optioneel)</label> <p class="text-xs text-gray-500 mb-2">Heb je specifieke visuals in gedachten? Voeg een linkje toe naar Google Drive o.i.d.</p> <input type="text" id="visuals" name="visuals" class="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue-light focus:ring-opacity-50 py-2.5 px-3 border" placeholder="Link naar de foto(s) of drive map"> </div> <div> <label for="targetUrl" class="block text-sm font-semibold text-gray-700 mb-1">Doel URL ZeeZicht (Optioneel)</label> <p class="text-xs text-gray-500 mb-2">Welke pagina op zeezicht.nl willen we in de post of in de comments noemen?</p> <input type="url" id="targetUrl" name="targetUrl" class="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue-light focus:ring-opacity-50 py-2.5 px-3 border" placeholder="https://zeezicht.nl/..."> </div> <div class="pt-4"> <button type="submit" class="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-medium py-3 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue">
Idee Indienen
</button> </div> </form> </div> </div> ` })}`;
}, "/Users/jorikschut/Documents/Projecten-sites/Tools-SAAS/ZeeZicht Content Aanlever Tool/src/pages/index.astro", void 0);

const $$file = "/Users/jorikschut/Documents/Projecten-sites/Tools-SAAS/ZeeZicht Content Aanlever Tool/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
