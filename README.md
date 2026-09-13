# Liholiswano Pilot — GitHub Pages version

A static, zero-build version of the pilot tracker, deployable for free on GitHub Pages, using an Apps Script backend (same pattern as MhanganeServices).

## 1. Set up the backend (5 minutes)

1. Go to [script.google.com](https://script.google.com) → **New project**.
2. Delete the placeholder code, paste in the contents of `Code.gs`.
3. Click **Deploy → New deployment**.
4. Type: **Web app**. Execute as: **Me**. Who has access: **Anyone**.
5. Click **Deploy**, authorize it, and copy the **Web app URL** it gives you (ends in `/exec`).

## 2. Connect the frontend to it

Open `index.html`, find this line near the top of the script:

```js
const API_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```

Replace the placeholder with the URL you copied in step 1.

## 3. Put it on GitHub Pages

1. Create a new GitHub repo (e.g. `liholiswano-pilot`).
2. Upload `index.html` to the repo root (the `Code.gs` file doesn't need to go here — it only lives in Apps Script).
3. Go to the repo's **Settings → Pages**.
4. Under **Source**, choose the `main` branch, root folder. Save.
5. GitHub gives you a live URL after a minute or two — usually `https://<your-username>.github.io/liholiswano-pilot/`.

That URL is what you share with your pilot group.

## 4. Turn it into an installable APK (no Android Studio needed)

The site is already set up as a PWA (`manifest.json`, `sw.js`, icons) — that's what makes step 4 possible.

1. Make sure steps 1–3 are done and your GitHub Pages URL loads correctly in a browser.
2. Go to **[pwabuilder.com](https://www.pwabuilder.com)** (free, made by Microsoft).
3. Paste your GitHub Pages URL into the box and click **Start**.
4. It scores your site as a PWA — you should see green checks for manifest, service worker, and icons (already handled here).
5. Click **Package for stores**, then choose **Android**.
6. Leave the default settings (it uses a Trusted Web Activity, which wraps your site as a real Android app) and click **Generate**.
7. It downloads a `.zip` containing a signed APK — that file is your installable app.

To install it on a phone: send the APK file via WhatsApp, email, or a Google Drive link, open it on the phone, and allow **"install from unknown sources"** when prompted (needed for anything not from the Play Store). It'll then appear as a normal app icon, launch full-screen (no browser bar), and use the cached shell for a faster load — while still pulling live group data from your Apps Script backend, same as the web version.

If you later want it properly signed for the Play Store (rather than PWABuilder's auto-generated signing key), that's a later step — this version is genuinely installable and shareable right now, which is what a pilot needs.

## Important limits to know about

- **No login system.** Anyone with the link can see and edit the group's data — fine for a small pilot with people you know, not fine for a public rollout. Don't share the link outside the actual pilot group.
- **One group at a time.** The backend stores a single JSON blob — it's built for running one pilot circle, not many groups at once. Running multiple groups would need a real database (Firestore, or a proper Sheet-per-group setup like MhanganeServices already does).
- **No real money moves through this.** It's the tracking and rule-enforcement layer only — contributions, collateral, and payouts still happen by hand (cash or mobile money) exactly as discussed. This app just keeps the math and the record honest.

## Natural next step, once the pilot proves the model

Swap the single Script Properties blob for a proper Sheet (one row per member, like MhanganeServices' Clients sheet) if you want more than one group running, or add a lightweight PIN check in `doPost` if you want to stop randoms from editing the link if it ever leaks.
