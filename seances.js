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
 * pour passer à la suite (ex : la descente d'une côte, durée variable).
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
                // À CONFIRMER : la maquette annonce 8 min, (2min + 1min) × 3 = 9 min.
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
              // À CONFIRMER : maquette « 15 min (x10/12) ». 12 × 1 min = 12 min.
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
        nom: 'Séance 2',
        desc: 'Côtes + seuil',
        phases: [
          { nom: 'Échauffement', blocs: [{ l: 'Footing normal', t: m(10) }] },
          {
            nom: 'Cardio A — côtes',
            blocs: [{
              // À CONFIRMER : 8 à 10 montées. La descente n'a pas de durée dans
              // la maquette → étape manuelle, l'utilisateur valide en bas.
              l: 'Montées', reps: 9,
              steps: [
                { l: 'Montée', t: 30 },
                { l: 'Descente — retour au départ', manuel: true },
              ],
            }],
          },
          {
            nom: 'Cardio B — seuil',
            blocs: [{
              l: 'Blocs seuil', reps: 2,
              steps: [
                { l: 'Bloc au seuil', t: m(8) },
                { l: 'Récupération', t: m(3) },
              ],
            }],
          },
          { nom: 'Retour au calme', blocs: [{ l: 'Footing très lent', t: m(10) }] },
        ],
      },
      {
        nom: 'Séance 3',
        desc: 'Endurance',
        phases: [
          { nom: 'Footing continu', blocs: [{ l: 'Footing continu (35 à 40 min)', t: m(37) }] },
        ],
      },
    ],
  },
];
