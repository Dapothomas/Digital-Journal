document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('#vault-list');
  const allEntries = sortByNewest(getEntries());

  list.innerHTML = '';

  if (allEntries.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"></path></svg>
        </div>
        <h3>Your vault is empty</h3>
        <p>Every reflection you save will live here.</p>
        <a href="new-entry.html">Start writing now</a>
      </div>
    `;
    return;
  }

  allEntries.forEach((entry) => {
    const row = document.createElement('article');
    row.className = 'vault-row';

    const tagsMarkup = entry.tag ? `<span class="tag">${entry.tag}</span>` : '';

    row.innerHTML = `
      <div class="vault-row-top">
        <span class="vault-date">${formatDate(entry.date)}</span>
        ${tagsMarkup}
      </div>
      <h3 class="vault-title">${entry.title}</h3>
      <p class="vault-body">${entry.body}</p>
    `;

    list.appendChild(row);
  });
});
