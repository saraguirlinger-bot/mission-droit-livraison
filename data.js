/* ═══════════════════════════════════════════════════════════
   MISSION CABINET ALBARET — Serious game Droit · Première STMG
   Thème 1 : Qu'est-ce que le droit ? (1.1, 1.2, 1.3)
   Horizon PME — Sara Guirlinger
   ═══════════════════════════════════════════════════════════ */

const GAME = {
  storeKey: 'cabinetalbaret_droit_v1',
  salt: 'CA-DROIT-T1-1STMG-HPME',
  saveUrl: 'https://www.horizonpme.fr/save-droit.php',
  codePrefix: 'DR',
  mark: 'CA',
  brand: 'Cabinet Albaret',
  brandSub: 'Mission Droit',
  stripLabel: 'Première STMG · Droit · Thème 1',
  heroTag: 'Première STMG · Droit et économie · Thème 1',
  heroTitle: 'Mission<em>Cabinet Albaret</em>',
  heroSub: 'Stagiaire dans un cabinet d’avocats de Gaillac, vous traitez les dossiers de la semaine. À vous de montrer à quoi sert le droit, ce qui fait une règle juridique et d’où elle vient.',
  heroMetaVal: 'Thème 1',
  heroMetaLab: 'Qu’est-ce que le droit ?',
  footer: 'Horizon PME · Ressource pédagogique Droit',
  finalNote: 'Votre note est remise à Maître Albaret. Découvrez votre fiche de résultats.',
  resultsEyebrow: 'Fiche récapitulative · Mission Cabinet Albaret · Droit Première STMG',
  diagTitle: 'Diagnostic par partie du thème 1',
  partName: c => 'Partie 1.' + c,
  partsName: 'Parties 1.1, 1.2 et 1.3'
};

const PEOPLE = {
  albaret: { name: 'Claire Albaret', role: 'Avocate associée, fondatrice du cabinet', service: 'Cabinet', ini: 'CA', col: '#1A1A1A',
             bio: 'Inscrite au barreau d’Albi depuis 22 ans. Votre tutrice de stage. Sa devise : « Les faits d’abord, le droit ensuite. »' },
  yanis:   { name: 'Yanis Haddad', role: 'Avocat collaborateur', service: 'Cabinet', ini: 'YH', col: '#7A9E7E',
             bio: 'Spécialisé en droit du travail et en droit public. Il adore expliquer la jurisprudence au tableau blanc.' },
  sophie:  { name: 'Sophie Ortiz', role: 'Assistante juridique', service: 'Cabinet', ini: 'SO', col: '#8A8A84',
             bio: 'Trie le courrier, prépare les dossiers et connaît tous les greffes du Tarn.' },
  manon:   { name: 'Manon Berthier', role: 'Présidente de l’association « Les Nuits du Tarn »', service: 'Cliente', ini: 'MB', col: '#8C2F39',
             bio: 'Organise un festival de musique chaque été. Énergique, parfois un peu trop pressée.' },
  bruno:   { name: 'Bruno Fabre', role: 'Boulanger, employeur de 6 salariés', service: 'Client', ini: 'BF', col: '#B07A3A',
             bio: 'Tient une boulangerie place du Griffoul. Vient d’embaucher Lina, une jeune vendeuse.' },
  rouanet: { name: 'Lucie Rouanet', role: 'Mère de Lucas, élève de 1re', service: 'Cliente', ini: 'LR', col: '#5C6F8A',
             bio: 'Son fils Lucas, 17 ans, va au lycée en trottinette électrique.' },
  maire:   { name: 'Jean-Pierre Cassagne', role: 'Maire de Saint-Aurel (commune fictive)', service: 'Partie adverse', ini: 'JC', col: '#4A4A44',
             bio: 'Élu depuis 2020. Veut « remettre de l’ordre » dans le centre-bourg.' }
};
const ORG = null;

const DOSSIER_HTML = `
<div class="doc-card">
  <div class="doc-head"><span>Fiche cabinet</span><span>Cabinet Albaret · Avocats</span></div>
  <div class="doc-body">
    <p><b>Cabinet Albaret</b>, cabinet d’avocats installé à Gaillac (Tarn). Deux avocats, une assistante juridique.</p>
    <p>Domaines : droit des associations, droit du travail, droit public (litiges avec les communes), conseil aux particuliers.</p>
    <p>Juridictions habituelles : tribunaux du Tarn, cour d’appel de Toulouse, tribunal administratif de Toulouse.</p>
  </div>
</div>`;

/* Carte des juridictions (activité « Quel juge ? ») */
const COURTS = [
  { label: 'Ordre judiciaire · 1re instance', nodes: [
    { id: 'tj',   label: 'Tribunal judiciaire', sub: 'litiges civils' },
    { id: 'cph',  label: 'Conseil de prud’hommes', sub: 'contrat de travail' },
    { id: 'tc',   label: 'Tribunal de commerce', sub: 'litiges entre commerçants' },
    { id: 'tpol', label: 'Tribunal de police', sub: 'contraventions' },
    { id: 'tcor', label: 'Tribunal correctionnel', sub: 'délits' },
    { id: 'assi', label: 'Cour d’assises', sub: 'crimes' } ] },
  { label: 'Ordre judiciaire · recours', nodes: [
    { id: 'ca',   label: 'Cour d’appel de Toulouse', sub: 'appel' },
    { id: 'cass', label: 'Cour de cassation', sub: 'contrôle du droit' } ] },
  { label: 'Ordre administratif', nodes: [
    { id: 'ta',   label: 'Tribunal administratif de Toulouse', sub: '1re instance' },
    { id: 'caa',  label: 'Cour administrative d’appel de Toulouse', sub: 'appel' },
    { id: 'ce',   label: 'Conseil d’État', sub: 'cassation' } ] },
  { label: 'Hors des deux ordres', nodes: [
    { id: 'cc',   label: 'Conseil constitutionnel', sub: 'conformité des lois' } ] }
];

const MISSIONS = [
  { id: 'm1', num: 1, title: 'Le droit et ses fonctions', ch: 1, badge: 'Fonctions identifiées',
    intro: `<p>Lundi, 8 h 30. Le cabinet occupe le premier étage d’une maison de briques, près de la place du Griffoul. Maître Albaret pose une pile de courrier devant vous.</p>
            <p class="quote">« Ici, on ne récite pas le Code : on l’applique à des gens. Commence par comprendre à quoi sert le droit. Chaque dossier de cette pile en dit quelque chose. »</p>` },
  { id: 'm2', num: 2, title: 'La règle de droit', ch: 2, badge: 'Règle maîtrisée',
    intro: `<p>Mardi. Yanis Haddad a dessiné au tableau blanc une grande question : « C’est du droit, ça ? »</p>
            <p class="quote">« Les clients mélangent tout : la morale, le règlement du club de foot, les conseils du médecin et la loi. Ton travail aujourd’hui : reconnaître une vraie règle de droit et savoir à quelle situation elle s’applique. »</p>` },
  { id: 'm3', num: 3, title: 'Les sources du droit', ch: 3, badge: 'Sources hiérarchisées',
    intro: `<p>Mercredi et jeudi. Les dossiers se compliquent : Constitution, règlement européen, décret, convention collective, arrêt de la Cour de cassation…</p>
            <p class="quote">« Pour gagner un dossier, il faut savoir d’où vient la règle et laquelle l’emporte quand deux règles se contredisent », prévient Maître Albaret.</p>` },
  { id: 'm4', num: 4, title: 'L’arrêté anti-trottinettes', ch: 0, badge: 'Dossier plaidé',
    intro: `<p>Vendredi, 9 h. Lucie Rouanet entre dans le cabinet, un papier à la main.</p>
            <p class="quote">« Le maire de Saint-Aurel vient d’interdire les trottinettes électriques dans toute la commune, jour et nuit. Mon fils Lucas ne peut plus aller au lycée. Est-ce qu’il a le droit ? »</p>
            <p>Maître Albaret vous confie le dossier. Il mobilise tout le thème 1. C’est le plus exigeant.</p>` }
];

const EXTRA_BADGE = { after: 'a35', label: 'QPC analysée' };

const ARRETE_HTML = `<div class="doc-card"><div class="doc-head"><span>Arrêté municipal n° 2026-41</span><span>Commune de Saint-Aurel</span></div><div class="doc-body">
  <p>Le maire de Saint-Aurel,</p>
  <p>Vu le Code général des collectivités territoriales, notamment son article L. 2212-2 (pouvoirs de police du maire) ;<br>Vu le Code de la route ;<br>Considérant l’accident survenu le 12 septembre rue de la Bastide, au cours duquel un piéton a été blessé par une trottinette électrique ;</p>
  <p><b>Arrête :</b></p>
  <p><b>Article 1.</b> La circulation des trottinettes électriques est interdite sur l’ensemble du territoire de la commune, de jour comme de nuit.</p>
  <p><b>Article 2.</b> Toute infraction au présent arrêté sera punie de l’amende prévue pour les contraventions de 1re classe.</p>
</div></div>`;

/* ═══════════════════ ACTIVITÉS ═══════════════════ */
const ACTIVITIES = [

/* ─────────────── MISSION 1 — 1.1 ─────────────── */
{
  id: 'a11', mission: 'm1', ch: 1, title: 'Le courrier du matin',
  notions: ['Les fonctions du droit'],
  remediation: 'Le droit remplit quatre grandes fonctions : organiser la vie en société (fixer des règles communes), protéger les personnes (surtout les plus faibles), régler les conflits (par le juge ou un mode amiable) et faire évoluer la société (adapter les règles aux changements). Une même règle peut en remplir plusieurs : on retient sa fonction principale.',
  intro: 'Sophie Ortiz a trié le courrier et les revues juridiques. Maître Albaret vous demande de classer chaque situation selon la fonction principale du droit qu’elle illustre.',
  parts: [{
    type: 'sort', pts: 1,
    q: 'Classez chaque situation selon la fonction <u>principale</u> du droit qu’elle illustre.',
    cats: [ { id: 'O', label: 'Organiser la vie en société' }, { id: 'P', label: 'Protéger les personnes' }, { id: 'R', label: 'Régler les conflits' }, { id: 'E', label: 'Faire évoluer la société' } ],
    items: [
      { id: 'f1', cat: 'O', text: 'Le Code de la route impose de rouler à droite et fixe les règles de priorité.' },
      { id: 'f2', cat: 'O', text: 'Toute naissance doit être déclarée à la mairie dans les cinq jours.', why: 'La déclaration de naissance organise l’état civil : elle permet à chacun d’avoir une identité juridique.' },
      { id: 'f3', cat: 'P', text: 'La loi interdit de vendre de l’alcool aux mineurs.' },
      { id: 'f4', cat: 'P', text: 'Un client qui achète en ligne dispose de 14 jours pour changer d’avis.', why: 'Le délai de rétractation protège le consommateur, partie la plus faible face au vendeur professionnel.' },
      { id: 'f5', cat: 'R', text: 'Le juge fixe la somme que le garagiste doit rembourser à un client mécontent.' },
      { id: 'f6', cat: 'R', text: 'Le juge propose une médiation à deux voisins qui se disputent au sujet d’une haie.', why: 'La médiation est un mode de règlement des conflits, même si ce n’est pas le juge qui tranche.' },
      { id: 'f7', cat: 'E', text: 'En 2013, la loi ouvre le mariage aux couples de même sexe.' },
      { id: 'f8', cat: 'E', text: 'En 2019, un décret crée des règles propres aux trottinettes électriques, apparues massivement dans les villes.', why: 'Le droit s’adapte à une pratique nouvelle : c’est la fonction d’évolution.' }
    ],
    hint: 'Pour chaque situation, demandez-vous : la règle sert-elle d’abord à mettre de l’ordre, à défendre quelqu’un, à trancher un désaccord, ou à suivre un changement de la société ?',
    hint2: 'Notion à mobiliser : les <b>fonctions du droit</b>. Attention, une règle peut en remplir plusieurs : cherchez la fonction <b>principale</b>. Protéger vise une personne fragile (mineur, consommateur) ; régler un conflit suppose un désaccord déjà né.',
    explain: 'Organiser : Code de la route, déclaration de naissance. Protéger : mineurs, consommateurs. Régler les conflits : décision du juge, médiation. Faire évoluer : mariage pour tous, trottinettes.'
  }]
},
{
  id: 'a12', mission: 'm1', ch: 1, title: 'Droit ou morale ?',
  notions: ['Distinguer le droit et la morale'],
  remediation: 'La règle morale relève de la conscience : sa sanction est intérieure (remords) ou sociale (désapprobation). La règle de droit est sanctionnée par l’autorité publique (amende, dommages et intérêts, nullité…). Les deux se recoupent parfois (ne pas tuer), mais certaines règles de droit n’ont aucun contenu moral (rouler à droite) et beaucoup de règles morales ne sont pas juridiques.',
  intro: 'Manon Berthier, présidente du festival « Les Nuits du Tarn », est furieuse. Avant de traiter son dossier, Maître Albaret vous fait réviser une distinction de base.',
  parts: [
    {
      type: 'fields', pts: 0.75,
      q: 'Pour chaque règle, indiquez s’il s’agit d’une règle de droit, d’une règle morale, ou des deux.',
      shared: ['Règle de droit', 'Règle morale', 'Les deux'],
      rows: [
        { label: 'Ne pas mentir à ses amis.', answer: 1 },
        { label: 'Ne pas tuer.', answer: 2 },
        { label: 'Céder sa place à une personne âgée dans le bus.', answer: 1, why: 'C’est une règle de politesse et de morale : aucune sanction officielle n’est prévue.' },
        { label: 'Porter secours à une personne en danger quand on peut le faire sans risque.', answer: 2, why: 'C’est un devoir moral, mais aussi une obligation légale : la non-assistance à personne en danger est un délit.' },
        { label: 'Rouler à droite.', answer: 0, why: 'Cette règle n’a aucun contenu moral : elle organise simplement la circulation.' },
        { label: 'Déclarer ses revenus aux impôts chaque année.', answer: 0 }
      ],
      hint: 'Demandez-vous qui sanctionne celui qui ne respecte pas la règle : sa conscience et son entourage, ou l’État ? Ou les deux ?',
      hint2: 'Notion à mobiliser : la <b>sanction</b> distingue le droit de la morale. Certaines règles sont à la fois morales et juridiques ; d’autres sont juridiques sans être morales.',
      explain: 'Morale seule : ne pas mentir, céder sa place. Droit seul : rouler à droite, déclarer ses revenus. Les deux : ne pas tuer, porter secours.'
    },
    {
      type: 'choice', pts: 0.5,
      reveal: '<b>Le message de Manon.</b> « Mon ami Paul m’avait promis, autour d’un café, de tenir bénévolement la buvette samedi soir. Il n’est jamais venu, on a perdu au moins 800 € de ventes. Je veux que le juge le sanctionne ! »',
      q: 'Quelle réponse Maître Albaret va-t-elle le plus probablement donner à Manon ?',
      options: [
        { id: 'p1', ok: false, text: 'Paul a commis une infraction pénale en ne respectant pas sa parole : Manon peut porter plainte au commissariat.', why: 'Ne pas tenir une promesse n’est pas une infraction : aucun texte pénal ne le punit.' },
        { id: 'p2', ok: true,  text: 'Une promesse amicale de rendre un service gratuit relève en principe de la morale : son non-respect est regrettable, mais n’est pas sanctionné par le juge.' },
        { id: 'p3', ok: false, text: 'Toute promesse faite oralement est un contrat : Paul devra rembourser les 800 € de ventes perdues par le festival.', why: 'Un service amical rendu sans volonté de s’engager juridiquement n’est pas un contrat. Tout engagement n’est pas un engagement juridique.' },
        { id: 'p4', ok: false, text: 'Seule l’association peut sanctionner Paul, en lui infligeant une amende inscrite dans ses statuts.', why: 'Une association ne peut pas infliger une amende à une personne qui n’en est pas membre, et l’amende est une sanction publique.' }
      ],
      hint: 'Paul voulait-il vraiment s’engager juridiquement, ou rendre un service à une amie ?',
      hint2: 'Notion à mobiliser : la distinction <b>droit / morale</b>. Le juge ne sanctionne que la violation d’une règle de droit.',
      explain: 'La promesse de Paul est un engagement d’honneur : la sanction est morale (la déception de Manon, la perte de confiance), pas juridique.'
    }
  ]
},
{
  id: 'a13', mission: 'm1', ch: 1, title: 'Les valeurs du droit',
  notions: ['État de droit, laïcité, égalité, liberté, solidarité'],
  remediation: 'Le droit traduit des valeurs : l’État de droit (les pouvoirs publics eux-mêmes sont soumis au droit et contrôlés par des juges), la laïcité (neutralité de l’État, liberté de conscience), l’égalité (mêmes droits, interdiction des discriminations), la liberté (agir, s’exprimer, se déplacer dans le respect de la loi) et la solidarité (prise en charge collective des risques).',
  intro: 'Dans la revue de presse du cabinet, Yanis a surligné cinq articles. Pour chacun, il vous demande quelle valeur le droit protège.',
  parts: [{
    type: 'fields', pts: 1,
    q: 'Associez chaque situation à la valeur qu’elle illustre principalement.',
    shared: ['État de droit', 'Laïcité', 'Égalité', 'Liberté', 'Solidarité'],
    rows: [
      { label: 'Le tribunal administratif annule l’arrêté d’un maire qui interdisait une manifestation sans motif sérieux.', answer: 0, why: 'Même le maire est soumis au droit, et un juge peut annuler sa décision : c’est l’État de droit.' },
      { label: 'L’agente d’accueil de la mairie ne porte aucun signe religieux pendant son service.', answer: 1 },
      { label: 'Une entreprise est condamnée pour avoir écarté une candidate en raison de son nom.', answer: 2 },
      { label: 'Le festival peut se tenir et les artistes peuvent y exprimer leurs opinions, dans le respect de la loi.', answer: 3 },
      { label: 'Les cotisations de chacun financent l’assurance maladie, qui rembourse les soins de tous.', answer: 4 }
    ],
    hint: 'Cherchez qui est protégé, et contre quoi : contre l’arbitraire du pouvoir, contre une discrimination, contre une contrainte ?',
    hint2: 'Notion à mobiliser : les <b>valeurs</b> que le droit protège. L’État de droit concerne la soumission des pouvoirs publics au droit ; l’égalité concerne la non-discrimination.',
    explain: 'État de droit : le maire contrôlé par le juge. Laïcité : neutralité de l’agent public. Égalité : non-discrimination. Liberté : expression. Solidarité : assurance maladie.'
  }]
},
{
  id: 'a14', mission: 'm1', ch: 1, title: 'Laïcité : qui est concerné ?',
  notions: ['La laïcité et ses conséquences'],
  remediation: 'La laïcité impose la neutralité à l’État et à ses agents (fonctionnaires, enseignants), pas aux usagers des services publics. Depuis la loi de 2004, les élèves des écoles, collèges et lycées publics ne peuvent pas porter de signes religieux ostensibles. La laïcité garantit la liberté de conscience : chacun peut croire ou ne pas croire. Dans une entreprise privée, l’employeur ne peut limiter l’expression religieuse que si c’est justifié et proportionné, notamment par le règlement intérieur.',
  intro: 'Lucie Rouanet, mère d’un élève de 1re, appelle le cabinet avec plusieurs questions sur la laïcité.',
  parts: [{
    type: 'fields', pts: 1,
    q: 'Vrai ou faux ?',
    shared: ['Vrai', 'Faux'],
    rows: [
      { label: 'Au lycée public, un élève ne peut pas porter de signe religieux ostensible.', answer: 0 },
      { label: 'Une professeure de lycée public doit respecter la neutralité religieuse pendant son service.', answer: 0 },
      { label: 'Une mère d’élève qui vient chercher un bulletin au secrétariat doit retirer son signe religieux.', answer: 1, why: 'La neutralité s’impose aux agents publics, pas aux usagers qui se rendent dans un service public.' },
      { label: 'La laïcité interdit aux élèves d’avoir une religion.', answer: 1, why: 'Au contraire, la laïcité garantit la liberté de conscience : chacun peut croire ou ne pas croire.' },
      { label: 'Dans sa boulangerie, M. Fabre peut interdire tout signe religieux à ses salariés, sans avoir à se justifier.', answer: 1, why: 'Dans une entreprise privée, une restriction n’est possible que si elle est justifiée et proportionnée, et prévue notamment par le règlement intérieur.' }
    ],
    hint: 'Distinguez trois situations : l’agent qui représente l’État, l’usager d’un service public, le salarié d’une entreprise privée.',
    hint2: 'Notion à mobiliser : la <b>laïcité</b> impose la neutralité à l’État et à ses agents, et protège la liberté de conscience de tous.',
    explain: 'Neutralité pour les agents publics et, depuis 2004, interdiction des signes ostensibles pour les élèves du public. Les usagers restent libres. Dans le privé, les restrictions doivent être justifiées et proportionnées.'
  }]
},
{
  id: 'a15', mission: 'm1', ch: 1, title: 'Le contrat de Lina',
  notions: ['L’ordre public', 'Les limites de la liberté contractuelle'],
  remediation: 'L’ordre public regroupe les règles auxquelles on ne peut pas déroger par contrat, même si tout le monde est d’accord (« On ne peut déroger, par des conventions particulières, aux lois qui intéressent l’ordre public », article 6 du Code civil). Une clause contraire à l’ordre public est nulle : elle est écartée et la règle légale s’applique à sa place.',
  intro: 'Bruno Fabre a rédigé seul le contrat de travail de Lina, sa nouvelle vendeuse, à temps plein. Il demande au cabinet de le relire avant la signature.',
  parts: [
    {
      type: 'highlight', pts: 0.75,
      q: 'Sélectionnez <u>uniquement</u> les clauses contraires à l’ordre public.',
      head: 'Contrat de travail à durée indéterminée · Boulangerie Fabre',
      segments: [
        { t: 'Article 1 — Lina Moreau est engagée en qualité de vendeuse, à temps plein.', ok: false },
        { t: 'Article 2 — Le lieu de travail est fixé à la boulangerie, place du Griffoul, à Gaillac.', ok: false },
        { t: 'Article 3 — Les horaires sont fixés de 5 h à 12 h, du mardi au samedi.', ok: false, why: 'Sept heures par jour, cinq jours par semaine : 35 heures. Rien d’illégal.' },
        { t: 'Article 4 — La période d’essai est fixée à deux mois.', ok: false, why: 'Deux mois est la durée maximale légale pour un employé : la clause est valable.' },
        { t: 'Article 5 — Lina percevra un salaire de 1 450 € brut par mois.', ok: true },
        { t: 'Article 6 — Lina renonce à ses congés payés en échange d’une prime annuelle de 300 €.', ok: true },
        { t: 'Article 7 — Lina s’engage à ne pas se marier pendant toute la durée du contrat.', ok: true },
        { t: 'Article 8 — En cas de désaccord, Lina s’interdit de saisir le conseil de prud’hommes.', ok: true }
      ],
      hint: 'Repérez les clauses qui privent Lina d’un droit que la loi lui garantit à tous les coups : un salaire minimum, des congés, une liberté personnelle, l’accès au juge.',
      hint2: 'Notion à mobiliser : l’<b>ordre public</b>. Pour un temps plein, le salaire ne peut pas être inférieur au SMIC (plus de 1 800 € brut par mois). Les congés payés, la liberté du mariage et le droit d’aller devant un juge ne peuvent pas être supprimés par contrat.',
      explain: 'Quatre clauses sont contraires à l’ordre public : salaire inférieur au SMIC, renonciation aux congés payés, clause de célibat, interdiction de saisir le juge. Les autres sont valables.'
    },
    {
      type: 'choice', pts: 0.5,
      q: 'Bruno Fabre objecte : « Lina va signer, elle est d’accord. » Quelle est la conséquence juridique pour ces clauses ?',
      options: [
        { id: 'o1', ok: false, text: 'Elles sont valables, puisque Lina les accepte librement en signant le contrat : c’est la liberté contractuelle.', why: 'La liberté contractuelle s’arrête là où commence l’ordre public : l’accord des parties ne suffit pas.' },
        { id: 'o2', ok: false, text: 'Le contrat de travail tout entier est nul : Lina ne pourra pas être embauchée tant qu’un nouveau contrat n’est pas rédigé.', why: 'Seules les clauses illicites sont écartées ; le reste du contrat s’applique.' },
        { id: 'o3', ok: true,  text: 'Ces clauses sont nulles : elles sont écartées, le reste du contrat s’applique, et Lina bénéficie des règles légales (SMIC, congés payés).' },
        { id: 'o4', ok: false, text: 'Elles sont valables si M. Fabre verse à Lina une compensation financière suffisante pour chacun des droits perdus.', why: 'On ne peut pas « acheter » la renonciation à un droit d’ordre public.' }
      ],
      hint: 'L’accord des deux parties suffit-il toujours à rendre une clause valable ?',
      hint2: 'Notion à mobiliser : on ne peut pas déroger par contrat aux règles d’<b>ordre public</b> (article 6 du Code civil).',
      explain: 'Les clauses contraires à l’ordre public sont nulles, même acceptées. Le contrat subsiste et la loi s’applique à leur place.'
    }
  ]
},

/* ─────────────── MISSION 2 — 1.2 ─────────────── */
{
  id: 'a21', mission: 'm2', ch: 2, title: 'C’est du droit, ça ?',
  notions: ['Distinguer la règle de droit des autres règles sociales'],
  remediation: 'Une règle de droit émane d’une autorité légitime (Parlement, Gouvernement, maire, Union européenne, partenaires sociaux habilités par la loi…) et son non-respect est sanctionné par l’autorité publique. Les règles de politesse, religieuses, sportives ou de jeu ne sont pas des règles de droit, même quand elles prévoient une « sanction ».',
  intro: 'Yanis a collé au tableau blanc huit règles relevées par les clients du cabinet.',
  parts: [{
    type: 'sort', pts: 0.75,
    q: 'Classez chaque règle : est-ce une règle de droit ?',
    cats: [ { id: 'D', label: 'Règle de droit' }, { id: 'N', label: 'Autre règle sociale' } ],
    items: [
      { id: 'r1', cat: 'D', text: 'Article 9 du Code civil : « Chacun a droit au respect de sa vie privée. »' },
      { id: 'r2', cat: 'N', text: 'Club de rugby : « Tout joueur en retard à l’entraînement paie les croissants. »', why: 'Il y a bien une « sanction », mais elle est fixée par le groupe, pas par l’autorité publique.' },
      { id: 'r3', cat: 'D', text: 'Arrêté du maire limitant la vitesse à 30 km/h dans le centre-bourg.', why: 'Le maire est une autorité légitime : son arrêté est une règle de droit.' },
      { id: 'r4', cat: 'N', text: 'Règle du Monopoly : « Le joueur qui passe par la case départ reçoit 200 €. »' },
      { id: 'r5', cat: 'N', text: '« On ne parle pas la bouche pleine. »' },
      { id: 'r6', cat: 'D', text: 'Convention collective de la boulangerie : prime d’ancienneté après trois ans.', why: 'Négociée par les syndicats et les employeurs dans le cadre fixé par la loi, elle s’impose et le juge peut la faire respecter.' },
      { id: 'r7', cat: 'N', text: 'Interdit alimentaire prescrit par une religion.' },
      { id: 'r8', cat: 'D', text: 'Règlement européen sur la protection des données (RGPD).' }
    ],
    hint: 'Pour chaque règle : qui l’a fixée ? Et qui sanctionnerait celui qui ne la respecte pas ?',
    hint2: 'Notion à mobiliser : une règle de droit émane d’une <b>autorité légitime</b> et est sanctionnée par l’<b>autorité publique</b>. Une « sanction » fixée par un groupe privé ne suffit pas.',
    explain: 'Règles de droit : Code civil, arrêté municipal, convention collective, RGPD. Autres règles : sport, jeu, politesse, religion.'
  }]
},
{
  id: 'a22', mission: 'm2', ch: 2, title: 'Le caractère qui manque',
  notions: ['Les caractères de la règle de droit'],
  remediation: 'Une règle de droit est générale et impersonnelle (elle vise une catégorie de personnes, pas quelqu’un de nommé), obligatoire (elle s’impose, « nul n’est censé ignorer la loi » dès sa publication), coercitive (son non-respect est sanctionné par l’autorité publique) et émise par une autorité légitime.',
  intro: 'Trois documents sont arrivés au cabinet. Aucun n’est une règle de droit. Yanis vous demande de dire pourquoi.',
  parts: [
    {
      type: 'fields', pts: 0.5,
      q: 'Pour chaque document, indiquez le caractère de la règle de droit qui fait <u>principalement</u> défaut.',
      shared: ['Générale et impersonnelle', 'Obligatoire', 'Émise par une autorité légitime', 'Publiée au Journal officiel'],
      rows: [
        { label: 'Une décision du maire autorise <b>M. Fabre</b>, et lui seul, à installer une terrasse devant sa boulangerie.', answer: 0, why: 'La décision vise une personne nommée : c’est une décision individuelle, pas une règle générale et impersonnelle.' },
        { label: 'Une campagne du ministère de la Santé conseille de « manger cinq fruits et légumes par jour ».', answer: 1, why: 'C’est un conseil : personne n’est obligé de le suivre et aucune sanction n’est prévue.' },
        { label: 'Des voisins décident entre eux que personne ne tondra le dimanche, et menacent de crever les pneus des contrevenants.', answer: 2, why: 'Un groupe de voisins n’a aucun pouvoir pour créer une règle de droit, et la « sanction » envisagée est elle-même illégale.' }
      ],
      hint: 'Pour chaque document, passez en revue les caractères un par un : qui est visé ? est-on obligé ? qui l’a décidé ?',
      hint2: 'Notion à mobiliser : les <b>caractères de la règle de droit</b>. La publication au Journal officiel concerne les lois et décrets, pas toutes les règles : ce n’est pas un caractère de la règle de droit.',
      explain: 'Terrasse : décision individuelle, pas générale. Cinq fruits et légumes : simple conseil, pas obligatoire. Voisins : aucune autorité légitime.'
    },
    {
      type: 'choice', pts: 0.5,
      reveal: '<b>Le lendemain.</b> M. Fabre a été verbalisé à 45 km/h dans le centre-bourg. « Je ne savais pas que le maire avait abaissé la limite à 30 ! Je n’ai reçu aucun courrier. »',
      q: 'Que lui répond Maître Albaret ?',
      options: [
        { id: 'n1', ok: false, text: 'Il a raison : une règle ne s’applique qu’aux personnes qui en ont été personnellement informées par courrier.', why: 'Une règle générale ne fait pas l’objet d’une notification individuelle : elle est publiée ou affichée.' },
        { id: 'n2', ok: true,  text: 'Une règle de droit est obligatoire dès qu’elle a été publiée ou affichée : « nul n’est censé ignorer la loi ». Son ignorance ne l’excuse pas.' },
        { id: 'n3', ok: false, text: 'L’arrêté ne s’applique pas à lui puisqu’il ne fait pas partie du conseil municipal qui a voté la limitation.', why: 'Une règle de droit s’applique à tous ceux qu’elle vise, pas seulement à ceux qui l’ont adoptée.' },
        { id: 'n4', ok: false, text: 'La règle s’applique, mais sa bonne foi oblige le juge à annuler l’amende.', why: 'La bonne foi ne permet pas d’échapper à une règle obligatoire régulièrement publiée.' }
      ],
      hint: 'Comment une règle générale est-elle portée à la connaissance de tous ?',
      hint2: 'Notion à mobiliser : le caractère <b>obligatoire</b> de la règle de droit et l’adage « nul n’est censé ignorer la loi ».',
      explain: 'Une fois publiée ou affichée, la règle s’impose à tous. Sinon, il suffirait de prétendre l’ignorer pour y échapper.'
    }
  ]
},
{
  id: 'a23', mission: 'm2', ch: 2, title: 'Qualifier les faits',
  notions: ['La qualification juridique'],
  remediation: 'Qualifier juridiquement, c’est rattacher des faits concrets à une catégorie juridique (vente entre particuliers, contrat de consommation, prêt, infraction…) pour savoir quelle règle de droit s’applique. Un détail des faits peut tout changer : si le vendeur agit en professionnel, la vente devient un contrat de consommation et l’acheteur est protégé.',
  intro: 'Maître Albaret insiste : « Avant de chercher la règle, il faut nommer juridiquement la situation. C’est la qualification. » Quatre clients exposent leur situation.',
  parts: [
    {
      type: 'fields', pts: 0.75,
      q: 'Choisissez la qualification juridique de chaque situation.',
      rows: [
        { label: 'Hugo, lycéen, vend sa console d’occasion à Inès, particulière, via une application de petites annonces.', options: ['Vente entre particuliers', 'Contrat de consommation', 'Donation', 'Prêt'], answer: 0, why: 'Ni Hugo ni Inès n’agissent en professionnels : le droit de la consommation ne s’applique pas.' },
        { label: 'La boulangerie Fabre vend un gâteau d’anniversaire à un client.', options: ['Contrat de consommation', 'Vente entre particuliers', 'Contrat de travail', 'Donation'], answer: 0, why: 'Un professionnel vend à un consommateur : c’est un contrat de consommation.' },
        { label: 'Léa prête gratuitement son vélo à son cousin pour le week-end.', options: ['Prêt', 'Location', 'Donation', 'Vente'], answer: 0, why: 'Le vélo devra être rendu, et aucun prix n’est payé : ce n’est ni une location ni une donation.' },
        { label: 'Un adolescent casse volontairement la vitrine de la boulangerie.', options: ['Infraction pénale', 'Simple maladresse sans conséquence juridique', 'Rupture de contrat', 'Litige commercial'], answer: 0 }
      ],
      hint: 'Pour chaque situation, regardez trois choses : qui sont les personnes (particulier, professionnel) ? y a-t-il un prix ? la chose doit-elle être rendue ?',
      hint2: 'Notion à mobiliser : la <b>qualification juridique</b> dépend des faits précis : qualité des parties, existence d’un prix, intention.',
      explain: 'Vente entre particuliers ; contrat de consommation ; prêt ; infraction pénale (dégradation volontaire du bien d’autrui).'
    },
    {
      type: 'choice', pts: 0.5,
      reveal: '<b>Nouvelle information.</b> En réalité, Hugo achète chaque mois une dizaine de consoles d’occasion pour les revendre avec un bénéfice. La console vendue à Inès tombe en panne au bout d’une semaine.',
      q: 'Comment cette information modifie-t-elle l’analyse ?',
      options: [
        { id: 'q1', ok: false, text: 'Elle ne change rien : la qualification dépend uniquement de ce qui est écrit dans l’annonce publiée par Hugo.', why: 'La qualification se fait à partir des faits réels, pas seulement de ce que les parties déclarent.' },
        { id: 'q2', ok: true,  text: 'Hugo agit en réalité comme un professionnel : la vente peut être requalifiée en contrat de consommation, et Inès bénéficie des garanties du consommateur.' },
        { id: 'q3', ok: false, text: 'C’est Hugo qui devient consommateur, puisqu’il achète lui-même des consoles chaque mois.', why: 'Dans la vente à Inès, Hugo est vendeur. C’est sa qualité de vendeur habituel qui compte.' },
        { id: 'q4', ok: false, text: 'La vente est automatiquement nulle, puisque Hugo n’a pas déclaré son activité de revendeur.', why: 'Le défaut de déclaration peut poser d’autres problèmes, mais n’annule pas automatiquement la vente.' }
      ],
      hint: 'La qualification de la vente dépend de la qualité des personnes. Qui est vraiment Hugo dans cette vente ?',
      hint2: 'Notion à mobiliser : un changement dans les faits entraîne une <b>requalification</b>, donc l’application d’autres règles.',
      explain: 'Une activité habituelle de revente fait de Hugo un vendeur professionnel : les règles protectrices du consommateur peuvent s’appliquer à Inès.'
    }
  ]
},
{
  id: 'a24', mission: 'm2', ch: 2, title: 'L’autorité légitime',
  notions: ['L’autorité légitime'],
  remediation: 'Seules certaines autorités peuvent créer des règles de droit : le Parlement (lois), le Gouvernement (décrets), les ministres, préfets et maires (arrêtés), l’Union européenne (règlements, directives), et dans certains cas les partenaires sociaux (conventions collectives). Une personne influente, une association ou un groupe de citoyens n’a pas ce pouvoir.',
  intro: 'Manon veut savoir qui peut « faire la loi » à Saint-Aurel pour encadrer son festival.',
  parts: [{
    type: 'multi', pts: 0.75,
    q: 'Quelles autorités peuvent adopter une règle de droit applicable au festival de Saint-Aurel ? Plusieurs réponses possibles.',
    options: [
      { id: 'u1', ok: true,  text: 'Le Parlement, en votant une loi.' },
      { id: 'u2', ok: true,  text: 'Le Premier ministre, en signant un décret.' },
      { id: 'u3', ok: true,  text: 'Le préfet du Tarn, par un arrêté préfectoral.' },
      { id: 'u4', ok: true,  text: 'Le maire de Saint-Aurel, par un arrêté municipal.' },
      { id: 'u5', ok: true,  text: 'L’Union européenne, par un règlement.' },
      { id: 'u6', ok: false, text: 'Le bureau de l’association « Les Nuits du Tarn », par une décision votée à l’unanimité.', why: 'Le bureau d’une association peut fixer des règles internes à l’association, pas des règles de droit qui s’imposent à tous.' },
      { id: 'u7', ok: false, text: 'Les habitants de Saint-Aurel, par une pétition signée par plus de la moitié d’entre eux.', why: 'Une pétition exprime une demande, elle ne crée pas de règle de droit.' },
      { id: 'u8', ok: false, text: 'Maître Albaret, avocate, en rédigeant une consultation juridique.', why: 'L’avocat conseille et défend : il ne crée pas de règle de droit.' }
    ],
    hint: 'Une autorité légitime tient son pouvoir de la Constitution, de la loi ou des traités. Écartez ceux qui n’ont qu’une influence ou un pouvoir interne.',
    hint2: 'Notion à mobiliser : l’<b>autorité légitime</b>. Le nombre de signataires ou l’unanimité ne remplacent pas la compétence donnée par le droit.',
    explain: 'Parlement, Premier ministre, préfet, maire et Union européenne sont des autorités légitimes. Une association, une pétition ou une avocate n’en sont pas.'
  }]
},

/* ─────────────── MISSION 3 — 1.3 ─────────────── */
{
  id: 'a31', mission: 'm3', ch: 3, title: 'D’où vient la règle ?',
  notions: ['Identifier les sources du droit'],
  remediation: 'On distingue les sources constitutionnelles (Constitution de 1958, Déclaration de 1789, Préambule de 1946, Charte de l’environnement), internationales et européennes (traités, règlements et directives de l’UE), législatives et réglementaires (lois, décrets, arrêtés), la jurisprudence (décisions des juges, surtout de la Cour de cassation et du Conseil d’État) et les sources conventionnelles (conventions et accords collectifs).',
  intro: 'Sophie Ortiz range la bibliothèque du cabinet. Elle vous demande de l’aider à classer les textes par source.',
  parts: [{
    type: 'sort', pts: 1,
    q: 'Classez chaque texte selon la source du droit dont il relève.',
    cats: [ { id: 'C', label: 'Constitutionnelle' }, { id: 'I', label: 'Internationale et européenne' }, { id: 'L', label: 'Lois et règlements' }, { id: 'J', label: 'Jurisprudence' }, { id: 'K', label: 'Conventionnelle' } ],
    items: [
      { id: 's1', cat: 'C', text: 'Déclaration des droits de l’homme et du citoyen de 1789', why: 'Elle fait partie du bloc de constitutionnalité, au même niveau que la Constitution de 1958.' },
      { id: 's2', cat: 'C', text: 'Charte de l’environnement de 2004' },
      { id: 's3', cat: 'I', text: 'Règlement général sur la protection des données (RGPD)' },
      { id: 's4', cat: 'I', text: 'Convention européenne des droits de l’homme' },
      { id: 's5', cat: 'L', text: 'Article du Code du travail voté par le Parlement' },
      { id: 's6', cat: 'L', text: 'Décret fixant le montant du SMIC', why: 'Un décret est un acte réglementaire du Gouvernement.' },
      { id: 's7', cat: 'L', text: 'Arrêté municipal de Saint-Aurel' },
      { id: 's8', cat: 'J', text: 'Arrêt de la Cour de cassation sur le droit à l’image' },
      { id: 's9', cat: 'K', text: 'Convention collective nationale de la boulangerie-pâtisserie' }
    ],
    hint: 'Pour chaque texte, demandez-vous qui l’a produit : les constituants, l’Union européenne ou un traité, le Parlement ou le Gouvernement, des juges, ou des syndicats et des employeurs ?',
    hint2: 'Notion à mobiliser : les <b>sources du droit</b>. Le bloc de constitutionnalité comprend plusieurs textes historiques ; un décret ou un arrêté est une source réglementaire.',
    explain: 'Constitutionnelle : DDHC, Charte de l’environnement. Européenne et internationale : RGPD, CEDH. Lois et règlements : Code du travail, décret, arrêté. Jurisprudence : arrêt de la Cour de cassation. Conventionnelle : convention collective.'
  }]
},
{
  id: 'a32', mission: 'm3', ch: 3, title: 'La pyramide des normes',
  notions: ['La hiérarchie des normes', 'Convention collective et contrat de travail'],
  remediation: 'Chaque norme doit respecter celles qui lui sont supérieures : Constitution, puis traités et droit de l’Union européenne, puis lois, puis règlements (décrets, puis arrêtés). En droit du travail, le contrat de travail doit respecter la convention collective, qui doit respecter la loi ; le contrat peut prévoir mieux pour le salarié, pas moins bien.',
  intro: 'Yanis dessine une pyramide vide au tableau blanc : « Si tu sais la remplir, tu sais quelle règle l’emporte. »',
  parts: [
    {
      type: 'order', pts: 0.75,
      q: 'Classez ces normes de la plus haute (en haut) à la plus basse (en bas).',
      items: [
        { id: 'h1', text: 'Constitution du 4 octobre 1958' },
        { id: 'h2', text: 'Règlement européen (RGPD)' },
        { id: 'h3', text: 'Loi votée par le Parlement' },
        { id: 'h4', text: 'Décret du Premier ministre' },
        { id: 'h5', text: 'Arrêté du maire de Saint-Aurel' }
      ],
      hint: 'Commencez par les deux extrémités : quelle norme fonde toutes les autres ? Laquelle émane de l’autorité la plus locale ?',
      hint2: 'Notion à mobiliser : la <b>hiérarchie des normes</b>. Le droit de l’Union européenne est supérieur aux lois françaises ; un décret doit respecter la loi ; un arrêté municipal doit respecter les décrets.',
      explain: 'Constitution, puis droit de l’Union européenne, puis loi, puis décret, puis arrêté municipal.'
    },
    {
      type: 'order', pts: 0.5,
      q: 'Même exercice en droit du travail, pour Lina : de la norme la plus haute à la plus basse.',
      items: [
        { id: 'w1', text: 'Code du travail (loi)' },
        { id: 'w2', text: 'Convention collective de la boulangerie' },
        { id: 'w3', text: 'Contrat de travail de Lina' }
      ],
      hint: 'Le contrat de Lina a été signé par deux personnes ; la convention collective concerne toute une profession.',
      hint2: 'Notion à mobiliser : la convention collective s’inscrit dans le cadre de la loi ; le contrat de travail s’inscrit dans le cadre de la convention collective.',
      explain: 'Loi, puis convention collective, puis contrat de travail.'
    },
    {
      type: 'choice', pts: 0.5,
      reveal: '<b>Nouvelle information.</b> Après trois ans, le contrat de Lina prévoit une prime d’ancienneté de 2 %. La convention collective de la boulangerie prévoit 3 %.',
      q: 'Quelle prime Lina doit-elle percevoir ?',
      options: [
        { id: 'k1', ok: false, text: '2 %, puisque c’est ce que prévoit le contrat que Lina a signé.', why: 'Le contrat ne peut pas être moins favorable que la convention collective qui s’applique à l’entreprise.' },
        { id: 'k2', ok: true,  text: '3 % : le contrat de travail ne peut pas prévoir moins que la convention collective, qui lui est supérieure.' },
        { id: 'k3', ok: false, text: '2,5 % : en cas de contradiction entre deux textes, on retient la moyenne des deux.', why: 'Il n’existe aucune règle de « moyenne » : la hiérarchie des normes tranche.' },
        { id: 'k4', ok: false, text: 'Aucune prime, puisque les deux textes se contredisent et s’annulent mutuellement.', why: 'Une contradiction ne fait pas disparaître les deux règles : la norme supérieure l’emporte.' }
      ],
      hint: 'Laquelle de ces deux normes est placée plus haut dans la pyramide que vous venez de construire ?',
      hint2: 'Notion à mobiliser : la <b>hiérarchie des normes</b> en droit du travail. Le contrat peut faire mieux pour le salarié, pas moins bien.',
      explain: 'La convention collective est supérieure au contrat : Lina a droit à 3 %. Si son contrat avait prévu 4 %, elle aurait eu 4 %.'
    }
  ]
},
{
  id: 'a33', mission: 'm3', ch: 3, title: 'Qui fait quoi ?',
  notions: ['Lois, règlements et leurs auteurs', 'Le droit de l’Union européenne'],
  remediation: 'La loi est votée par le Parlement. Les décrets sont pris par le Premier ministre ou le Président de la République ; les arrêtés par les ministres, préfets et maires. Un règlement européen s’applique directement dans tous les États membres ; une directive fixe un résultat à atteindre et doit être transposée par chaque État. Le droit de l’Union européenne l’emporte sur la loi française.',
  intro: 'Pour préparer un dossier, Yanis vous demande d’identifier l’auteur de plusieurs textes.',
  parts: [
    {
      type: 'fields', pts: 0.75,
      q: 'Qui a adopté chacun de ces textes ?',
      shared: ['Le Parlement', 'Le Premier ministre ou le Président', 'Un ministre', 'Le maire', 'Des juges'],
      rows: [
        { label: 'Une loi modifiant le Code du travail', answer: 0 },
        { label: 'Le décret fixant le montant du SMIC', answer: 1 },
        { label: 'L’arrêté fixant le programme de droit et économie de 1re STMG', answer: 2, why: 'Les programmes scolaires sont fixés par arrêté du ministre de l’Éducation nationale.' },
        { label: 'L’arrêté interdisant les feux d’artifice privés à Saint-Aurel', answer: 3 },
        { label: 'Un arrêt de la Cour de cassation', answer: 4, why: 'Un arrêt est une décision de justice : il relève de la jurisprudence.' }
      ],
      hint: 'Attention au mot « arrêté » : il peut venir de plusieurs autorités. Regardez qui est concerné par le texte.',
      hint2: 'Notion à mobiliser : chaque source a son <b>auteur</b>. Loi : Parlement ; décret : Premier ministre ou Président ; arrêté : ministre, préfet ou maire ; arrêt : juges.',
      explain: 'Loi : Parlement. Décret : Gouvernement. Programme scolaire : arrêté ministériel. Feux d’artifice : arrêté municipal. Arrêt : juges de la Cour de cassation.'
    },
    {
      type: 'fields', pts: 0.75,
      q: 'Le droit de l’Union européenne : vrai ou faux ?',
      shared: ['Vrai', 'Faux'],
      rows: [
        { label: 'Un règlement européen s’applique directement en France, sans qu’un texte français soit nécessaire.', answer: 0 },
        { label: 'Une directive fixe un résultat à atteindre ; chaque État choisit les moyens en la transposant dans son droit.', answer: 0 },
        { label: 'Le RGPD est une directive européenne.', answer: 1, why: 'Le RGPD est un règlement : il s’applique directement dans tous les États membres.' },
        { label: 'Si une loi française contredit un règlement européen, le juge français doit appliquer la loi française.', answer: 1, why: 'Le droit de l’Union européenne est supérieur à la loi : le juge écarte la loi contraire.' }
      ],
      hint: 'Retenez la différence : un règlement s’applique tel quel ; une directive doit passer par un texte national.',
      hint2: 'Notion à mobiliser : <b>règlement</b> et <b>directive</b> européens, et la supériorité du droit de l’Union sur la loi.',
      explain: 'Le règlement s’applique directement ; la directive doit être transposée. Le RGPD est un règlement. Le droit de l’Union l’emporte sur une loi contraire.'
    }
  ]
},
{
  id: 'a34', mission: 'm3', ch: 3, title: 'Le rôle des juges',
  notions: ['La jurisprudence'],
  remediation: 'La jurisprudence est l’ensemble des décisions rendues par les juges. Le juge interprète la loi quand elle est imprécise et la complète quand elle est muette, car il ne peut pas refuser de juger. La Cour de cassation et le Conseil d’État unifient l’interprétation. Mais le juge ne peut pas édicter une règle générale obligatoire pour tous : une décision ne s’impose qu’aux parties au procès, et la jurisprudence peut évoluer (revirement).',
  intro: 'Yanis présente un arrêt de la Cour de cassation à l’équipe. « La loi ne dit pas tout. Quand elle se tait, c’est le juge qui parle. »',
  parts: [{
    type: 'multi', pts: 0.75,
    q: 'Quelles affirmations sur la jurisprudence sont exactes ? Plusieurs réponses possibles.',
    options: [
      { id: 'j1', ok: true,  text: 'Le juge interprète la loi lorsque ses termes sont imprécis.' },
      { id: 'j2', ok: true,  text: 'Le juge ne peut pas refuser de juger au motif que la loi est muette : il doit trancher le litige.' },
      { id: 'j3', ok: true,  text: 'La Cour de cassation veille à ce que la loi soit interprétée de la même façon dans toute la France.' },
      { id: 'j4', ok: true,  text: 'Une juridiction peut changer sa position : on parle de revirement de jurisprudence.' },
      { id: 'j5', ok: false, text: 'Le juge peut adopter une règle générale qui s’imposera à tous les autres juges dans les affaires futures.', why: 'Le Code civil interdit au juge de statuer « par voie de disposition générale » : sa décision ne vaut que pour le litige jugé.' },
      { id: 'j6', ok: false, text: 'Un jugement du tribunal judiciaire d’Albi s’impose à tous les tribunaux de France.', why: 'Une décision ne s’impose qu’aux parties au procès. Seules les positions des hautes juridictions ont une forte influence.' },
      { id: 'j7', ok: false, text: 'La jurisprudence est votée par le Parlement chaque année, à partir des décisions des tribunaux.', why: 'La jurisprudence vient des juges, pas du Parlement.' },
      { id: 'j8', ok: false, text: 'La jurisprudence ne concerne que le droit pénal.', why: 'Il y a de la jurisprudence dans toutes les branches du droit : civil, travail, administratif…' }
    ],
    hint: 'Le juge applique et interprète le droit pour trancher un litige précis. Peut-il pour autant légiférer à la place du Parlement ?',
    hint2: 'Notion à mobiliser : la <b>jurisprudence</b> est une source du droit d’une nature particulière : influente, mais pas générale ni obligatoire comme une loi.',
    explain: 'Le juge interprète, complète et unifie le droit, et sa position peut évoluer. Il ne crée pas de règle générale obligatoire pour tous.'
  }]
},
{
  id: 'a35', mission: 'm3', ch: 3, title: 'La QPC de M. Fabre',
  notions: ['Le contrôle de constitutionnalité et la QPC'],
  remediation: 'Depuis 2010, une partie à un procès peut soutenir qu’une disposition législative porte atteinte aux droits et libertés garantis par la Constitution : c’est la question prioritaire de constitutionnalité (QPC). Le juge saisi la transmet à la Cour de cassation ou au Conseil d’État, qui filtre et peut la renvoyer au Conseil constitutionnel. Si la disposition est jugée contraire à la Constitution, elle est abrogée. Les décisions du Conseil constitutionnel ne peuvent faire l’objet d’aucun recours.',
  intro: 'M. Fabre est poursuivi devant le tribunal de police pour avoir ouvert sa boulangerie sept jours sur sept, malgré une obligation de fermeture un jour par semaine imposée sur le fondement d’un article de loi du Code du travail. Il estime que cet article porte atteinte à la liberté d’entreprendre, protégée par la Constitution.',
  parts: [
    {
      type: 'choice', pts: 0.5,
      q: 'Que peut faire M. Fabre pour contester la loi elle-même ?',
      options: [
        { id: 'c1', ok: false, text: 'Saisir directement le Conseil constitutionnel en lui écrivant une lettre recommandée.', why: 'Un particulier ne peut pas saisir directement le Conseil constitutionnel : il doit passer par le juge de son procès.' },
        { id: 'c2', ok: true,  text: 'Soulever une question prioritaire de constitutionnalité (QPC) devant le tribunal de police qui le juge.' },
        { id: 'c3', ok: false, text: 'Demander au maire de Gaillac d’annuler la loi par un arrêté municipal.', why: 'Un arrêté municipal est inférieur à la loi : il ne peut ni l’annuler ni l’écarter.' },
        { id: 'c4', ok: false, text: 'Saisir le tribunal administratif pour faire annuler la loi.', why: 'Aucun juge ordinaire ne peut annuler une loi. Seul le Conseil constitutionnel peut l’abroger, sur QPC.' }
      ],
      hint: 'M. Fabre est déjà partie à un procès. Par quel juge doit-il passer ?',
      hint2: 'Notion à mobiliser : la <b>QPC</b> est soulevée au cours d’un procès, devant le juge saisi de l’affaire.',
      explain: 'La QPC permet à un justiciable de contester une loi au cours d’un procès. Il ne peut pas saisir directement le Conseil constitutionnel.'
    },
    {
      type: 'order', pts: 0.5,
      q: 'Remettez les étapes de la QPC dans l’ordre.',
      items: [
        { id: 'q1', text: 'M. Fabre soulève la QPC devant le tribunal de police.' },
        { id: 'q2', text: 'Le tribunal de police vérifie que la question n’est pas dépourvue de caractère sérieux et la transmet.' },
        { id: 'q3', text: 'La Cour de cassation examine la question et la renvoie au Conseil constitutionnel.' },
        { id: 'q4', text: 'Le Conseil constitutionnel examine la loi au regard de la Constitution.' },
        { id: 'q5', text: 'Le Conseil constitutionnel déclare la loi conforme ou l’abroge.' }
      ],
      hint: 'La question remonte du juge de première instance jusqu’au Conseil constitutionnel en passant par un filtre.',
      hint2: 'Notion à mobiliser : le <b>double filtre</b> de la QPC. Le tribunal de police relève de l’ordre judiciaire : le filtre suprême est donc la Cour de cassation.',
      explain: 'Tribunal de police, puis Cour de cassation (filtre), puis Conseil constitutionnel, qui statue.'
    },
    {
      type: 'choice', pts: 0.25,
      reveal: '<b>Trois mois plus tard.</b> Le Conseil constitutionnel déclare la disposition conforme à la Constitution.',
      q: 'Quelle est la conséquence pour M. Fabre ?',
      options: [
        { id: 'd1', ok: false, text: 'Il peut faire appel de la décision du Conseil constitutionnel devant la Cour de cassation.', why: 'Les décisions du Conseil constitutionnel ne sont susceptibles d’aucun recours.' },
        { id: 'd2', ok: true,  text: 'La loi reste applicable : son procès reprend devant le tribunal de police, sur le fondement de cette loi.' },
        { id: 'd3', ok: false, text: 'La loi ne s’applique pas à lui, puisqu’il l’a contestée avant d’être jugé.', why: 'Contester une loi ne dispense pas de la respecter, surtout si elle est déclarée conforme.' },
        { id: 'd4', ok: false, text: 'Il peut saisir le Conseil d’État pour obtenir un second avis sur la constitutionnalité.', why: 'Le Conseil d’État ne peut pas revenir sur une décision du Conseil constitutionnel.' }
      ],
      hint: 'Que devient une loi déclarée conforme à la Constitution ? Existe-t-il un recours contre le Conseil constitutionnel ?',
      hint2: 'Notion à mobiliser : l’autorité des décisions du <b>Conseil constitutionnel</b> : elles s’imposent à tous et sont sans recours.',
      explain: 'La loi est conforme : elle reste en vigueur et le procès reprend. Si elle avait été jugée contraire, elle aurait été abrogée.'
    }
  ]
},
{
  id: 'a36', mission: 'm3', ch: 3, title: 'Quel juge ?',
  notions: ['L’organisation juridictionnelle'],
  remediation: 'Deux ordres de juridictions coexistent. L’ordre judiciaire juge les litiges entre particuliers et entreprises (tribunal judiciaire, conseil de prud’hommes, tribunal de commerce) et les infractions (tribunal de police, tribunal correctionnel, cour d’assises), avec la cour d’appel et la Cour de cassation au-dessus. L’ordre administratif juge les litiges avec l’administration (tribunal administratif, cour administrative d’appel, Conseil d’État). Le Conseil constitutionnel n’appartient à aucun des deux ordres.',
  intro: 'Sophie a affiché au mur la carte des juridictions. Trois dossiers arrivent en même temps : pour chacun, désignez la juridiction compétente.',
  parts: [
    {
      type: 'pick', pts: 0.25,
      q: 'Lina conteste son licenciement par la boulangerie Fabre. Touchez la juridiction compétente.',
      answer: 'cph',
      wrongWhy: { tj: 'Le tribunal judiciaire juge les litiges civils en général, mais les litiges nés d’un contrat de travail relèvent d’une juridiction spécialisée.', tc: 'Le tribunal de commerce juge les litiges entre commerçants, pas entre un employeur et sa salariée.', ta: 'Le litige oppose deux personnes privées : il ne relève pas du juge administratif.' },
      hint: 'Le litige est né d’un contrat de travail entre un employeur et une salariée.',
      hint2: 'Notion à mobiliser : les juridictions <b>spécialisées</b> de l’ordre judiciaire.',
      explain: 'Les litiges individuels liés au contrat de travail relèvent du conseil de prud’hommes.'
    },
    {
      type: 'pick', pts: 0.25,
      q: 'Manon conteste l’arrêté du maire qui interdit le festival. Touchez la juridiction compétente.',
      answer: 'ta',
      wrongWhy: { tj: 'Le litige oppose Manon à une autorité administrative (le maire) : il relève de l’ordre administratif.', ce: 'Le Conseil d’État juge surtout en cassation ; un arrêté municipal se conteste d’abord devant le juge administratif de première instance.', cc: 'Le Conseil constitutionnel contrôle les lois, pas les arrêtés municipaux.' },
      hint: 'Contre qui Manon agit-elle : une personne privée ou une administration ?',
      hint2: 'Notion à mobiliser : les deux <b>ordres de juridictions</b>. Un acte d’une autorité administrative relève du juge administratif.',
      explain: 'Un arrêté municipal se conteste devant le tribunal administratif, ici celui de Toulouse.'
    },
    {
      type: 'pick', pts: 0.25,
      q: 'Le tribunal administratif rejette la demande de Manon. Elle veut faire rejuger l’affaire. Touchez la juridiction compétente.',
      answer: 'caa',
      wrongWhy: { ca: 'La cour d’appel appartient à l’ordre judiciaire : le dossier de Manon est resté dans l’ordre administratif.', ce: 'Le Conseil d’État intervient après l’appel, comme juge de cassation.', cass: 'La Cour de cassation appartient à l’ordre judiciaire.' },
      hint: 'L’affaire reste dans le même ordre de juridiction. Quel est le juge d’appel de cet ordre ?',
      hint2: 'Notion à mobiliser : le <b>double degré de juridiction</b> existe dans chaque ordre.',
      explain: 'L’appel d’un jugement du tribunal administratif se fait devant la cour administrative d’appel, puis éventuellement en cassation devant le Conseil d’État.'
    }
  ]
},

/* ─────────────── MISSION FINALE ─────────────── */
{
  id: 'a41', mission: 'm4', ch: [1, 2, 3], title: 'Lire l’arrêté',
  notions: ['Mobiliser tout le thème 1 pour analyser une règle'],
  remediation: 'Analyser une règle de droit, c’est mobiliser les trois parties du thème : ses fonctions et les valeurs en jeu (1.1), ses caractères et l’autorité qui l’a adoptée (1.2), sa place dans la hiérarchie des normes et le juge compétent (1.3).',
  intro: 'Lucie Rouanet vous tend l’arrêté affiché à la mairie.',
  doc: ARRETE_HTML,
  parts: [{
    type: 'sort', pts: 0.75,
    q: 'Classez chacun de vos constats selon la partie du thème 1 qu’il mobilise.',
    cats: [ { id: '1', label: '1.1 Fonctions et valeurs' }, { id: '2', label: '1.2 Règle de droit' }, { id: '3', label: '1.3 Sources et juges' } ],
    items: [
      { id: 'x1', cat: '1', text: 'L’arrêté cherche à protéger les piétons après un accident.' },
      { id: 'x2', cat: '1', text: 'L’interdiction totale limite la liberté d’aller et venir.' },
      { id: 'x3', cat: '2', text: 'L’arrêté s’applique à toute personne circulant en trottinette dans la commune.', why: 'C’est le caractère général et impersonnel de la règle.' },
      { id: 'x4', cat: '2', text: 'Le non-respect de l’arrêté est puni d’une amende.', why: 'C’est le caractère coercitif de la règle.' },
      { id: 'x5', cat: '2', text: 'Le maire tient de la loi son pouvoir de police pour assurer la sécurité.', why: 'C’est la question de l’autorité légitime.' },
      { id: 'x6', cat: '3', text: 'L’arrêté doit respecter le Code de la route, qui autorise les trottinettes sur certaines voies.' },
      { id: 'x7', cat: '3', text: 'Le Conseil d’État juge depuis longtemps que les interdictions générales et absolues sont en principe illégales.', why: 'C’est de la jurisprudence, une source du droit.' },
      { id: 'x8', cat: '3', text: 'Un recours est possible devant le tribunal administratif de Toulouse.' }
    ],
    hint: 'Le constat porte-t-il sur le but de la règle, sur la règle elle-même (qui, pour qui, quelle sanction), ou sur sa place par rapport aux autres normes et aux juges ?',
    hint2: 'Notions à mobiliser : 1.1 fonctions et valeurs ; 1.2 caractères et autorité légitime ; 1.3 hiérarchie des normes, jurisprudence, organisation juridictionnelle.',
    explain: '1.1 : protection des piétons, liberté d’aller et venir. 1.2 : règle générale, sanctionnée, adoptée par une autorité légitime. 1.3 : respect du Code de la route, jurisprudence, juge administratif.'
  }]
},
{
  id: 'a42', mission: 'm4', ch: [1, 3], title: 'Quel recours ?',
  notions: ['Contester un acte administratif', 'Distinguer QPC et recours contre un arrêté'],
  remediation: 'Un arrêté municipal se conteste devant le tribunal administratif, en principe dans les deux mois de sa publication. La QPC ne vise que les lois. Tant qu’il n’est pas annulé, l’arrêté s’applique. Un arrêté de police doit être nécessaire et proportionné : une interdiction générale et absolue est en principe illégale si une mesure moins restrictive suffit.',
  intro: 'Lucas, 17 ans, est venu avec sa mère. Il veut « attaquer » l’arrêté. Comme il est mineur, c’est sa mère qui agira en justice pour lui.',
  parts: [
    {
      type: 'choice', pts: 0.5,
      q: 'Quelle démarche Maître Albaret va-t-elle conseiller ?',
      options: [
        { id: 'e1', ok: false, text: 'Soulever une QPC, puisque l’arrêté porte atteinte à une liberté garantie par la Constitution.', why: 'La QPC ne vise que les dispositions législatives (les lois), pas les arrêtés municipaux.' },
        { id: 'e2', ok: true,  text: 'Saisir le tribunal administratif de Toulouse d’un recours en annulation contre l’arrêté, dans les deux mois de sa publication.' },
        { id: 'e3', ok: false, text: 'Continuer à rouler en trottinette : l’arrêté étant illégal, il ne s’applique pas.', why: 'Tant qu’un juge ne l’a pas annulé, l’arrêté s’applique. Lucas risquerait l’amende.' },
        { id: 'e4', ok: false, text: 'Saisir le tribunal judiciaire d’Albi, puisque Lucas est une personne privée.', why: 'Lucas conteste un acte du maire, autorité administrative : c’est le juge administratif qui est compétent.' }
      ],
      hint: 'Quel est l’auteur de la règle contestée, et quel type de texte est-ce ?',
      hint2: 'Notions à mobiliser : l’<b>organisation juridictionnelle</b> (ordre administratif) et la différence entre un <b>arrêté</b> et une <b>loi</b>.',
      explain: 'Un arrêté municipal se conteste devant le tribunal administratif, dans un délai de deux mois. La QPC est réservée aux lois.'
    },
    {
      type: 'multi', pts: 0.75,
      q: 'Quels arguments Maître Albaret peut-elle utilement présenter au tribunal ? Plusieurs réponses possibles.',
      options: [
        { id: 'g1', ok: true,  text: 'L’interdiction est générale et absolue (partout, jour et nuit), alors que des mesures moins restrictives étaient possibles.' },
        { id: 'g2', ok: true,  text: 'L’arrêté porte une atteinte excessive à la liberté d’aller et venir.' },
        { id: 'g3', ok: true,  text: 'L’arrêté contredit le Code de la route, norme supérieure qui autorise les trottinettes sur certaines voies.' },
        { id: 'g4', ok: true,  text: 'Le Conseil d’État juge en principe illégales les interdictions générales et absolues prises par les maires.' },
        { id: 'g5', ok: false, text: 'Lucas a toujours roulé prudemment et n’a jamais causé d’accident.', why: 'La règle est générale et impersonnelle : le comportement personnel de Lucas ne change rien à sa légalité.' },
        { id: 'g6', ok: false, text: 'L’arrêté est illégal puisqu’il n’a pas été voté par le Parlement.', why: 'Le maire est une autorité légitime : il peut prendre des arrêtés de police sans passer par le Parlement.' },
        { id: 'g7', ok: false, text: 'Lucas est mineur : les arrêtés municipaux ne s’appliquent pas aux mineurs.', why: 'La règle vise toute personne circulant en trottinette, quel que soit son âge.' },
        { id: 'g8', ok: false, text: 'Lucas n’a pas voté pour ce maire aux dernières élections.', why: 'Une règle de droit s’impose à tous, qu’on ait voté ou non pour son auteur.' }
      ],
      hint: 'Un bon argument porte sur la règle elle-même (son contenu, sa place dans la hiérarchie, la jurisprudence), pas sur la situation personnelle de Lucas.',
      hint2: 'Notions à mobiliser : <b>hiérarchie des normes</b>, <b>jurisprudence</b>, valeur de <b>liberté</b>, caractère <b>général</b> de la règle.',
      explain: 'Arguments utiles : interdiction générale et absolue, atteinte à la liberté, contradiction avec le Code de la route, jurisprudence du Conseil d’État. Les arguments personnels ou fondés sur une erreur sur l’autorité légitime sont inopérants.'
    }
  ]
},
{
  id: 'a43', mission: 'm4', ch: [1, 2, 3], title: 'Après le jugement',
  notions: ['L’État de droit en pratique', 'La portée d’une décision de justice'],
  remediation: 'L’annulation d’un arrêté par le juge illustre l’État de droit : l’administration est soumise au droit. Un jugement ne vaut que pour l’affaire jugée ; il ne s’impose pas aux autres communes. Le maire garde son pouvoir de police et peut adopter une mesure nouvelle, à condition qu’elle soit nécessaire et proportionnée.',
  intro: 'Deux mois ont passé. Le dossier revient au cabinet.',
  parts: [
    {
      type: 'choice', pts: 0.5,
      reveal: '<b>Nouvelle information.</b> Le tribunal administratif annule l’arrêté. Une semaine plus tard, le maire en adopte un nouveau : trottinettes interdites dans les trois rues piétonnes du centre-bourg, de 10 h à 19 h.',
      q: 'Quelle analyse du nouvel arrêté est la plus juste ?',
      options: [
        { id: 't1', ok: false, text: 'Il est illégal : après l’annulation, le maire n’avait plus le droit de réglementer les trottinettes.', why: 'L’annulation sanctionne une mesure précise, pas le pouvoir de police du maire.' },
        { id: 't2', ok: true,  text: 'Il est limité dans l’espace et dans le temps : il répond à l’objectif de sécurité tout en préservant la liberté d’aller et venir. Il est probablement légal.' },
        { id: 't3', ok: false, text: 'Il est forcément illégal, puisqu’il interdit encore les trottinettes, ce que le tribunal a condamné.', why: 'Le tribunal a condamné une interdiction générale et absolue, pas toute restriction.' },
        { id: 't4', ok: false, text: 'Il est inutile : le jugement du tribunal administratif fixe désormais une règle valable pour toutes les communes de France.', why: 'Un jugement ne vaut que pour l’affaire jugée : il ne crée pas de règle générale.' }
      ],
      hint: 'Comparez les deux arrêtés : où et quand s’applique chaque interdiction ?',
      hint2: 'Notions à mobiliser : la <b>proportionnalité</b> d’une mesure de police et la portée limitée d’un <b>jugement</b>.',
      explain: 'Le nouvel arrêté est ciblé et proportionné : il concilie la sécurité des piétons et la liberté d’aller et venir.'
    },
    {
      type: 'fields', pts: 0.5,
      q: 'Pour conclure le dossier : vrai ou faux ?',
      shared: ['Vrai', 'Faux'],
      rows: [
        { label: 'L’annulation du premier arrêté illustre l’État de droit : même le maire est soumis au droit.', answer: 0 },
        { label: 'Le maire est au-dessus des règles qu’il adopte lui-même.', answer: 1 },
        { label: 'Le nouvel arrêté concilie deux fonctions du droit : organiser la circulation et protéger les piétons.', answer: 0 },
        { label: 'Le nouvel arrêté n’est pas une règle de droit, puisqu’il ne concerne que trois rues.', answer: 1, why: 'Une règle reste générale et impersonnelle même si elle s’applique à un lieu limité : elle vise toute personne qui y circule.' }
      ],
      hint: 'Une règle limitée à quelques rues vise-t-elle une personne nommée, ou tous ceux qui y passent ?',
      hint2: 'Notions à mobiliser : <b>État de droit</b>, <b>fonctions du droit</b>, caractère <b>général et impersonnel</b>.',
      explain: 'Le maire est soumis au droit et contrôlé par le juge. Le nouvel arrêté organise et protège, et reste une règle générale.'
    }
  ]
},
{
  id: 'a44', mission: 'm4', ch: [1, 2, 3], title: 'La note à Maître Albaret',
  notions: ['Rédiger une analyse juridique avec le vocabulaire juste'],
  remediation: 'Une analyse juridique rigoureuse emploie chaque notion à bon escient : ne pas confondre décision individuelle et règle générale, loi et arrêté, QPC et recours administratif, jugement et règle générale.',
  intro: 'Il vous reste à rédiger la note de synthèse du dossier. Pour chaque partie, choisissez la formulation juridiquement exacte.',
  parts: [
    {
      type: 'choice', pts: 0.25, ch: 1,
      q: 'Partie 1 — Fonctions et valeurs',
      options: [
        { id: 'y1', ok: false, text: 'L’arrêté poursuit une fonction de règlement des conflits, puisqu’il fait suite à un accident entre un piéton et une trottinette.', why: 'L’arrêté ne tranche aucun litige : il fixe une règle pour l’avenir.' },
        { id: 'y2', ok: true,  text: 'L’arrêté vise à protéger les piétons, mais il doit être concilié avec la liberté d’aller et venir des usagers de trottinettes.' },
        { id: 'y3', ok: false, text: 'L’arrêté relève de la morale, puisqu’il cherche à éviter un comportement dangereux.', why: 'Il est adopté par une autorité légitime et sanctionné par une amende : c’est une règle de droit.' }
      ],
      hint: 'Vérifiez le nom de la fonction et la valeur en jeu.',
      hint2: 'Notion à mobiliser : la fonction de <b>protection</b> et la valeur de <b>liberté</b>.',
      explain: 'Protection des piétons et liberté d’aller et venir doivent être conciliées.'
    },
    {
      type: 'choice', pts: 0.25, ch: 2,
      q: 'Partie 2 — La règle de droit',
      options: [
        { id: 'y4', ok: true,  text: 'L’arrêté est une règle de droit : générale et impersonnelle, obligatoire, sanctionnée par une amende et adoptée par le maire, autorité légitime.' },
        { id: 'y5', ok: false, text: 'L’arrêté est une décision individuelle visant Lucas, puisque c’est lui qui conteste la mesure.', why: 'Le fait que Lucas conteste l’arrêté ne le rend pas individuel : il vise tous les usagers.' },
        { id: 'y6', ok: false, text: 'L’arrêté n’est pas une règle de droit, car seul le Parlement peut créer des règles obligatoires.', why: 'Le maire est aussi une autorité légitime, dans les limites fixées par la loi.' }
      ],
      hint: 'Reprenez les quatre caractères de la règle de droit.',
      hint2: 'Notion à mobiliser : les <b>caractères</b> de la règle de droit et l’<b>autorité légitime</b>.',
      explain: 'L’arrêté présente tous les caractères d’une règle de droit.'
    },
    {
      type: 'choice', pts: 0.25, ch: 3,
      q: 'Partie 3 — Sources et juge',
      options: [
        { id: 'y7', ok: false, text: 'L’arrêté, contraire à la Constitution, devait être contesté par une QPC devant le Conseil constitutionnel.', why: 'La QPC ne concerne que les lois, et elle ne se soulève pas directement devant le Conseil constitutionnel.' },
        { id: 'y8', ok: true,  text: 'L’arrêté, norme inférieure, doit respecter le Code de la route et la jurisprudence administrative ; le tribunal administratif l’a annulé.' },
        { id: 'y9', ok: false, text: 'Le jugement du tribunal administratif devient une règle générale qui s’impose à tous les maires de France.', why: 'Un jugement ne vaut que pour l’affaire jugée.' }
      ],
      hint: 'Une seule proposition utilise correctement la hiérarchie des normes et le bon juge.',
      hint2: 'Notions à mobiliser : <b>hiérarchie des normes</b>, <b>jurisprudence</b>, <b>ordre administratif</b>.',
      explain: 'L’arrêté doit respecter les normes supérieures ; le juge administratif contrôle sa légalité.'
    }
  ]
}
];

const CH_LABELS = {
  1: '1.1 — Le droit et les fonctions du droit',
  2: '1.2 — La règle de droit',
  3: '1.3 — Les sources du droit'
};
