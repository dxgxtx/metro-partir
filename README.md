# Partir Crèche — V3

Cette version remplace le trajet métro par le trajet domicile → crèche.

## Itinéraires

- Arrêt de départ : Charles Garcia
- Bus 301 → direction Bobigny
- Bus 122 → direction Gallieni
- Arrivée : La Fontaine
- Le frontend compare les deux prochains bus.
- Il calcule l'heure de départ de la maison avec le temps de marche + une marge.

## Backend

Le Worker Cloudflare utilise le secret `IDFM_API_KEY`.

Route :
`/bus?line=301&direction=Bobigny`
ou
`/bus?line=122&direction=Gallieni`

Le token IDFM n'est jamais présent dans GitHub.

## Important

Le temps de trajet bus vers La Fontaine est actuellement une estimation courte basée sur les arrêts du parcours :
- 301 : 4 min
- 122 : 3 min

On pourra ensuite remplacer ces estimations par l'heure d'arrivée temps réel de la course.
