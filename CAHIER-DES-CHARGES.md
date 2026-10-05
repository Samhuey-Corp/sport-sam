# Appli sport Sam — Cahier des charges

**Version** 1.1 · **Date** 21 septembre 2026 · **Statut** validé par le client

Document rédigé à partir de la maquette `APP sport SAM.pptx` (11 écrans).
Les quinze points laissés ouverts en version 1.0 ont été tranchés par le
client ; leurs réponses sont reportées au §9 et déjà appliquées.

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
| 3 sports, 7 séances | Compte utilisateur |
| Déroulé chronométré avec signal sonore | Historique et statistiques |
| Mise en veille de l'écran empêchée | Capteurs (cardio, GPS) |
| Chronomètre libre pour le VTT | Édition des séances par l'utilisateur |
| Installation sur l'écran d'accueil iPhone | Notifications |
| Fonctionnement sans réseau | |

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
  = 1 min rapide **puis** 1 min lent. C'est cette lecture qui fait tomber le
  bloc Force 5 à 5 minutes exactement.

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
| | Force 6 **×3** | 2 min assis · 1 min debout | 9 min |
| Retour au calme | Force 1 | — | 10 min |

### 4.2 Running — Séance 1 · fractionné court · 32 min

| Phase | Bloc | Détail | Durée |
|---|---|---|---|
| Échauffement | Footing normal | — | 10 min |
| Cardio | Fractionné **×12** | 30 s effort intense · 30 s footing très lent | 12 min |
| Retour au calme | Footing très lent | — | 10 min |

### 4.3 Running — Séance 2A · côtes · 35 min

| Phase | Bloc | Détail | Durée |
|---|---|---|---|
| Échauffement | Footing normal | — | 10 min |
| Cardio — côtes | Montées **×10** | 30 s montée · 1 min descente | 15 min |
| Retour au calme | Footing très lent | — | 10 min |

### 4.4 Running — Séance 2B · vitesse max · 39 min

| Phase | Bloc | Détail | Durée |
|---|---|---|---|
| Échauffement | Footing normal | — | 10 min |
| Cardio — vitesse max | Vitesse max | — | 8 min |
| | Récupération | — | 3 min |
| | Vitesse max | — | 8 min |
| Retour au calme | Footing très lent | — | 10 min |

Les séances 2A et 2B sont **deux séances distinctes**, au choix de
l'utilisateur, et non deux phases d'une même sortie.

### 4.5 Running — Séance 3 · endurance · 40 min

Footing continu, 40 min.

### 4.6 VTT — Rando · Libre

Pas de plan structuré : **chronomètre libre**, démarrage et pause manuels.
Deux emplacements restent vides sur l'écran VTT de la maquette, pour des
séances à venir.

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
- **L'application démarre sans réseau** une fois qu'elle a été ouverte au moins
  une fois : ses fichiers sont gardés en cache sur l'appareil.
- **Chaque changement d'étape attend un appui.** Quand un chrono arrive à zéro,
  l'application sonne et vibre, affiche l'étape suivante à l'arrêt et ne repart
  qu'au bouton *Reprendre*. Même chose après *Suivant* et *Précédent*. Seul
  *Démarrer la séance* lance le chronomètre directement.
- Une étape en attente se reconnaît au chrono grisé et à la mention
  « en attente » à côté de la consigne.
- **Son et vibration.** Le son part du premier appui (*Démarrer la séance* ou
  *Tester le son*), comme l'exige iOS. Sur iPhone le son est classé « media »
  pour sortir même quand l'interrupteur silence est activé. L'iPhone ne sait pas
  vibrer depuis une page web : il sonne seulement. Android fait les deux.
- Le signal de fin d'étape est une **sonnerie d'alarme** : un trille de huit
  salves à deux tons sur environ 1,4 seconde, qui s'entend à distance du
  téléphone. La fin de séance en joue une version plus longue.
- *Précédent* revient au début de l'étape en cours, puis à l'étape précédente.
- Pause et reprise n'entraînent aucune dérive du chronomètre.
- Les temps de récupération s'affichent en bleu, les efforts en orange.

## 7. Technique et déploiement

- **Application web** (HTML/CSS/JavaScript), sans framework ni serveur.
  Quatre fichiers : `index.html`, `seances.js`, `sw.js` (cache hors-ligne),
  `manifest.webmanifest`.
- **Fonctionne sur iPhone** via Safari, et s'installe sur l'écran d'accueil
  (*Partager → Sur l'écran d'accueil*) : elle s'ouvre alors en plein écran,
  sans barre de navigateur, comme une application native.
- Fonctionne aussi sur Android, ordinateur et tablette.
- **Hébergement au choix** et réversible : GitHub Pages, Netlify, Vercel ou
  n'importe quel hébergement de fichiers statiques. Aucune base de données,
  aucun coût de serveur. Le cache hors-ligne exige une adresse en `https`.
- Les séances sont décrites dans `seances.js`, en clair : ajouter ou modifier
  une séance ne demande pas de reconstruire l'application.

## 8. Hors périmètre de la version 1

Comptes utilisateur · historique et statistiques · ceinture cardio Bluetooth ·
GPS et tracé · éditeur de séances dans l'application · musique · synchronisation
entre appareils · notifications · publication sur l'App Store.

Le client a indiqué qu'un **éditeur de séances** pourra être demandé plus tard.
Le fichier `seances.js` est structuré pour l'accueillir sans refonte.

## 9. Réponses du client

| # | Question | Réponse retenue |
|---|---|---|
| 1 | Vélo, bloc Force 6 : 8 ou 9 min ? | **9 min** |
| 2 | « rapide/lent » = la durée deux fois ? | **oui**, 5 min au total pour le bloc Force 5 |
| 3 | Running séance 1 : combien de répétitions ? | **12**, soit 12 min |
| 4 | Running séance 2 : côtes et seuil ensemble ou au choix ? | **au choix** → deux séances, 2A et 2B |
| 5 | Nombre de montées ? | **10** |
| 6 | Durée de la descente ? | **1 min** (45 s si le temps mort paraît long) |
| 7 | Structure du bloc seuil ? | **8 min – 3 min récup – 8 min**, et « seuil » devient **« vitesse max »** |
| 8 | Running séance 3 : 35 ou 40 min ? | **40 min** |
| 9 | VTT : deux chronomètres libres, deux emplacements à venir ? | **oui** |
| 10 | Combien de séances de vélo ? | **une seule** |
| 11 | Signal sonore ? | **bips + gong** |
| 12 | Historique des séances ? | **non** |
| 13 | Fonctionnement sans réseau ? | **si possible** → réalisé |
| 14 | Éditeur de séances ? | **plus tard si besoin** → hors v1 |
| 15 | Écran d'accueil ou App Store ? | **écran d'accueil** |

## 10. Validation

Le périmètre ci-dessus est arrêté. Toute demande ultérieure s'y ajoutant fera
l'objet d'un avenant.

Nom · Date · Signature
