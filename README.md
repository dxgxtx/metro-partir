# 🚇 Metro Partir

Application web/PWA qui calcule quand quitter son domicile pour attraper le prochain métro.

## 1. Installer

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichée par Vite.

## 2. Première version

Cette version contient :
- interface mobile/PWA ;
- station et ligne configurables ;
- temps de marche ;
- marge de sécurité ;
- calcul de l'heure de départ ;
- demande d'autorisation de notifications ;
- notification locale lorsque la page reste active.

## 3. Prochaine étape : horaires IDFM

Île-de-France Mobilités propose une API "Prochains passages" en temps réel.
Il faudra créer un compte PRIM, obtenir un token API et mettre en place un petit backend pour ne jamais exposer le token dans le navigateur.

Architecture prévue :

```text
Téléphone
   ↓
PWA Metro Partir
   ↓
Backend / API proxy
   ↓
API Prochains passages IDFM
   ↓
Métro réel
```

## 4. Notification fiable en arrière-plan

La prochaine version utilisera Web Push :
- le téléphone enregistre son abonnement push ;
- le serveur surveille le prochain passage ;
- le serveur déclenche la notification ;
- l'application peut recalculer si le métro est retardé.

Pour une utilisation réelle, cette solution est préférable à un simple `setTimeout()` dans le navigateur.

## 5. Sécurité

Ne jamais mettre le token PRIM directement dans `src/main.js`.
Le token doit rester dans une variable secrète du backend.

## 6. GitHub Pages

Le frontend peut ensuite être publié sur GitHub Pages. Pour le temps réel et les notifications en arrière-plan, il faudra conserver un backend/serverless séparé.
