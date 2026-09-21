# Appli sport Sam — Cahier des charges

**Version** 1.0 (proposition) · **Date** 21 septembre 2026 · **Statut** à valider par le client

Document rédigé à partir de la maquette `APP sport SAM.pptx` (11 écrans).
Il décrit ce qui sera construit. Les points listés au §9 doivent être tranchés
avant le développement définitif.

---

## 1. Objectif

Une application de **guidage d'entraînement par intervalles**. L'utilisateur
choisit un sport, puis une séance ; l'application déroule ensuite la séance
étape par étape, au chronomètre, avec un signal sonore à chaque changement.

L'utilisateur n'a pas à lire un plan papier ni à surveiller sa montre : il
suit ce que l'écran affiche et ce qu'il entend.

## 2. Périmètre de la version 1

| Inclus | Exclu (voir §8) |
|---|---|
| 3 sports, 6 séances | Compte utilisateur |
| Déroulé chronométré avec signal sonore | Historique et statistiques |
| Mise en veille de l'écran empêchée | Capteurs (cardio, GPS) |
| Chronomètre libre pour le VTT | Édition des séances par l'utilisateur |
| Installation sur l'écran d'accueil iPhone | Notifications |

## 3. Structure d'une séance

Trois niveaux, tels qu'ils apparaissent sur la maquette :

```
Séance
└── Phase            Échauffement · Cardio · Retour au calme
    └── Bloc         « Force 7 », « Montées »… avec un nombre de répétitions optionnel (×N)
        └── Étape    une durée et une consigne : « 30 s — Rapide »
```

Règles :

- **`×N` répète le bloc entier N fois.** Exemple : `Force 7 (×10)` contenant
  `30 s rapide` + `30 s lent` produit 20 étapes, soit 10 minutes.
- **« rapide/lent » vaut deux étapes** de la durée indiquée : `1 min — rapide/lent`
  = 1 min rapide **puis** 1 min lent.
- Une étape peut être **sans durée** : l'application attend que l'utilisateur
  appuie pour continuer. Utilisé pour la descente entre deux montées, dont la
  durée dépend du terrain.

## 4. Contenu des séances

### 4.1 Vélo d'appartement — Séance 1 · 46 min

La « Force » est le **niveau de résistance du vélo**. L'application l'affiche ;
elle ne pilote pas l'appareil.

| Phase | Bloc | Détail | Durée |
|---|---|---|---|
| Échauffement | Force 2 | — | 5 min |
| | Force 3 | — | 2 min 30 |
| | Force 4 | — | 2 min 30 |
| Cardio | Force 5 | 1 min rapide · 1 min lent · 45 s rapide · 45 s lent · 30 s rapide · 1 min récup | 5 min |
| | Force 7 **×10** | 30 s rapide · 30 s lent | 10 min |
| | Force 3 | — | 2 min |
| | Force 6 **×3** | 2 min assis · 1 min debout | 9 min ⚠️ |
| Retour au calme | Force 1 | — | 10 min |

⚠️ La maquette annonce 8 min pour le bloc Force 6, mais (2 + 1) × 3 = 9 min. À trancher (§9).

### 4.2 Running — Séance 1 · fractionné court · 32 min

| Phase | Bloc | Détail | Durée |
|---|---|---|---|
| Échauffement | Footing normal | — | 10 min |
| Cardio | Fractionné **×12** | 30 s effort intense · 30 s footing très lent | 12 min ⚠️ |
| Retour au calme | Footing très lent | — | 10 min |

⚠️ La maquette indique « 15 min (×10/12) ». 12 répétitions donnent 12 min. À trancher (§9).

### 4.3 Running — Séance 2 · côtes + seuil · 46 min 30

| Phase | Bloc | Détail | Durée |
|---|---|---|---|
| Échauffement | Footing normal | — | 10 min |
| Cardio A — côtes | Montées **×9** | 30 s montée · descente (durée libre) | 4 min 30 + descentes ⚠️ |
| Cardio B — seuil | Blocs seuil **×2** | 8 min au seuil · 3 min récupération | 22 min |
| Retour au calme | Footing très lent | — | 10 min |

⚠️ La maquette indique « 8/10 montées » et ne donne pas de durée de descente.

### 4.4 Running — Séance 3 · endurance · 37 min

Footing continu, 35 à 40 min. Valeur retenue par défaut : 37 min.

### 4.5 VTT — Rando · Libre

Pas de plan structuré sur la maquette : **chronomètre libre**, démarrage et
pause manuels. Deux emplacements restent vides sur l'écran VTT de la maquette.

## 5. Écrans

1. **Choix du sport** — Vélo d'appartement · VTT · Running.
2. **Liste des séances** du sport, avec durée totale.
3. **Détail de la séance** — toutes les phases, blocs et étapes, durée totale,
   bouton *Démarrer*.
4. **Déroulé** — phase en cours, bloc et numéro de série, pastille *Force N*,
   compte à rebours géant, consigne de l'étape, étape suivante, barre de
   progression, temps écoulé et restant, boutons *Précédent · Pause · Suivant*.
5. **Fin de séance** — durée totale et retour.

## 6. Règles de fonctionnement

- **Signal sonore** : trois bips courts aux 3 dernières secondes d'une étape,
  puis un signal à deux tons au changement. Vibration si l'appareil la gère.
- Le son est armé au premier appui sur *Démarrer* (contrainte iOS).
- **L'écran ne s'éteint pas** pendant une séance, et le chronomètre reste juste
  même si l'application passe en arrière-plan.
- *Précédent* revient au début de l'étape en cours, puis à l'étape précédente.
- Pause et reprise n'entraînent aucune dérive du chronomètre.
- Les temps de récupération s'affichent en bleu, les efforts en orange.

## 7. Technique et déploiement

- **Application web** (HTML/CSS/JavaScript), sans framework ni serveur.
  Trois fichiers : `index.html`, `seances.js`, `manifest.webmanifest`.
- **Fonctionne sur iPhone** via Safari, et s'installe sur l'écran d'accueil
  (*Partager → Sur l'écran d'accueil*) : elle s'ouvre alors en plein écran,
  sans barre de navigateur, comme une application native.
- Fonctionne aussi sur Android, ordinateur et tablette.
- **Hébergement au choix** et réversible : GitHub Pages, Netlify, Vercel ou
  n'importe quel hébergement de fichiers statiques. Aucune base de données,
  aucun coût de serveur.
- Les séances sont décrites dans `seances.js`, en clair : ajouter ou modifier
  une séance ne demande pas de reconstruire l'application.

## 8. Hors périmètre de la version 1

Comptes utilisateur · historique et statistiques · ceinture cardio Bluetooth ·
GPS et tracé · éditeur de séances dans l'application · musique · synchronisation
entre appareils · notifications · publication sur l'App Store.

Chacun de ces points est réalisable dans une version ultérieure.

## 9. Points à confirmer par le client

| # | Question | Hypothèse retenue |
|---|---|---|
| 1 | Vélo, bloc Force 6 : 8 min annoncé, mais (2 + 1) × 3 = 9 min. | 9 min |
| 2 | « rapide/lent » = la durée indiquée deux fois (rapide puis lent) ? | oui — les totaux du bloc Force 5 tombent alors juste à 5 min |
| 3 | Running séance 1 : « 15 min (×10/12) » — combien de répétitions ? | 12 (soit 12 min) |
| 4 | Running séance 2 : Cardio A **et** Cardio B dans la même séance, ou au choix ? | les deux, enchaînés |
| 5 | Côtes : 8 ou 10 montées ? | 9 |
| 6 | Descente entre deux montées : durée libre validée à la main, ou durée fixe ? | durée libre |
| 7 | Dernier bloc seuil suivi de 3 min de récup avant le retour au calme : à garder ? | gardé |
| 8 | Running séance 3 : 35 ou 40 min ? | 37 min |
| 9 | VTT : « Rando » et « Libre » sont-ils bien deux chronomètres libres ? Les deux emplacements vides sont-ils des séances à venir ? | oui / oui |
| 10 | Une seule séance de vélo, ou d'autres à venir ? | une seule pour l'instant |
| 11 | Signal sonore : bips + gong suffisent, ou consignes vocales souhaitées ? | bips + gong |
| 12 | Faut-il un historique des séances effectuées ? | non en v1 |
| 13 | Utilisation sans réseau (salle en sous-sol) obligatoire ? | non en v1 |
| 14 | Le client veut-il modifier ses séances lui-même depuis l'application ? | non en v1 |
| 15 | Installation sur l'écran d'accueil suffisante, ou publication App Store exigée ? | écran d'accueil |

## 10. Validation

Le client confirme le contenu des §4 à §7 et répond aux questions du §9.
Toute demande ultérieure s'ajoutant à ce périmètre fera l'objet d'un avenant.

Nom · Date · Signature
