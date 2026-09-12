(() => {
  const sourcingUrl = '/sourcing.html';

  const heroCtaRow = document.querySelector('.hero .cta-row');
  if (heroCtaRow && !document.querySelector('.sourcing-cta')) {
    const sourcingCta = document.createElement('a');
    sourcingCta.className = 'btn dark sourcing-cta';
    sourcingCta.href = sourcingUrl;
    sourcingCta.textContent = 'Personal sourcing — £9.99';
    heroCtaRow.insertBefore(sourcingCta, heroCtaRow.firstChild);
  }

  const nav = document.querySelector('.links');
  if (nav && !nav.querySelector('a[href="/sourcing.html"]')) {
    const sourcingNav = document.createElement('a');
    sourcingNav.href = sourcingUrl;
    sourcingNav.textContent = 'Personal sourcing';
    const navCta = nav.querySelector('.nav-cta');
    nav.insertBefore(sourcingNav, navCta || null);
  }

  const form = document.getElementById('launchForm');
  const msg = document.getElementById('msg');
  const button = document.getElementById('submitBtn');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  if (!form) return;

  const setMessage = (text, type = '') => {
    msg.textContent = text;
    msg.className = `msg ${type}`.trim();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage('');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const consent = document.getElementById('consent').checked;
    const website = document.getElementById('website').value.trim();

    if (!name || !email) return setMessage('Please add your name and email.', 'error');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMessage('Please enter a valid email address.', 'error');
    if (!consent) return setMessage('Please tick the consent box to join the launch list.', 'error');

    button.disabled = true;
    button.textContent = 'Joining…';

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, consent, website })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'We could not add you right now. Please try again.');

      setMessage(data.message || 'You’re on the AT THE CODE Home launch list.', 'success');
      form.reset();
    } catch (error) {
      setMessage(error.message || 'We could not add you right now. Please try again.', 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Join launch list';
    }
  });
})();
