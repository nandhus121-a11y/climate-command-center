# Debug Report

Date: 2026-06-14

## Checks Run

- Frontend JavaScript syntax check
- Apps Script parse check
- PWA manifest JSON validation
- City data JSON validation
- 51-city count validation
- Lightweight app startup smoke test
- Debug leftover scan for `debugger`, `TODO`, `FIXME`, and accidental `console.log`

## Result

All local checks pass.

## Issues Found And Fixed

### -3. KAM controls were removed from the app UI

Problem:
The app showed KAM dropdowns and KAM labels even though city-to-KAM mapping is not finalized. This created confusion and made city filtering look incorrect.

Fix:
Removed KAM controls, KAM filters, and KAM labels from the user-facing app. City selection now uses region, typed search, starred cities, and a multi-select city dropdown.

Changed files:

- `app.js`
- `styles.css`

### -2. `All 51` and city search were still constrained by KAM

Problem:
In `My Cities`, choosing `All 51` could still show only the active KAM's cities. Searching for a city owned by another KAM, such as Karaikudi while KAM 1 was active, could show no results.

Fix:
Changed the city filtering logic so `All 51`, typed search, and the new city multi-select filter search across the full 51-city list.

Also added a multi-select city dropdown in the sidebar so users can select cities from a list instead of relying only on typed search.

Changed files:

- `app.js`
- `styles.css`

### -1. Backend test URL crashed with `Argument too large: value`

Problem:
Opening the deployed Apps Script URL with `?action=bootstrap` showed `Exception: Argument too large: value`. The response payload was larger than Apps Script CacheService allows for one cached value.

Fix:
Changed `getBootstrapPayload_()` so it only caches the bootstrap payload when it is small enough. If the payload is large, the backend now returns data normally without caching it.

Changed file:

- `apps-script/Code.gs`

### 0. Apps Script refresh crashed when one weather source was unreachable

Problem:
Apps Script showed `Exception: Address unavailable: https://api.met.no/...` while running `refreshForecasts`. This means Google Apps Script could not reach the MET Norway endpoint at that moment. The old code let that one source failure crash the full 51-city refresh.

Fix:
Added source-level error isolation through `safeFetchSource_()`. If MET Norway, Open-Meteo, OpenWeather, or WeatherAPI fails for a city, the backend logs the source error and continues with the remaining sources.

Also added `testWeatherSources()` so each weather source can be tested before running the full refresh.

Changed file:

- `apps-script/Code.gs`

### 2. Service worker could cache `config.js` too aggressively

Problem:
After connecting the Apps Script backend URL in `config.js`, a deployed PWA could keep an older cached `config.js` and still show `Demo`.

Fix:
Updated `sw.js` so `config.js` is network-first, and cross-origin backend/API calls are not cached by the service worker.

Changed file:

- `sw.js`

## Test Environment Limit

A full Playwright browser screenshot test was not run because the Chromium browser binary is not installed in the local Playwright cache. I did not download browser binaries onto the office laptop.

Fallback used:

- A lightweight fake-DOM runtime smoke test in `work/smoke-test.js`

## Still Needs Live Testing

These require your Google/GitHub account access:

- Running `setupWorkbook` inside Google Apps Script
- Running `refreshForecasts` against live weather APIs
- Deploying Apps Script as a web app
- Connecting the web app URL in `config.js`
- Publishing GitHub Pages
- Testing the final deployed PWA on phone browsers

## Commands Passed

- `node --check outputs/climate-command-center/app.js`
- Apps Script parse via Node `new Function(...)`
- Manifest and city JSON validation
- `node work/smoke-test.js`
