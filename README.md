# Appli sport Sam

Guidage d'entraînement par intervalles : vélo d'appartement, VTT, running.
Application web, sans dépendance, sans serveur, sans build.

## Lancer en local

```bash
python3 -m http.server 8777
```

Puis ouvrir http://localhost:8777

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | toute l'application (styles + logique) |
| `seances.js` | contenu des séances — le seul fichier à modifier pour ajouter un entraînement |
| `manifest.webmanifest` | installation sur l'écran d'accueil |
| `CAHIER-DES-CHARGES.md` | spécification à valider par le client |

## Ajouter une séance

Dans `seances.js`, un bloc est soit simple, soit répété :

```js
{ l: 'Force 2', force: 2, t: m(5) }                       // 5 min à Force 2

{ l: 'Force 7', force: 7, reps: 10, steps: [              // (30 s + 30 s) × 10
    { l: 'Rapide', t: 30 },
    { l: 'Lent',   t: 30 },
]}

{ l: 'Descente', manuel: true }                            // sans chrono, l'utilisateur valide
```

## Sur iPhone

Ouvrir l'adresse dans Safari, puis *Partager → Sur l'écran d'accueil*.
L'application s'ouvre ensuite en plein écran. Le son est armé au premier appui
sur *Démarrer* — c'est une contrainte d'iOS, pas un choix.

## Déploiement

N'importe quel hébergement statique : GitHub Pages, Netlify, Vercel.
Il suffit de déposer les fichiers, il n'y a rien à compiler.
