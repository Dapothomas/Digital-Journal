document.addEventListener('DOMContentLoaded', () => {
  const dateLabel = document.querySelector('#entry-date-label');
  const form = document.querySelector('#entry-form');
  const titleInput = document.querySelector('#entry-title');
  const bodyInput = document.querySelector('#entry-body');
  const tagInput = document.querySelector('#entry-tag');
  const privateToggle = document.querySelector('#private-toggle');
  const discardBtn = document.querySelector('#discard-btn');

  const today = new Date();
  dateLabel.textContent = today
    .toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase();

  privateToggle.addEventListener('click', () => {
    privateToggle.classList.toggle('is-active');
  });

  discardBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value.trim() || 'Untitled Reflection';
    const body = bodyInput.value.trim();

    if (!body) {
      bodyInput.focus();
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: today.toISOString(),
      title,
      body,
      tag: tagInput.value.trim(),
      private: privateToggle.classList.contains('is-active'),
    };

    const entries = getEntries();
    entries.push(newEntry);
    saveEntries(entries);

    window.location.href = 'vault.html';
  });
});
