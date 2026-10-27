"""Build the monthly factsheet PDFs (English and French) from assets/data/backtest.json.

    python3 scripts/build_factsheet.py

Output: factsheets/Horus_SmartBeta6040_Factsheet_<YYYY-MM>_EN.pdf and _FR.pdf,
plus factsheets/index.json (list read by the Insights page).
Requires: numpy, playwright (python) with Chromium.
"""
import json
import math
import base64
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'factsheets'

ETF = {
    'SPY': ('US large caps', 'Grandes capitalisations US'), 'IJH': ('US mid caps', 'Moyennes capitalisations US'),
    'IWM': ('US small caps', 'Petites capitalisations US'), 'IWD': ('US large-cap value', 'Value grandes cap. US'),
    'XLK': ('US technology', 'Technologie US'), 'XLF': ('US financials', 'Financières US'),
    'XLV': ('US health care', 'Santé US'), 'XLE': ('US energy', 'Énergie US'), 'XLB': ('US materials', 'Matériaux US'),
    'EZU': ('Eurozone equities', 'Actions zone euro'), 'EWU': ('UK equities', 'Actions britanniques'),
    'EWJ': ('Japanese equities', 'Actions japonaises'), 'SHY': ('US Treasuries 1–3y', 'Bons du Trésor US 1–3 ans'),
    'IEF': ('US Treasuries 7–10y', 'Bons du Trésor US 7–10 ans'), 'TLT': ('US Treasuries 20y+', 'Bons du Trésor US 20 ans+'),
    'TIP': ('US inflation-linked', 'Obligations indexées US'), 'LQD': ('US IG corporates', 'Crédit IG US'),
    'AGG': ('US aggregate bonds', 'Obligations agrégées US'), 'RXRGEX': ('German government bonds', 'Obligations d\'État allemandes'),
    'GLD': ('Gold', 'Or'),
}
EQUITY = {'SPY', 'IJH', 'IWM', 'IWD', 'XLK', 'XLF', 'XLV', 'XLE', 'XLB', 'EZU', 'EWU', 'EWJ'}

MONTHS = {
    'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'fr': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
}

T = {
    'en': {
        'kicker': 'MONTHLY FACTSHEET', 'title': 'Horus Smart Beta 60/40', 'asof': 'Data as of',
        'objective_h': 'Objective', 'objective': 'Beat a classic 60/40 portfolio with a similar level of risk, by tilting the equity half towards three research-based factors (small cap, growth, momentum) and selecting the best bond ETFs on their risk-adjusted return.',
        'approach_h': 'Approach', 'approach': 'Strategic factors that never change, tactical fund selection every January. The 60/40 split is permanent: no market timing.',
        'facts_h': 'Key facts', 'facts': [('Strategy type', 'Smart beta, multi-asset 60/40'), ('Benchmark', '60% MSCI World · 40% Bloomberg Global Agg.'), ('Universe', '12 equity ETFs · 7 bond ETFs · gold'), ('Holdings', '4 ETFs (2 equity × 30%, 2 bond × 20%)'), ('Rebalancing', 'Once a year, early January'), ('Signals', 'Carhart 4-factor scores · 3-year Sharpe'), ('Base currency', 'USD'), ('Track record', 'Out-of-sample backtest since January 2007')],
        'perf_h': 'Performance (%)', 'cols': ['1M', '3M', 'YTD', '1Y', '3Y*', '5Y*', '10Y*', 'Since 2007*'], 'strategy': 'Horus Smart Beta 60/40', 'bench': 'Benchmark 60/40', 'excess': 'Difference', 'ann': '* annualised',
        'growth_h': 'Growth of 100 since December 2006', 'cal_h': 'Calendar-year returns (%)', 'ytd': 'YTD',
        'risk_h': 'Risk statistics (since January 2007)', 'risk': ['Volatility', 'Sharpe ratio', 'Maximum drawdown', 'Beta vs benchmark', 'Tracking error', 'Information ratio'],
        'hold_h': 'Portfolio for', 'hold_sub': 'selected in January on the previous three years', 'eq': 'Equity', 'bd': 'Bonds',
        'factor_h': 'Factor exposures (Carhart regression, since 2007)', 'factor_cols': ['', 'Loading', 't-stat'], 'factors': ['Market (Mkt-RF)', 'Small cap (SMB)', 'Value (HML) · negative = growth', 'Momentum (MOM)', 'Alpha (annualised)'],
        'comment_h': 'Monthly comment', 'comment': 'In {month}, the strategy returned {m1} against {b1} for the benchmark. Since January {ytd_year}, it is up {ytd} against {bytd}. Over twenty years, 100 invested in December 2006 has grown to {g} against {bg} for the benchmark.',
        'disc': 'Academic project. Horus Asset Management is a student project of the SKEMA Business School MSc in Financial Markets & Investments. It is not a registered investment firm, is not authorised by the AMF or any other regulator, and does not offer any product or service. All figures are hypothetical backtest results of a model portfolio, computed on monthly total-return data in USD with ETFs as proxies, before taxes and fees. Past performance does not guarantee future returns. This document is not investment advice.',
        'sources': 'Sources: Bloomberg total-return series; Ken French Data Library (CRSP 202608); Horus calculations.',
        'see': 'Hypothetical backtest results of a model portfolio, student project. Please read the important information on page 2.',
        'how_h': 'How the strategy works', 'steps': [('Measure', 'Every January, one Carhart regression per equity ETF on the last 36 months: how much small cap, value and momentum it holds.'), ('Score', 'z(SMB) + z(−HML) + z(MOM): one point per standard deviation above the average ETF.'), ('Select', 'The Solver buys the 2 best-scored equity ETFs (30% each) and the 2 bond ETFs with the best 3-year Sharpe (20% each).'), ('Hold', 'The four funds are held for 12 months, then the process starts again.')],
        'glossary_h': 'Glossary', 'glossary': [('Sharpe ratio', 'Excess return over T-bills divided by volatility.'), ('Maximum drawdown', 'Largest fall from a previous peak.'), ('Tracking error', 'Volatility of the return difference with the benchmark.'), ('Information ratio', 'Average excess return over the benchmark divided by the tracking error.'), ('Factor loading', 'Sensitivity of the portfolio to a factor (no unit); |t| ≥ 2 means significant at 5%.')],
    },
    'fr': {
        'kicker': 'REPORTING MENSUEL', 'title': 'Horus Smart Beta 60/40', 'asof': 'Données au',
        'objective_h': 'Objectif', 'objective': 'Battre un portefeuille 60/40 classique avec un niveau de risque comparable, en orientant la poche actions vers trois facteurs issus de la recherche (petites capitalisations, croissance, momentum) et en sélectionnant les meilleurs ETF obligataires selon leur rendement ajusté du risque.',
        'approach_h': 'Approche', 'approach': 'Des facteurs stratégiques qui ne changent jamais, une sélection tactique des fonds chaque janvier. La répartition 60/40 est permanente : pas de market timing.',
        'facts_h': 'Caractéristiques', 'facts': [('Type de stratégie', 'Smart beta, multi-actifs 60/40'), ('Indice de référence', '60 % MSCI World · 40 % Bloomberg Global Agg.'), ('Univers', '12 ETF actions · 7 ETF obligataires · or'), ('Positions', '4 ETF (2 actions × 30 %, 2 obligations × 20 %)'), ('Rebalancement', 'Une fois par an, début janvier'), ('Signaux', 'Scores Carhart 4 facteurs · Sharpe 3 ans'), ('Devise de référence', 'USD'), ('Historique', 'Backtest hors échantillon depuis janvier 2007')],
        'perf_h': 'Performances (%)', 'cols': ['1M', '3M', 'YTD', '1A', '3A*', '5A*', '10A*', 'Depuis 2007*'], 'strategy': 'Horus Smart Beta 60/40', 'bench': 'Indice 60/40', 'excess': 'Écart', 'ann': '* annualisé',
        'growth_h': 'Évolution de 100 investis fin décembre 2006', 'cal_h': 'Performances annuelles (%)', 'ytd': 'YTD',
        'risk_h': 'Statistiques de risque (depuis janvier 2007)', 'risk': ['Volatilité', 'Ratio de Sharpe', 'Perte maximale', 'Bêta vs indice', 'Tracking error', 'Ratio d\'information'],
        'hold_h': 'Portefeuille', 'hold_sub': 'sélectionné en janvier sur les trois années précédentes', 'eq': 'Actions', 'bd': 'Obligations',
        'factor_h': 'Expositions factorielles (régression de Carhart, depuis 2007)', 'factor_cols': ['', 'Coefficient', 't-stat'], 'factors': ['Marché (Mkt-RF)', 'Petites cap. (SMB)', 'Value (HML) · négatif = croissance', 'Momentum (MOM)', 'Alpha (annualisé)'],
        'comment_h': 'Commentaire du mois', 'comment': 'En {month}, la stratégie a progressé de {m1}, contre {b1} pour l\'indice. Depuis janvier {ytd_year}, elle affiche {ytd} contre {bytd}. Sur vingt ans, 100 investis fin décembre 2006 sont devenus {g}, contre {bg} pour l\'indice.',
        'disc': 'Projet académique. Horus Asset Management est un projet étudiant du MSc Financial Markets & Investments de SKEMA Business School. Ce n\'est pas une société de gestion agréée, elle n\'est pas autorisée par l\'AMF ni par aucun autre régulateur et ne propose aucun produit ni service. Tous les chiffres sont des résultats hypothétiques de backtest d\'un portefeuille modèle, calculés sur des rendements mensuels totaux en USD avec des ETF comme supports, avant impôts et frais. Les performances passées ne préjugent pas des performances futures. Ce document ne constitue pas un conseil en investissement.',
        'sources': 'Sources : séries de rendement total Bloomberg ; Ken French Data Library (CRSP 202608) ; calculs Horus.',
        'see': 'Résultats hypothétiques de backtest d\'un portefeuille modèle, projet étudiant. Merci de lire les informations importantes en page 2.',
        'how_h': 'Fonctionnement de la stratégie', 'steps': [('Mesurer', 'Chaque janvier, une régression de Carhart par ETF actions sur les 36 derniers mois : quelle exposition aux petites cap., à la value et au momentum.'), ('Noter', 'z(SMB) + z(−HML) + z(MOM) : un point par écart-type au-dessus de l\'ETF moyen.'), ('Sélectionner', 'Le Solver achète les 2 ETF actions les mieux notés (30 % chacun) et les 2 ETF obligataires au meilleur Sharpe 3 ans (20 % chacun).'), ('Conserver', 'Les quatre fonds sont conservés 12 mois, puis le processus recommence.')],
        'glossary_h': 'Glossaire', 'glossary': [('Ratio de Sharpe', 'Rendement au-delà des T-bills divisé par la volatilité.'), ('Perte maximale', 'Plus forte baisse depuis un plus haut précédent.'), ('Tracking error', 'Volatilité de l\'écart de rendement avec l\'indice.'), ('Ratio d\'information', 'Surperformance moyenne divisée par la tracking error.'), ('Coefficient factoriel', 'Sensibilité du portefeuille à un facteur (sans unité) ; |t| ≥ 2 signifie significatif à 5 %.')],
    },
}


def pct(x, lang, dec=1, sign=True):
    s = f'{x * 100:+.{dec}f}' if sign else f'{x * 100:.{dec}f}'
    s = s.replace('-', '−')
    if lang == 'fr':
        s = s.replace('.', ',')
    return s + (' %' if lang == 'fr' else '%')


def num(x, lang, dec=2):
    s = f'{x:.{dec}f}'.replace('-', '−')
    return s.replace('.', ',') if lang == 'fr' else s


def cum(r):
    return float(np.prod(1 + np.asarray(r)) - 1)


def ann(r):
    r = np.asarray(r)
    return float(np.prod(1 + r) ** (12 / len(r)) - 1)


def stats(d):
    p, b, rf = (np.asarray(d[k]) for k in ('r_p3', 'r_bench', 'rf'))
    n = len(p)
    end_y, end_m = map(int, d['end'].split('-'))
    ytd_n = end_m

    def periods(r):
        return [cum(r[-1:]), cum(r[-3:]), cum(r[-ytd_n:]), cum(r[-12:]), ann(r[-36:]), ann(r[-60:]), ann(r[-120:]), ann(r)]

    def risk(r):
        ex = r - rf
        vol = r.std(ddof=1) * math.sqrt(12)
        sharpe = ex.mean() * 12 / (ex.std(ddof=1) * math.sqrt(12))
        g = np.cumprod(1 + r)
        mdd = float((g / np.maximum.accumulate(g) - 1).min())
        return vol, sharpe, mdd

    act = p - b
    beta = float(np.cov(p - rf, b - rf)[0, 1] / np.var(b - rf, ddof=1))
    te = act.std(ddof=1) * math.sqrt(12)
    ir = act.mean() * 12 / te
    # Carhart regression
    F = d['factors']
    X = np.c_[np.ones(n), F['mkt_rf'], F['smb'], F['hml'], F['mom']]
    y = p - rf
    coef = np.linalg.lstsq(X, y, rcond=None)[0]
    e = y - X @ coef
    s2 = e @ e / (n - X.shape[1])
    se = np.sqrt(np.diag(s2 * np.linalg.inv(X.T @ X)))
    tstat = coef / se
    cal_years = list(range(end_y - 10, end_y + 1))
    cal = []
    for yv in cal_years:
        i0 = (yv - 2007) * 12
        cal.append((yv, cum(p[i0:i0 + 12]), cum(b[i0:i0 + 12])))
    return {
        'n': n, 'end_y': end_y, 'end_m': end_m,
        'per_p': periods(p), 'per_b': periods(b),
        'risk_p': risk(p), 'risk_b': risk(b), 'beta': beta, 'te': te, 'ir': ir,
        'coef': coef, 't': tstat, 'cal': cal,
        'g_p': np.r_[100, 100 * np.cumprod(1 + p)], 'g_b': np.r_[100, 100 * np.cumprod(1 + b)],
    }


def growth_svg(gp, gb):
    W, H, ml, mr, mt, mb = 520, 200, 34, 40, 8, 20
    lo, hi = math.log(min(gp.min(), gb.min()) * 0.95), math.log(max(gp.max(), gb.max()) * 1.05)
    n = len(gp)
    x = lambda i: ml + i / (n - 1) * (W - ml - mr)
    y = lambda v: mt + (1 - (math.log(v) - lo) / (hi - lo)) * (H - mt - mb)
    path = lambda g: 'M' + ' L'.join(f'{x(i):.1f} {y(v):.1f}' for i, v in enumerate(g))
    grid = ''.join(f'<line x1="{ml}" x2="{W - mr}" y1="{y(v):.1f}" y2="{y(v):.1f}" stroke="#e5dccb"/><text x="{ml - 4}" y="{y(v) + 3:.1f}" text-anchor="end" font-size="7" fill="#616a78">{v}</text>' for v in (100, 200, 400) if lo < math.log(v) < hi)
    years = ''.join(f'<text x="{x((yv - 2007) * 12):.1f}" y="{H - 6}" text-anchor="middle" font-size="7" fill="#616a78">{yv}</text>' for yv in range(2007, 2027, 4))
    return (f'<svg viewBox="0 0 {W} {H}" width="100%">{grid}{years}'
            f'<path d="{path(gb)}" fill="none" stroke="#c9a46b" stroke-width="1.4"/>'
            f'<path d="{path(gp)}" fill="none" stroke="#0a1a30" stroke-width="1.8"/>'
            f'<text x="{x(n - 1) + 4:.1f}" y="{y(gp[-1]) + 3:.1f}" font-size="8" font-weight="700" fill="#0a1a30">{gp[-1]:.0f}</text>'
            f'<text x="{x(n - 1) + 4:.1f}" y="{y(gb[-1]) + 3:.1f}" font-size="8" font-weight="700" fill="#9e7b4b">{gb[-1]:.0f}</text></svg>')


def html(d, s, lang, logo_b64, mark_b64):
    t = T[lang]
    end_y, end_m = s['end_y'], s['end_m']
    month = MONTHS[lang][end_m - 1]
    asof = f'{t["asof"]} 31 {month} {end_y}' if end_m in (1, 3, 5, 7, 8, 10, 12) else f'{t["asof"]} {month} {end_y}'
    rp, rb = s['per_p'], s['per_b']
    perf_rows = ''.join(f'<td>{pct(v, lang)}</td>' for v in rp)
    bench_rows = ''.join(f'<td>{pct(v, lang)}</td>' for v in rb)
    diff_rows = ''.join(f'<td>{pct(a - b, lang)}</td>' for a, b in zip(rp, rb))
    vol_p, sh_p, dd_p = s['risk_p']
    vol_b, sh_b, dd_b = s['risk_b']
    risk_rows = [
        (t['risk'][0], pct(vol_p, lang, 1, False), pct(vol_b, lang, 1, False)),
        (t['risk'][1], num(sh_p, lang), num(sh_b, lang)),
        (t['risk'][2], pct(dd_p, lang), pct(dd_b, lang)),
        (t['risk'][3], num(s['beta'], lang), '1' + (',00' if lang == 'fr' else '.00')),
        (t['risk'][4], pct(s['te'], lang, 1, False), '–'),
        (t['risk'][5], num(s['ir'], lang), '–'),
    ]
    risk_html = ''.join(f'<tr><td>{a}</td><td><b>{b}</b></td><td>{c}</td></tr>' for a, b, c in risk_rows)
    cal_head = ''.join(f'<th>{yv if yv < end_y else t["ytd"]}</th>' for yv, _, _ in s['cal'])
    cal_p = ''.join(f'<td>{pct(a, lang)}</td>' for _, a, _ in s['cal'])
    cal_b = ''.join(f'<td>{pct(b, lang)}</td>' for _, _, b in s['cal'])
    sel = d['sel'][str(end_y)]
    hold = sorted(sel.items(), key=lambda kv: (kv[0] not in EQUITY, -kv[1]))
    li = 0 if lang == 'en' else 1
    hold_html = ''.join(
        f'<tr><td><span class="sw" style="background:{"#0a1a30" if k in EQUITY else "#c9a46b"}"></span><b>{k}</b> · {ETF[k][li]}</td><td>{t["eq"] if k in EQUITY else t["bd"]}</td><td><b>{pct(w, lang, 0, False)}</b></td></tr>'
        for k, w in hold)
    c, tt = s['coef'], s['t']
    fac = [(t["factors"][0], num(c[1], lang, 3), num(tt[1], lang, 1)), (t['factors'][1], num(c[2], lang, 3), num(tt[2], lang, 1)),
           (t['factors'][2], num(c[3], lang, 3), num(tt[3], lang, 1)), (t['factors'][3], num(c[4], lang, 3), num(tt[4], lang, 1)),
           (t['factors'][4], pct(c[0] * 12, lang), num(tt[0], lang, 1))]
    fac_html = ''.join(f'<tr><td>{a}</td><td><b>{b}</b></td><td>{cc}</td></tr>' for a, b, cc in fac)
    facts_html = ''.join(f'<tr><td>{a}</td><td>{b}</td></tr>' for a, b in t['facts'])
    comment = t['comment'].format(month=month, m1=pct(rp[0], lang), b1=pct(rb[0], lang), ytd_year=end_y, ytd=pct(rp[2], lang), bytd=pct(rb[2], lang),
                                  g=f'{s["g_p"][-1]:.0f}', bg=f'{s["g_b"][-1]:.0f}')
    cols = ''.join(f'<th>{x}</th>' for x in t['cols'])
    return f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><style>
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ font-family: Inter, 'DejaVu Sans', sans-serif; font-size: 8.4pt; color: #2e3747; line-height: 1.45; }}
.page {{ width: 210mm; height: 297mm; padding: 0 13mm 10mm; position: relative; overflow: hidden; }}
.band {{ background: #0a1a30; color: #f4efe6; margin: 0 -13mm 8mm; padding: 9mm 13mm 7mm; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #b58f55; }}
.band .k {{ font-size: 7pt; letter-spacing: .22em; color: #c9a46b; font-weight: 700; }}
.band h1 {{ font-family: Caladea, Georgia, serif; font-size: 24pt; font-weight: 700; margin: 2pt 0; color: #f4efe6; }}
.band .d {{ font-size: 8.5pt; color: #aab3c2; }}
.band img {{ height: 64pt; }}
h2 {{ font-family: Caladea, Georgia, serif; font-size: 11.5pt; color: #0a1a30; border-bottom: 1.2px solid #b58f55; padding-bottom: 2pt; margin: 9pt 0 5pt; }}
.grid {{ display: grid; grid-template-columns: 1.15fr .85fr; gap: 9mm; }}
table {{ width: 100%; border-collapse: collapse; font-size: 8pt; }}
th {{ background: #0a1a30; color: #f4efe6; font-weight: 600; padding: 3pt 4pt; text-align: right; }}
th:first-child, td:first-child {{ text-align: left; }}
td {{ padding: 3pt 4pt; border-bottom: 1px solid #e5dccb; text-align: right; }}
tr.p td {{ background: #f3eee4; font-weight: 600; color: #0a1a30; }}
.facts td {{ text-align: left; }} .facts td:first-child {{ color: #616a78; width: 40%; }}
.sw {{ display: inline-block; width: 7pt; height: 7pt; margin-right: 5pt; vertical-align: -1pt; }}
.legend {{ font-size: 7.5pt; color: #616a78; margin-top: 2pt; }}
.legend i {{ display: inline-block; width: 14pt; height: 2pt; vertical-align: 2pt; margin: 0 4pt 0 10pt; }}
.note {{ font-size: 7pt; color: #616a78; margin-top: 2pt; }}
.comment {{ background: #f3eee4; border-left: 3px solid #b58f55; padding: 6pt 9pt; }}
.band2 {{ padding: 6mm 13mm 5mm; }} .band2 .d {{ font-size: 9pt; color: #f4efe6; margin-top: 2pt; }}
.steps {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 6pt; }} .steps div {{ background: #f3eee4; border-top: 2px solid #b58f55; padding: 6pt 7pt; font-size: 7.8pt; }} .steps b {{ font-family: Caladea, serif; color: #9e7b4b; font-size: 11pt; display: block; }} .steps span {{ display: block; font-weight: 700; color: #0a1a30; margin-bottom: 2pt; }}
.disc {{ position: absolute; left: 13mm; right: 13mm; bottom: 9mm; font-size: 6.6pt; color: #616a78; border-top: 1px solid #e5dccb; padding-top: 4pt; }}
p {{ margin-bottom: 4pt; }}
</style></head><body>
<div class="page">
<div class="band"><div><div class="k">{t["kicker"]} · HORUS ASSET MANAGEMENT</div><h1>{t["title"]}</h1><div class="d">{asof} · USD</div></div><img src="data:image/png;base64,{logo_b64}"></div>
<div class="grid">
<div>
<h2>{t["objective_h"]}</h2><p>{t["objective"]}</p>
<h2>{t["approach_h"]}</h2><p>{t["approach"]}</p>
<h2>{t["comment_h"]}</h2><div class="comment">{comment}</div>
</div>
<div><h2>{t["facts_h"]}</h2><table class="facts">{facts_html}</table></div>
</div>
<h2>{t["perf_h"]}</h2>
<table><tr><th></th>{cols}</tr><tr class="p"><td>{t["strategy"]}</td>{perf_rows}</tr><tr><td>{t["bench"]}</td>{bench_rows}</tr><tr><td>{t["excess"]}</td>{diff_rows}</tr></table>
<div class="note">{t["ann"]}</div>
<div class="grid" style="margin-top:2pt">
<div><h2>{t["growth_h"]}</h2>{growth_svg(s["g_p"], s["g_b"])}<div class="legend"><i style="background:#0a1a30"></i>{t["strategy"]}<i style="background:#c9a46b"></i>{t["bench"]}</div></div>
<div><h2>{t["risk_h"]}</h2><table><tr><th></th><th>Horus</th><th>60/40</th></tr>{risk_html}</table></div>
</div>
<h2>{t["cal_h"]}</h2>
<table><tr><th></th>{cal_head}</tr><tr class="p"><td>Horus</td>{cal_p}</tr><tr><td>60/40</td>{cal_b}</tr></table>
<div class="disc">{t["see"]}</div>
</div>
<div class="page">
<div class="band band2"><div><div class="k">{t["kicker"]} · HORUS ASSET MANAGEMENT</div><div class="d">{t["title"]} · {asof}</div></div></div>
<div class="grid">
<div><h2>{t["hold_h"]} {end_y}</h2><table>{hold_html}</table><div class="note">{t["hold_sub"]}</div></div>
<div><h2>{t["factor_h"]}</h2><table><tr>{"".join(f"<th>{x}</th>" for x in t["factor_cols"])}</tr>{fac_html}</table></div>
</div>
<h2>{t["how_h"]}</h2>
<div class="steps">{"".join(f'<div><b>{n}</b><span>{h}</span>{x}</div>' for n, (h, x) in zip(['I', 'II', 'III', 'IV'], t["steps"]))}</div>
<h2>{t["glossary_h"]}</h2>
<table class="facts">{"".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a, b in t["glossary"])}</table>
<div class="disc">{t["disc"]}<br>{t["sources"]}</div>
</div></body></html>'''


def main():
    from playwright.sync_api import sync_playwright
    d = json.loads((ROOT / 'assets/data/backtest.json').read_text())
    s = stats(d)
    logo = base64.b64encode((ROOT / 'assets/img/logo_light.png').read_bytes()).decode()
    OUT.mkdir(exist_ok=True)
    tag = d['end']
    files = {}
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        for lang in ('en', 'fr'):
            page = b.new_page()
            page.set_content(html(d, s, lang, logo, None))
            name = f'Horus_SmartBeta6040_Factsheet_{tag}_{lang.upper()}.pdf'
            page.pdf(path=str(OUT / name), format='A4', print_background=True, margin={'top': '0', 'bottom': '0', 'left': '0', 'right': '0'})
            files[lang] = name
            print('written', name)
        b.close()
    idx_path = OUT / 'index.json'
    idx = json.loads(idx_path.read_text()) if idx_path.exists() else []
    idx = [e for e in idx if e['month'] != tag]
    idx.insert(0, {'month': tag, 'en': files['en'], 'fr': files['fr']})
    idx.sort(key=lambda e: e['month'], reverse=True)
    idx_path.write_text(json.dumps(idx, indent=1))
    (ROOT / 'assets/js/factsheets.js').write_text('window.HORUS_FACTSHEETS=' + json.dumps(idx) + ';\n')


if __name__ == '__main__':
    main()
