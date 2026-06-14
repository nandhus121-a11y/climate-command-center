const APP = {
  timezone: "Asia/Kolkata",
  version: "1.0.0",
  mealWindows: {
    Lunch: { start: 11, end: 14 },
    Dinner: { start: 19, end: 22 }
  },
  sheets: {
    cities: "Cities",
    prefs: "TeamPrefs",
    latest: "LatestForecast",
    snapshots: "ForecastSnapshots",
    actuals: "Actuals",
    alerts: "Alerts",
    accuracy: "AccuracyDaily",
    runLog: "RunLog",
    config: "Config"
  }
};

const CITY_SEED = [
  ["annur", "Annur", "West", "KAM 1", 11.236, 77.105, true, 3],
  ["ariyalur", "Ariyalur", "Central", "KAM 2", 11.139, 79.075, true, 3],
  ["attur", "Attur", "Central", "KAM 3", 11.599, 78.601, true, 3],
  ["chidambaram", "Chidambaram", "Coastal", "KAM 4", 11.399, 79.695, true, 4],
  ["coonoor", "Coonoor", "Hills", "KAM 5", 11.352, 76.795, true, 4],
  ["cuddalore", "Cuddalore", "Coastal", "KAM 4", 11.744, 79.768, true, 5],
  ["dharmapuri", "Dharmapuri", "North West", "KAM 6", 12.127, 78.157, true, 3],
  ["gingee", "Gingee", "North", "KAM 7", 12.252, 79.417, true, 3],
  ["gobichettipalayam", "Gobichettipalayam", "West", "KAM 1", 11.455, 77.442, true, 3],
  ["hosur", "Hosur", "North West", "KAM 6", 12.74, 77.825, true, 3],
  ["kallakurichi", "Kallakurichi", "North", "KAM 7", 11.738, 78.963, true, 3],
  ["kanchipuram", "Kanchipuram", "North", "KAM 8", 12.835, 79.704, true, 4],
  ["karaikal", "Karaikal", "Puducherry", "KAM 4", 10.925, 79.838, true, 4],
  ["karaikudi", "Karaikudi", "South", "KAM 2", 10.073, 78.78, true, 3],
  ["karumathampatti", "Karumathampatti", "West", "KAM 1", 11.112, 77.184, true, 3],
  ["kotagiri", "Kotagiri", "Hills", "KAM 5", 11.421, 76.861, true, 4],
  ["krishnagiri", "Krishnagiri", "North West", "KAM 6", 12.519, 78.214, true, 3],
  ["kumbakonam", "Kumbakonam", "Delta", "KAM 2", 10.96, 79.384, true, 4],
  ["mannargudi", "Mannargudi", "Delta", "KAM 2", 10.666, 79.452, true, 4],
  ["mayiladuthurai", "Mayiladuthurai", "Coastal", "KAM 4", 11.104, 79.652, true, 4],
  ["mettupalayam", "Mettupalayam", "West", "KAM 1", 11.299, 76.934, true, 3],
  ["mettur", "Mettur", "North West", "KAM 6", 11.787, 77.8, true, 3],
  ["musiri", "Musiri", "Central", "KAM 3", 10.952, 78.444, true, 3],
  ["nagapattinam", "Nagapattinam", "Coastal", "KAM 4", 10.767, 79.844, true, 5],
  ["ooty", "Ooty", "Hills", "KAM 5", 11.41, 76.695, true, 4],
  ["paramakudi", "Paramakudi", "South", "KAM 3", 9.546, 78.59, true, 3],
  ["pattukkottai", "Pattukkottai", "Delta", "KAM 2", 10.423, 79.319, true, 4],
  ["perambalur", "Perambalur", "Central", "KAM 3", 11.233, 78.88, true, 3],
  ["port-blair", "Port Blair", "Island", "KAM 8", 11.623, 92.726, true, 4],
  ["pudukkottai", "Pudukkottai", "Central", "KAM 3", 10.383, 78.821, true, 3],
  ["ramanathapuram", "Ramanathapuram", "South Coastal", "KAM 3", 9.371, 78.83, true, 4],
  ["rameswaram", "Rameswaram", "South Coastal", "KAM 3", 9.288, 79.313, true, 4],
  ["sathyamangalam", "Sathyamangalam", "West", "KAM 1", 11.505, 77.238, true, 3],
  ["sirkazhi", "Sirkazhi", "Coastal", "KAM 4", 11.239, 79.735, true, 4],
  ["sivaganga", "Sivaganga", "South", "KAM 3", 9.847, 78.484, true, 3],
  ["tanjore", "Tanjore", "Delta", "KAM 2", 10.787, 79.137, true, 4],
  ["thiruvarur", "Thiruvarur", "Delta", "KAM 2", 10.772, 79.636, true, 4],
  ["thuraiyur", "Thuraiyur", "Central", "KAM 3", 11.149, 78.598, true, 3],
  ["tindivanam", "Tindivanam", "North", "KAM 7", 12.234, 79.655, true, 3],
  ["tiruvannamalai", "Tiruvannamalai", "North", "KAM 7", 12.225, 79.074, true, 3],
  ["vellore", "Vellore", "North", "KAM 8", 12.916, 79.132, true, 3],
  ["viluppuram", "Viluppuram", "North", "KAM 7", 11.941, 79.486, true, 3],
  ["virudhachalam", "Virudhachalam", "Central", "KAM 7", 11.519, 79.324, true, 3],
  ["ambur", "Ambur", "North West", "KAM 6", 12.791, 78.716, true, 3],
  ["gudiyatham", "Gudiyatham", "North", "KAM 8", 12.947, 78.872, true, 3],
  ["neyveli", "Neyveli", "Coastal", "KAM 4", 11.543, 79.482, true, 4],
  ["sriperumbudur", "Sriperumbudur", "North", "KAM 8", 12.967, 79.942, true, 4],
  ["tirupattur", "Tirupattur", "North West", "KAM 6", 12.496, 78.57, true, 3],
  ["arakkonam", "Arakkonam", "North", "KAM 8", 13.084, 79.67, true, 3],
  ["tiruttani", "Tiruttani", "North", "KAM 8", 13.176, 79.616, true, 3],
  ["coimbatore", "Coimbatore", "West", "KAM 1", 11.016, 76.955, true, 4]
];

function setupWorkbook() {
  const ss = SpreadsheetApp.getActive();
  ensureSheet_(ss, APP.sheets.cities, ["cityId", "city", "region", "kam", "lat", "lon", "active", "priority"]);
  ensureSheet_(ss, APP.sheets.prefs, ["userEmail", "role", "kam", "selectedCityIds", "active"]);
  ensureSheet_(ss, APP.sheets.latest, ["asOf", "cityId", "city", "region", "kam", "date", "meal", "rainMm", "probability", "risk", "confidence", "changedMm", "sourceCount", "disagreement", "sources"]);
  ensureSheet_(ss, APP.sheets.snapshots, ["snapshotAt", "cityId", "city", "region", "kam", "date", "meal", "rainMm", "probability", "risk", "confidence", "sourceCount", "disagreement", "sources"]);
  ensureSheet_(ss, APP.sheets.actuals, ["capturedAt", "cityId", "city", "date", "meal", "actualMm", "source", "sourceCount"]);
  ensureSheet_(ss, APP.sheets.alerts, ["id", "createdAt", "cityId", "city", "date", "meal", "risk", "changeMm", "message", "status"]);
  ensureSheet_(ss, APP.sheets.accuracy, ["date", "cityId", "city", "region", "kam", "meal", "predictedMm", "actualMm", "result", "bestSource", "confidence"]);
  ensureSheet_(ss, APP.sheets.runLog, ["at", "job", "status", "message", "durationMs"]);
  ensureSheet_(ss, APP.sheets.config, ["key", "value"]);

  seedCities_(ss);
  seedConfig_(ss);
  logRun_("setupWorkbook", "OK", "Workbook ready", 0);
}

function installTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach((trigger) => {
    const fn = trigger.getHandlerFunction();
    if (fn === "refreshForecasts" || fn === "scorePreviousDay") {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger("refreshForecasts").timeBased().everyHours(6).create();
  ScriptApp.newTrigger("scorePreviousDay").timeBased().atHour(8).everyDays(1).create();
  logRun_("installTriggers", "OK", "Refresh every 6 hours, scoring daily at 8", 0);
}

function testWeatherSources() {
  setupWorkbook();
  const ss = SpreadsheetApp.getActive();
  const config = getConfig_(ss);
  const city = readObjects_(APP.sheets.cities).filter((row) => String(row.active).toLowerCase() !== "false")[0];
  const started = Date.now();
  const sources = [
    ["MET Norway", function () { return fetchMetNorway_(city, config); }],
    ["Open-Meteo", function () { return fetchOpenMeteo_(city); }],
    ["OpenWeather", function () { return config.OPENWEATHER_KEY ? fetchOpenWeather_(city, config.OPENWEATHER_KEY) : {}; }],
    ["WeatherAPI", function () { return config.WEATHERAPI_KEY ? fetchWeatherApi_(city, config.WEATHERAPI_KEY) : {}; }]
  ];

  sources.forEach(function (source) {
    const name = source[0];
    try {
      const result = source[1]();
      const count = Object.keys(result || {}).length;
      logRun_("testWeatherSources", count ? "OK" : "EMPTY", name + " rows: " + count, Date.now() - started);
    } catch (err) {
      logRun_("testWeatherSources", "SOURCE_ERROR", name + ": " + (err.message || String(err)), Date.now() - started);
    }
  });
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  const action = params.action || "bootstrap";
  let payload;

  if (action === "bootstrap") payload = getBootstrapPayload_();
  else if (action === "history") payload = getHistoryPayload_(params);
  else payload = { ok: false, error: "Unknown action" };

  return jsonResponse_(payload, params.callback);
}

function refreshForecasts() {
  const started = Date.now();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) {
    logRun_("refreshForecasts", "SKIPPED", "Another refresh is running", Date.now() - started);
    return;
  }

  try {
    setupWorkbook();
    const ss = SpreadsheetApp.getActive();
    const config = getConfig_(ss);
    const cities = readObjects_(APP.sheets.cities).filter((row) => String(row.active).toLowerCase() !== "false");
    const previous = previousLatestMap_();
    const asOf = new Date();
    const latestRows = [];
    const snapshotRows = [];
    const alertRows = [];

    cities.forEach((city) => {
      const sourceMaps = fetchCitySources_(city, config);
      nextDates_(7).forEach((date) => {
        Object.keys(APP.mealWindows).forEach((meal) => {
          const sourceValues = sourceMaps
            .map((sourceMap) => sourceMap[date + "|" + meal])
            .filter(Boolean);
          if (!sourceValues.length) return;

          const rainMm = round_(average_(sourceValues.map((item) => item.mm)), 1);
          const probability = Math.round(average_(sourceValues.map((item) => item.pop)));
          const minMm = Math.min.apply(null, sourceValues.map((item) => item.mm));
          const maxMm = Math.max.apply(null, sourceValues.map((item) => item.mm));
          const disagreement = round_(maxMm - minMm, 1);
          const confidence = clamp_(Math.round(94 - disagreement * 4 - daysFromToday_(date) * 2 + sourceValues.length * 2), 38, 96);
          const risk = riskFromMealRain_(rainMm, probability);
          const key = city.cityId + "|" + date + "|" + meal;
          const prev = previous[key] ? Number(previous[key].rainMm) : rainMm;
          const changedMm = round_(rainMm - prev, 1);
          const sourcesJson = JSON.stringify(sourceValues.map((item) => ({ name: item.source, mm: item.mm, pop: item.pop })));

          const latestRow = [
            asOf, city.cityId, city.city, city.region, city.kam, date, meal, rainMm, probability, risk,
            confidence, changedMm, sourceValues.length, disagreement, sourcesJson
          ];
          latestRows.push(latestRow);
          snapshotRows.push([
            asOf, city.cityId, city.city, city.region, city.kam, date, meal, rainMm, probability, risk,
            confidence, sourceValues.length, disagreement, sourcesJson
          ]);

          if (shouldAlert_(risk, changedMm, confidence)) {
            alertRows.push([
              city.cityId + "-" + date + "-" + meal,
              asOf,
              city.cityId,
              city.city,
              date,
              meal,
              risk,
              changedMm,
              alertMessage_(rainMm, probability, risk, changedMm, confidence, meal),
              "active"
            ]);
          }
        });
      });
    });

    replaceRows_(APP.sheets.latest, latestRows);
    appendRows_(APP.sheets.snapshots, snapshotRows);
    replaceRows_(APP.sheets.alerts, alertRows);
    CacheService.getScriptCache().remove("bootstrap");
    logRun_("refreshForecasts", "OK", "Latest rows: " + latestRows.length, Date.now() - started);
  } catch (err) {
    logRun_("refreshForecasts", "ERROR", err.message || String(err), Date.now() - started);
    throw err;
  } finally {
    lock.releaseLock();
  }
}

function scorePreviousDay() {
  const started = Date.now();
  const targetDate = Utilities.formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000), APP.timezone, "yyyy-MM-dd");
  try {
    setupWorkbook();
    const cities = readObjects_(APP.sheets.cities).filter((row) => String(row.active).toLowerCase() !== "false");
    const predictions = predictionMapForDate_(targetDate);
    const actualRows = [];
    const accuracyRows = [];

    cities.forEach((city) => {
      const actualMap = fetchActualRain_(city, targetDate);
      Object.keys(APP.mealWindows).forEach((meal) => {
        const key = city.cityId + "|" + targetDate + "|" + meal;
        const prediction = predictions[key];
        if (!prediction) return;
        const actual = actualMap[targetDate + "|" + meal];
        if (!actual) return;

        const predictedMm = Number(prediction.rainMm || 0);
        const actualMm = Number(actual.mm || 0);
        const sources = safeJson_(prediction.sources, []);
        const bestSource = bestSource_(sources, actualMm);
        const result = resultFromPrediction_(predictedMm, actualMm);
        const confidence = clamp_(Math.round(100 - Math.abs(predictedMm - actualMm) * 4), 0, 100);

        actualRows.push([new Date(), city.cityId, city.city, targetDate, meal, actualMm, actual.source, actual.sourceCount || 1]);
        accuracyRows.push([targetDate, city.cityId, city.city, city.region, city.kam, meal, predictedMm, actualMm, result, bestSource, confidence]);
      });
    });

    removeAccuracyDate_(targetDate);
    appendRows_(APP.sheets.actuals, actualRows);
    appendRows_(APP.sheets.accuracy, accuracyRows);
    CacheService.getScriptCache().remove("bootstrap");
    logRun_("scorePreviousDay", "OK", "Scored rows: " + accuracyRows.length, Date.now() - started);
  } catch (err) {
    logRun_("scorePreviousDay", "ERROR", err.message || String(err), Date.now() - started);
    throw err;
  }
}

function getBootstrapPayload_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get("bootstrap");
  if (cached) return JSON.parse(cached);

  const payload = {
    ok: true,
    version: APP.version,
    asOf: new Date().toISOString(),
    cities: readObjects_(APP.sheets.cities),
    latestForecast: readObjects_(APP.sheets.latest),
    alerts: readObjects_(APP.sheets.alerts).filter((row) => String(row.status || "active") === "active"),
    accuracyDaily: recentRows_(readObjects_(APP.sheets.accuracy), 45, "date"),
    runLog: readObjects_(APP.sheets.runLog).slice(-10).reverse()
  };

  putCacheIfSmall_(cache, "bootstrap", payload, 240);
  return payload;
}

function putCacheIfSmall_(cache, key, payload, seconds) {
  const value = JSON.stringify(payload);
  if (value.length > 80000) return;
  try {
    cache.put(key, value, seconds);
  } catch (err) {
    // Cache is only a speed-up. Large payloads should still return normally.
  }
}

function getHistoryPayload_(params) {
  const rows = readObjects_(APP.sheets.accuracy).filter((row) => {
    if (params.start && String(row.date) < params.start) return false;
    if (params.end && String(row.date) > params.end) return false;
    if (params.cityId && params.cityId !== "all" && row.cityId !== params.cityId) return false;
    if (params.kam && params.kam !== "all" && row.kam !== params.kam) return false;
    if (params.region && params.region !== "all" && row.region !== params.region) return false;
    if (params.meal && params.meal !== "all" && row.meal !== params.meal) return false;
    if (params.result && params.result !== "all" && row.result !== params.result) return false;
    return true;
  });
  return { ok: true, accuracyDaily: rows };
}

function fetchCitySources_(city, config) {
  const maps = [];
  if (config.ENABLE_MET_NORWAY !== "FALSE") maps.push(safeFetchSource_("MET Norway", city, function () { return fetchMetNorway_(city, config); }));
  if (config.ENABLE_OPEN_METEO !== "FALSE") maps.push(safeFetchSource_("Open-Meteo", city, function () { return fetchOpenMeteo_(city); }));
  if (config.ENABLE_OPENWEATHER === "TRUE" && config.OPENWEATHER_KEY) maps.push(safeFetchSource_("OpenWeather", city, function () { return fetchOpenWeather_(city, config.OPENWEATHER_KEY); }));
  if (config.ENABLE_WEATHERAPI === "TRUE" && config.WEATHERAPI_KEY) maps.push(safeFetchSource_("WeatherAPI", city, function () { return fetchWeatherApi_(city, config.WEATHERAPI_KEY); }));
  return maps.filter((map) => Object.keys(map).length);
}

function safeFetchSource_(sourceName, city, fetchFn) {
  try {
    return fetchFn() || {};
  } catch (err) {
    logRun_("sourceFetch", "SOURCE_ERROR", sourceName + " failed for " + city.city + ": " + (err.message || String(err)), 0);
    return {};
  }
}

function fetchMetNorway_(city, config) {
  const url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + city.lat + "&lon=" + city.lon;
  const response = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    headers: { "User-Agent": config.USER_AGENT || "ClimateCommandCenter/1.0" }
  });
  if (response.getResponseCode() >= 300) return {};
  const data = JSON.parse(response.getContentText());
  const hours = (data.properties.timeseries || []).map((item) => {
    const next = item.data.next_1_hours || {};
    const details = next.details || {};
    const rain = Number(details.precipitation_amount || 0);
    return {
      date: Utilities.formatDate(new Date(item.time), APP.timezone, "yyyy-MM-dd"),
      hour: Number(Utilities.formatDate(new Date(item.time), APP.timezone, "H")),
      rainMm: rain,
      pop: probabilityFromRain_(rain)
    };
  });
  return groupHourlyByMeal_(hours, "MET Norway");
}

function fetchOpenMeteo_(city) {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + city.lat +
    "&longitude=" + city.lon +
    "&hourly=precipitation,precipitation_probability" +
    "&forecast_days=7&timezone=Asia%2FKolkata";
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() >= 300) return {};
  const data = JSON.parse(response.getContentText());
  const times = data.hourly.time || [];
  const precipitation = data.hourly.precipitation || [];
  const probabilities = data.hourly.precipitation_probability || [];
  const hours = times.map((time, index) => ({
    date: time.slice(0, 10),
    hour: Number(time.slice(11, 13)),
    rainMm: Number(precipitation[index] || 0),
    pop: Number(probabilities[index] || probabilityFromRain_(Number(precipitation[index] || 0)))
  }));
  return groupHourlyByMeal_(hours, "Open-Meteo");
}

function fetchOpenWeather_(city, apiKey) {
  const url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + city.lat + "&lon=" + city.lon + "&appid=" + encodeURIComponent(apiKey) + "&units=metric";
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() >= 300) return {};
  const data = JSON.parse(response.getContentText());
  const hours = (data.list || []).map((item) => {
    const rain = item.rain && item.rain["3h"] ? Number(item.rain["3h"]) : 0;
    return {
      date: Utilities.formatDate(new Date(item.dt * 1000), APP.timezone, "yyyy-MM-dd"),
      hour: Number(Utilities.formatDate(new Date(item.dt * 1000), APP.timezone, "H")),
      rainMm: rain,
      pop: Math.round(Number(item.pop || 0) * 100)
    };
  });
  return groupHourlyByMeal_(hours, "OpenWeather");
}

function fetchWeatherApi_(city, apiKey) {
  const url = "https://api.weatherapi.com/v1/forecast.json?key=" + encodeURIComponent(apiKey) + "&q=" + city.lat + "," + city.lon + "&days=3&aqi=no&alerts=no";
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() >= 300) return {};
  const data = JSON.parse(response.getContentText());
  const hours = [];
  (data.forecast.forecastday || []).forEach((day) => {
    (day.hour || []).forEach((hour) => {
      hours.push({
        date: hour.time.slice(0, 10),
        hour: Number(hour.time.slice(11, 13)),
        rainMm: Number(hour.precip_mm || 0),
        pop: Number(hour.chance_of_rain || 0)
      });
    });
  });
  return groupHourlyByMeal_(hours, "WeatherAPI");
}

function fetchActualRain_(city, date) {
  const url = "https://archive-api.open-meteo.com/v1/archive?latitude=" + city.lat +
    "&longitude=" + city.lon +
    "&start_date=" + date +
    "&end_date=" + date +
    "&hourly=precipitation&timezone=Asia%2FKolkata";
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() >= 300) return {};
  const data = JSON.parse(response.getContentText());
  const times = data.hourly.time || [];
  const precipitation = data.hourly.precipitation || [];
  const hours = times.map((time, index) => ({
    date: time.slice(0, 10),
    hour: Number(time.slice(11, 13)),
    rainMm: Number(precipitation[index] || 0),
    pop: 0
  }));
  const grouped = groupHourlyByMeal_(hours, "Open-Meteo Archive");
  Object.keys(grouped).forEach((key) => {
    grouped[key].source = "Open-Meteo Archive";
    grouped[key].sourceCount = 1;
  });
  return grouped;
}

function groupHourlyByMeal_(hours, source) {
  const buckets = {};
  hours.forEach((hour) => {
    Object.keys(APP.mealWindows).forEach((meal) => {
      const window = APP.mealWindows[meal];
      if (hour.hour >= window.start && hour.hour <= window.end) {
        const key = hour.date + "|" + meal;
        if (!buckets[key]) buckets[key] = { source: source, mm: 0, popValues: [] };
        buckets[key].mm += Number(hour.rainMm || 0);
        buckets[key].popValues.push(Number(hour.pop || 0));
      }
    });
  });

  const grouped = {};
  Object.keys(buckets).forEach((key) => {
    const bucket = buckets[key];
    grouped[key] = {
      source: source,
      mm: round_(bucket.mm, 1),
      pop: bucket.popValues.length ? Math.max.apply(null, bucket.popValues) : probabilityFromRain_(bucket.mm)
    };
  });
  return grouped;
}

function predictionMapForDate_(targetDate) {
  const rows = readObjects_(APP.sheets.snapshots).filter((row) => String(row.date) === targetDate);
  const map = {};
  rows.forEach((row) => {
    const snapshotAt = dateValue_(row.snapshotAt);
    const mealWindow = APP.mealWindows[row.meal] || APP.mealWindows.Lunch;
    const cutoffHour = String(mealWindow.start).padStart(2, "0");
    const cutoff = new Date(targetDate + "T" + cutoffHour + ":00:00+05:30").getTime();
    const key = row.cityId + "|" + row.date + "|" + row.meal;
    const current = map[key];
    if (snapshotAt <= cutoff && (!current || snapshotAt > dateValue_(current.snapshotAt))) {
      map[key] = row;
    }
  });
  return map;
}

function previousLatestMap_() {
  const map = {};
  readObjects_(APP.sheets.latest).forEach((row) => {
    map[row.cityId + "|" + row.date + "|" + row.meal] = row;
  });
  return map;
}

function shouldAlert_(risk, changedMm, confidence) {
  return riskRank_(risk) >= riskRank_("Medium") || Math.abs(changedMm) >= 8 || confidence < 58;
}

function alertMessage_(rainMm, probability, risk, changedMm, confidence, meal) {
  if (riskRank_(risk) >= riskRank_("Heavy")) {
    return rainMm + " mm, " + probability + "% probability during " + meal + ".";
  }
  if (Math.abs(changedMm) >= 8) {
    return "Forecast changed by " + changedMm + " mm during " + meal + ".";
  }
  return "Source confidence is " + confidence + "% during " + meal + ".";
}

function riskFromMealRain_(mm, probability) {
  if (mm >= 35 || (mm >= 28 && probability >= 80)) return "Extreme";
  if (mm >= 20 || (mm >= 16 && probability >= 78)) return "Very Heavy";
  if (mm >= 10 || (mm >= 8 && probability >= 68)) return "Heavy";
  if (mm >= 3 || probability >= 55) return "Medium";
  if (mm >= 1 || probability >= 35) return "Watch";
  return "Low";
}

function resultFromPrediction_(predicted, actual) {
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

function bestSource_(sources, actualMm) {
  if (!sources.length) return "Consensus";
  let best = sources[0];
  sources.forEach((source) => {
    if (Math.abs(Number(source.mm) - actualMm) < Math.abs(Number(best.mm) - actualMm)) best = source;
  });
  return best.name || "Consensus";
}

function probabilityFromRain_(mm) {
  return clamp_(Math.round(20 + Number(mm || 0) * 12), 5, 96);
}

function riskRank_(risk) {
  const order = { Clear: 0, Low: 1, Watch: 2, Medium: 3, Heavy: 4, "Very Heavy": 5, Extreme: 6 };
  return order[risk] || 0;
}

function nextDates_(days) {
  const dates = [];
  for (let i = 0; i < days; i += 1) {
    dates.push(Utilities.formatDate(new Date(Date.now() + i * 24 * 60 * 60 * 1000), APP.timezone, "yyyy-MM-dd"));
  }
  return dates;
}

function daysFromToday_(date) {
  const today = new Date(Utilities.formatDate(new Date(), APP.timezone, "yyyy-MM-dd") + "T00:00:00+05:30").getTime();
  const target = new Date(date + "T00:00:00+05:30").getTime();
  return Math.round((target - today) / (24 * 60 * 60 * 1000));
}

function ensureSheet_(ss, name, headers) {
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeader = firstRow.some((value) => value !== "");
  if (!hasHeader) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  return sheet;
}

function seedCities_(ss) {
  const sheet = ss.getSheetByName(APP.sheets.cities);
  if (sheet.getLastRow() > 1) return;
  sheet.getRange(2, 1, CITY_SEED.length, CITY_SEED[0].length).setValues(CITY_SEED);
}

function seedConfig_(ss) {
  const sheet = ss.getSheetByName(APP.sheets.config);
  if (sheet.getLastRow() > 1) return;
  const rows = [
    ["ENABLE_MET_NORWAY", "TRUE"],
    ["ENABLE_OPEN_METEO", "TRUE"],
    ["ENABLE_OPENWEATHER", "FALSE"],
    ["ENABLE_WEATHERAPI", "FALSE"],
    ["USER_AGENT", "ClimateCommandCenter/1.0 contact@example.com"],
    ["MEDIUM_MEAL_MM", "3"],
    ["HEAVY_MEAL_MM", "10"],
    ["VERY_HEAVY_MEAL_MM", "20"],
    ["EXTREME_MEAL_MM", "35"]
  ];
  sheet.getRange(2, 1, rows.length, 2).setValues(rows);
}

function getConfig_(ss) {
  const rows = ss.getSheetByName(APP.sheets.config).getDataRange().getValues();
  const config = {};
  rows.slice(1).forEach((row) => {
    if (row[0]) config[String(row[0])] = String(row[1] || "");
  });
  const props = PropertiesService.getScriptProperties().getProperties();
  Object.keys(props).forEach((key) => config[key] = props[key]);
  return config;
}

function readObjects_(sheetName) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return [];
  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(String);
  return values.slice(1).filter((row) => row.some((cell) => cell !== "")).map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = normalizeCell_(row[index]);
    });
    return obj;
  });
}

function replaceRows_(sheetName, rows) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
  if (rows.length) sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function appendRows_(sheetName, rows) {
  if (!rows.length) return;
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
}

function removeAccuracyDate_(date) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(APP.sheets.accuracy);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return;
  const keep = [values[0]].concat(values.slice(1).filter((row) => normalizeCell_(row[0]) !== date));
  sheet.clearContents();
  sheet.getRange(1, 1, keep.length, keep[0].length).setValues(keep);
}

function recentRows_(rows, days, field) {
  const cutoff = Utilities.formatDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000), APP.timezone, "yyyy-MM-dd");
  return rows.filter((row) => String(row[field]) >= cutoff);
}

function logRun_(job, status, message, durationMs) {
  try {
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName(APP.sheets.runLog) || ss.insertSheet(APP.sheets.runLog);
    if (sheet.getLastRow() === 0) sheet.appendRow(["at", "job", "status", "message", "durationMs"]);
    sheet.appendRow([new Date(), job, status, message, durationMs]);
  } catch (err) {
    console.error(err);
  }
}

function jsonResponse_(payload, callback) {
  const json = JSON.stringify(payload);
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + json + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function normalizeCell_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, APP.timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
  }
  return value;
}

function dateValue_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") return value.getTime();
  return new Date(value).getTime();
}

function safeJson_(value, fallback) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return fallback;
  }
}

function average_(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length;
}

function clamp_(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round_(value, digits) {
  const factor = Math.pow(10, digits || 0);
  return Math.round(Number(value || 0) * factor) / factor;
}
