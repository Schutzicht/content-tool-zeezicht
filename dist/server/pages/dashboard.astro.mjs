import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_Bw4UisD-.mjs';
import 'piccolore';
import { d as db, $ as $$Layout } from '../chunks/db_DGQiucG3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const id = data.get("id");
      const action = data.get("action");
      const newStatus = data.get("status");
      if (id && action === "delete") {
        const stmt2 = db.prepare("DELETE FROM content_ideas WHERE id = ?");
        stmt2.run(id);
      } else if (id && action === "update_status" && newStatus) {
        const stmt2 = db.prepare("UPDATE content_ideas SET status = ? WHERE id = ?");
        stmt2.run(newStatus, id);
      }
    } catch (err) {
      console.error("Action failed:", err);
    }
  }
  const stmt = db.prepare("SELECT * FROM content_ideas ORDER BY created_at DESC");
  const ideas = stmt.all();
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard - Edra" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8 flex items-center justify-between flex-wrap gap-4"> <div> <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">Dashboard (Edra)</h1> <p class="text-gray-600">Overzicht van alle ingediende content ideeën.</p> </div> <div class="flex gap-4"> <div class="bg-white rounded-lg border border-gray-200 px-4 py-2 text-center min-w-[100px]"> <div class="text-xs text-gray-500 uppercase tracking-wider font-medium">Totaal</div> <div class="text-2xl font-bold text-gray-900">${ideas.length}</div> </div> <div class="bg-white rounded-lg border border-gray-200 px-4 py-2 text-center min-w-[100px]"> <div class="text-xs text-green-600 uppercase tracking-wider font-medium">Klaar</div> <div class="text-2xl font-bold text-gray-900">${ideas.filter((i) => i.status === "done").length}</div> </div> </div> </div> ${ideas.length === 0 ? renderTemplate`<div class="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 flex flex-col items-center"> <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> </div> <p class="text-lg font-medium text-gray-900">Nog geen ideeën ingediend</p> <p class="text-gray-500 mt-1">De mannen moeten aan het werk!</p> </div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${ideas.map((idea) => renderTemplate`<div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-md"> <div class="border-b border-gray-100 p-4 bg-gray-50 flex items-start justify-between gap-2"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-full bg-brand-blue-light text-brand-blue flex items-center justify-center font-bold shrink-0"> ${idea.submitter.charAt(0)} </div> <div class="min-w-0"> <p class="font-semibold text-gray-900 truncate">${idea.submitter}</p> <p class="text-xs text-gray-500">${formatDate(idea.created_at)}</p> </div> </div> <form method="POST" class="inline shrink-0"> <input type="hidden" name="id"${addAttribute(idea.id, "value")}> <input type="hidden" name="action" value="update_status"> <select name="status" onchange="this.form.submit()"${addAttribute(`text-xs font-semibold rounded-full px-2 py-1 border-0 ring-1 ring-inset cursor-pointer outline-none focus:ring-2 focus:ring-brand-blue ${idea.status === "done" ? "bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100" : idea.status === "in progress" ? "bg-yellow-50 text-yellow-800 ring-yellow-600/20 hover:bg-yellow-100" : "bg-blue-50 text-blue-700 ring-blue-700/10 hover:bg-blue-100"}`, "class")}> <option value="pending"${addAttribute(idea.status === "pending" || !idea.status, "selected")}>In afwachting</option> <option value="in progress"${addAttribute(idea.status === "in progress", "selected")}>Mee bezig</option> <option value="done"${addAttribute(idea.status === "done", "selected")}>Klaar</option> </select> </form> </div> <div class="p-5 flex-grow space-y-4"> <div> <p class="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
Idee
</p> <p class="text-gray-900 whitespace-pre-wrap text-sm leading-relaxed">${idea.idea}</p> </div> ${idea.hook && renderTemplate`<div class="bg-blue-50/50 p-3 rounded-lg border border-blue-100"> <p class="text-xs font-semibold text-brand-blue mb-1 flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
Haakje / Actualiteit
</p> <p class="text-blue-900 text-sm whitespace-pre-wrap break-words">${idea.hook}</p> </div>`} <div class="grid grid-cols-1 gap-3 pt-4 border-t border-gray-100 mt-4"> ${idea.visuals && renderTemplate`<div class="text-sm flex flex-col gap-1"> <span class="font-medium text-gray-500 text-xs uppercase tracking-wider">Visuals / Bijlage</span> <a${addAttribute(idea.visuals, "href")} target="_blank" rel="noopener noreferrer" class="text-brand-blue hover:underline break-all block flex items-start gap-1"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg> ${idea.visuals} </a> </div>`} ${idea.target_url && renderTemplate`<div class="text-sm flex flex-col gap-1"> <span class="font-medium text-gray-500 text-xs uppercase tracking-wider">Doel URL ZeeZicht</span> <a${addAttribute(idea.target_url, "href")} target="_blank" rel="noopener noreferrer" class="text-brand-blue hover:underline break-all block flex items-start gap-1"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"></path><path d="m21 3-9 9"></path><path d="M15 3h6v6"></path></svg> ${idea.target_url} </a> </div>`} </div> </div> <div class="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-end"> <form method="POST" onsubmit="return confirm('Weet je zeker dat je dit idee wilt verwijderen?');"> <input type="hidden" name="id"${addAttribute(idea.id, "value")}> <input type="hidden" name="action" value="delete"> <button type="submit" class="text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1.5 rounded transition-colors flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
Verwijderen
</button> </form> </div> </div>`)} </div>`}` })}`;
}, "/Users/jorikschut/Documents/Projecten-sites/Tools-SAAS/ZeeZicht Content Aanlever Tool/src/pages/dashboard.astro", void 0);

const $$file = "/Users/jorikschut/Documents/Projecten-sites/Tools-SAAS/ZeeZicht Content Aanlever Tool/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
