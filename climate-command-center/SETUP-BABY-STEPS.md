# Baby Steps Setup Guide

Follow this in order. Do not skip the test steps.

## Part 1: Open The App Locally

1. Open the folder `outputs/climate-command-center`.
2. Open `index.html` in a browser, or run a local server from this folder.
3. Check these screens:
   - My Cities
   - Core Summary
   - History
   - Alerts
   - Admin
4. Confirm the top-right status says `Demo`.

## Part 2: Create The Google Sheet

1. Go to Google Drive.
2. Click `New`.
3. Click `Google Sheets`.
4. Rename the sheet to `Climate Command Center Backend`.
5. Keep this sheet open.

## Part 3: Add The Apps Script Backend

1. In the Google Sheet, click `Extensions`.
2. Click `Apps Script`.
3. Delete any sample code in the editor.
4. Open the local file `apps-script/Code.gs`.
5. Put that code into the Apps Script editor.
6. Click the project title at the top.
7. Rename it to `Climate Command Center Backend`.
8. Click `Save`.

## Part 4: Create The Sheet Tabs

1. In Apps Script, choose the function dropdown.
2. Select `setupWorkbook`.
3. Click `Run`.
4. Google will ask for authorization.
5. Click your Google account.
6. Click `Advanced` if needed.
7. Click `Go to Climate Command Center Backend`.
8. Click `Allow`.
9. Go back to the Google Sheet.
10. Confirm these tabs now exist:
    - Cities
    - TeamPrefs
    - LatestForecast
    - ForecastSnapshots
    - Actuals
    - Alerts
    - AccuracyDaily
    - RunLog
    - Config

## Part 5: Run The First Forecast Refresh

1. Go back to Apps Script.
2. Choose the function dropdown.
3. Select `testWeatherSources`.
4. Click `Run`.
5. Open the Google Sheet.
6. Check `RunLog`.
7. At least `Open-Meteo` should show `OK`.
8. Go back to Apps Script.
9. Select `refreshForecasts`.
10. Click `Run`.
11. Wait for it to finish.
12. Open the Google Sheet.
13. Check `LatestForecast`.
14. You should see forecast rows for the 51 cities.
15. Check `Alerts`.
16. You should see active alert rows if any city has risk.

If `MET Norway` shows `SOURCE_ERROR`, that is okay. The app will continue with other sources. To stop trying MET Norway, go to the `Config` tab and set `ENABLE_MET_NORWAY` to `FALSE`.

## Part 6: Run The First Accuracy Job

This may only work when yesterday actual rainfall data is available from the actuals source.

1. In Apps Script, choose `scorePreviousDay`.
2. Click `Run`.
3. Open the Google Sheet.
4. Check `Actuals`.
5. Check `AccuracyDaily`.

## Part 7: Add Optional API Keys

The app can run with no-key sources first. For better 3-source or 4-source comparison, add free API keys.

### OpenWeather

1. Create an OpenWeather API key.
2. In Apps Script, click `Project Settings`.
3. Scroll to `Script Properties`.
4. Add property:
   - Property: `OPENWEATHER_KEY`
   - Value: your OpenWeather key
5. Go to the `Config` sheet.
6. Set `ENABLE_OPENWEATHER` to `TRUE`.

### WeatherAPI

1. Create a WeatherAPI key.
2. In Apps Script, click `Project Settings`.
3. Scroll to `Script Properties`.
4. Add property:
   - Property: `WEATHERAPI_KEY`
   - Value: your WeatherAPI key
5. Go to the `Config` sheet.
6. Set `ENABLE_WEATHERAPI` to `TRUE`.

## Part 8: Install The Automatic Jobs

1. In Apps Script, choose `installTriggers`.
2. Click `Run`.
3. Open the left sidebar `Triggers`.
4. Confirm:
   - `refreshForecasts` runs every 6 hours
   - `scorePreviousDay` runs daily

## Part 9: Deploy The Apps Script Web App

1. In Apps Script, click `Deploy`.
2. Click `New deployment`.
3. Click the gear icon.
4. Select `Web app`.
5. Description: `Climate Command Center API`.
6. Execute as: `Me`.
7. Who has access: `Anyone with the link`.
8. Click `Deploy`.
9. Authorize if Google asks.
10. Keep the Web app URL.

## Part 10: Connect The PWA To The Backend

1. Open `config.js`.
2. Replace the empty string with the Apps Script Web app URL.

Example:

```js
window.CLIMATE_APP_BACKEND_URL = "https://script.google.com/macros/s/DEPLOYMENT_ID/exec";
```

3. Open the app again.
4. Click the refresh icon.
5. Confirm the top-right status changes from `Demo` to `Live`.

## Part 11: Put The App On GitHub Pages

1. Create a GitHub account if needed.
2. Create a new repository.
3. Name it `climate-command-center`.
4. Upload the files from `outputs/climate-command-center`.
5. Commit the files.
6. Go to repository `Settings`.
7. Click `Pages`.
8. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
9. Click `Save`.
10. Wait for GitHub to show the Pages URL.
11. Open that URL on mobile and desktop.

## Part 12: Install As A PWA

### Android

1. Open the GitHub Pages URL in Chrome.
2. Tap the three-dot menu.
3. Tap `Add to Home screen`.
4. Tap `Install`.

### iPhone

1. Open the GitHub Pages URL in Safari.
2. Tap the share button.
3. Tap `Add to Home Screen`.
4. Tap `Add`.

## Part 13: Team Rollout

1. Share the GitHub Pages URL with the core team first.
2. Ask each user to open `My Cities`.
3. Ask each user to select only the cities they want to track.
4. Ask the core team to use `Core Summary`.
5. Use `History` every morning to review actuals vs prediction.

## Part 14: Daily Operating Routine

1. Morning: open `Core Summary`.
2. Check lunch risk.
3. Check dinner risk.
4. Open `Alerts`.
5. Acknowledge reviewed alerts.
6. Open `History`.
7. Review yesterday accuracy.
8. Note cities with misses or false alarms.

## Notes

- Email alerts are intentionally skipped in V1.
- In-app alerts are visible inside the PWA.
- Browser push notifications while the app is closed are not included because the current constraint is GitHub + Google Sheets only.
- Forecast accuracy is improved through source comparison and daily scoring, but weather prediction cannot be guaranteed.
