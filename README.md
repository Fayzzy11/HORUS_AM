# Horus Asset Management

Website of **Horus Asset Management**, a student investment boutique created for the Portfolio Management course of the SKEMA Business School MSc in Financial Markets & Investments (Paris, 2026).
Live site: https://fayzzy11.github.io/HORUS_AM/

Flagship strategy: **Horus Smart Beta 60/40**. Strategic factors (small cap, growth, momentum) and a tactical annual selection of ETFs inside a permanent 60/40, tested out of sample from January 2007 to August 2026.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About (story, values, philosophy, client, ambitions) | `about.html` |
| Strategy (factors, process, example, risks) | `strategy.html` |
| Performance (chart, stats, simulator, holdings explorer, portfolio, Carhart) | `performance.html` |
| Insights (factsheets, outlook, research notes, newsletter) | `insights.html` |
| Team | `team.html` |
| Careers | `careers.html` |
| Contact | `contact.html` |

Plain HTML, CSS and JavaScript, no build step. The navigation and the footer are added by `assets/js/layout.js` on every page.

## Everyday edits

- **Email, newsletter, contact form:** `assets/js/config.js` (three lines). Create a free form on https://formspree.io, paste its endpoint in `newsletterEndpoint` (and `contactEndpoint` if wanted), and the team email in `email`.
- **Team photos and LinkedIn:** put square photos in `assets/img/team/` and fill `photo` and `linkedin` in `assets/js/team-data.js`.
- **French text:** English is written in the HTML; every French translation is in `assets/js/i18n.js`, under the same key as the element's `data-i18n` attribute.

## Monthly update (data and factsheet)

1. Add the new month to `r_p3`, `r_bench`, `rf` and the four factor series in `assets/data/backtest.json`, and set `end` (for example `"2026-09"`).
2. Run:
   ```
   python3 scripts/build_data.py       # rebuilds assets/js/data.js (charts, simulator)
   python3 scripts/build_factsheet.py  # writes factsheets/*_EN.pdf and *_FR.pdf and the factsheet list
   ```
3. Commit and push. The new factsheet appears on the Home and Insights pages.

The factsheet script needs Python with `numpy` and `playwright` (Chromium).

## Publish with GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)`.

## Disclaimer

Academic project. Horus Asset Management is not a registered investment firm and does not offer any product or service. Figures are hypothetical backtest results and do not guarantee future returns.
