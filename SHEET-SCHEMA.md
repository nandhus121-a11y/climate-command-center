# Google Sheet Schema

The Apps Script creates these tabs automatically when you run `setupWorkbook`.

## Cities

Master operating city list.

- `cityId`
- `city`
- `region`
- `kam` unused in the current app UI
- `lat`
- `lon`
- `active`
- `priority`

## TeamPrefs

Reserved for future shared team preferences.

- `userEmail`
- `role`
- `kam` unused in the current app UI
- `selectedCityIds`
- `active`

V1 stores city selection locally on each user device. This tab is included so shared preferences can be added later.

## LatestForecast

Current 7-day forecast used by the app.

- `asOf`
- `cityId`
- `city`
- `region`
- `kam` unused in the current app UI
- `date`
- `meal`
- `rainMm`
- `probability`
- `risk`
- `confidence`
- `changedMm`
- `sourceCount`
- `disagreement`
- `sources`

## ForecastSnapshots

Append-only prediction history. This is what allows actual-vs-prediction scoring.

- `snapshotAt`
- `cityId`
- `city`
- `region`
- `kam` unused in the current app UI
- `date`
- `meal`
- `rainMm`
- `probability`
- `risk`
- `confidence`
- `sourceCount`
- `disagreement`
- `sources`

## Actuals

Actual rain captured for previous dates and meal windows.

- `capturedAt`
- `cityId`
- `city`
- `date`
- `meal`
- `actualMm`
- `source`
- `sourceCount`

## Alerts

Active app notifications.

- `id`
- `createdAt`
- `cityId`
- `city`
- `date`
- `meal`
- `risk`
- `changeMm`
- `message`
- `status`

## AccuracyDaily

Filtered by the app History view.

- `date`
- `cityId`
- `city`
- `region`
- `kam`
- `meal`
- `predictedMm`
- `actualMm`
- `result`
- `bestSource`
- `confidence`

## RunLog

Backend health log.

- `at`
- `job`
- `status`
- `message`
- `durationMs`

## Config

Runtime switches.

- `ENABLE_MET_NORWAY`
- `ENABLE_OPEN_METEO`
- `ENABLE_OPENWEATHER`
- `ENABLE_WEATHERAPI`
- `USER_AGENT`
- `MEDIUM_MEAL_MM`
- `HEAVY_MEAL_MM`
- `VERY_HEAVY_MEAL_MM`
- `EXTREME_MEAL_MM`
