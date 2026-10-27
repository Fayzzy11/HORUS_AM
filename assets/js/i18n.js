/* Horus Asset Management — French / English switch.
   English text lives in the HTML. French translations live here, one key per element (data-i18n="key").
   To edit a French sentence, change it below; to add one, give the element a data-i18n key and add the key here. */
(function () {
  'use strict';
  const FR = {
    /* navigation & footer */
    'nav.about': 'À propos', 'nav.strategy': 'Stratégie', 'nav.performance': 'Performance', 'nav.insights': 'Analyses',
    'nav.team': 'Équipe', 'nav.careers': 'Carrières', 'nav.contact': 'Contact',
    'foot.news': 'Notre lettre mensuelle : reporting, note de recherche et perspectives.',
    'foot.explore': 'Explorer', 'foot.research': 'Recherche',
    'foot.disc': '<strong>Informations importantes.</strong> Horus Asset Management est un projet académique créé par des étudiants du MSc Financial Markets &amp; Investments de SKEMA Business School dans le cadre du cours de Portfolio Management. Ce n\'est pas une société de gestion agréée, elle n\'est ni autorisée ni supervisée par l\'AMF ou un autre régulateur, ne gère pas d\'argent pour des clients et ne propose aucun produit ni service. Toutes les performances sont des résultats hypothétiques de backtest d\'un portefeuille modèle (janvier 2007 – août 2026), calculés sur des rendements mensuels totaux en USD avec des ETF comme supports, avant impôts et, sauf mention contraire, avant frais. Les backtests ont des limites et les performances passées ne préjugent pas des performances futures. Rien sur ce site ne constitue un conseil en investissement ni une sollicitation d\'achat ou de vente.',
    'foot.copy': '© 2026 Horus Asset Management · Projet étudiant',
    'news.btn': 'S\'inscrire', 'news.ph': 'Votre email',

    /* home */
    'home.title': 'Horus Asset Management · Voir au-delà de l\'indice',
    'home.eyebrow': 'Paris · Société de gestion fondée sur la recherche',
    'home.h1': 'L\'œil qui voit <em>au-delà de l\'indice.</em>',
    'home.lead': 'Horus Asset Management construit des portefeuilles factoriels transparents pour les investisseurs de long terme. Notre stratégie phare garde le 60/40 classique et le remplit d\'actions choisies selon la recherche et des meilleurs fonds obligataires.',
    'home.cta1': 'Découvrir la stratégie', 'home.cta2': 'Voir 20 ans de résultats',
    'home.badge': 'Un projet du MSc FMI de SKEMA Business School · fondé en 2026',
    'kpi.cagr': 'Rendement annuel, 2007–2026', 'kpi.cagr.vs': 'contre 6,1 % pour un 60/40 classique',
    'kpi.sharpe': 'Ratio de Sharpe', 'kpi.sharpe.vs': 'contre 0,46', 'kpi.dd': 'Perte maximale', 'kpi.dd.vs': 'contre −36,4 %',
    'kpi.months': 'Mois testés hors échantillon', 'kpi.months.vs': '20 fenêtres glissantes',
    'home.s1.eyebrow': 'Notre philosophie en trois phrases',
    'home.s1.title': 'Facteurs stratégiques. Sélection tactique. <em>Un 60/40 permanent.</em>',
    'mantra.1.t': 'Nos facteurs sont stratégiques', 'mantra.1.p': 'Nous croyons à trois facteurs actions et ne les changeons jamais, même quand un autre style connaît une bonne année.',
    'mantra.2.t': 'Notre sélection est tactique', 'mantra.2.p': 'Chaque janvier, une règle écrite choisit les fonds qui portent le mieux ces facteurs aujourd\'hui.',
    'mantra.3.t': 'Notre 60/40 ne change jamais', 'mantra.3.p': 'Pas de market timing : le client sait toujours quel risque il détient.',
    'home.s2.eyebrow': 'Explorer Horus', 'home.s2.title': 'Tout sur notre stratégie, <em>au même endroit.</em>',
    'tile.strategy.t': 'Comment nous construisons le portefeuille', 'tile.strategy.p': 'Trois facteurs, quatre étapes, une règle par an.',
    'tile.perf.t': 'Vingt ans, hors échantillon', 'tile.perf.p': 'Graphique interactif, explorateur des positions et simulateur.',
    'tile.insights.t': 'Perspectives, recherche et reportings', 'tile.insights.p': 'Notre reporting mensuel et ce que nous avons testé.',
    'tile.about.t': 'Qui sommes-nous', 'tile.about.p': 'L\'histoire du faucon, nos valeurs et nos ambitions.',
    'tile.team.t': 'Un comité d\'investissement', 'tile.team.p': 'Cinq personnes, chaque décision prise ensemble.',
    'tile.careers.t': 'Rejoindre l\'équipe de recherche', 'tile.careers.p': 'Aidez-nous à gérer la stratégie en réel dès 2027.',
    'tile.go': 'En savoir plus',
    'home.fs.eyebrow': 'Dernier reporting', 'home.fs.title': 'La stratégie <em>en deux pages.</em>',
    'home.fs.lead': 'Performance, risque, positions et expositions factorielles, mis à jour chaque mois.',

    /* about */
    'about.title': 'À propos · Horus Asset Management', 'about.eyebrow': 'À propos d\'Horus',
    'about.h1': 'Le nom du faucon qui <em>voit tout.</em>',
    'about.lead': 'Une société de gestion parisienne fondée sur la recherche, créée en 2026 par cinq étudiants du MSc Financial Markets &amp; Investments de SKEMA Business School.',
    'about.s1.eyebrow': 'Notre histoire', 'about.s1.title': 'Voir à travers l\'indice, <em>agir sur des preuves.</em>',
    'about.p1': 'Dans la mythologie égyptienne, Horus est le faucon dont l\'œil voit ce que les autres ne voient pas. C\'est notre ambition d\'investisseurs : regarder à travers l\'indice, comprendre ce qui crée vraiment la performance, et agir sur des preuves plutôt que sur le bruit.',
    'about.p2': 'Nous associons la recherche académique, des tests rigoureux hors échantillon et des règles simples qu\'un client comprend en cinq minutes. Notre stratégie phare, Horus Smart Beta 60/40, a été construite et testée sur vingt ans de données.',
    'about.p3': 'Nous comptons grandir à partir de là, une idée bien testée à la fois.',
    'val.1.t': 'Clarté', 'val.1.p': 'Chaque position s\'explique en une phrase. Pas de boîte noire.',
    'val.2.t': 'Discipline', 'val.2.p': 'Des règles fixées à l\'avance, appliquées chaque janvier, quelle que soit l\'actualité.',
    'val.3.t': 'Preuves', 'val.3.p': 'Nos idées viennent de la recherche publiée et sont testées hors échantillon.',
    'val.4.t': 'Honnêteté', 'val.4.p': 'Nous montrons quand notre stratégie est en retard, et ce que nous avons testé puis écarté.',
    'phil.eyebrow': 'Philosophie d\'investissement', 'phil.title': 'Trois phrases. <em>Une discipline.</em>',
    'phil.lead': 'La plupart des investisseurs détiennent un 60/40 : 60 % d\'actions pour la croissance, 40 % d\'obligations pour la sécurité. Il a rapporté 6,1 % par an depuis 2007 et perdu 36 % en 2008-09. Nous gardons la répartition, et changeons ce qu\'elle contient.',
    'phil.1.t': 'Nos facteurs sont <em>stratégiques.</em>', 'phil.1.p': 'Nous croyons à trois facteurs actions, petites capitalisations, croissance et momentum, et ne les changeons jamais, même quand un autre style connaît une bonne année.',
    'phil.2.t': 'Notre sélection est <em>tactique.</em>', 'phil.2.p': 'Chaque janvier, nous choisissons les ETF qui portent le mieux ces facteurs aujourd\'hui, mesurés avec le modèle officiel à quatre facteurs de Carhart.',
    'phil.3.t': 'Notre 60/40 <em>ne change jamais.</em>', 'phil.3.p': 'Pas de market timing. La répartition actions-obligations est permanente : le client sait toujours quel risque il détient.',
    'client.eyebrow': 'L\'investisseur que nous servons', 'client.title': 'Un investisseur 60/40 de long terme qui veut <em>un risque factoriel ciblé.</em>',
    'client.1.t': 'Horizon long', 'client.1.p': 'Sept ans ou plus, investi sur des cycles de marché complets.',
    'client.2.t': 'Même budget de risque', 'client.2.p': 'À l\'aise avec le risque d\'un 60/40, sans en vouloir plus.',
    'client.3.t': 'Un tilt assumé', 'client.3.p': 'Une orientation fondée sur la recherche vers des facteurs bien documentés, pas un pari sur le marché.',
    'client.4.t': 'Patience', 'client.4.p': 'Accepte environ 5 % de tracking error et quelques années de retard.',
    'road.eyebrow': 'Nos ambitions', 'road.title': 'Une stratégie aujourd\'hui. <em>Une maison de recherche demain.</em>',
    'road.1.w': 'OCTOBRE 2026', 'road.1.t': 'Création', 'road.1.p': 'Stratégie phare Smart Beta 60/40 conçue et testée sur 20 ans, hors échantillon.',
    'road.2.w': 'JANVIER 2027', 'road.2.t': 'Premier rebalancement en réel', 'road.2.p': 'Appliquer la règle en temps réel et lancer un historique de gestion fictive, publié chaque mois.',
    'road.3.t': 'Univers élargi', 'road.3.p': 'Ajouter des ETF de petites capitalisations européennes et mondiales, et tester un facteur qualité dans le score.',
    'road.4.w': 'ENSUITE', 'road.4.t': 'Maison de recherche', 'road.4.p': 'Des perspectives trimestrielles, des notes de recherche ouvertes et de nouvelles stratégies, chacune testée avant lancement.',

    /* strategy */
    'strat.title': 'Stratégie · Horus Asset Management', 'strat.eyebrow': 'Stratégie phare',
    'strat.h1': 'Horus Smart Beta 60/40 : <em>un 60/40 qui détient les bonnes actions.</em>',
    'strat.lead': 'Le même 60/40. Des actions et des obligations mieux choisies. Des facteurs stratégiques qui ne changent jamais, une sélection tactique des fonds chaque janvier.',
    'strat.s1.eyebrow': 'L\'idée', 'strat.s1.title': 'Garder le budget de risque, <em>changer ce qu\'il contient.</em>',
    'strat.s1.p1': 'Un indice de marché détient chaque action en proportion de sa taille. Des décennies de recherche montrent que certains types d\'actions ont rapporté plus que d\'autres. Nous construisons la poche actions autour de trois d\'entre eux.',
    'strat.s1.p2': 'La poche actions détient deux ETF à 30 % chacun, choisis chaque janvier pour leur exposition à nos trois facteurs. La poche obligataire détient deux ETF à 20 % chacun, choisis pour leur ratio de Sharpe sur trois ans. Quatre fonds, une règle, une fois par an.',
    'fs.h': 'La stratégie en bref', 'fs.sub': 'Portefeuille modèle · caractéristiques', 'fs.obj': 'Objectif', 'fs.obj.v': 'Battre un 60/40 à risque comparable',
    'fs.bench': 'Indice de référence', 'fs.univ': 'Univers', 'fs.univ.v': '12 ETF actions · 7 ETF obligataires · or', 'fs.split': 'Actions / obligations', 'fs.split.v': '60 % / 40 %, permanent',
    'fs.hold': 'Positions', 'fs.hold.v': '4 ETF (2 actions, 2 obligations)', 'fs.lim': 'Limites par position', 'fs.lim.v': '≤ 30 % actions · ≤ 20 % obligations',
    'fs.reb': 'Rebalancement', 'fs.reb.v': 'Une fois par an, début janvier', 'fs.sig': 'Signaux', 'fs.sig.v': 'Carhart 4 facteurs · Sharpe 3 ans',
    'fs.ccy': 'Devise de référence', 'fs.track': 'Historique', 'fs.track.v': 'Backtest, janv. 2007 – août 2026',
    'fac.1.t': 'Petites capitalisations', 'fac.1.p': 'Les petites entreprises ont rapporté plus que les grandes sur le long terme : la prime de taille.',
    'fac.2.t': 'Croissance', 'fac.2.p': 'Les entreprises à forte croissance, dans la technologie et la santé, mènent le marché depuis 2009.', 'fac.2.r': 'Coefficient négatif sur le facteur value HML',
    'fac.3.t': 'Momentum', 'fac.3.p': 'Les gagnants de l\'année passée ont tendance à continuer de gagner pendant quelques mois.',
    'proc.eyebrow': 'Processus d\'investissement', 'proc.title': 'Chaque janvier, <em>quatre étapes.</em>',
    'proc.lead': 'Les facteurs restent les mêmes ; les fonds qui les portent changent. Tout le processus tient dans un tableur, et chaque chiffre peut être recalculé.',
    'proc.1.t': 'Mesurer', 'proc.1.p': 'Une régression de Carhart par ETF actions sur les 36 derniers mois : combien de SMB, HML et MOM il détient aujourd\'hui.',
    'proc.2.t': 'Noter', 'proc.2.p': 'z(SMB) + z(−HML) + z(MOM) : un point par écart-type au-dessus de l\'ETF moyen. Les trois comptent autant.',
    'proc.3.t': 'Sélectionner', 'proc.3.p': 'Le Solver achète les deux ETF actions les mieux notés et les deux ETF obligataires au meilleur ratio de Sharpe sur 3 ans.',
    'proc.4.t': 'Conserver', 'proc.4.p': 'Nous gardons les quatre fonds douze mois, puis recommençons. Peu de rotation, peu de frais.',
    'chip.1': 'Actions <b>60 %</b>, chaque ETF ≤ <b>30 %</b>', 'chip.2': 'Obligations <b>40 %</b>, chaque ETF ≤ <b>20 %</b>', 'chip.3': 'Achat uniquement, poids ≥ <b>0</b>', 'chip.4': 'Or <b>0 %</b>',
    'z.title': 'Exemple : le choix de la règle pour 2026', 'z.sub': 'Score actions, 3 meilleurs ETF sur 12, estimé sur 2023–2025. Les fonds surlignés sont achetés à 30 % chacun.',
    'z.c1': 'z petites cap.', 'z.c2': 'z croissance', 'z.c3': 'z momentum', 'z.c4': 'Score',
    'z.r1': 'IWM · Petites cap. US', 'z.r2': 'XLK · Technologie US', 'z.r3': 'IJH · Moyennes cap. US',
    'z.b.title': 'Poche obligataire : meilleur Sharpe 3 ans', 'z.b1': 'LQD · Crédit IG US', 'z.b2': 'RXRGEX · État allemand', 'z.b.note': 'Ratios de Sharpe mensuels. Chaque fonds acheté à 20 %.',
    'risk.eyebrow': 'Risques', 'risk.title': 'Quand notre stratégie <em>est en retard.</em>', 'risk.lead': 'Aucune stratégie ne gagne chaque année. Voici les situations auxquelles nos clients doivent s\'attendre.',
    'risk.1.t': 'Les années des méga-cap', 'risk.1.p': 'Quand quelques géants mènent, les petites capitalisations sont à la traîne : en 2023–2025 nous avons fait +8,6, +5,0 et +11,5 % contre +16,3, +10,2 et +15,9 %.',
    'risk.2.t': 'Retournements du momentum', 'risk.2.p': 'Le momentum peut se retourner brutalement, comme en 2009. C\'est pourquoi il n\'est qu\'un facteur sur trois, pas toute la stratégie.',
    'risk.3.t': 'Pas un abri', 'risk.3.p': 'Le 60/40 est permanent : en 2008 et 2022, notre poche actions a baissé avec le marché. Nous limitons les pertes, nous ne les évitons pas.',
    'strat.next': 'Voir les résultats →',

    /* performance */
    'perf.title': 'Performance · Horus Asset Management', 'perf.eyebrow': 'Vingt ans hors échantillon',
    'perf.h1': '100 sont devenus <em>540</em>, contre 320 pour le 60/40.',
    'perf.lead': 'Chaque mois ci-dessous est hors échantillon : chaque janvier, la règle n\'utilise que les trois années précédentes pour choisir. Backtest hypothétique, de janvier 2007 à août 2026, en USD.',
    'leg.bench': 'Indice 60/40', 'tg.all': 'Depuis 2007', 'tg.10': '10 ans', 'tg.5': '5 ans', 'tg.lin': 'Linéaire',
    'st.vs61': 'contre 6,1 %', 'st.cagr': 'Rendement annuel (CAGR)', 'st.vs109': 'contre 10,9 %', 'st.vol': 'Volatilité', 'st.alpha': 'Alpha de Jensen',
    'st.ir': 'Ratio d\'information', 'st.beta': 'Bêta vs indice', 'st.years': 'Années devant l\'indice', 'st.costs': 'Après frais et coûts de transaction', 'st.decades': 'Sharpe, première vs deuxième décennie',
    'ann.title': 'Année par année', 'ann.sub': 'Performances par année civile, en %. Or : Horus. Bleu : indice. 2026 : de janvier à août.',
    'sim.eyebrow': 'Simulateur', 'sim.title': 'Et si vous aviez investi <em>avec Horus ?</em>',
    'sim.lead': 'Choisissez un montant, une date de départ et une épargne mensuelle facultative. Le simulateur rejoue notre backtest mois par mois face à l\'indice 60/40.',
    'sim.amount': 'Investissement initial (USD)', 'sim.start': 'Départ', 'sim.monthly': 'Épargne mensuelle (USD)',
    'sim.note': 'Backtest hypothétique en USD, avant impôts et frais. Les performances passées ne préjugent pas des performances futures.',
    'hx.eyebrow': 'Explorateur des positions', 'hx.title': 'Les facteurs restent. <em>Les fonds bougent.</em>',
    'hx.lead': 'Parcourez vingt ans et découvrez les quatre ETF choisis par la règle chaque janvier. Petites capitalisations et technologie en 2019–2021, santé en 2022–2025, énergie quand elle menait.',
    'pf.center': 'PORTEFEUILLE 2026', 'pf.eyebrow': 'Portefeuille actuel', 'pf.title': 'Le portefeuille que nous détenons <em>pour 2026.</em>',
    'pf.1': 'Petites cap. US · actions', 'pf.2': 'Technologie US · actions', 'pf.3': 'Crédit investment grade US · obligations', 'pf.4': 'Obligations d\'État allemandes · obligations',
    'pf.note': 'Sélectionné en janvier 2026 sur les données 2023–2025. De janvier à août 2026 : +14,2 % contre +7,7 % pour l\'indice. Prochain rebalancement : premiers jours de bourse de janvier 2027.',
    'car.eyebrow': 'Risque et transparence', 'car.title': 'Nous livrons les expositions <em>promises.</em>',
    'car.lead': 'Une régression de Carhart de nos propres rendements mensuels. Face au 60/40, nos orientations sont nettes : +0,31 sur les petites cap., +0,10 sur le momentum. Une fois les facteurs comptés, l\'alpha restant n\'est pas significatif : nous vendons une exposition factorielle transparente, pas de la chance.',
    'car.1': 't = 6,0 · très significatif', 'car.2': 't = −1,6 · bon signe, non significatif', 'car.3': 't = 2,9 · significatif',
    'car.4.k': 'ALPHA RESTANT', 'car.4': 't = 1,1 · non significatif', 'car.4.c': 'par an, après les quatre facteurs',
    'car.note': 'MCO sur 236 rendements mensuels excédentaires ; |t| ≥ 2 signifie significatif à 5 %. Facteurs : Ken French Data Library (CRSP 202608).',

    /* insights */
    'ins.title': 'Analyses · Horus Asset Management', 'ins.eyebrow': 'Analyses', 'ins.h1': 'Reportings, perspectives <em>et recherche.</em>',
    'ins.lead': 'Ce que nous détenons, ce que nous voyons sur les marchés, et ce que nous avons testé en chemin.',
    'fsl.eyebrow': 'Reporting mensuel', 'fsl.title': 'La stratégie <em>en deux pages.</em>',
    'fsl.lead': 'Performance, statistiques de risque, performances annuelles, positions et expositions factorielles. Disponible en anglais et en français.',
    'fsl.archive': 'Archives',
    'out.eyebrow': 'Perspectives de marché · octobre 2026', 'out.title': 'Les taux sont revenus <em>à leurs niveaux de 2007.</em>',
    'out.lead': 'Les banques centrales resserrent de nouveau et les taux souverains mondiaux sont proches de 4 % : les obligations rapportent à nouveau, tandis que les actions proches de leurs records anticipent de bonnes nouvelles.',
    'out.1.l': 'FED FUNDS, BORNE HAUTE', 'out.1.p': 'Après la hausse du 16 septembre, la première depuis plus de trois ans.',
    'out.2.l': 'TAUX US À 10 ANS', 'out.2.p': 'Fin septembre, au plus haut depuis 2007, puis repassé sous 5 %.',
    'out.3.l': 'INFLATION US (CPI)', 'out.3.p': 'Toujours nettement au-dessus de la cible ; taux de dépôt de la BCE à 2,50 %.',
    'out.4.l': 'PÉTROLE BRENT', 'out.4.p': 'Attendu en baisse vers 80 $ d\'ici début 2027.',
    'out.v1': 'Consensus de marché', 'out.v1.1': 'Légèrement risk-on : les résultats et l\'IA tiennent', 'out.v1.2': 'Record du S&amp;P 500 à 7 799 le 13 août',
    'out.v1.3': 'Être sélectif ; prudence sur les méga-cap US', 'out.v1.4': 'Volatilité obligataire en hausse, volatilité actions calme', 'out.v1.5': 'Crédit investment grade privilégié',
    'out.v2': 'Notre lecture pour un 60/40', 'out.v2.1': 'Garder 40 % d\'obligations : elles rapportent à nouveau 4–5 %', 'out.v2.2': 'Ne pas détenir l\'indice aveuglément',
    'out.v2.3': 'S\'orienter vers petites cap., croissance et momentum', 'out.v2.4': 'Une règle, pas une prévision, choisit les fonds',
    'out.src': 'Sources : Amundi Investment Institute, Global Investment Views, octobre 2026 ; First Trust, A recap of September 2026 ; Réserve fédérale.',
    'res.eyebrow': 'Notes de recherche', 'res.title': 'Ce que nous avons testé, <em>et ce que nous en avons appris.</em>',
    'res.1.m': 'NOTE DE RECHERCHE · TIMING', 'res.1.t': 'Pourquoi nous gardons un 60/40 permanent',
    'res.1.p': 'Nous avons testé une règle de tendance mensuelle qui réduit les actions à 30 % quand le 60/40 fait moins bien que le monétaire.',
    'res.1.f': 'Elle réduit la perte maximale de −22,6 % à −16,3 %, mais baisse le rendement de 9,0 % à 8,4 %, le ratio d\'information de 0,54 à 0,33 et le Sharpe des dix dernières années de 0,70 à 0,65. Elle a manqué les rebonds de 2009, 2019 et 2020. Nous la gardons comme option pour des mandats plus prudents.',
    'res.2.m': 'NOTE DE RECHERCHE · FACTEURS', 'res.2.t': 'Trois facteurs valent mieux qu\'un seul',
    'res.2.p': 'Chaque facteur fonctionne seul, mais chacun subit seul des baisses de 26 à 29 %.',
    'res.2.f': 'Petites cap. seules : Sharpe 0,52, perte maximale −26,1 %. Croissance seule : 0,71 et −29,2 %. Momentum seul : 0,58 et −29,5 %. Ensemble, ils désignent des fonds différents selon les années, et la perte maximale tombe à −22,6 % avec un Sharpe de 0,69.',
    'res.3.m': 'NOTE DE RECHERCHE · CALENDRIER', 'res.3.t': 'Janvier ou octobre ?',
    'res.3.p': 'Nous avons testé un rebalancement chaque octobre au lieu de chaque janvier, sur les mêmes 227 mois.',
    'res.3.f': 'Janvier : 8,5 % par an, Sharpe 0,65, perte maximale −22,6 %. Octobre : 7,6 %, 0,57 et −31,4 %. L\'idée fonctionne aussi en octobre, elle ne dépend donc pas d\'une date, mais janvier fait mieux et utilise l\'année civile complète.',
    'res.4.m': 'NOTE DE RECHERCHE · RISQUE', 'res.4.t': 'Notre momentum est-il vraiment du momentum ?',
    'res.4.p': 'Nous avons régressé nos propres rendements sur les quatre facteurs de Carhart pour vérifier ce que nous détenons vraiment.',
    'res.4.f': 'Les coefficients petites cap. +0,19 (t = 6,0) et momentum +0,06 (t = 2,9) sont significatifs, alors que l\'indice 60/40 est négatif sur les deux. La croissance a le bon signe mais n\'est pas significative (t = −1,6). Avec des erreurs robustes de Newey-West, les conclusions tiennent. L\'alpha restant après les facteurs n\'est pas significatif : notre rendement vient des expositions que nous annonçons.',
    'nl.eyebrow': 'Newsletter', 'nl.title': 'Une lettre par mois. <em>Sans bruit.</em>',
    'nl.lead': 'Le nouveau reporting, une note de recherche et notre lecture des marchés, dans votre boîte mail au début de chaque mois.',
    'nl.privacy': 'Votre email sert uniquement à envoyer la lettre. Désinscription en un clic.',

    /* team */
    'team.title': 'Équipe · Horus Asset Management', 'team.eyebrow': 'L\'équipe', 'team.h1': 'Cinq personnes, <em>un comité d\'investissement.</em>',
    'team.lead': 'Chaque décision est prise ensemble, sur des données, et écrite avant d\'être appliquée.',
    'gov.eyebrow': 'Notre fonctionnement', 'gov.title': 'La gouvernance <em>d\'un petit comité d\'investissement.</em>',
    'gov.1.t': 'Les règles d\'abord', 'gov.1.p': 'Le processus est écrit avant de regarder les données. Aucune décision discrétionnaire.',
    'gov.2.t': 'Quatre yeux', 'gov.2.p': 'Chaque chiffre est calculé deux fois, dans Excel et en Python, et doit concorder.',
    'gov.3.t': 'Une voix chacun', 'gov.3.p': 'Toute modification de la stratégie demande une majorité du comité et un nouveau test hors échantillon.',
    'gov.4.t': 'Transparence totale', 'gov.4.p': 'Ce que nous avons testé et écarté est publié, pas caché.',
    'team.cta.eyebrow': 'Nous rejoindre', 'team.cta.title': 'Nous construisons <em>l\'équipe de recherche de 2027.</em>', 'team.cta.btn': 'Voir les postes',

    /* careers */
    'car2.title': 'Carrières · Horus Asset Management', 'car2.eyebrow': 'Carrières', 'car2.h1': 'Rejoindre <em>l\'équipe de recherche.</em>',
    'car2.lead': 'Horus est une maison de recherche étudiante. À partir de janvier 2027, nous gérons notre stratégie en réel et la publions chaque mois, et nous cherchons des étudiants qui veulent la construire avec nous.',
    'why.eyebrow': 'Pourquoi Horus', 'why.title': 'Apprendre la gestion d\'actifs <em>en la pratiquant.</em>',
    'why.1.t': 'Un vrai processus', 'why.1.p': 'Travaillez sur une stratégie à règles, des données jusqu\'au reporting, comme dans une société de gestion.',
    'why.2.t': 'Votre nom sur la recherche', 'why.2.p': 'Chaque note de recherche est signée par ses auteurs et publiée sur ce site.',
    'why.3.t': 'Un historique à montrer', 'why.3.p': 'Un historique de gestion fictive en réel dès 2027, idéal pour les entretiens de stage et d\'emploi.',
    'roles.eyebrow': 'Postes ouverts', 'roles.title': 'Quatre façons <em>de contribuer.</em>',
    'roles.tag': 'Rôle étudiant · Paris ou à distance · environ 3 h par semaine',
    'roles.1.t': 'Analyste recherche junior', 'roles.1.p': 'Tester de nouveaux facteurs (qualité, faible volatilité), étendre l\'univers aux petites cap. européennes, écrire une note de recherche par trimestre.',
    'roles.1.l': '<b>Profil :</b> curiosité pour la finance académique, Excel, écriture claire.',
    'roles.2.t': 'Quant &amp; Data', 'roles.2.p': 'Mettre à jour les données mensuelles, faire tourner le backtest et les tests de Carhart en Python, automatiser le reporting.',
    'roles.2.l': '<b>Profil :</b> Python (pandas, numpy), rigueur, goût de l\'automatisation.',
    'roles.3.t': 'Macro &amp; Marchés', 'roles.3.p': 'Rédiger les perspectives de marché mensuelles et le commentaire du reporting, suivre les banques centrales et les taux.',
    'roles.3.l': '<b>Profil :</b> passion des marchés, lecture quotidienne de la presse financière, anglais concis.',
    'roles.4.t': 'Communication &amp; Design', 'roles.4.p': 'Animer la newsletter, le site et notre page LinkedIn, concevoir les graphiques de la lettre mensuelle.',
    'roles.4.l': '<b>Profil :</b> sens du design, réseaux sociaux, intérêt pour la finance.',
    'hire.eyebrow': 'Comment postuler', 'hire.title': 'Quatre étapes, <em>deux semaines.</em>',
    'hire.1.t': 'Postuler', 'hire.1.p': 'Envoyez votre CV et trois lignes sur le rôle qui vous intéresse.',
    'hire.2.t': 'Étude de cas', 'hire.2.p': 'Un cas court : analyser l\'exposition factorielle d\'un ETF de votre choix.',
    'hire.3.t': 'Rencontrer le comité', 'hire.3.p': 'Un échange de 30 minutes avec l\'équipe, puis une réponse sous une semaine.',
    'hire.4.t': 'Intégration', 'hire.4.p': 'Vous nous rejoignez pour le rebalancement de janvier 2027, le premier mené en réel.',
    'hire.btn': 'Postuler', 'hire.note': 'Horus est un projet académique : ces rôles sont des engagements étudiants bénévoles, pas des emplois.',

    /* contact */
    'con.title': 'Contact · Horus Asset Management', 'con.eyebrow': 'Contact', 'con.h1': 'Parlons de <em>votre 60/40.</em>',
    'con.lead': 'Des questions sur notre recherche, le backtest, l\'équipe ou une candidature ? Écrivez-nous.',
    'con.city': 'Ville', 'con.school': 'École', 'con.soon': 'Adresse bientôt disponible', 'con.web': 'Site',
    'con.name': 'Nom', 'con.subject': 'Objet', 'con.o1': 'Notre stratégie', 'con.o2': 'Le backtest', 'con.o3': 'Rejoindre l\'équipe', 'con.o4': 'Autre',
    'con.msg': 'Message', 'con.send': 'Envoyer',

    /* dynamic texts */
    'js.months': 'janv.,févr.,mars,avr.,mai,juin,juil.,août,sept.,oct.,nov.,déc.',
    'js.monthsLong': 'janvier,février,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre',
    'js.ytd': ' (janv.–août)', 'js.equity': 'ACTIONS', 'js.bonds': 'OBLIGATIONS', 'js.ytd2026': 'De janvier à août 2026', 'js.calyear': 'Année',
    'js.pause': '❚❚ Pause', 'js.play': '▶ Rejouer les 20 ans', 'js.read': 'Lire la suite', 'js.close': 'Fermer',
    'js.sim.invested': 'Total investi', 'js.sim.diff': 'Écart avec le 60/40', 'js.sim.cagr': 'Rendement annuel', 'js.sim.dd': 'Pire baisse en chemin', 'js.sim.period': 'Période',
    'js.fs.latest': 'Dernier reporting', 'js.fs.asof': 'Données à fin', 'js.fs.dl': 'Télécharger', 'js.li.soon': 'LinkedIn bientôt disponible',
    'js.news.soon': 'Les inscriptions ouvrent très bientôt. Merci de votre intérêt !', 'js.sending': 'Envoi…', 'js.news.ok': 'Merci ! Vous êtes inscrit.',
    'js.err': 'Une erreur est survenue. Merci de réessayer plus tard.', 'js.con.ok': 'Merci, nous vous répondons sous quelques jours.',
    'js.con.soon': 'Notre adresse email arrive très bientôt. Merci de votre patience !'
  };

  const KEY = 'horus-lang';
  let lang = 'en';
  try { lang = localStorage.getItem(KEY) || ((navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en'); } catch (_) { /* storage blocked */ }

  const api = {
    get lang() { return lang; },
    t(key, fallback) { return lang === 'fr' && FR[key] !== undefined ? FR[key] : fallback; },
    set(next) {
      lang = next === 'fr' ? 'fr' : 'en';
      try { localStorage.setItem(KEY, lang); } catch (_) { /* ignore */ }
      apply();
      document.dispatchEvent(new CustomEvent('horus:lang', { detail: lang }));
    }
  };
  window.HORUS_I18N = api;

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(e => {
      if (e.dataset.en === undefined) e.dataset.en = e.innerHTML;
      const fr = FR[e.dataset.i18n];
      e.innerHTML = lang === 'fr' && fr !== undefined ? fr : e.dataset.en;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(e => {
      if (e.dataset.enPh === undefined) e.dataset.enPh = e.getAttribute('placeholder') || '';
      const fr = FR[e.dataset.i18nPh];
      e.setAttribute('placeholder', lang === 'fr' && fr !== undefined ? fr : e.dataset.enPh);
    });
    document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('.lang button');
    if (b) api.set(b.dataset.lang);
  });
  apply();
})();
