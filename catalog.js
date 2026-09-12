(() => {
  const grid = document.getElementById('catalogGrid');
  const empty = document.getElementById('catalogEmpty');
  if (!grid) return;

  const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

  const makeCard = (product) => {
    const article = document.createElement('article');
    article.className = 'shop-card';

    const isLive = product.status === 'live' || product.status === 'approved';
    const price = typeof product.price === 'number' ? money.format(product.price) : (product.price_label || 'Price pending');
    const cta = isLive && product.cta_url
      ? `<a class="btn dark" href="${product.cta_url}">${product.cta_label || 'View'}</a>`
      : `<span class="shop-disabled">Not on sale yet</span>`;

    article.innerHTML = `
      <div class="shop-card-top">
        <span class="status ${isLive ? 'live' : 'checking'}">${product.badge || (isLive ? 'LIVE' : 'CHECKING')}</span>
        <span class="shop-category">${product.category || 'Home'}</span>
      </div>
      <h3>${product.name}</h3>
      <p>${product.description || ''}</p>
      <div class="shop-meta">
        <strong>${price}</strong>
        <span>${product.delivery_label || ''}</span>
      </div>
      ${cta}
    `;
    return article;
  };

  fetch('/catalog.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Catalogue unavailable');
      return response.json();
    })
    .then((data) => {
      const products = Array.isArray(data.products) ? data.products : [];
      if (!products.length) {
        if (empty) empty.hidden = false;
        return;
      }
      products.forEach((product) => grid.appendChild(makeCard(product)));
    })
    .catch(() => {
      if (empty) {
        empty.hidden = false;
        empty.textContent = 'The catalogue is being updated. Personal sourcing is still available.';
      }
    });
})();
