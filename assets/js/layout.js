/* Horus Asset Management — shared navigation and footer, injected on every page */
(function () {
  'use strict';
  const page = document.body.dataset.page || '';
  const links = [
    ['about', 'about.html', 'About'],
    ['strategy', 'strategy.html', 'Strategy'],
    ['performance', 'performance.html', 'Performance'],
    ['insights', 'insights.html', 'Insights'],
    ['team', 'team.html', 'Team'],
    ['careers', 'careers.html', 'Careers'],
    ['contact', 'contact.html', 'Contact'],
  ];

  const nav = document.createElement('nav');
  nav.className = 'nav' + (document.body.classList.contains('light-top') ? ' solid' : '');
  nav.id = 'nav';
  nav.innerHTML = `
  <div class="container">
    <a href="index.html" class="brand" aria-label="Horus Asset Management, home">
      <img src="assets/img/mark_gold.png" alt="">
      <span class="brand-text"><strong>HORUS</strong><span>ASSET MANAGEMENT</span></span>
    </a>
    <ul class="nav-links" id="navLinks">
      ${links.map(([id, href, label]) => `<li><a href="${href}" class="${id === page ? 'active' : ''}" data-i18n="nav.${id}">${label}</a></li>`).join('')}
    </ul>
    <div class="nav-right">
      <div class="lang" role="group" aria-label="Language">
        <button type="button" data-lang="en">EN</button><button type="button" data-lang="fr">FR</button>
      </div>
      <button class="menu-toggle" id="menuToggle" aria-label="Open menu"><span></span><span></span><span></span></button>
    </div>
  </div>`;
  document.body.prepend(nav);

  const footer = document.createElement('footer');
  footer.innerHTML = `
  <div class="container">
    <div class="foot-grid">
      <div>
        <img src="assets/img/logo_light.png" alt="Horus Asset Management">
        <form class="foot-news" data-newsletter>
          <p data-i18n="foot.news">Our monthly letter: factsheet, research note and outlook.</p>
          <div class="news-row"><input type="email" name="email" required placeholder="Your email" data-i18n-ph="news.ph" aria-label="Email"><button class="btn solid" type="submit" data-i18n="news.btn">Subscribe</button></div>
          <p class="news-msg small" aria-live="polite"></p>
        </form>
      </div>
      <div><h4 data-i18n="foot.explore">Explore</h4><ul>
        ${links.map(([id, href, label]) => `<li><a href="${href}" data-i18n="nav.${id}">${label}</a></li>`).join('')}
      </ul></div>
      <div><h4 data-i18n="foot.research">Research</h4><ul>
        <li>Fama &amp; French (1993)</li><li>Jegadeesh &amp; Titman (1993)</li><li>Carhart (1997)</li><li>Moskowitz, Ooi &amp; Pedersen (2012)</li><li>Ken French Data Library</li>
      </ul></div>
    </div>
    <p class="disclaimer" data-i18n="foot.disc"><strong>Important information.</strong> Horus Asset Management is an academic project created by students of the SKEMA Business School MSc in Financial Markets &amp; Investments for the Portfolio Management course. It is not a registered investment firm, is not authorised or supervised by the AMF or any other regulator, does not manage client money and does not offer any product or service. All performance figures are hypothetical backtest results of a model portfolio (January 2007 – August 2026), computed on monthly total-return data in USD with ETFs used as proxies, before taxes and, unless stated, before fees. Backtested results have limitations and past performance does not guarantee future returns. Nothing on this website is investment advice or a solicitation to buy or sell any security.</p>
    <div class="copy"><span data-i18n="foot.copy">© 2026 Horus Asset Management · Student project</span><span>Paris · SKEMA Business School</span></div>
  </div>`;
  document.body.appendChild(footer);
})();
