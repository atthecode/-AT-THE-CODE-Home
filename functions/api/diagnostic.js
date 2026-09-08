export async function onRequestGet(context) {
  const env = context?.env || {};
  const hasDB = !!env.DB;
  const looksLikeD1 = !!(env.DB && typeof env.DB.prepare === 'function');
  return new Response(JSON.stringify({
    ok: true,
    hasDB,
    looksLikeD1,
    function: "at-the-code-home-d1-diagnostic-v1"
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}
