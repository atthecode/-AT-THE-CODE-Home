export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB) {
    return json({ error: 'The launch list is not connected yet. Please try again after the site setup is completed.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid form submission.' }, 400);
  }

  const name = String(body?.name || '').trim().slice(0, 80);
  const email = String(body?.email || '').trim().toLowerCase().slice(0, 160);
  const consent = body?.consent === true;
  const website = String(body?.website || '').trim();

  if (website) return json({ message: 'Thanks — you’re on the list.' }, 200);

  if (!name || !email) return json({ error: 'Name and email are required.' }, 400);
  if (!/^\S+@\S+\.\S+$/.test(email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (!consent) return json({ error: 'Consent is required to join the launch list.' }, 400);

  try {
    await env.DB.prepare(`
      INSERT INTO waitlist (name, email, consent, created_at)
      VALUES (?1, ?2, 1, datetime('now'))
      ON CONFLICT(email) DO UPDATE SET
        name = excluded.name,
        consent = 1,
        created_at = datetime('now')
    `).bind(name, email).run();

    return json({ message: 'You’re on the AT THE CODE Home launch list.' }, 200);
  } catch (error) {
    console.error('waitlist insert failed', error);
    return json({ error: 'We could not add you right now. Please try again.' }, 500);
  }
}

export async function onRequestGet() {
  return json({ error: 'Method not allowed.' }, 405);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}
