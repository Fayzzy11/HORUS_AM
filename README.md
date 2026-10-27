# Horus Asset Management

Website of **Horus Asset Management**, a student investment boutique created for the Portfolio Management course of the SKEMA Business School MSc in Financial Markets & Investments (Paris, 2026).

Flagship strategy: **Horus Smart Beta 60/40**. Strategic factors (small cap, growth, momentum) and a tactical annual selection of ETFs inside a permanent 60/40, tested out of sample from January 2007 to August 2026.

## Structure

```
index.html            single-page site
assets/css/style.css  styles (navy and gold brand palette)
assets/js/data.js     backtest series, annual returns and yearly holdings
assets/js/main.js     animations, interactive chart, holdings explorer
assets/img/           logo and falcon mark
```

No build step: it is plain HTML, CSS and JavaScript.

## Publish with GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
The site then appears at `https://fayzzy11.github.io/HORUS_AM/`.

## Update the data

Replace the arrays in `assets/js/data.js`:
- `p3` and `bench` hold the growth of 100, monthly from January 2007;
- `annual_p3` and `annual_bench` hold the calendar-year returns in %;
- `sel` holds the four ETFs selected each January.

## Disclaimer

Academic project. Horus Asset Management is not a registered investment firm and does not offer any product or service. Figures are hypothetical backtest results and do not guarantee future returns.
