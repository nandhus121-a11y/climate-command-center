# Deployment Checklist

Use this as the final go-live checklist.

## Local Review

- Open `index.html`.
- Confirm `My Cities` loads.
- Confirm `Core Summary` loads.
- Confirm `History` filters load.
- Confirm `Alerts` loads.
- Confirm `Admin` shows 51 cities.

## Google Sheet Backend

- Create the Google Sheet.
- Paste `apps-script/Code.gs` into Apps Script.
- Run `setupWorkbook`.
- Run `refreshForecasts`.
- Confirm `LatestForecast` has rows.
- Run `scorePreviousDay` after at least one day of snapshots.
- Deploy Apps Script as a web app.
- Copy the web app URL.

## PWA Connection

- Paste the web app URL into `config.js`.
- Open the app.
- Click refresh.
- Confirm status changes to `Live`.

## GitHub Pages

- Upload this whole folder to a GitHub repository.
- Enable Pages from the `main` branch and `/root`.
- Open the GitHub Pages URL.
- Test on desktop.
- Test on Android Chrome.
- Test on iPhone Safari.

## Rollout

- Share the app URL with 3-5 core users first.
- Ask each person to select their cities.
- Watch the Apps Script `RunLog` tab for errors.
- After one full day, review `History & Accuracy`.
- Then share with the full team.
