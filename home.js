document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#entry-grid');
  const allEntries = getEntries();
  const recentEntries = sortByNewest(allEntries).slice(0, 5);

  grid.innerHTML = '';

  if (recentEntries.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"></path></svg>
        </div>
        <h3>Feeling inspired?</h3>
        <p>Your vellum is waiting for its next entry.</p>
        <a href="new-entry.html">Start writing now</a>
      </div>
    `;
    return;
  }

  recentEntries.forEach((entry, index) => {
    const card = document.createElement('article');
    card.className = 'card';
    if (index === 0) card.classList.add('featured');
    if (index % 2 === 1) card.classList.add('alt');

    const tagsMarkup = entry.tag
      ? `<div class="card-tags"><span class="tag">${entry.tag}</span></div>`
      : '';

    card.innerHTML = `
      <span class="card-date">${formatDate(entry.date)}</span>
      <h3 class="card-title">${entry.title}</h3>
      <p class="card-excerpt">${entry.body.slice(0, 140)}${entry.body.length > 140 ? '...' : ''}</p>
      ${tagsMarkup}
    `;

    grid.appendChild(card);
  });
});
