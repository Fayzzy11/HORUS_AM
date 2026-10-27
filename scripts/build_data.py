"""Build assets/js/data.js from assets/data/backtest.json.

Monthly update: append the new month to r_p3, r_bench and rf in backtest.json,
set "end" to the new month, then run:

    python3 scripts/build_data.py
    python3 scripts/build_factsheet.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load():
    return json.loads((ROOT / 'assets/data/backtest.json').read_text())


def growth(rets):
    g, out = 100.0, []
    for r in rets:
        g *= 1 + r
        out.append(round(g, 4))
    return out


def annual(rets, start_year=2007):
    res, y = [], start_year
    for i in range(0, len(rets), 12):
        chunk = rets[i:i + 12]
        g = 1.0
        for r in chunk:
            g *= 1 + r
        res.append(round((g - 1) * 100, 1))
        y += 1
    return res


def main():
    d = load()
    data = {
        'start': d['start'], 'end': d['end'], 'currency': d['currency'],
        'p3': growth(d['r_p3']), 'bench': growth(d['r_bench']),
        'r_p3': d['r_p3'], 'r_bench': d['r_bench'],
        'annual_p3': annual(d['r_p3']), 'annual_bench': annual(d['r_bench']),
        'sel': {int(k): v for k, v in d['sel'].items()},
    }
    js = 'window.HORUS_DATA=' + json.dumps(data, separators=(',', ':')) + ';\n'
    (ROOT / 'assets/js/data.js').write_text(js)
    print('data.js written:', len(data['p3']), 'months, last value', data['p3'][-1])


if __name__ == '__main__':
    main()
