# Birthday Site

A small, mobile-first React birthday surprise built with Vite. All content and media are bundled as public static files. The Surprise passcode is a playful reveal gate, **not security**: a visitor can inspect the JavaScript and content files and find it.

## Run locally

Requires Node.js 22 and npm.

```powershell
npm install
npm run dev
```

## Personalize the content

- Edit the greeting and envelope message in `src/content/birthday.json`.
- Replace `public/images/home/birthday-background.jpg` to change the home-page background. The original image supplied in `photo-gallery/IMG_2185.jpg` is kept unchanged.
- Add your letter-page background image as `public/images/letter/letter-background.jpg`. Until you add it, the letter page uses an olive-and-parchment gradient. The letter page uses system serif fonts for its antique style and does not require a downloaded font.
- Replace the demo gallery entries in `src/content/gallery.json` with your own. Each record needs a unique `id`, thumbnail and full image paths relative to `public/`, meaningful `alt` text, a one-line `preview`, and a complete `note`.
- Put optimized gallery images in `public/images/gallery/`. The home background photo is also included as the first gallery memory. The included SVGs are illustrative placeholders; replace them and their notes before sharing.
- Edit the four this-or-that categories and their two image choices in `src/content/secrets.json`. Each category allows one selected choice; replace each choice's image path with your own image under `public/`.
- Change `src/content/config.js` only if you want a different casual reveal code. Anyone who can load the site can inspect it, so do not use this gate for private photos or sensitive material.
- Public media and every bundled JSON file are downloadable. No content-management screen or account is provided.

Gallery and content image paths are relative to `public/` and resolved with Vite's `BASE_URL`, so they work at a repository subpath too. Compress photos to mobile-friendly WebP or JPEG sizes before adding them.

## Build, lint, and preview

```powershell
npm run lint
npm run build
npm run preview
```

## Deploy to Vercel

From this project directory:

```powershell
npx vercel
npx vercel --prod
```

Use `npm run build` and `dist` as the build settings. The included `vercel.json` sets those defaults.

## Deploy to AWS Amplify Hosting

The included `amplify.yml` configures AWS Amplify Hosting to install dependencies with `npm ci`, build the Vite app, and publish `dist/`.

1. Push this project to a GitHub repository.
2. In the AWS Console, open **AWS Amplify** and choose **Create new app** → **Host web app**.
3. Connect GitHub, authorize access to the repository, and select its deployment branch.
4. Confirm the detected build settings use `amplify.yml`, then save and deploy.
5. In the deployed app's **Domain management**, add `happy-birthday-shanmukh.com`. Add the DNS records Amplify provides at the domain registrar (or use Route 53 if the domain is managed there) and wait for HTTPS certificate validation.

An AWS account and an owned, registered domain are required. AWS hosting, DNS, and domain registration may incur charges. Do not publish private images or secrets in this client-side app: the contents and media served to the browser are publicly accessible, regardless of the passcode prompt.

## Deploy to GitHub Pages

The included `.github/workflows/pages.yml` builds and deploys `dist/` when pushed to `main`. Create a GitHub repository for this project, push its `main` branch, and enable GitHub Actions as the Pages build-and-deploy source in repository settings. The workflow sets `BASE_PATH` to the repository name for project sites.

To publish manually with `gh-pages`, install it as a development dependency and run:

```powershell
npm install --save-dev gh-pages
npm run deploy
```

Run `npm run deploy` only from a Git checkout with a configured remote. For a user/organization Pages site at the domain root, set `BASE_PATH=/` when building instead.

## Environment variables and optional privacy

Vite variables prefixed with `VITE_` are embedded into public browser assets. They may contain public settings such as an API base URL, but never a passcode, signing key, storage credential, or token. Keep local `.env` files out of source control.

The static client-side passcode cannot protect secrets. For genuine passcode verification, private images, or access-controlled content, add a serverless `POST /api/unlock` endpoint and private object storage that issues short-lived signed image URLs after server-side authorization. Keep server secrets in the hosting provider's server-side environment settings. GitHub Pages alone cannot run this API. The optional API design is documented in the enclosing workspace at `../specs/001-birthday-surprise/contracts/passcode-api.md`.
