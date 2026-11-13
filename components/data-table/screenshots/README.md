# DataTable screenshots

Reference captures from `dist/catalogue/index.html` after `npm run build`. Regenerate with:

```sh
npm run build
npx playwright install chromium
node scripts/screenshot-data-table.mjs
```

| File | Viewport | Subject |
| --- | --- | --- |
| `data-table-desktop.png` | 1440×900 | Public roster preset in the catalogue |
| `data-table-mobile.png` | 390×844 | Same block, mobile card layout |
| `data-table-dark.png` | 1440×900 | `theme="dark"` demo |
