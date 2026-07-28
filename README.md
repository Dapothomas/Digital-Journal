# The Digital Vellum

A multi-page digital diary built with plain HTML, CSS, and JavaScript. Entries
are written on `new-entry.html`, saved to the browser's `localStorage`, and
rendered dynamically on both the home page and the full vault.

## Link
https://dapothomas.github.io/Digital-Journal/

## Screenshot
<img width="1710" height="885" alt="Screenshot3" src="https://github.com/user-attachments/assets/9f0572e6-feeb-4525-821d-8027bb8d2fd7" />
<img width="1709" height="883" alt="Screenshot2" src="https://github.com/user-attachments/assets/44c6525b-97f7-434a-85b9-35081c1500af" />
<img width="1709" height="881" alt="Screenshot1" src="https://github.com/user-attachments/assets/c22ae8f4-c471-4edc-91aa-f6d75472f645" />


## Pages

- `index.html` — the Journal home page. Shows the 5 most recent entries in a grid.
- `new-entry.html` — the editor. A form for writing and saving a new entry.
- `vault.html` — the full archive. Every saved entry, in full-width rows.

## Files

- `styles.css` — shared layout and styling for all three pages.
- `storage.js` — shared helpers for reading and writing entries in `localStorage`.
- `home.js` — reads entries and renders the 5 most recent on `index.html`.
- `vault.js` — reads entries and renders all of them on `vault.html`.
- `entry.js` — captures form input on `new-entry.html` and saves a new entry.

## How the "5 most recent entries" logic works

Every entry is stored as an object with a `date` field, set to
`new Date().toISOString()` at the moment it's saved. Entries are pushed onto
an array in the order they're created, but that insertion order isn't
guaranteed to stay chronological if entries are ever removed or merged from
elsewhere, so the home page doesn't rely on array order alone.

Instead, `sortByNewest()` in `storage.js` makes a copy of the array and sorts
it by comparing `new Date(b.date) - new Date(a.date)`. This subtracts the
timestamp of entry `a` from entry `b`; when the result is positive, `b` is
newer and gets sorted ahead of `a`, producing a newest-first list regardless
of how the entries were originally stored.

Once the array is sorted newest-first, `home.js` simply calls `.slice(0, 5)`
on it to take the first 5 items — the 5 most recent entries. `vault.js` uses
the exact same sorted array but skips the `.slice()` call, so it displays
every entry instead of just the top 5.

## Data persistence

Entries are stored under a single key, `entries`, using:

```js
localStorage.setItem('entries', JSON.stringify(entries));
```

and read back with:

```js
JSON.parse(localStorage.getItem('entries'));
```

`localStorage` only stores strings, so `JSON.stringify` converts the array of
entry objects into a string for storage, and `JSON.parse` converts it back
into a usable array when a page loads. Because `localStorage` is scoped to
the browser origin rather than a single page, all three HTML files can read
and write the same `entries` key and stay in sync.

MDN documentation used: [Window.localStorage — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
