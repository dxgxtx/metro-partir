# Metro Partir — V2

Cette version utilise les vrais prochains passages IDFM via le Worker Cloudflare.

Frontend :
- GitHub Pages

Backend :
- Cloudflare Worker

API :
- Île-de-France Mobilités

URL du backend :
https://fragrant-flower-2253.ayadimedaziz.workers.dev/metro

Le token IDFM n'est jamais présent dans ce dépôt.

## Installation

Remplacer `index.html` et `manifest.webmanifest` dans le dépôt GitHub Pages.

La page recharge les horaires automatiquement toutes les 60 secondes.

La notification de cette V2 est une notification locale : le navigateur doit rester ouvert. Une prochaine version pourra utiliser Web Push pour fonctionner en arrière-plan.
