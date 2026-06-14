# Climate Command Center

A free-first PWA for meal-time climate operations across 51 cities in Tamil Nadu, Puducherry, and Port Blair.

## What Is Built

- GitHub Pages-ready PWA frontend
- Google Sheets + Apps Script backend scaffold
- Core team summary view
- Selected-city view
- City-level 7-day meal-window forecast
- Lunch and dinner prioritization
- In-app alert center
- History and accuracy view with date and filter controls
- Prediction snapshot storage
- Daily actual-vs-prediction scoring

## Fixed Meal Windows

- Lunch: 11 AM to 2 PM
- Dinner: 7 PM to 10 PM

## Files

- `index.html`: app entry point
- `styles.css`: app design
- `app.js`: app logic and demo data
- `config.js`: backend URL config
- `manifest.webmanifest`: PWA install metadata
- `sw.js`: offline cache
- `apps-script/Code.gs`: Google Apps Script backend
- `SETUP-BABY-STEPS.md`: step-by-step setup guide
- `SHEET-SCHEMA.md`: Google Sheet tab reference
- `DEBUG-REPORT.md`: local debug pass and fixes

## Current Data Mode

The app opens immediately with deterministic demo data so the team can review the flow before the Google Sheet backend is connected.

After the Apps Script web app URL is added to `config.js`, the app reads live data from Google Sheets.

## Go Live Path

1. Follow `SETUP-BABY-STEPS.md`.
2. Use `DEPLOYMENT-CHECKLIST.md` as the final release checklist.
3. Keep API keys only in Apps Script Script Properties, never in GitHub.

## Weather Sources

The Apps Script supports:

- MET Norway: no API key
- Open-Meteo: no API key, check commercial terms before production
- OpenWeather: optional free API key
- WeatherAPI: optional free API key

For production, use at least three enabled sources if you want stronger source comparison and confidence scoring.

## Privacy Note

This V1 is designed for free GitHub Pages + Google Sheets. It is best for operational weather data and internal prioritization, not confidential company data. Anyone with the published app link may be able to open the frontend. Keep secrets out of the repository.
