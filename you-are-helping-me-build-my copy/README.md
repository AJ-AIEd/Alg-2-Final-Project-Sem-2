# Andrew Cajina Professional Website

Version 1.0 of a professional publishing and consulting website for Andrew
Cajina. Built with Next.js App Router, TypeScript, Tailwind CSS, and simple
editable data files. No Supabase, authentication, payments, or student
submissions are included yet.

## Run locally

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Folder structure in beginner language

- `app/` contains the pages of the website. Each folder becomes part of the URL.
- `app/page.tsx` is the homepage.
- `app/about/page.tsx` is the About page.
- `app/writing/page.tsx` lists articles.
- `app/writing/[slug]/page.tsx` creates one article page for each article in `data/articles.ts`.
- `app/frameworks/page.tsx` lists frameworks.
- `app/frameworks/[slug]/page.tsx` creates one framework page for each framework in `data/frameworks.ts`.
- `app/resources/page.tsx` lists teaching resources.
- `app/resources/[slug]/page.tsx` creates one resource page for each resource in `data/resources.ts`.
- `app/workshops/page.tsx` is the professional development services page.
- `app/contact/page.tsx` is the contact page with a visual-only form.
- `components/` contains reusable page pieces such as the navbar, cards, hero, footer, and citation block.
- `data/` contains the editable website content.
- `public/downloads/` contains files that visitors can download.

## Files to edit first

1. `app/contact/page.tsx`: replace the placeholder email address.
2. `data/articles.ts`: edit article titles, descriptions, statuses, and article text.
3. `data/frameworks.ts`: edit framework summaries, versions, citations, and download links.
4. `data/resources.ts`: edit teaching resources and categories.
5. `components/Hero.tsx`: adjust the homepage introduction and call-to-action buttons.

## Add a new article

Open `data/articles.ts` and add a new object inside the `articles` array:

```ts
{
  slug: "my-new-article",
  title: "My New Article",
  date: "2026-06-01",
  category: "AI-TPACK",
  status: "Research Note",
  description: "A short description for the article card.",
  citation: "Cajina, A. (2026). My New Article. Andrew Cajina.",
  body: [
    "First paragraph of the article.",
    "Second paragraph of the article."
  ],
}
```

The URL will be `/writing/my-new-article`.

## Add a new framework

Open `data/frameworks.ts` and add a new object inside the `frameworks` array.
Give it a unique `slug`, version number, publication date, citation, classroom
use case, and download link.

Put the downloadable file in `public/downloads/`. If the file is named
`new-framework.pdf`, the download link should be `/downloads/new-framework.pdf`.

## Add a new teaching resource

Open `data/resources.ts` and add a new object inside the `resources` array.
Choose a `courseCategory`, type, version, date, description, use notice, and
download link.

If you want a new visible category chip on the Resources page, also add the
category name to `resourceCategories` in the same file.

## Push to GitHub

Create a repository on GitHub, then run these commands from the project folder:

```bash
git init
git add .
git commit -m "Build version 1.0 professional website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

## Deploy to Vercel

1. Go to `https://vercel.com`.
2. Sign in with GitHub.
3. Choose `Add New Project`.
4. Import the GitHub repository.
5. Keep the default Next.js settings.
6. Click `Deploy`.

Vercel should automatically detect Next.js and run the build.

## What to test before deploying

- Run `npm run build`.
- Click every navbar link.
- Open every article, framework, and resource page.
- Click every download button.
- Check the site on a phone-sized screen.
- Replace the placeholder email address.
- Confirm all dates, version numbers, citations, and copyright language.

## When Supabase becomes necessary

Supabase is not needed for Version 1.0. It becomes useful later if you want
stored contact form submissions, authenticated member-only resources, workshop
registrations, a database-backed content dashboard, or user accounts.
