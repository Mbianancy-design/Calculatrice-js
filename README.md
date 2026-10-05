# 🧮 Calculatrice Web Interactive

Mini calculatrice développée en HTML, CSS et JavaScript, qui s'utilise directement dans le navigateur, sans installation.

## 📌 Description

Ce projet est une calculatrice web avec une interface rose, un écran d'affichage et un clavier organisé en deux zones : les chiffres et fonctions spéciales à gauche, les opérateurs à droite. Au départ, le projet ne contenait que la structure (HTML) et le style (CSS). J'y ai ajouté la partie JavaScript pour le rendre pleinement interactif.

## ⚙️ Fonctionnalités

- Opérations de base : addition, soustraction, multiplication, division
- Respect de la priorité des opérations (ex : `2 + 3 x 4` donne `14`)
- Saisie de nombres décimaux avec la virgule
- Bouton `%` (pourcentage)
- Bouton `C` pour tout effacer et bouton `back` pour effacer le dernier caractère
- Bouton `e` pour insérer le nombre d'Euler (2,718…)
- Gestion des erreurs : l'écran affiche « Erreur » en cas de division par zéro
- Calcul réalisé sans la fonction `eval()`, avec un petit analyseur d'expressions écrit en JavaScript

## 🛠️ Technologies utilisées

- HTML5
- CSS3 (Flexbox et CSS Grid)
- JavaScript (sans framework ni bibliothèque)

## 📁 Structure du projet

```
Calculatrice-js/
├── calculatrice.html   → structure de la page
├── style.css           → mise en forme
└── script.js           → logique de la calculatrice
```

## 🚀 Utilisation

1. Télécharge ou clone le dépôt :
   ```
   git clone https://github.com/Mbianancy-design/Calculatrice-js.git
   ```
2. Ouvre le dossier et double-clique sur `calculatrice.html`.
3. La calculatrice s'ouvre dans ton navigateur : clique sur les boutons pour calculer.

## 📋 Exemples

| Saisie | Résultat |
|---|---|
| `2 + 3 x 4` | `14` |
| `10 / 4` | `2,5` |
| `0,1 + 0,2` | `0,3` |
| `200 + 10%` | `200,1` |
| `8 / 0` | `Erreur` |

## 👤 Auteur

**Ahanda Nancy** — Étudiante en BTS Informatique
GitHub : [Mbianancy-design](https://github.com/Mbianancy-design)
