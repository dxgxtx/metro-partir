import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="wrap">
    <section class="hero">
      <h1>🚇 Metro Partir</h1>
      <div class="muted">Dis-moi quand sortir pour attraper ton métro.</div>
    </section>

    <section class="card">
      <div class="grid">
        <div>
          <label for="station">Station de départ</label>
          <input id="station" value="Château de Vincennes" />
        </div>
        <div>
          <label for="line">Ligne</label>
          <select id="line">
            <option value="1">Métro 1</option>
            <option value="4">Métro 4</option>
            <option value="8">Métro 8</option>
            <option value="9">Métro 9</option>
            <option value="A">RER A</option>
          </select>
        </div>
      </div>

      <div class="grid" style="margin-top:12px">
        <div>
          <label for="walk">Temps de marche (min)</label>
          <input id="walk" type="number" min="0" value="7" />
        </div>
        <div>
          <label for="margin">Marge de sécurité (min)</label>
          <input id="margin" type="number" min="0" value="3" />
        </div>
      </div>

      <div class="actions">
        <button id="notify">🔔 Activer les notifications</button>
        <button id="refresh" class="secondary">↻ Actualiser</button>
      </div>
      <div id="status" class="status muted"></div>
    </section>

    <section class="card">
      <div class="muted">Prochains passages — démonstration</div>
      <div id="departures"></div>
    </section>

    <section class="card result">
      <div class="muted">Tu dois partir à</div>
      <div id="leave" class="big">--:--</div>
      <div id="reason" class="muted">En attente des horaires.</div>
    </section>
  </main>
`;

const $ = id => document.getElementById(id);
let timer;

function nextMinutes() {
  const now = new Date();
  const base = Math.ceil((now.getMinutes() + now.getSeconds()/60) / 5) * 5;
  const first = new Date(now);
  first.setSeconds(0,0);
  first.setMinutes(base);
  if (first <= now) first.setMinutes(first.getMinutes()+5);
  return [first, new Date(first.getTime()+7*60000), new Date(first.getTime()+14*60000)];
}

function hhmm(date) {
  return date.toLocaleTimeString("fr-FR", {hour:"2-digit", minute:"2-digit"});
}

function calculate() {
  const walk = Number($("walk").value) || 0;
  const margin = Number($("margin").value) || 0;
  const departures = nextMinutes();
  const chosen = departures[0];
  const leave = new Date(chosen.getTime() - (walk + margin) * 60000);

  $("departures").innerHTML = departures.map((d, i) => `
    <div class="departure">
      <div><strong>${hhmm(d)}</strong><br><span class="muted">dans ${Math.max(0, Math.round((d-Date.now())/60000))} min</span></div>
      <span class="pill">Ligne ${$("line").value}</span>
    </div>
  `).join("");

  $("leave").textContent = hhmm(leave);
  $("reason").textContent = `Pour le métro de ${hhmm(chosen)} • ${walk} min de marche + ${margin} min de marge.`;
  return {leave, chosen};
}

async function enableNotifications() {
  if (!("Notification" in window)) {
    $("status").textContent = "Les notifications ne sont pas supportées par ce navigateur.";
    return;
  }
  const permission = await Notification.requestPermission();
  $("status").textContent = permission === "granted"
    ? "Notifications activées sur cet appareil."
    : "Permission de notification refusée.";
}

function scheduleLocalReminder() {
  clearTimeout(timer);
  const {leave} = calculate();
  const delay = leave.getTime() - Date.now();
  if (delay <= 0) return;
  timer = setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("🚇 Il est temps de partir !", {
        body: `Pars maintenant pour attraper ton métro de ${hhmm(new Date(leave.getTime() + (Number($("walk").value)+Number($("margin").value))*60000))}.`
      });
    }
  }, delay);
}

$("notify").addEventListener("click", async () => {
  await enableNotifications();
  if (Notification.permission === "granted") {
    scheduleLocalReminder();
  }
});

$("refresh").addEventListener("click", scheduleLocalReminder);
["station","line","walk","margin"].forEach(id => $(id).addEventListener("change", scheduleLocalReminder));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(console.error);
}

calculate();
