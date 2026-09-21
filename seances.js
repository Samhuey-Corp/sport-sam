/* Séances — données issues de la maquette "APP sport SAM.pptx".
 *
 * Modèle :
 *   sport → séances → phases → blocs → étapes
 *
 * Un bloc est soit :
 *   - simple    : { l:"Force 2", force:2, t:300 }
 *   - répété    : { l:"Force 7", force:7, reps:10, steps:[{l:"rapide",t:30},{l:"lent",t:30}] }
 *
 * t = durée en secondes. manuel:true = étape sans chrono, l'utilisateur appuie
 * pour passer à la suite. Supporté mais inutilisé : le client a fixé la descente
 * des côtes à 1 min plutôt que de la laisser libre.
 *
 * ponytail: tout en dur ici. Pas d'éditeur de séances tant que le client
 * n'en demande pas un — ce fichier se modifie à la main en 10 secondes.
 */
const m = n => n * 60;

const SPORTS = [
  {
    id: 'velo',
    nom: "Vélo d'appartement",
    icone: '🚴',
    note: "L'intensité « Force » correspond au niveau de résistance du vélo.",
    seances: [
      {
        nom: 'Séance 1',
        phases: [
          {
            nom: 'Échauffement',
            blocs: [
              { l: 'Force 2', force: 2, t: m(5) },
              { l: 'Force 3', force: 3, t: 150 },
              { l: 'Force 4', force: 4, t: 150 },
            ],
          },
          {
            nom: 'Cardio',
            blocs: [
              {
                l: 'Force 5', force: 5,
                steps: [
                  { l: 'Rapide', t: m(1) },
                  { l: 'Lent', t: m(1) },
                  { l: 'Rapide', t: 45 },
                  { l: 'Lent', t: 45 },
                  { l: 'Rapide', t: 30 },
                  { l: 'Récupération', t: m(1) },
                ],
              },
              {
                l: 'Force 7', force: 7, reps: 10,
                steps: [
                  { l: 'Rapide', t: 30 },
                  { l: 'Lent', t: 30 },
                ],
              },
              { l: 'Force 3', force: 3, t: m(2) },
              {
                // 9 min : la maquette annonçait 8 min, le client a tranché pour (2 + 1) × 3.
                l: 'Force 6', force: 6, reps: 3,
                steps: [
                  { l: 'Assis', t: m(2) },
                  { l: 'Debout', t: m(1) },
                ],
              },
            ],
          },
          {
            nom: 'Retour au calme',
            blocs: [{ l: 'Force 1', force: 1, t: m(10) }],
          },
        ],
      },
    ],
  },

  {
    id: 'vtt',
    nom: 'VTT',
    icone: '🚵',
    seances: [
      { nom: 'Rando', libre: true, desc: 'Sortie libre, chronomètre ouvert.' },
      { nom: 'Libre', libre: true, desc: 'Sortie libre, chronomètre ouvert.' },
    ],
  },

  {
    id: 'running',
    nom: 'Running',
    icone: '🏃',
    seances: [
      {
        nom: 'Séance 1',
        desc: 'Fractionné court 30/30',
        phases: [
          { nom: 'Échauffement', blocs: [{ l: 'Footing normal', t: m(10) }] },
          {
            nom: 'Cardio',
            blocs: [{
              l: 'Fractionné', reps: 12,
              steps: [
                { l: 'Effort intense', t: 30 },
                { l: 'Footing très lent', t: 30 },
              ],
            }],
          },
          { nom: 'Retour au calme', blocs: [{ l: 'Footing très lent', t: m(10) }] },
        ],
      },
      {
        nom: 'Séance 2A',
        desc: 'Côtes',
        phases: [
          { nom: 'Échauffement', blocs: [{ l: 'Footing normal', t: m(10) }] },
          {
            nom: 'Cardio — côtes',
            blocs: [{
              // ponytail: descente à 1 min, la valeur donnée par le client.
              // S'il trouve le trou trop long sur le terrain, passer à 45.
              l: 'Montées', reps: 10,
              steps: [
                { l: 'Montée', t: 30 },
                { l: 'Descente', t: m(1) },
              ],
            }],
          },
          { nom: 'Retour au calme', blocs: [{ l: 'Footing très lent', t: m(10) }] },
        ],
      },
      {
        nom: 'Séance 2B',
        desc: 'Vitesse max',
        phases: [
          { nom: 'Échauffement', blocs: [{ l: 'Footing normal', t: m(10) }] },
          {
            nom: 'Cardio — vitesse max',
            blocs: [
              { l: 'Vitesse max', t: m(8) },
              { l: 'Récupération', t: m(3) },
              { l: 'Vitesse max', t: m(8) },
            ],
          },
          { nom: 'Retour au calme', blocs: [{ l: 'Footing très lent', t: m(10) }] },
        ],
      },
      {
        nom: 'Séance 3',
        desc: 'Endurance',
        phases: [
          { nom: 'Footing continu', blocs: [{ l: 'Footing continu', t: m(40) }] },
        ],
      },
    ],
  },
];
