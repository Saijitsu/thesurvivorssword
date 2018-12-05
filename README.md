# theSurvivorSSword
Versioning:
- Anglais

Langagues/librairies/API/Divers:
- Javascript (ES5), HTML5, CSS3
- Jquery (DOM & Interface)
- API CANVAS
- Tile Mapping

Hébergement: 
- Github Page

Compétences:

-> Mettre en oeuvre la bibliothèque jQuery dans une application web

Les fonctions essentielles à l’interface visuelle : victory(), currentPlayerIs(), fight(), updateStatistics() utilisent Jquery. C’est également le cas pour le son du jeu, l'initialisation du jeu, etc.

-> Concevoir une architecture d'application JavaScript réutilisable

L'architecture est conçue dans cet objectif:
index.js offre des fonctions outils utilisées dans l'ensemble de l'application.
canvas.js ou Tileset.js ne peuvent voir les images utilisées changées facilement.
Les objets Map, Character, Weapons sont facilements réutilisables dans un jeu de plateau par exemple.

-> Développer une application JavaScript orientée objet (JSOO)

L’ensemble des objets Map, Character, Weapons coopèrent ensemble et chaque objet va être en mesure de communiquer avec les autres. Map, Character, Weapons constituent des entités indépendantes avec un rôle distinct.

