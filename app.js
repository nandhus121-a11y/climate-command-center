(function () {
  "use strict";

  const MEALS = {
    Lunch: { label: "Lunch", hours: "11 AM-2 PM", start: 11, end: 14 },
    Dinner: { label: "Dinner", hours: "7 PM-10 PM", start: 19, end: 22 }
  };

  const SOURCES = ["MET Norway", "Open-Meteo", "OpenWeather", "WeatherAPI"];

  const CITY_DATA = [
    ["annur", "Annur", "West", "KAM 1", 11.236, 77.105],
    ["ariyalur", "Ariyalur", "Central", "KAM 2", 11.139, 79.075],
    ["attur", "Attur", "Central", "KAM 3", 11.599, 78.601],
    ["chidambaram", "Chidambaram", "Coastal", "KAM 4", 11.399, 79.695],
    ["coonoor", "Coonoor", "Hills", "KAM 5", 11.352, 76.795],
    ["cuddalore", "Cuddalore", "Coastal", "KAM 4", 11.744, 79.768],
    ["dharmapuri", "Dharmapuri", "North West", "KAM 6", 12.127, 78.157],
    ["gingee", "Gingee", "North", "KAM 7", 12.252, 79.417],
    ["gobichettipalayam", "Gobichettipalayam", "West", "KAM 1", 11.455, 77.442],
    ["hosur", "Hosur", "North West", "KAM 6", 12.74, 77.825],
    ["kallakurichi", "Kallakurichi", "North", "KAM 7", 11.738, 78.963],
    ["kanchipuram", "Kanchipuram", "North", "KAM 8", 12.835, 79.704],
    ["karaikal", "Karaikal", "Puducherry", "KAM 4", 10.925, 79.838],
    ["karaikudi", "Karaikudi", "South", "KAM 2", 10.073, 78.78],
    ["karumathampatti", "Karumathampatti", "West", "KAM 1", 11.112, 77.184],
    ["kotagiri", "Kotagiri", "Hills", "KAM 5", 11.421, 76.861],
    ["krishnagiri", "Krishnagiri", "North West", "KAM 6", 12.519, 78.214],
    ["kumbakonam", "Kumbakonam", "Delta", "KAM 2", 10.96, 79.384],
    ["mannargudi", "Mannargudi", "Delta", "KAM 2", 10.666, 79.452],
    ["mayiladuthurai", "Mayiladuthurai", "Coastal", "KAM 4", 11.104, 79.652],
    ["mettupalayam", "Mettupalayam", "West", "KAM 1", 11.299, 76.934],
    ["mettur", "Mettur", "North West", "KAM 6", 11.787, 77.8],
    ["musiri", "Musiri", "Central", "KAM 3", 10.952, 78.444],
    ["nagapattinam", "Nagapattinam", "Coastal", "KAM 4", 10.767, 79.844],
    ["ooty", "Ooty", "Hills", "KAM 5", 11.41, 76.695],
    ["paramakudi", "Paramakudi", "South", "KAM 3", 9.546, 78.59],
    ["pattukkottai", "Pattukkottai", "Delta", "KAM 2", 10.423, 79.319],
    ["perambalur", "Perambalur", "Central", "KAM 3", 11.233, 78.88],
    ["port-blair", "Port Blair", "Island", "KAM 8", 11.623, 92.726],
    ["pudukkottai", "Pudukkottai", "Central", "KAM 3", 10.383, 78.821],
    ["ramanathapuram", "Ramanathapuram", "South Coastal", "KAM 3", 9.371, 78.83],
    ["rameswaram", "Rameswaram", "South Coastal", "KAM 3", 9.288, 79.313],
    ["sathyamangalam", "Sathyamangalam", "West", "KAM 1", 11.505, 77.238],
    ["sirkazhi", "Sirkazhi", "Coastal", "KAM 4", 11.239, 79.735],
    ["sivaganga", "Sivaganga", "South", "KAM 3", 9.847, 78.484],
    ["tanjore", "Tanjore", "Delta", "KAM 2", 10.787, 79.137],
    ["thiruvarur", "Thiruvarur", "Delta", "KAM 2", 10.772, 79.636],
    ["thuraiyur", "Thuraiyur", "Central", "KAM 3", 11.149, 78.598],
    ["tindivanam", "Tindivanam", "North", "KAM 7", 12.234, 79.655],
    ["tiruvannamalai", "Tiruvannamalai", "North", "KAM 7", 12.225, 79.074],
    ["vellore", "Vellore", "North", "KAM 8", 12.916, 79.132],
    ["viluppuram", "Viluppuram", "North", "KAM 7", 11.941, 79.486],
    ["virudhachalam", "Virudhachalam", "Central", "KAM 7", 11.519, 79.324],
    ["ambur", "Ambur", "North West", "KAM 6", 12.791, 78.716],
    ["gudiyatham", "Gudiyatham", "North", "KAM 8", 12.947, 78.872],
    ["neyveli", "Neyveli", "Coastal", "KAM 4", 11.543, 79.482],
    ["sriperumbudur", "Sriperumbudur", "North", "KAM 8", 12.967, 79.942],
    ["tirupattur", "Tirupattur", "North West", "KAM 6", 12.496, 78.57],
    ["arakkonam", "Arakkonam", "North", "KAM 8", 13.084, 79.67],
    ["tiruttani", "Tiruttani", "North", "KAM 8", 13.176, 79.616],
    ["coimbatore", "Coimbatore", "West", "KAM 1", 11.016, 76.955]
  ].map(([id, name, region, kam, lat, lon]) => ({ id, name, region, kam, lat, lon }));

  const RISK_ORDER = { Clear: 0, Low: 1, Watch: 2, Medium: 3, Heavy: 4, "Very Heavy": 5, Extreme: 6 };
  const RESULT_ORDER = ["Hit", "Miss", "False Alarm", "Overpredicted", "Underpredicted"];
  const HISTORY_RANGE_DAYS = 45;

  const state = {
    view: localStorage.getItem("climate:view") || "my",
    cityScope: localStorage.getItem("climate:cityScope") || "all",
    regionFilter: localStorage.getItem("climate:regionFilter") || "all",
    riskFilter: localStorage.getItem("climate:riskFilter") || "all",
    mealFilter: localStorage.getItem("climate:mealFilter") || "all",
    search: "",
    cityFilterIds: new Set(loadCityFilterIds()),
    dayOffset: Number(localStorage.getItem("climate:dayOffset") || "0"),
    selectedCityIds: new Set(loadSelectedCities()),
    cityId: localStorage.getItem("climate:cityId") || "coimbatore",
    detailMeal: localStorage.getItem("climate:detailMeal") || "Lunch",
    historyDate: formatDate(addDays(new Date(), -1)),
    historyStart: formatDate(addDays(new Date(), -7)),
    historyEnd: formatDate(addDays(new Date(), -1)),
    historyCity: "all",
    historyRegion: "all",
    historyMeal: "all",
    historyResult: "all",
    ackedAlerts: new Set(JSON.parse(localStorage.getItem("climate:ackedAlerts") || "[]"))
  };

  const db = {
    mode: "demo",
    asOf: "",
    forecasts: [],
    history: [],
    alerts: [],
    runLog: [],
    loadError: ""
  };

  const app = document.getElementById("app");

  function init() {
    migrateFromKamMode();
    if (!state.selectedCityIds.size) {
      CITY_DATA.forEach((city) => state.selectedCityIds.add(city.id));
      persistSelectedCities();
    }
    bindEvents();
    renderFrame();
    loadData(false).then(render);
    registerServiceWorker();
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-action], [data-view], [data-city-id], [data-toggle-city], [data-detail-city], [data-ack-alert], [data-day-offset], [data-city-scope], [data-detail-meal]");
      if (!target) return;

      if (target.dataset.view) {
        state.view = target.dataset.view;
        localStorage.setItem("climate:view", state.view);
        render();
        return;
      }

      if (target.dataset.action === "refresh") {
        loadData(true).then(render);
        return;
      }

      if (target.dataset.action === "clear-city-filter") {
        state.cityFilterIds.clear();
        persistCityFilterIds();
        renderFrame();
        render();
        return;
      }

      if (target.dataset.action === "alerts") {
        state.view = "alerts";
        localStorage.setItem("climate:view", state.view);
        render();
        return;
      }

      if (target.dataset.toggleCity) {
        const cityId = target.dataset.toggleCity;
        if (state.selectedCityIds.has(cityId)) state.selectedCityIds.delete(cityId);
        else state.selectedCityIds.add(cityId);
        persistSelectedCities();
        render();
        return;
      }

      if (target.dataset.detailCity) {
        state.cityId = target.dataset.detailCity;
        state.view = "city";
        localStorage.setItem("climate:cityId", state.cityId);
        localStorage.setItem("climate:view", state.view);
        render();
        return;
      }

      if (target.dataset.ackAlert) {
        state.ackedAlerts.add(target.dataset.ackAlert);
        localStorage.setItem("climate:ackedAlerts", JSON.stringify([...state.ackedAlerts]));
        render();
        return;
      }

      if (target.dataset.dayOffset) {
        state.dayOffset = Number(target.dataset.dayOffset);
        localStorage.setItem("climate:dayOffset", String(state.dayOffset));
        render();
        return;
      }

      if (target.dataset.cityScope) {
        state.cityScope = target.dataset.cityScope;
        localStorage.setItem("climate:cityScope", state.cityScope);
        render();
        return;
      }

      if (target.dataset.detailMeal) {
        state.detailMeal = target.dataset.detailMeal;
        localStorage.setItem("climate:detailMeal", state.detailMeal);
        render();
      }
    });

    document.addEventListener("change", (event) => {
      const el = event.target;
      if (!el.matches("select, input")) return;

      const value = el.value;
      if (el.id === "regionFilter") state.regionFilter = value;
      if (el.id === "riskFilter") state.riskFilter = value;
      if (el.id === "mealFilter") state.mealFilter = value;
      if (el.id === "citySearch") state.search = value.trim();
      if (el.dataset.cityFilter) {
        if (el.checked) state.cityFilterIds.add(el.dataset.cityFilter);
        else state.cityFilterIds.delete(el.dataset.cityFilter);
        persistCityFilterIds();
        renderFrame();
      }
      if (el.id === "cityDetailSelect") state.cityId = value;
      if (el.id === "historyDate") {
        state.historyDate = value;
        state.historyStart = value;
        state.historyEnd = value;
      }
      if (el.id === "historyStart") state.historyStart = value;
      if (el.id === "historyEnd") state.historyEnd = value;
      if (el.id === "historyCity") state.historyCity = value;
      if (el.id === "historyRegion") state.historyRegion = value;
      if (el.id === "historyMeal") state.historyMeal = value;
      if (el.id === "historyResult") state.historyResult = value;

      localStorage.setItem("climate:regionFilter", state.regionFilter);
      localStorage.setItem("climate:riskFilter", state.riskFilter);
      localStorage.setItem("climate:mealFilter", state.mealFilter);
      localStorage.setItem("climate:cityId", state.cityId);

      render();
    });
  }

  function renderFrame() {
    app.innerHTML = `
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">${icon("cloud")}</div>
          <div>
            <h1 class="brand-title">Climate Command Center</h1>
            <p class="brand-subtitle">Peak meal risk operations</p>
          </div>
        </div>
        <div class="top-actions">
          <span id="dataStatus" class="status-pill" data-mode="demo">Loading</span>
          <button class="icon-btn" data-action="refresh" title="Refresh data" aria-label="Refresh data">${icon("refresh")}</button>
          <button class="icon-btn" data-action="alerts" title="Open alerts" aria-label="Open alerts">${icon("bell")}<span id="alertBadge" class="badge-dot">0</span></button>
        </div>
      </header>
      <div class="layout">
        <aside class="sidebar">
          <nav class="nav-list" aria-label="Primary">
            ${navButton("my", "map", "My Cities")}
            ${navButton("summary", "gauge", "Core Summary")}
            ${navButton("history", "calendar", "History")}
            ${navButton("alerts", "bell", "Alerts")}
            ${navButton("admin", "settings", "Admin")}
          </nav>
          <section class="filter-panel">
            <div class="filter-grid">
              <label>
                <span class="field-label">Region</span>
                <select id="regionFilter" class="select">
                  ${option("all", "All regions", state.regionFilter)}
                  ${unique(CITY_DATA.map((city) => city.region)).map((region) => option(region, region, state.regionFilter)).join("")}
                </select>
              </label>
              <label>
                <span class="field-label">Risk</span>
                <select id="riskFilter" class="select">
                  ${["all", "Watch", "Medium", "Heavy", "Very Heavy", "Extreme"].map((risk) => option(risk, risk === "all" ? "All risks" : risk, state.riskFilter)).join("")}
                </select>
              </label>
              <label>
                <span class="field-label">Meal</span>
                <select id="mealFilter" class="select">
                  ${option("all", "Lunch + Dinner", state.mealFilter)}
                  ${option("Lunch", "Lunch", state.mealFilter)}
                  ${option("Dinner", "Dinner", state.mealFilter)}
                </select>
              </label>
              <label>
                <span class="field-label">Cities</span>
                ${cityPicker()}
              </label>
              <button class="row-action" data-action="clear-city-filter">${icon("check")} Clear cities</button>
              <label>
                <span class="field-label">Search</span>
                <input id="citySearch" class="input" value="${escapeAttr(state.search)}" placeholder="City name">
              </label>
            </div>
          </section>
        </aside>
        <main id="main" class="content" tabindex="-1"></main>
      </div>
    `;
  }

  function render() {
    updateStatus();
    updateNav();
    const main = document.getElementById("main");
    if (!main) return;

    if (state.view === "summary") main.innerHTML = renderSummary();
    else if (state.view === "history") main.innerHTML = renderHistory();
    else if (state.view === "alerts") main.innerHTML = renderAlerts();
    else if (state.view === "admin") main.innerHTML = renderAdmin();
    else if (state.view === "city") main.innerHTML = renderCityDetail();
    else main.innerHTML = renderMyCities();
  }

  function renderSummary() {
    const today = formatDate(new Date());
    const summaryRows = topRows(CITY_DATA, 3);
    const heavyToday = summaryRows.filter((row) => row.date === today && RISK_ORDER[row.risk] >= RISK_ORDER.Heavy).length;
    const lunchTop = topMealRisks("Lunch", 8);
    const dinnerTop = topMealRisks("Dinner", 8);
    const changed = db.forecasts.filter((row) => Math.abs(row.changedMm) >= 7 && daysFromToday(row.date) <= 3).length;
    const lowConfidence = db.forecasts.filter((row) => row.confidence < 62 && daysFromToday(row.date) <= 3).length;
    const accuracy7 = averageAccuracy(filterHistoryByDays(7));

    return `
      ${viewHeader("Core Summary", "All-city climate view", [
        button("0", "Today", state.dayOffset === 0, "day-offset"),
        button("1", "Tomorrow", state.dayOffset === 1, "day-offset"),
        button("2", "Day 3", state.dayOffset === 2, "day-offset")
      ])}
      <section class="grid four">
        ${metric("Heavy today", heavyToday, "Lunch and dinner combined")}
        ${metric("Changed forecast", changed, "Next 3 days")}
        ${metric("Low confidence", lowConfidence, "Source conflict")}
        ${metric("7-day accuracy", `${accuracy7}%`, "Consensus score")}
      </section>
      <section class="grid two" style="margin-top:14px">
        <div class="panel">
          <div class="section-title"><h2>Lunch Priority</h2><span class="count-pill">${lunchTop.length} cities</span></div>
          ${riskTable(lunchTop)}
        </div>
        <div class="panel">
          <div class="section-title"><h2>Dinner Priority</h2><span class="count-pill">${dinnerTop.length} cities</span></div>
          ${riskTable(dinnerTop)}
        </div>
      </section>
      <section class="panel" style="margin-top:14px">
        <div class="section-title">
          <h2>7-Day Heatmap</h2>
          <span class="count-pill">${filteredCityList(CITY_DATA).length} cities</span>
        </div>
        <div class="table-wrap">${renderHeatmap(filteredCityList(CITY_DATA))}</div>
      </section>
    `;
  }

  function renderMyCities() {
    const scopeCities = state.cityFilterIds.size || state.search
      ? CITY_DATA
      : state.cityScope === "selected"
        ? CITY_DATA.filter((city) => state.selectedCityIds.has(city.id))
        : CITY_DATA;
    const cities = filteredCityList(scopeCities);
    const date = formatDate(addDays(new Date(), state.dayOffset));
    const cards = cities
      .map((city) => cityCard(city, date))
      .join("");

    return `
      ${viewHeader("My Cities", "Selected city risk", [
        button("selected", "Selected", state.cityScope === "selected", "city-scope"),
        button("all", "All 51", state.cityScope === "all", "city-scope"),
        button("0", "Today", state.dayOffset === 0, "day-offset"),
        button("1", "Tomorrow", state.dayOffset === 1, "day-offset")
      ])}
      ${cities.length ? `<section class="city-grid">${cards}</section>` : `<div class="empty-state">No cities match the current filters.</div>`}
    `;
  }

  function renderCityDetail() {
    const city = CITY_DATA.find((item) => item.id === state.cityId) || CITY_DATA[0];
    const rows = db.forecasts.filter((row) => row.cityId === city.id);
    const selectedMealRows = rows.filter((row) => row.meal === state.detailMeal && daysFromToday(row.date) <= 6);
    const history = db.history.filter((row) => row.cityId === city.id && row.meal === state.detailMeal).slice(-14);
    const accuracy = averageAccuracy(history);

    return `
      ${viewHeader(city.name, city.region, [
        `<select id="cityDetailSelect" class="select" style="width:220px">${CITY_DATA.map((item) => option(item.id, item.name, city.id)).join("")}</select>`,
        button("Lunch", "Lunch", state.detailMeal === "Lunch", "detail-meal"),
        button("Dinner", "Dinner", state.detailMeal === "Dinner", "detail-meal")
      ])}
      <section class="city-detail-grid">
        <div class="panel">
          <div class="section-title"><h2>7-Day ${state.detailMeal}</h2><span class="count-pill">${MEALS[state.detailMeal].hours}</span></div>
          <div class="forecast-days">
            ${selectedMealRows.map(renderDayBlock).join("")}
          </div>
        </div>
        <div class="grid">
          <div class="panel">
            <div class="section-title"><h2>Source Agreement</h2><span class="count-pill">${selectedMealRows[0] ? selectedMealRows[0].confidence : 0}%</span></div>
            <div class="source-list">
              ${(selectedMealRows[0] ? selectedMealRows[0].sources : []).map(renderSourceRow).join("")}
            </div>
          </div>
          <div class="panel">
            <div class="section-title"><h2>Recent Accuracy</h2><span class="count-pill">${accuracy}%</span></div>
            <div class="history-list">
              ${history.slice(-5).reverse().map(renderHistoryCompact).join("") || `<div class="empty-state">No scored history yet.</div>`}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderAlerts() {
    const activeAlerts = db.alerts
      .filter((alert) => !state.ackedAlerts.has(alert.id))
      .filter((alert) => matchesRegionAndSearch(cityById(alert.cityId)))
      .filter((alert) => matchesCityMultiSelect(cityById(alert.cityId)))
      .sort((a, b) => RISK_ORDER[b.risk] - RISK_ORDER[a.risk] || b.changeMm - a.changeMm);

    const ackedCount = db.alerts.length - activeAlerts.length;
    return `
      ${viewHeader("Alerts", "In-app notification center", [
        `<span class="count-pill">${activeAlerts.length} active</span>`,
        `<span class="count-pill">${ackedCount} acknowledged</span>`
      ])}
      <section class="alert-list">
        ${activeAlerts.map(renderAlertItem).join("") || `<div class="empty-state">No active alerts for the current filters.</div>`}
      </section>
    `;
  }

  function renderHistory() {
    const rows = filteredHistory();
    const accuracy = averageAccuracy(rows);
    const falseAlarms = rows.filter((row) => row.result === "False Alarm").length;
    const misses = rows.filter((row) => row.result === "Miss").length;
    const avgError = rows.length ? round(rows.reduce((sum, row) => sum + Math.abs(row.actualMm - row.predictedMm), 0) / rows.length, 1) : 0;

    return `
      ${viewHeader("History & Accuracy", "Previous actuals vs prediction", [
        `<span class="count-pill">${rows.length} rows</span>`
      ])}
      <section class="panel">
        <div class="filter-grid history-filter-grid">
          <label><span class="field-label">From</span><input id="historyStart" class="input" type="date" value="${state.historyStart}"></label>
          <label><span class="field-label">To</span><input id="historyEnd" class="input" type="date" value="${state.historyEnd}"></label>
          <label><span class="field-label">City</span><select id="historyCity" class="select">${option("all", "All cities", state.historyCity)}${CITY_DATA.map((city) => option(city.id, city.name, state.historyCity)).join("")}</select></label>
          <label><span class="field-label">Region</span><select id="historyRegion" class="select">${option("all", "All regions", state.historyRegion)}${unique(CITY_DATA.map((city) => city.region)).map((region) => option(region, region, state.historyRegion)).join("")}</select></label>
          <label><span class="field-label">Meal</span><select id="historyMeal" class="select">${option("all", "Lunch + Dinner", state.historyMeal)}${option("Lunch", "Lunch", state.historyMeal)}${option("Dinner", "Dinner", state.historyMeal)}</select></label>
          <label><span class="field-label">Result</span><select id="historyResult" class="select">${option("all", "All results", state.historyResult)}${RESULT_ORDER.map((result) => option(result, result, state.historyResult)).join("")}</select></label>
          <label><span class="field-label">Single Date</span><input id="historyDate" class="input" type="date" value="${state.historyDate}"></label>
        </div>
      </section>
      <section class="grid four" style="margin-top:14px">
        ${metric("Accuracy", `${accuracy}%`, "Filtered rows")}
        ${metric("False alarms", falseAlarms, "Rain risk did not happen")}
        ${metric("Misses", misses, "Rain happened without alert")}
        ${metric("Avg error", `${avgError} mm`, "Absolute rainfall error")}
      </section>
      <section class="panel" style="margin-top:14px">
        <div class="section-title"><h2>Results</h2><span class="count-pill">${rows.length}</span></div>
        ${historyTable(rows)}
      </section>
    `;
  }

  function renderAdmin() {
    const latestRun = db.runLog[0] || { status: db.mode === "demo" ? "Demo dataset" : "Live", at: db.asOf };
    return `
      ${viewHeader("Admin", "Workbook and city controls", [
        `<span class="status-pill" data-mode="${db.mode}">${db.mode === "live" ? "Live backend" : "Demo mode"}</span>`
      ])}
      <section class="grid three">
        ${metric("Cities", CITY_DATA.length, "Seeded operating list")}
        ${metric("Meal windows", "2", "Lunch and dinner")}
        ${metric("Sources", SOURCES.length, "Configured comparison")}
      </section>
      <section class="grid two" style="margin-top:14px">
        <div class="panel">
          <div class="section-title"><h2>Thresholds</h2><span class="count-pill">Fixed meal times</span></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Level</th><th>Daily rain</th><th>Meal-window rain</th><th>App action</th></tr></thead>
              <tbody>
                <tr><td><span class="risk-pill" data-risk="Medium">Medium</span></td><td>15 mm+</td><td>3 mm+</td><td>Watch</td></tr>
                <tr><td><span class="risk-pill" data-risk="Heavy">Heavy</span></td><td>65 mm+</td><td>10 mm+</td><td>Priority alert</td></tr>
                <tr><td><span class="risk-pill" data-risk="Very Heavy">Very Heavy</span></td><td>115 mm+</td><td>20 mm+</td><td>Core team alert</td></tr>
                <tr><td><span class="risk-pill" data-risk="Extreme">Extreme</span></td><td>200 mm+</td><td>35 mm+</td><td>Escalation</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="panel">
          <div class="section-title"><h2>Data Status</h2><span class="count-pill">${escapeHtml(latestRun.status || "Ready")}</span></div>
          <div class="source-list">
            ${SOURCES.map((source) => `<div class="source-row"><div><p class="source-title">${source}</p><p class="source-copy">${sourceStatus(source)}</p></div><span class="source-pill">${source === "OpenWeather" || source === "WeatherAPI" ? "API key" : "No key"}</span></div>`).join("")}
          </div>
        </div>
      </section>
      <section class="panel" style="margin-top:14px">
        <div class="section-title"><h2>City List</h2><span class="count-pill">${CITY_DATA.length}</span></div>
        <ul class="admin-city-list">
          ${CITY_DATA.map((city) => `<li><strong>${city.name}</strong><span class="city-meta">${city.region}</span></li>`).join("")}
        </ul>
      </section>
    `;
  }

  function cityCard(city, date) {
    const lunch = forecastFor(city.id, date, "Lunch");
    const dinner = forecastFor(city.id, date, "Dinner");
    const topRisk = maxRisk([lunch, dinner]);
    const selected = state.selectedCityIds.has(city.id);
    return `
      <article class="city-card" data-risk="${topRisk}">
        <div class="city-card-head">
          <div>
            <h3>${city.name}</h3>
            <span class="city-meta">${city.region}</span>
          </div>
          <button class="city-star ${selected ? "active" : ""}" data-toggle-city="${city.id}" title="${selected ? "Remove from selected" : "Add to selected"}" aria-label="${selected ? "Remove from selected" : "Add to selected"}">${icon("star")}</button>
        </div>
        <span class="risk-pill" data-risk="${topRisk}">${topRisk}</span>
        <div class="meal-grid">
          ${renderMealBox(lunch)}
          ${renderMealBox(dinner)}
        </div>
        <button class="row-action" data-detail-city="${city.id}">${icon("arrow")} Open city</button>
      </article>
    `;
  }

  function renderMealBox(row) {
    const sourceBars = row.sources && row.sources.length
      ? row.sources.slice(0, 4).map((source) => `<span style="--h:${Math.max(6, Math.min(32, source.mm * 2 + 5))}px" title="${source.name}: ${round(source.mm, 1)} mm"></span>`).join("")
      : "";
    return `
      <div class="meal-box" data-risk="${row.risk}">
        <div class="meal-label"><span>${row.meal}</span><span>${MEALS[row.meal].hours}</span></div>
        <div class="rain-value">${round(row.rainMm, 1)} mm</div>
        <span class="risk-pill" data-risk="${row.risk}">${row.risk}</span>
        <div class="sparkline" aria-label="Source rainfall comparison">${sourceBars}</div>
        <div class="stack">
          <div class="bar" title="Rain probability"><span style="--w:${row.probability}%;--bar-color:${barColor(row.risk)}"></span></div>
          <span class="subtle">${row.probability}% rain probability | ${row.confidence}% confidence</span>
        </div>
      </div>
    `;
  }

  function renderDayBlock(row) {
    const sibling = forecastFor(row.cityId, row.date, row.meal === "Lunch" ? "Dinner" : "Lunch");
    return `
      <div class="day-block">
        <div class="day-head">
          <div>
            <h3 class="day-title">${dayLabel(row.date)}</h3>
            <span class="subtle">${row.date}</span>
          </div>
          <span class="risk-pill" data-risk="${maxRisk([row, sibling])}">${maxRisk([row, sibling])}</span>
        </div>
        <div class="day-meals">
          ${renderMealBox(row)}
          ${renderMealBox(sibling)}
        </div>
      </div>
    `;
  }

  function renderSourceRow(source) {
    return `
      <div class="source-row">
        <div>
          <p class="source-title">${source.name}</p>
          <p class="source-copy">${source.pop}% probability | ${round(source.mm, 1)} mm</p>
        </div>
        <div class="source-meter">
          <span class="subtle">Rain</span>
          <div class="bar"><span style="--w:${Math.min(100, source.mm * 4)}%;--bar-color:#2563eb"></span></div>
          <strong>${round(source.mm, 1)}</strong>
        </div>
      </div>
    `;
  }

  function renderAlertItem(alert) {
    return `
      <article class="alert-item">
        <div>
          <p class="alert-title">${alert.city} | ${alert.meal} | ${dayLabel(alert.date)}</p>
          <p class="alert-copy">${alert.message}</p>
        </div>
        <div class="view-actions">
          <span class="risk-pill" data-risk="${alert.risk}">${alert.risk}</span>
          <button class="row-action" data-detail-city="${alert.cityId}">${icon("arrow")} City</button>
          <button class="row-action" data-ack-alert="${alert.id}">${icon("check")} Ack</button>
        </div>
      </article>
    `;
  }

  function renderHistoryCompact(row) {
    return `
      <div class="history-row">
        <div>
          <p class="history-title">${dayLabel(row.date)} | ${row.meal}</p>
          <p class="history-copy">Predicted ${round(row.predictedMm, 1)} mm | Actual ${round(row.actualMm, 1)} mm</p>
        </div>
        <span class="result-pill" data-result="${row.result}">${row.result}</span>
      </div>
    `;
  }

  function riskTable(rows) {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>City</th><th>Date</th><th>Meal</th><th>Rain</th><th>Prob.</th><th>Risk</th><th>Change</th></tr></thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td><span class="city-name">${row.city}<span class="city-meta">${row.region}</span></span></td>
                <td>${dayLabel(row.date)}</td>
                <td>${row.meal}</td>
                <td>${round(row.rainMm, 1)} mm</td>
                <td>${row.probability}%</td>
                <td><span class="risk-pill" data-risk="${row.risk}">${row.risk}</span></td>
                <td>${formatChange(row.changedMm)}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function historyTable(rows) {
    const limited = rows.slice(0, 180);
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>City</th><th>Meal</th><th>Predicted</th><th>Actual</th><th>Error</th><th>Result</th><th>Best Source</th></tr></thead>
          <tbody>
            ${limited.map((row) => `
              <tr>
                <td>${row.date}</td>
                <td><span class="city-name">${row.city}<span class="city-meta">${row.region}</span></span></td>
                <td>${row.meal}</td>
                <td>${round(row.predictedMm, 1)} mm</td>
                <td>${round(row.actualMm, 1)} mm</td>
                <td>${round(Math.abs(row.actualMm - row.predictedMm), 1)} mm</td>
                <td><span class="result-pill" data-result="${row.result}">${row.result}</span></td>
                <td>${row.bestSource}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderHeatmap(cities) {
    const dates = Array.from({ length: 7 }, (_, index) => formatDate(addDays(new Date(), index)));
    const sorted = [...cities].sort((a, b) => {
      const ar = Math.max(...dates.flatMap((date) => [forecastFor(a.id, date, "Lunch"), forecastFor(a.id, date, "Dinner")]).map((row) => RISK_ORDER[row.risk]));
      const br = Math.max(...dates.flatMap((date) => [forecastFor(b.id, date, "Lunch"), forecastFor(b.id, date, "Dinner")]).map((row) => RISK_ORDER[row.risk]));
      return br - ar || a.name.localeCompare(b.name);
    });

    return `
      <div class="heatmap">
        <div class="heat-row">
          <div class="heat-city">City</div>
          ${dates.map((date) => `<div class="heat-city">${shortDay(date)}</div>`).join("")}
        </div>
        ${sorted.map((city) => `
          <div class="heat-row">
            <div class="heat-city">${city.name}</div>
            ${dates.map((date) => {
              const lunch = forecastFor(city.id, date, "Lunch");
              const dinner = forecastFor(city.id, date, "Dinner");
              const risk = maxRisk([lunch, dinner]);
              const maxMm = Math.max(lunch.rainMm, dinner.rainMm);
              return `<button class="heat-cell" data-detail-city="${city.id}" data-risk="${risk}" title="${city.name} ${date}">
                <strong>${risk}</strong>
                <span>${round(maxMm, 1)} mm</span>
              </button>`;
            }).join("")}
          </div>`).join("")}
      </div>
    `;
  }

  function viewHeader(title, kicker, actions) {
    return `
      <div class="view-header">
        <div>
          <p class="view-kicker">${kicker}</p>
          <h2 class="view-title">${title}</h2>
        </div>
        <div class="view-actions">${actions.join("")}</div>
      </div>
    `;
  }

  function button(value, label, active, dataName) {
    return `<button class="view-button ${active ? "active" : ""}" data-${dataName}="${value}">${label}</button>`;
  }

  function metric(label, value, note) {
    return `
      <div class="metric-card">
        <p class="metric-label">${label}</p>
        <p class="metric-value">${value}</p>
        <p class="metric-note">${note}</p>
      </div>
    `;
  }

  function navButton(view, iconName, label) {
    return `<button class="nav-button ${state.view === view ? "active" : ""}" data-view="${view}" title="${label}">${icon(iconName)}<span>${label}</span></button>`;
  }

  function updateStatus() {
    const status = document.getElementById("dataStatus");
    const badge = document.getElementById("alertBadge");
    if (status) {
      status.dataset.mode = db.mode;
      status.textContent = db.mode === "live" ? `Live | ${formatTime(db.asOf)}` : `Demo | ${formatTime(db.asOf)}`;
    }
    if (badge) {
      const activeAlerts = db.alerts.filter((alert) => !state.ackedAlerts.has(alert.id)).length;
      badge.textContent = activeAlerts > 99 ? "99+" : String(activeAlerts);
      badge.style.display = activeAlerts ? "grid" : "none";
    }
  }

  function updateNav() {
    document.querySelectorAll(".nav-button").forEach((buttonEl) => {
      buttonEl.classList.toggle("active", buttonEl.dataset.view === state.view);
    });
  }

  async function loadData(force) {
    db.loadError = "";
    const backendUrl = (window.CLIMATE_APP_BACKEND_URL || localStorage.getItem("climate:backendUrl") || "").trim();
    if (backendUrl) {
      try {
        const payload = await jsonp(`${backendUrl}?action=bootstrap&force=${force ? "1" : "0"}`);
        normalizeBackend(payload);
        return;
      } catch (error) {
        db.loadError = error.message || "Backend load failed";
      }
    }
    generateDemoData();
  }

  function normalizeBackend(payload) {
    const data = payload || {};
    db.mode = "live";
    db.asOf = data.asOf || new Date().toISOString();
    db.forecasts = Array.isArray(data.latestForecast) && data.latestForecast.length
      ? data.latestForecast.map(normalizeForecastRow)
      : [];
    db.history = Array.isArray(data.accuracyDaily) ? data.accuracyDaily.map(normalizeHistoryRow) : [];
    db.alerts = Array.isArray(data.alerts) ? data.alerts.map(normalizeAlertRow) : [];
    db.runLog = Array.isArray(data.runLog) ? data.runLog : [];

    if (!db.forecasts.length) generateDemoData("live-empty");
  }

  function normalizeForecastRow(row) {
    const city = cityById(row.cityId) || CITY_DATA.find((item) => item.name === row.city) || CITY_DATA[0];
    const sources = typeof row.sources === "string" ? safeJson(row.sources, []) : row.sources || [];
    return {
      cityId: city.id,
      city: city.name,
      region: city.region,
      kam: city.kam,
      date: row.date,
      meal: row.meal,
      rainMm: Number(row.rainMm || row.consensusRainMm || 0),
      probability: Number(row.probability || row.popPct || 0),
      risk: row.risk || riskFromRain(Number(row.rainMm || 0), Number(row.probability || 0)),
      confidence: Number(row.confidence || 0),
      changedMm: Number(row.changedMm || 0),
      sourceCount: Number(row.sourceCount || sources.length || 1),
      disagreement: Number(row.disagreement || 0),
      sources: sources.length ? sources : [{ name: "Consensus", mm: Number(row.rainMm || 0), pop: Number(row.probability || 0) }]
    };
  }

  function normalizeHistoryRow(row) {
    const city = cityById(row.cityId) || CITY_DATA.find((item) => item.name === row.city) || CITY_DATA[0];
    return {
      date: row.date,
      cityId: city.id,
      city: city.name,
      region: city.region,
      kam: city.kam,
      meal: row.meal,
      predictedMm: Number(row.predictedMm || 0),
      actualMm: Number(row.actualMm || 0),
      result: row.result || resultFromPrediction(Number(row.predictedMm || 0), Number(row.actualMm || 0)),
      bestSource: row.bestSource || "Consensus",
      confidence: Number(row.confidence || 0)
    };
  }

  function normalizeAlertRow(row) {
    const city = cityById(row.cityId) || CITY_DATA.find((item) => item.name === row.city) || CITY_DATA[0];
    return {
      id: row.id || `${city.id}-${row.date}-${row.meal}-${row.type || "alert"}`,
      cityId: city.id,
      city: city.name,
      date: row.date,
      meal: row.meal,
      risk: row.risk || "Watch",
      changeMm: Number(row.changeMm || row.changedMm || 0),
      message: row.message || "Forecast needs attention."
    };
  }

  function generateDemoData(mode) {
    db.mode = mode === "live-empty" ? "live" : "demo";
    db.asOf = new Date().toISOString();
    db.forecasts = [];
    db.history = [];
    db.alerts = [];
    db.runLog = [{ at: db.asOf, status: "Demo dataset", rows: 0 }];

    for (const city of CITY_DATA) {
      for (let day = 0; day < 7; day += 1) {
        const date = formatDate(addDays(new Date(), day));
        for (const meal of Object.keys(MEALS)) {
          const row = buildForecast(city, date, meal, day);
          db.forecasts.push(row);
          if (RISK_ORDER[row.risk] >= RISK_ORDER.Medium || Math.abs(row.changedMm) >= 8 || row.confidence < 58) {
            db.alerts.push(buildAlert(row));
          }
        }
      }
    }

    for (const city of CITY_DATA) {
      for (let day = HISTORY_RANGE_DAYS; day >= 1; day -= 1) {
        const date = formatDate(addDays(new Date(), -day));
        for (const meal of Object.keys(MEALS)) {
          db.history.push(buildHistory(city, date, meal, day));
        }
      }
    }
  }

  function buildForecast(city, date, meal, dayIndex) {
    const sources = SOURCES.map((source, index) => sourceForecast(city, date, meal, dayIndex, source, index));
    const rainMm = average(sources.map((source) => source.mm));
    const probability = Math.round(average(sources.map((source) => source.pop)));
    const minMm = Math.min(...sources.map((source) => source.mm));
    const maxMm = Math.max(...sources.map((source) => source.mm));
    const disagreement = round(maxMm - minMm, 1);
    const confidence = clamp(Math.round(96 - disagreement * 4 - dayIndex * 2 + (sources.length - 2) * 3), 42, 96);
    const previousRainMm = Math.max(0, rainMm - ((rand(`${city.id}-${date}-${meal}-change`) - 0.48) * 18));
    const changedMm = round(rainMm - previousRainMm, 1);
    const risk = riskFromRain(rainMm, probability);
    return {
      cityId: city.id,
      city: city.name,
      region: city.region,
      kam: city.kam,
      date,
      meal,
      rainMm: round(rainMm, 1),
      probability,
      risk,
      confidence,
      changedMm,
      sourceCount: sources.length,
      disagreement,
      sources
    };
  }

  function sourceForecast(city, date, meal, dayIndex, source, sourceIndex) {
    const coastal = ["Coastal", "Delta", "Puducherry", "South Coastal", "Island"].includes(city.region) ? 1.35 : 1;
    const hills = city.region === "Hills" ? 1.22 : 1;
    const west = city.region === "West" ? 1.12 : 1;
    const dinnerBoost = meal === "Dinner" ? 1.12 : 0.94;
    const sourceBias = [0.92, 1.08, 1.0, 1.16][sourceIndex] || 1;
    const seed = rand(`${city.id}-${date}-${meal}-${source}`);
    const pulse = Math.pow(rand(`${city.id}-${date}-pulse`), 2.2) * 65;
    const baseline = (rand(`${city.region}-${dayIndex}`) * 8 + dayIndex * 0.9) * coastal * hills * west;
    const noise = (seed - 0.42) * 12;
    const mm = Math.max(0, (baseline + pulse + noise) * dinnerBoost * sourceBias - 8);
    const pop = clamp(Math.round(18 + mm * 3.2 + rand(`${source}-${city.id}-${date}-pop`) * 18), 6, 98);
    return { name: source, mm: round(mm, 1), pop };
  }

  function buildAlert(row) {
    const reason = RISK_ORDER[row.risk] >= RISK_ORDER.Heavy
      ? `${row.risk} rain predicted during ${row.meal.toLowerCase()}.`
      : Math.abs(row.changedMm) >= 8
        ? `Rain forecast changed by ${formatChange(row.changedMm)} since the last run.`
        : `Low source confidence at ${row.confidence}%.`;
    return {
      id: `${row.cityId}-${row.date}-${row.meal}`,
      cityId: row.cityId,
      city: row.city,
      date: row.date,
      meal: row.meal,
      risk: row.risk,
      changeMm: row.changedMm,
      message: `${round(row.rainMm, 1)} mm, ${row.probability}% probability. ${reason}`
    };
  }

  function buildHistory(city, date, meal, dayBack) {
    const predicted = buildForecast(city, date, meal, dayBack % 7).rainMm;
    const actual = Math.max(0, predicted + (rand(`${city.id}-${date}-${meal}-actual`) - 0.48) * 20);
    const bestSource = SOURCES[Math.floor(rand(`${city.id}-${date}-${meal}-best`) * SOURCES.length)];
    return {
      date,
      cityId: city.id,
      city: city.name,
      region: city.region,
      kam: city.kam,
      meal,
      predictedMm: round(predicted, 1),
      actualMm: round(actual, 1),
      result: resultFromPrediction(predicted, actual),
      bestSource,
      confidence: clamp(Math.round(88 - Math.abs(predicted - actual) * 2), 35, 96)
    };
  }

  function filteredCityList(cities) {
    return cities
      .filter(matchesProfileScope)
      .filter(matchesRegionAndSearch)
      .filter(matchesCityMultiSelect)
      .filter((city) => {
        if (state.riskFilter === "all") return true;
        const date = formatDate(addDays(new Date(), state.dayOffset));
        const rows = state.mealFilter === "all"
          ? [forecastFor(city.id, date, "Lunch"), forecastFor(city.id, date, "Dinner")]
          : [forecastFor(city.id, date, state.mealFilter)];
        return rows.some((row) => RISK_ORDER[row.risk] >= RISK_ORDER[state.riskFilter]);
      });
  }

  function matchesRegionAndSearch(city) {
    if (!city) return false;
    if (state.regionFilter !== "all" && city.region !== state.regionFilter) return false;
    if (state.search && !city.name.toLowerCase().includes(state.search.toLowerCase())) return false;
    return true;
  }

  function matchesProfileScope(city) {
    if (state.cityScope === "selected" && !state.cityFilterIds.size && !state.search && state.view === "my") {
      return state.selectedCityIds.has(city.id);
    }
    return true;
  }

  function matchesCityMultiSelect(city) {
    return !state.cityFilterIds.size || state.cityFilterIds.has(city.id);
  }

  function topRows(cities, days) {
    const dates = Array.from({ length: days }, (_, index) => formatDate(addDays(new Date(), index)));
    return cities.flatMap((city) => dates.flatMap((date) => [forecastFor(city.id, date, "Lunch"), forecastFor(city.id, date, "Dinner")]));
  }

  function topMealRisks(meal, limit) {
    const rows = filteredCityList(CITY_DATA)
      .flatMap((city) => [0, 1, 2].map((day) => forecastFor(city.id, formatDate(addDays(new Date(), day)), meal)));
    return rows
      .sort((a, b) => RISK_ORDER[b.risk] - RISK_ORDER[a.risk] || b.rainMm - a.rainMm || a.city.localeCompare(b.city))
      .slice(0, limit);
  }

  function filteredHistory() {
    const start = state.historyStart || state.historyDate;
    const end = state.historyEnd || state.historyDate;
    return db.history
      .filter((row) => row.date >= start && row.date <= end)
      .filter((row) => state.historyCity === "all" || row.cityId === state.historyCity)
      .filter((row) => state.historyRegion === "all" || row.region === state.historyRegion)
      .filter((row) => state.historyMeal === "all" || row.meal === state.historyMeal)
      .filter((row) => state.historyResult === "all" || row.result === state.historyResult)
      .sort((a, b) => b.date.localeCompare(a.date) || a.city.localeCompare(b.city));
  }

  function filterHistoryByDays(days) {
    const start = formatDate(addDays(new Date(), -days));
    const end = formatDate(addDays(new Date(), -1));
    return db.history.filter((row) => row.date >= start && row.date <= end);
  }

  function averageAccuracy(rows) {
    if (!rows.length) return 0;
    const score = rows.reduce((sum, row) => {
      const error = Math.abs(row.actualMm - row.predictedMm);
      return sum + clamp(100 - error * 4, 0, 100);
    }, 0) / rows.length;
    return Math.round(score);
  }

  function forecastFor(cityId, date, meal) {
    return db.forecasts.find((row) => row.cityId === cityId && row.date === date && row.meal === meal) || emptyForecast(cityId, date, meal);
  }

  function emptyForecast(cityId, date, meal) {
    const city = cityById(cityId) || CITY_DATA[0];
    return {
      cityId,
      city: city.name,
      region: city.region,
      kam: city.kam,
      date,
      meal,
      rainMm: 0,
      probability: 0,
      risk: "Clear",
      confidence: 0,
      changedMm: 0,
      sourceCount: 0,
      disagreement: 0,
      sources: []
    };
  }

  function maxRisk(rows) {
    return rows.map((row) => row.risk).sort((a, b) => RISK_ORDER[b] - RISK_ORDER[a])[0] || "Clear";
  }

  function riskFromRain(mm, probability) {
    if (mm >= 35 || (mm >= 28 && probability >= 80)) return "Extreme";
    if (mm >= 20 || (mm >= 16 && probability >= 78)) return "Very Heavy";
    if (mm >= 10 || (mm >= 8 && probability >= 68)) return "Heavy";
    if (mm >= 3 || probability >= 55) return "Medium";
    if (mm >= 1 || probability >= 35) return "Watch";
    return "Low";
  }

  function resultFromPrediction(predicted, actual) {
    const predictedAlert = predicted >= 3;
    const actualAlert = actual >= 3;
    const error = actual - predicted;
    if (predictedAlert && actualAlert && Math.abs(error) <= 6) return "Hit";
    if (!predictedAlert && actualAlert) return "Miss";
    if (predictedAlert && !actualAlert) return "False Alarm";
    if (error < -6) return "Overpredicted";
    if (error > 6) return "Underpredicted";
    return "Hit";
  }

  function formatChange(value) {
    if (Math.abs(value) < 1) return "Stable";
    return `${value > 0 ? "+" : ""}${round(value, 1)} mm`;
  }

  function barColor(risk) {
    if (RISK_ORDER[risk] >= RISK_ORDER["Very Heavy"]) return "#b91c1c";
    if (RISK_ORDER[risk] >= RISK_ORDER.Heavy) return "#c2410c";
    if (RISK_ORDER[risk] >= RISK_ORDER.Medium) return "#ca8a04";
    return "#15803d";
  }

  function sourceStatus(source) {
    if (source === "OpenWeather" || source === "WeatherAPI") return "Optional free API key in Apps Script properties";
    if (source === "MET Norway") return "Free public API with attribution";
    return "Optional source; check commercial terms before production";
  }

  function cityById(id) {
    return CITY_DATA.find((city) => city.id === id);
  }

  function unique(values) {
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  }

  function average(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function round(value, digits) {
    const factor = Math.pow(10, digits || 0);
    return Math.round(value * factor) / factor;
  }

  function rand(input) {
    let hash = 2166136261;
    const str = String(input);
    for (let index = 0; index < str.length; index += 1) {
      hash ^= str.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return ((hash >>> 0) % 100000) / 100000;
  }

  function addDays(date, days) {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function daysFromToday(dateString) {
    const today = addDays(new Date(), 0);
    const date = new Date(`${dateString}T00:00:00`);
    return Math.round((date - today) / 86400000);
  }

  function dayLabel(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    const diff = daysFromToday(dateString);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return date.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" });
  }

  function shortDay(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit" });
  }

  function formatTime(value) {
    if (!value) return "not loaded";
    try {
      return new Date(value).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
    } catch (error) {
      return value;
    }
  }

  function option(value, label, selected) {
    return `<option value="${escapeAttr(value)}" ${String(value) === String(selected) ? "selected" : ""}>${escapeHtml(label)}</option>`;
  }

  function cityPicker() {
    const label = state.cityFilterIds.size ? `${state.cityFilterIds.size} cities selected` : "All 51 cities";
    return `
      <details class="city-picker">
        <summary>${escapeHtml(label)}</summary>
        <div class="city-picker-menu">
          ${[...CITY_DATA]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((city) => `
              <label class="city-check">
                <input type="checkbox" data-city-filter="${escapeAttr(city.id)}" ${state.cityFilterIds.has(city.id) ? "checked" : ""}>
                <span>${escapeHtml(city.name)}</span>
                <small>${escapeHtml(city.region)}</small>
              </label>
            `)
            .join("")}
        </div>
      </details>
    `;
  }

  function migrateFromKamMode() {
    if (localStorage.getItem("climate:noKamMigration") === "1") return;
    state.cityScope = "all";
    state.selectedCityIds = new Set(CITY_DATA.map((city) => city.id));
    state.cityFilterIds.clear();
    localStorage.removeItem("climate:profileMode");
    localStorage.removeItem("climate:selectedKam");
    localStorage.setItem("climate:cityScope", "all");
    localStorage.setItem("climate:noKamMigration", "1");
    persistSelectedCities();
    persistCityFilterIds();
  }

  function cityMultiOptions() {
    return [...CITY_DATA]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((city) => `<option value="${escapeAttr(city.id)}" ${state.cityFilterIds.has(city.id) ? "selected" : ""}>${escapeHtml(city.name)}</option>`)
      .join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function safeJson(value, fallback) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function loadSelectedCities() {
    try {
      return JSON.parse(localStorage.getItem("climate:selectedCityIds") || "[]");
    } catch (error) {
      return [];
    }
  }

  function persistSelectedCities() {
    localStorage.setItem("climate:selectedCityIds", JSON.stringify([...state.selectedCityIds]));
  }

  function loadCityFilterIds() {
    try {
      return JSON.parse(localStorage.getItem("climate:cityFilterIds") || "[]");
    } catch (error) {
      return [];
    }
  }

  function persistCityFilterIds() {
    localStorage.setItem("climate:cityFilterIds", JSON.stringify([...state.cityFilterIds]));
  }

  function jsonp(url) {
    return new Promise((resolve, reject) => {
      const callbackName = `climateCallback_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const script = document.createElement("script");
      const timeout = window.setTimeout(() => {
        cleanup();
        reject(new Error("Backend request timed out"));
      }, 12000);

      function cleanup() {
        window.clearTimeout(timeout);
        delete window[callbackName];
        if (script.parentNode) script.parentNode.removeChild(script);
      }

      window[callbackName] = (payload) => {
        cleanup();
        resolve(payload);
      };

      script.onerror = () => {
        cleanup();
        reject(new Error("Backend request failed"));
      };

      script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callbackName}`;
      document.head.appendChild(script);
    });
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol === "file:") return;
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  function icon(name) {
    const paths = {
      cloud: '<path d="M17.5 18H7.2A4.7 4.7 0 0 1 6 8.8 6.3 6.3 0 0 1 18 10a4 4 0 0 1-.5 8Z"/><path d="M8 21h.01M12 21h.01M16 21h.01"/>',
      refresh: '<path d="M21 12a9 9 0 0 1-15 6.7"/><path d="M3 12A9 9 0 0 1 18 5.3"/><path d="M3 5v7h7"/><path d="M21 19v-7h-7"/>',
      bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
      map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15"/><path d="M15 6v15"/>',
      gauge: '<path d="M12 14 16 9"/><path d="M3.3 17a9 9 0 1 1 17.4 0"/><path d="M7 17h10"/>',
      calendar: '<path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
      settings: '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1A1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1A1.7 1.7 0 0 0 20.9 10h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
      star: '<path d="m12 2 3 6 6.7 1-4.8 4.7 1.1 6.6-6-3.1-6 3.1 1.1-6.6L2.3 9 9 8Z"/>',
      arrow: '<path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>',
      check: '<path d="m20 6-11 11-5-5"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.cloud}</svg>`;
  }

  init();
})();
